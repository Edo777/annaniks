const ObjectId = require('mongodb').ObjectID;
module.exports = {
    checkUploadImg,
    checkIdObjectMongod,
}

function checkUploadImg(err, req, res, next) {

}

function checkIdObjectMongod(req, res, next) {
    try {
        ObjectId(req.params.id)
        next()
    } catch (err) {
        res.status(404).send('not found');
    }
}