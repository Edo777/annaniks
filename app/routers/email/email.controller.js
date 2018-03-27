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

function cretaeLanguage(req,res){
    if(req.body.language && req.body.address){
        Email.cretaeLanguage(req)
        .then((result)=>{
            res.sendStatus(200);
        })
        .catch((err)=>{
            res.send(err)
        })
    }else{
        res.send({
            message : "validation error"
        })
    }
}

function update(req,res){
    Email.updateEmail(req.body)
        .then((result)=>res.send({
            message : "Update Successfully"
        }))
        .catch((err)=>res.send(err));
}

function getByLanguage(req,res){
    Email.getByLanguage(req.params.lng)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.send(err);
        })
}

module.exports = {
    get,
    update,
    getByLanguage,
    cretaeLanguage
}