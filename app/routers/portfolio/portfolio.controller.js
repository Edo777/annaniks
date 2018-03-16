const { Portfolio } = require("./model");
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
    Portfolio.findOneAndUpdate(req.params.id, req.body,{runValidators: true})
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function remove(req,res){
    console.log('66666666')
    Portfolio.remove(req.params.id)
        .then((result)=>res.status(200).send(result))
        .catch((err)=>res.send(err));   
}