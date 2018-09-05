const { Language } = require('./model');

function getAll(req, res) {
    console.log('----------------------------')
    Language.aggregate([
        {
           $project: {
            localization: {
                 $filter: {
                    input: "$localization",
                    as: "localization",
                    cond: { $eq: [ "$$localization.deleted", false ] }
                 }
              }
           }
        }
     ])
        .then((result) => {
            Language.findOne({}).then((newResult)=>{
                console.log(result)
                newResult.localization = result[0].localization
                if(result[0].localization.length){
                    res.send(newResult);  
                }else{
                    res.sendStatus(404)
                }
            }).catch((childErr)=>{
                res.sendStatus(500);
            })
        }).catch((err) => {
            res.sendStatus(500);
        })
}

function createLanguage(req, res) {
    Language.createLanguage(req.body)
        .then((result) => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(400).send({
                message : 'duplicate key error'
            });
        })
}

function getKeys(req, res) {
    Language.findOne({})
        .then((result) => {
            res.status(200).send(result.keysTranslation)
        })
        .catch((err) => {
            res.status(400).send(err);
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
            res.status(400).send(err);
        })
}

function createKey(req,res){
    Language.createKey(req.body.key)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
}

function updateIcon(req,res){
    Language.updateIcon(req.params.lng,req.file)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
}

function updateByLng(req,res){
    Language.updateByLng(req.body,req.params.lng)
        .then((result)=>{
            res.send((result))
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
}

function deletedKey(req,res){
    Language.deletedKey(req.body.key)
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
}

function deletedLng(req,res){
    Language.deletedLng(req.params.lng)
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
}

function updateLanguageName(req,res){
    Language.updateLanguageName(req)
        .then((result)=>{
            res.status(200).send('ok')
        })
        .catch((err)=>{
            res.status(400).send({
                message : 'duplicate key error'
            });;
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
    deletedLng,
    updateLanguageName
}