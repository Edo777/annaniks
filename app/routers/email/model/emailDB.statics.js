function getAll(){
    const Email = this;
    return Email.find({});
}

function updateEmail(email){
    const Email = this;
    return Email.update({},{$set:email},{runValidator:true}); 
}

module.exports = {
    getAll,
    updateEmail
}