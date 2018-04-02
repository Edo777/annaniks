const { Message } = require('./model');


function getByIndexAndCount(req, res) {
    Message.getByIndexAndCount(req.params.index,req.params.count)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
}

function getCount(req, res) {
    Message.getCount()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
}

function getMessage(req, res) {
    Message.getMessage(req.params.id)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
}

function editIsReade(req, res) {
    Message.editIsReade(req.params.id)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
}

function deleted(req, res) {
    Message.deleted(req.params.id)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
}

function createMessage(req, res) {
    Message.createMessage(req.body)
        .then((result) => {
            res.send(result._id);
        }).catch((err) => {
            res.send(err);
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