const { Service } = require("./model");
const _ = require("lodash");
const fs = require('fs');
const PATH = require('path');

module.exports = {
    getall,
    getByLng,
    create,
    createImage,
    update,
    remove,
    findById
}

function findById(req,res){
    Service.findOne({_id:req.params.id})
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
}

function getall(req, res) {
    Service.findAll()
        .then(resutt => res.status(200).send(resutt))
        .catch(err => res.status(400).send(err));
}

function getByLng(req, res) {
    Service.findByLanguage(req.params.lng)
        .then(result => res.send(result))
        .catch(err => res.status(400).send(err));
}

function create(req, res) {
    var service = req.body;
    Service.create(service)
        .then((result) => {
            res.send(_.pick(result, ['_id']));
        })
        .catch((error) => {
            res.status(200).send(_.pick(error, ['name', 'message']));
        })
}

function createImage(req, res) {
    Service.createImageById(req.params.id, req.file)
        .then((result) => {
            res.send({
                name: "ok",
                message: "create succesful"
            })
        })
        .catch(err => res.status(400).send(err));
}

function update(req, res) {
    Service.findOneAndUpdate({_id :req.params.id}, req.body, { runValidators: true })
        .then(result => res.send({
            name: "ok",
            message: "Update Succesfully"
        }))
        .catch(err => res.status(400).send(err));
}

function remove(req, res) {
    Service.findByIdAndRemove({ _id: req.params.id })
        .then((result) => {
            if (result.image) {
                fs.unlinkSync(PATH.join(__dirname, '..', '..', 'routers', 'static', 'imgs', result.image));
            } else {
                console.log("this is 1");
            }
            res.status(200).send({
                name: "ok",
                mesage: "Deleted successfully"
            }
            )
        })
        .catch((err) => res.status(400).send(err));
}