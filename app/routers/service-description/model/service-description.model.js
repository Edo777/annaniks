const mongoose = require("mongoose");
const _ = require("lodash");
const Schema = mongoose.Schema;

const ServiceDescriptionSchema = new Schema({
    language : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : function (lng) {
                return ((lng.toLowerCase() == 'armenian') || (lng.toLowerCase() == 'russian') || (lng.toLowerCase() == 'england'));
            },
            message : "Language must be Correct..."
        }
    },
    description : {
        type : String,
        required : true,
        minlength : 15
    }
})

const ServiceDescription = mongoose.model('service-description',ServiceDescriptionSchema);

module.exports = {ServiceDescription};