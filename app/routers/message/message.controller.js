const { Message } = require('./model');
const _ = require('lodash');

function getByIndexAndCount(req, res) {
    Message.getByIndexAndCount(req.params.index,req.params.count)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.sendStatus(400)
        })
}

function getCount(req, res) {
    Message.getCount()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.sendStatus(400)
        })
}

function getMessage(req, res) {
    Message.getMessage(req.params.id)
        .then((result) => {
            res.send(result.message);
        }).catch((err) => {
            res.sendStatus(400)
        })
}

function editIsReade(req, res) {
    if(req.body.isRead){
        Message.editIsReade(req.params.id,req.body.isRead)
        .then((result) => {
            res.status(200).send('ok');
        }).catch((err) => {
            res.sendStatus(400)
        })
    }else{
        res.status(400).send({
            name:'validateError',
            message : 'isRead is required'
        })
    }
}

function deleted(req, res) {
    Message.deleted(req.params.id)
        .then((result) => {
            res.status(200).send('ok');
        }).catch((err) => {
            res.status(400).send(_.pick(err,['name','message']));
        })
}

function createMessage(req, res) {
    Message.createMessage(req.body)
        .then((result) => {
            res.send({
                id : result._id
            });
        }).catch((err) => {
            res.status(400).send(_.pick(err,['name','message']));
        })
}


module.exports = {
    getByIndexAndCount,
    getCount,
    getMessage,
    editIsReade,
    deleted,
    createMessage
}