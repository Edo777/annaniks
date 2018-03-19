const fs = require("fs");
const _ = require("lodash");

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

const removePlatform = function(value){
    const Portfolio = this;
    return Portfolio.update({},{$pull: { 'tags': { $in: [value] }}},{multi : true})
}

const removeTags = function(value){
    const Portfolio = this;
    return Portfolio.update({},{$pull: { 'platform': { $in: [value] }}},{multi : true})
}

const addGallery = function(id,req){
    req.body.images = '';
    const gallery = req.body;
    const Portfolio = this;
    gallery['images'] = [];
    
    _.forIn(req.files,(val,key)=>{
        gallery.images.push(val.filename)
    })

    return Portfolio.update({_id:id},{$push:{'gallery':gallery}},{runValidators: true});
}

const removeGallery = function(idGallery){
    const Portfolio = this;
    // Portfolio.aggregate([
    //     { "$match": { "_id": { "$in": idGallery } } },
    //     {
    //         $graphLookup: {
    //             from: 'information',
    //             startWith: '$gallery',
    //             connectFromField: 'gallery',
    //             connectToField: '_id',
    //             as: 'finish'
    //         }
    //     },
    //     { $project: { 'gallery': 1 } }
    // ])
    //     .then((result) => {
    //         console.log(result);
    //     })
    //     .catch((err) => (
    //         console.log(err)
    //     ))
    return Portfolio.findOneAndUpdate({_id:'5aafa4a7e181b359e3fab714'},{$pull: { 'gallery':{_id: idGallery}}},{multi : true},(err,result)=>{
        console.log(result.gallery);
    }) 
}

module.exports = {
    findByLanguage,
    findAll,
    createImageById,
    removePlatform,
    removeTags,
    addGallery,
    removeGallery
}