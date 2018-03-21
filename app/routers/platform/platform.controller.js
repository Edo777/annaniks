const {Platform} = require('./model');


function getAll(req,res){
    Platform.findAll()
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function create(req,res){
    Platform.createPlatform(req.body)
        .then((result)=>res.send({
            _id: result._id
        }))
        .catch((err)=>res.send({
            name : err.name,
            message : err.message
        }));
}

function update(req,res){
    Platform.updatePlatform(req.params.id,req.body)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function remove(req,res){
    Platform.removePlatform(req.params.id)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

module.exports = {
    create,
    update,
    remove,
    getAll
}