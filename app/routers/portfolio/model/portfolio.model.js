const mongoose = require("mongoose");
const _ = require("lodash");
const {Tags} = require("../../tags/model");
const {Platform} = require("../../platform/model");
const arrayUniquePlugin = require('mongoose-unique-array');

const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    title : {
        type: String,
        required: true,
        minlength: 3
    },
    description : {
        type :String,
        required : true,
        minlength : 5
    },
    isActive : {
        type : Boolean,
        required : true
    },
    language : {
        type : String,
        required : true
    },
    tags : [{
        type : Schema.ObjectId,
        required : false,
        // unique: true,
        validate : {
            validator : function(id){
                return Tags.findById(id).then((result) => {
                    if(result){
                        return true
                    }
                    return false
                })
            },
            message : "id must be tags idi"
        }
    }],
    platforms : [{
        type : Schema.ObjectId,
        required : false,
        // unique: true,
        validate : {
            validator : function(id){
                return Platform.findById(id).then((result) => {
                    if(result){
                        return true
                    }
                    return false
                })
            },
            message : "id must be platform idi"
        }
    }],
    gallery : {
        type : Array
    },
    image : {
        type: String,
    }
});

const {
    findByLanguage,
    findAll,
    createImageById,
    removePlatform,
    removeTags,
    removeGallery,
    addGallery
} = require("./portfolioDB.statics");



PortfolioSchema.statics.findByLanguage = findByLanguage;
PortfolioSchema.statics.findAll = findAll;
PortfolioSchema.statics.createImageById = createImageById;
PortfolioSchema.statics.removeTags = removeTags;
PortfolioSchema.statics.removePlatform = removePlatform;
PortfolioSchema.statics.removeGallery = removeGallery;
PortfolioSchema.statics.addGallery = addGallery;

PortfolioSchema.pre('save', function () {
    this.image = "";
    this.gallery = [];
    this.tags = _.unique(this.tags);
    this.platforms  = _.unique(this.platforms);
  });

// PortfolioSchema.plugin(arrayUniquePlugin);
const Portfolio = mongoose.model('portfolio', PortfolioSchema);

module.exports =  Portfolio ;
