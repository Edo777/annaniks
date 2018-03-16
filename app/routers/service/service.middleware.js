const ObjectId = require('mongodb').ObjectID;
const { Service } = require('./model/');

module.exports = {
    checkId
}

function checkId(req, res, next) {
    let id = req.body.id || req.params.id
    if(ObjectId.isValid(id)){
        Service.findById(id)
            .then((result)=>{
                if(result){
                    next();
                }else{
                    res.status(404).send({
                        name : "idError",
                        message : "id is not defined"
                    });  
                }
            })
    }else{
        res.status(404).send({
            name : "idError",
            message : "Is not valid id, it must be 24 characters"
        });
    }
}