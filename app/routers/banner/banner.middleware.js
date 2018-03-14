const ObjectId = require('mongodb').ObjectID;

module.exports = {
    checkId,
}

function checkId(req, res, next) {
    let id = req.body.id || req.params.id
    if(ObjectId.isValid(id)){
        next()
    }else{
        res.status(404).send({
            name : "idError",
            message : "Is not valid id, it must be 24 characters"
        });
    }
}
