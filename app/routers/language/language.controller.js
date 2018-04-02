const { Language } = require('./model');

function getAll(req, res) {
    Language.findOne({})
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.sendStatus(500);
        })
}

function createLanguage(req, res) {
    Language.createLanguage(req.body)
        .then((result) => {
            res.sendStatus(200)
        }).catch((err) => {
            res.send(err);
        })
}

function getKeys(req, res) {
    Language.findOne({})
        .then((result) => {
            res.send(result.keysTranslation)
        })
        .catch((err) => {
            res.send(err);
        })
}

function getByLng(req, res) {
    Language.getByLng(req.params.lng)
        .then((result) => {
            if (result[0]['localization'].length) {
                res.send(result)
            } else {
                res.sendStatus(404)
            }
        })
        .catch((err) => {
            res.send(err);
        })
}

function createKey(req,res){
    Language.createKey(req.body.key)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.send(err);
        })
}

function updateIcon(req,res){
    Language.updateIcon(req.params.lng,req.file)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.send(err)
        })
}

function updateByLng(req,res){
    Language.updateByLng(req.body,req.params.lng)
        .then((result)=>{
            res.send((result))
        })
        .catch((err)=>{
            res.send(err);
        })
}

function deletedKey(req,res){
    Language.deletedKey(req.body.key)
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.send(err);
        })
}

function deletedLng(req,res){
    Language.deletedLng(req.params.lng)
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.send(err);
        })
}


module.exports = {
    getAll,
    createLanguage,
    getKeys,
    getByLng,
    createKey,
    updateIcon,
    updateByLng,
    deletedKey,
    deletedLng
}