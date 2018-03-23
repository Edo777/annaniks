const fs = require("fs");
const PATH = require("path");

const findByLanguage = function (lng) {
    let Staff = this;
    return Staff.aggregate([
        {$match : {isActive : true}},
        {
            $project: {
            localization: {
                $filter: {
                    input: "$localization",
                    as: "localization",
                    cond: { $eq: [ "$$localization.language", lng ] }
                }
            },
            email : 1,
            image : 1,
            linkedin : 1,
            isActive : 1
            }
        }
     ])
}

const findAll = function (lng) {
    let Staff = this;
    return Staff.find();
};

const createImageById = function (staffId, image) {
    if (!image) {
        return Promise.reject({
            name: "uploadError",
            message: "file is not send"
        });
    }
    let path = image.filename;
    let Staff = this;

    return Staff.findById(staffId)
        .then((result) => {
            if (!result) {
                return Promise.reject({
                    name: "searchError",
                    message: "Can not get it staff"
                })
            }
            return Staff.findOneAndUpdate({ _id: staffId }, { $set: { image: path } })
                .then((result) => {
                    if (result.image) {
                        fs.unlinkSync(PATH.join(__dirname, '..', '..', 'static', 'imgs', result.image));
                    } else {
                        console.log("this is 1");
                    }
                })
                .catch((err) => {
                    console.log("file not")
                })
        })
        .catch((err) => {
            return Promise.reject({
                name: "searchError",
                message: "Can not get it staff"
            })
        })
};

module.exports = {
    findByLanguage,
    findAll,
    createImageById
}