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
        required : true
    },
    image : {
        type: String
    }
});

BannerSchema.pre("save", function(){
    this.image = ""
})

const {
    findByLanguage,
    findAll,
    createBanner,
    createImageById
} = require("./bannerDB.statics");

BannerSchema.statics.findByLanguage = findByLanguage;
BannerSchema.statics.findAll = findAll;
BannerSchema.statics.createBanner = createBanner;
BannerSchema.statics.createImageById = createImageById;

const Banner = mongoose.model('banner', BannerSchema);

module.exports =  Banner ;