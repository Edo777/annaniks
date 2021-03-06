const { Service } = require("./model");
const _ = require("lodash");

module.exports = {
    getall,
    getByLng, 
    create,
    createImage,
    update,
    remove
}

function getall(req, res) {
    Service.findAll()
        .then(resutt => res.status(200).send(resutt))
        .catch(err => res.send(err));
}

function getByLng(req, res){
    Service.findByLanguage(req.params.lng)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function create(req, res){
    var service = req.body;
    Service.create(service)
        .then((result) => {
            res.send(_.pick(result, ['_id']));
        })
        .catch((error) => {
            res.send(_.pick(error, ['name', 'message']));
        })
}

function createImage(req, res){
    Service.createImageById(req.params.id, req.file)
        .then((result) => {
            res.send({
                name : "ok",
                message : "create succesful"
            })
        })
        .catch(err => res.send(err));
}

function update(req, res){
    Service.findOneAndUpdate(req.params.id, req.body,{runValidators: true})
        .then(result => res.send({
            name : "ok",
            message : "Update Succesfully"
        }))
        .catch(err => res.send(err));
}

function remove(req,res){
    Service.remove({_id:req.params.id})
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));   
}