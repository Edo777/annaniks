function getAll(){
    const Email = this;
    return Email.findOne({});
}

function updateEmail(email){
    const Email = this;
    return Email.update({},{$set:email},{runValidator:true}); 
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