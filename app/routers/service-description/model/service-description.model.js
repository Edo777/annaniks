const mongoose = require("mongoose");
const _ = require("lodash");
const Schema = mongoose.Schema;

const ServiceDescriptionSchema = new Schema({
    language : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        default : ""
    }
})

const {
    cretaeServDes,
    updateServDes,
    getByLng,
    deleteServDes,
    getAll
} = require("./service-descriptionDB.static")

ServiceDescriptionSchema.statics.getAll = getAll;
ServiceDescriptionSchema.statics.getByLng = getByLng;
ServiceDescriptionSchema.statics.cretaeServDes = cretaeServDes;
ServiceDescriptionSchema.statics.updateServDes = updateServDes;
ServiceDescriptionSchema.statics.deleteServDes = deleteServDes;

const ServiceDescription = mongoose.model('service-description',ServiceDescriptionSchema);

module.exports = {ServiceDescription};