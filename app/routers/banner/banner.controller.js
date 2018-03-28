const { Banner } = require("./model");
const _ = require("lodash");
const PATH = require('path');
const fs = require("fs");

module.exports = {
    getall,
    getByLng,
    create,
    createImage,
    update,
    remove
}

function getall(req, res) {
    Banner.findAll()
        .then(resutt => res.status(200).send(resutt))
        .catch(err => res.send(err));
}

function getByLng(req, res) {
    Banner.findByLanguage(req.params.lng)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function create(req, res) {
    var banner = req.body;
    Banner.create(banner)
        .then((result) => {
            res.send(_.pick(result, ['_id']));
        })
        .catch((error) => {
            res.send(_.pick(error, ['name', 'message']));
        })
}

function createImage(req, res) {
    Banner.createImageById(req.params.id, req.file)
        .then((result) => {
            res.send({
                name: "ok",
                message: "create succesful"
            })
        })
        .catch(err => res.send(err));
}

function update(req, res) {
    console.log(req.params.id)
    Banner.findOneAndUpdate({_id :req.params.id}, req.body, { runValidators: true })
        .then(result => res.send({
            result :result,
            name: "ok",
            message: "Update Successfully"
        }))
        .catch(err => res.send(err));
}

function remove(req, res) {
    Banner.findByIdAndRemove({ _id: req.params.id })
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
        .catch((err) => res.send(err));
}