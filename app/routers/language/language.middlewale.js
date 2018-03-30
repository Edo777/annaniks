const ObjectId = require('mongodb').ObjectID;
const { Language } = require('./model/');

module.exports = {
    checkLng
}

function checkLng(req, res, next) {
    let lng = req.body.lng || req.params.lng;
    Language.find({'localization.language' : lng})
        .then((result) => {
            if (result.length) {
                next();
            } else {
                res.status(404).send({
                    name: "languageError",
                    message: "language is not defined"
                });
            }
        })

}