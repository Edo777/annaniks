const {Email} = require("./model");


function get(req,res){
    Email.getAll()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.send(err);
        })
}

function update(req,res){
    Email.updateEmail(req.body)
        .then((result)=>res.send({
            message : "Update Successfully"
        }))
        .catch((err)=>res.send(err));
}

module.exports = {
    get,
    update
}