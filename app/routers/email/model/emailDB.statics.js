const _ = require('lodash');

function getAll(){
    const Email = this;
    return Email.findOne({});
}

function updateEmail(email){
    const Email = this;
    return Email.update({},{
        $set : _.pick(email,['localization']) },{runValidators:true}); 
}

function cretaeLanguage(langauge){
    const Email = this;
    return Email.update({},{
        $push : {'localization' : _.pick(langauge.body,['language','address'])},
    })
}

function getByLanguage(lng){
    const Email = this;
    return Email.aggregate([
        {
            $project: {
            localization: {
                $filter: {
                    input: "$localization",
                    as: "localization",
                    cond: { $eq: [ "$$localization.language", lng ] }
                }
            },
            e_mail_concat : 1,
            e_mail_hr: 1,
            e_mail_info : 1
            }
        }
     ])
}
module.exports = {
    getAll,
    updateEmail,
    getByLanguage,
    cretaeLanguage
}