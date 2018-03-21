const { Portfolio } = require("./model");
const _ = require("lodash");
const unique = require('underscore');

module.exports = {
    getall,
    getByLng, 
    create,
    createImage,
    update,
    remove,
    removeTags,
    removePlatform,
    removeGallery,
    addGallery
}

function getall(req, res) {
    Portfolio.findAll()
        .then(resutt => res.status(200).send(resutt))
        .catch(err => res.send(err));
}

function getByLng(req, res){
    Portfolio.findByLanguage(req.params.lng)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function create(req, res){
    var portfolio = req.body;
    req.body.tags = unique.unique(req.body.tags);
    req.body.portfolio = unique.unique(req.body.portfolio);
    Portfolio.create(portfolio)
        .then((result) => {
            res.send(_.pick(result, ['_id']));
        })
        .catch((error) => {
            res.send(error);
        })
}

function createImage(req, res){
    Portfolio.createImageById(req.params.id, req.file)
        .then((result) => {
            res.send({
                name : "ok",
                message : "create succesful"
            })
        })
        .catch(err => res.send(err));
}

function update(req, res){
    Portfolio.findOneAndUpdate(req.params.id, req.body,{runValidators: true})
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function remove(req,res){
    Portfolio.remove({_id:req.params.id})
        .then((result)=>res.status(200).send(result))
        .catch((err)=>res.send(err));   
}

function removeTags(req,res){
    Portfolio.removeTags(req.params.id)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function removePlatform(req,res){
    console.log(req.params.id)
    Portfolio.removePlatform(req.params.id)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function addGallery(req,res){
    Portfolio.addGallery(req.params.id,req)
        .then((result)=>res.send(result))
        .catch((err)=>res.send(err));
}

function removeGallery(req,res){
    Portfolio.removeGallery(req.body.id,req.params.gallery)
        .then((result)=>res.send({
            status :'ok'
        }))
        .catch((err)=>res.send(err));
}