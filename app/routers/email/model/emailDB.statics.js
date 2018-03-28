const _ = require('lodash');

function getAll(){
    const Email = this;
    return Email.findOne({});
}

function updateEmail(email){
    const Email = this;
    console.log(email)
    let localization = email.localization;
    delete email.localization
    let objLocalization = {}; 
    if (email.language) {
        (email.address) ? email[`localization.$.address`] = email.address : false;  
        return Email.update({"localization.language": email.language },
            {
                $set:email
            })
    } else {
        return Email.findOneAndUpdate({}, email, { runValidators: true });
    }
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
    getByLanguage   
}