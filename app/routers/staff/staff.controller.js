const { Staff } = require("./model");
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
    Staff.findAll()
        .then(resutt => res.status(200).send(resutt))
        .catch(err => res.send(err));
}

function getByLng(req, res) {
    Staff.findByLanguage(req.params.lng)
        .then(result => res.send(result))
        .catch(err => res.send(err));
}

function create(req, res) {
    let staff = req.body;
    Staff.create(staff)
        .then((result) => {
            res.send(_.pick(result, ['_id']));
        })
        .catch((error) => {
            res.send(_.pick(error, ['name', 'message']));
        })
}

function createImage(req, res) {
    Staff.createImageById(req.params.id, req.file)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch(err => res.send(err));
}

function update(req, res) {
    let localization = req.body.localization;
    delete req.body.localization
    let objLocalization = {};
    (req.body.name) ? req.body[`localization.$.name`] = req.body.name : false;
    (req.body.rol) ? req.body[`localization.$.rol`] = req.body.rol : false;    
    if (req.body.language) {
        Staff.update({ _id: req.params.id, "localization.language": req.body.language },
            {
                $set:req.body
            }).then((result) => {
                res.send(result)
            }).catch((err) => {
                res.send(err);
            })
    } else {
        Staff.findOneAndUpdate(req.params.id, req.body, { runValidators: true })
            .then(result => res.send({
                name: "ok",
                message: "Update Successfully"
            }))
            .catch(err => res.send(err));
    }
}

function remove(req, res) {
    Staff.findByIdAndRemove({ _id: req.params.id })
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