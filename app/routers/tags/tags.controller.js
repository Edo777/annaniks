const {Tags} = require('./model');

function getAll(req,res){
    Tags.findAll()
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function create(req,res){
    Tags.createTags(req.body)
        .then((result)=>res.send({
            _id: result._id
        }))
        .catch((err)=>res.send(err));
}

function update(req,res){
    Tags.updateTags(req.params.id,req.body)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function remove(req,res){
    Tags.removeTags(req.params.id)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

module.exports = {
    create,
    update,
    remove,
    getAll
}