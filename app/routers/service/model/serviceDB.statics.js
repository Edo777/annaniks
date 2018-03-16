const fs = require("fs");

const findByLanguage = function (lng) {
    let Service = this;
    return Service.find({ language: lng, isActive: true });
};

const findAll = function (lng) {
    let Service = this;
    return Service.find();
};

const createImageById = function (serviceId, image) {
    console.log(image.filename)
    if (!image) {
        return Promise.reject({
            name: "uploadError",
            message: "file is not send"
        });
    }
    let path = image.filename;
    let Service = this;

    return Service.findById(serviceId)
        .then((result) => {
            if (!result) {
                return Promise.reject({
                    name: "searchError",
                    message: "Can not get it service"
                })
            }
            return Service.findOneAndUpdate({ _id: serviceId }, { $set: { image: path } })
                .then((result) => {
                    if (result.image) {
                        fs.unlinkSync(PATH.join(__dirname, '..', '..','static', 'imgs', result.image));
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
                message: "Can not get it service"
            })
        })
};

module.exports = {
    findByLanguage,
    findAll,
    createImageById
}