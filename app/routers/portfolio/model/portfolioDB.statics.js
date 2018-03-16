const fs = require("fs");

const findByLanguage = function (lng) {
    let Portfolio = this;
    return Portfolio.findOne({ language: lng, isActive: true });
};

const findAll = function () {
    let Portfolio = this;
    return Portfolio.find();
};

const createImageById = function (portfolioId, image) {
    //console.log(image)
    if (!image) {
        return Promise.reject({
            name: "uploadError",
            message: "file is not send"
        });
    }
    let path = image.filename;
    let Portfolio = this;

    return Portfolio.findById({_id:portfolioId})
        .then((result) => {
            if (!result) {
                return Promise.reject({
                    name: "searchError",
                    message: "Can not get it portfolio"
                })
            }
            return Portfolio.findOneAndUpdate({ _id: portfolioId }, { $set: { image: path } })
                .then((result) => {
                    if (result.image) {
                        fs.unlinkSync(result.image);
                    } else {
                        console.log("this is 1");
                    }
                })
                .catch((err) => {

                })
        })
        .catch((err) => {
            return Promise.reject({
                name: "searchError",
                message: "Can not get it portfolio"
            })
        })
};

module.exports = {
    findByLanguage,
    findAll,
    createImageById
}