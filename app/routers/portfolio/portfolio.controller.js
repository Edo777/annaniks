const { Portfolio } = require("./model");
const _ = require("lodash");

module.exports = {
    getall,
    getByLng, 
    create,
    createImage,
    update,
    updateImg,
    remove
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
    Portfolio.create(portfolio)
        .then((result) => {
            res.send(_.pick(result, ['_id']));
        })
        .catch((error) => {
            res.send(_.pick(error, ['name', 'message']));
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
    Portfolio.findOneAndUpdate(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function updateImg(req,res){
    Portfolio.updateImg(req.body.id)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function remove(req,res){
    Portfolio.deleteOne(req.params.id)
        .then((result)=>res.status(200).send(result))
        .catch((err)=>res.send(err));   
}