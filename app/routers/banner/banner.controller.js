const { Banner } = require("./model");
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
    Banner.findAll()
        .then(resutt => res.status(200).send(resutt))
        .catch(err => res.send(err));
}

function getByLng(req, res){
    Banner.findByLanguage(req.params.lng)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function create(req, res){
    var banner = req.body;
    Banner.create(banner)
        .then((result) => {
            res.send(_.pick(result, ['_id']));
        })
        .catch((error) => {
            res.send(_.pick(error, ['name', 'message']));
        })
}

function createImage(req, res){
    Banner.createImageById(req.params.id, req.file)
        .then((result) => {
            res.send({
                name : "ok",
                message : "create succesful"
            })
        })
        .catch(err => res.send(err));
}

function update(req, res){
    Banner.findOneAndUpdate(req.params.id, req.body,{runValidators: true})
        .then(result => res.send({
            name : "ok",
            message : "Update Successfully"
        }))
        .catch(err => res.send(err));
}

function remove(req,res){
    Banner.remove({_id:req.params.id})
        .then((result)=>res.status(200).send({
            name : "ok",
            mesage : "Deleted successfully"
        }))
        .catch((err)=>res.send(err));   
}