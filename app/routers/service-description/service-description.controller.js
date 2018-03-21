const {ServiceDescription} = require("./model");

function getAll(req,res){
    ServiceDescription.getAll()
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function getByLng(req,res){
    ServiceDescription.getByLng(req.params.lng)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function create(req,res){
    ServiceDescription.cretaeServDes(req.body)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function update(req,res){
    ServiceDescription.updateServDes(req.params.id,req.body)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function remove(req,res){
    ServiceDescription.deleteServDes(req.params.lng)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

module.exports = {
    getByLng,
    create,
    update,
    remove,
    getAll
}
