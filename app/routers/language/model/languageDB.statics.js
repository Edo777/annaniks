const { Email } = require('../../email/model');
const { ServiceDescription } = require('../../service-description/model');
const { Staff } = require('../../staff/model');
const fs = require('fs');
const PATH = require('path');
const _ = require('lodash');

function createLanguage(lng) {
    const Language = this;
    return new Promise((resolve, reject) => {
        ServiceDescription.create(lng)
        .then((result) => {
            resolve({
                status: "ok"
            })
        })
        .catch((err) => {
            reject({
                "ser-des": err
            })
        })

        Language.findOne({}).then((result)=>{
            lng.translates = {}
            for (const item of result.keysTranslation) {
                lng['translates'][item] = ''
            }
            resolve('ok')
            Language.update({}, {
                $push: { 'localization': lng },
            }, { runValidators: true }).catch((err) => {
                reject({
                    "lng": err
                });
            })
        })

        Email.update({}, {
            $push: { 'localization': lng }
        }, { runValidators: true }).catch((err) => {
            reject({
                "email": err
            });
        })
        Staff.update({}, {
            $push: { 'localization': lng }
        }, { multi: true }).catch((err) => {
            reject({
                "staff": err
            });
        })
    })
}

function getByLng(lng) {
    const Language = this;
    return Language.aggregate([
        { $match: {} },
        {
            $project: {
                localization: {
                    $filter: {
                        input: "$localization",
                        as: "localization",
                        cond: {
                            $and: [{ $eq: ["$$localization.language", lng] }, { $eq: ["$$localization.deleted", false] }],
                        }
                    }
                }
            }
        }
    ])
}

function createKey(key) {
    const Language = this;
    return new Promise((resolve, reject) => {
        Language.findOneAndUpdate({},{
            $addToSet : {keysTranslation : key}
        },(err,result)=>{
            if(err) {
                console.log('err')
            }else{
            for (const item of result.localization) {
                if(item['translates'] === undefined){
                    item['translates'] = {}
                }
                for (const proprty of key) {
                    item['translates'][proprty] = ""
                }
                Language.update({'localization.language' : item.language},{
                    $set : {'localization.$.translates' : item.translates}
                }).then(()=>{
                    resolve('ok')
                }).catch('not faund')
            }}
        })
    })
}

function updateByLng(object, lng) {
    const Language = this;
    return new Promise((resolve, reject) => {
        Language.aggregate([
            { $match: {} },
            {
                $project: {
                    localization: {
                        $filter: {
                            input: "$localization",
                            as: "localization",
                            cond: {
                                $and: [{ $eq: ["$$localization.language", lng] }, { $eq: ["$$localization.deleted", false] }],
                            }
                        }
                    }
                }
            }
        ], (err, res) => {
            let oldTranstale = {} = res[0].localization[0].translates;
            _.mapKeys(oldTranstale,(value,key)=>{
                if(object.translates[key] != undefined){
                    oldTranstale[key] = object.translates[key]
                }
            })
            Language.update({'localization.language' : lng},{
                $set : {'localization.$.isActive' : object.isActeve,'localization.$.translates':oldTranstale}
            }).then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err);
            })
        })
    })
}

function updateIcon(lng, file) {
    const Language = this;
    if (!file) {
        return Promise.reject({
            name: "uploadError",
            message: "file is not send"
        });
    }

    return new Promise((resolve, reject) => {
        Language.aggregate([
            { $match: {} },
            {
                $project: {
                    localization: {
                        $filter: {
                            input: "$localization",
                            as: "localization",
                            cond: {
                                $and: [{ $eq: ["$$localization.language", lng] }, { $eq: ["$$localization.deleted", false] }],
                            }
                        }
                    }
                }
            }
        ], (err, res) => {
            let icon = res[0].localization[0].icon;
            if (icon) {
                fs.unlink(PATH.join(__dirname, '..', '..', 'static', 'imgs', icon), function (err) { });
            }
            Language.update({ 'localization.language': lng }, {
                $set: { 'localization.$.icon': file.filename }
            }).then((result) => {
                resolve({
                    status: "ok"
                })
            }).catch((err) => {
                    status: "faild"
                })
        })
    })
}

function deletedKey(key) {
    const Language = this;
    return new Promise((resolve, reject) => {
        Language.findOneAndUpdate({},{
            $pull : {keysTranslation :{$in: key}}
        },(err,result)=>{
            if(err) {
                console.log('err')
            }else{
            for (const item of result.localization) {
                if(item['translates'] === undefined){
                    item['translates'] = {}
                }
                for (const proprty of key) {
                    delete item['translates'][proprty]
                }

                Language.update({'localization.language' : item.language},{
                    $set : {'localization.$.translates' : item.translates}
                }).then((result)=>{
                    resolve('ok')
                }).catch('not faund')
                
            }}
        })
    })
}


function deletedLng(lng){
    const Language = this;
    return Language.update({'localization.language': lng},
        {$set : {'localization.$.deleted' : true}}
    )    
}

module.exports = {
    createLanguage,
    getByLng,
    createKey,
    updateIcon,
    updateByLng,
    deletedKey,
    deletedLng
}