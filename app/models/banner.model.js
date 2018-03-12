const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
    title : {
        type : String,
        minlength : 1,
        trim : true,
        required:true
    },
    description : {
        type : String,
        minlength : 1,
        trim : true,
        required: true
    },
    isActive : {
        type : Boolean,
        default : false
    },
    language : {
        type : String,
        validate : {
            validator : function (lng) {
                return ((lng.toLowerCase() == 'armenian') || (lng.toLowerCase() == 'russian') || (lng.toLowerCase() == 'england'));
            },
            message : "Language must be Correct..."
        }
    },
    image : {
        type: String
    }
});

const Banner = mongoose.model('banner', BannerSchema);

module.exports = { Banner };