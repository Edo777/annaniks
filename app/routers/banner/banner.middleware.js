const ObjectId = require('mongodb').ObjectID;
module.exports = {
    checkUploadImg,
    checkId,
}

function checkUploadImg(err, req, res, next) {

}

function checkId(req, res, next) {
    /*try {
        ObjectId(req.params.id)
        next()
    } catch (err) {
        res.status(404).send('not found');
    }*/
    if(ObjectId.isValid(req.params.id)){
        next()
    }else{
        res.status(404).send('not found');
    }
}