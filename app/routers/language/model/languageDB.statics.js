const { Email } = require('../../email/model');
const { ServiceDescription } = require('../../service-description/model');
const { Staff } = require('../../staff/model');
const fs = require('fs');
const PATH = require('path');
const _ = require('lodash');

function createLanguage(lng) {
    const Language = this;
    return new Promise((resolve, reject) => {
        Language.update({}, {
            $push: { 'localization': lng }
        }, { runValidators: true }).catch((err) => {
            reject({
                "lng": err
            });
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
        Language.findOne().then((res) => {
            let keysObject = {};
            res['keysTranslation'].push(key)
            for (let i = 0; i < res['keysTranslation'].length; i++) {
                keysObject[`${res['keysTranslation'][i]}`] = ""
            }
            for (let i = 0; i < res['localization'].length; ++i) {
                Language.update({ _id: res._id, 'localization.language': res['localization'][i].language }, {
                    $set: { 'localization.$.translates': keysObject },
                    $addToSet: { 'keysTranslation': key }
                }).then((err) => {
                    resolve('ok')
                }).catch((err) => {
                    reject(err)
                })
            }
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
            if (res[0].localization[0].icon) {
                fs.unlink(PATH.join(__dirname, '..', '..', 'static', 'imgs', res[0].localization[0].icon), function (err) { });
            }
            Language.update({ 'localization.language': lng }, {
                $set: { 'localization.$.icon': file.filename }
            }).then((result) => {
                resolve({
                    status: "ok"
                })
            })
                .catch((err) => {
                    status: "faild"
                })
        })
    })
}

function updateByLng(object, lng) {
    const Language = this;
    return new Promise((resolve, reject) => {
        resolve('ok');

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
            if (res[0].localization.length) {
                // if(object.translates){

                // }
                _.mapKeys(object.translates, function(value, key) {
                    if(res[0].localization.translates,_.has(value)){
                        console.log(value);
                    }else{
                        delete object.translates.value;
                    }
                });

                Language.update({'localization.language': lng }, {
                    $set : {'localization.$.translates' : object.translates}
                }).then((result)=>{
                    console.log(result)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
        // console.log(object)
    })
}
module.exports = {
    createLanguage,
    getByLng,
    createKey,
    updateIcon,
    updateByLng
}