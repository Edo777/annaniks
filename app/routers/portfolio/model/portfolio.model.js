const mongoose = require("mongoose");
const _ = require("lodash");
const TagsModel = require("../../tags/model/tags.model")
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
        minlength : 20
    },
    isActive : {
        type : Boolean,
        required : true
    },
    language : {
        type : String,
        validate : {
            validator : function (lng) {
                return ((lng.toLowerCase() == 'armenian') || (lng.toLowerCase() == 'russian') || (lng.toLowerCase() == 'england'));
            },
            message : "Language must be Correct..."
        },
        required : true
    },
    tags : [{
        type : Schema.ObjectId,
        required : false,
        validate : {
            validator : function(id){
                return TagsModel.findById(id).then((result) => {
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
        validate : {
            validator : function(){

            },
            message : "id must be platform idi"
        }
    }],
    gallery : [{
        images : {
            type :Array,
            require:true
        },
        isActive : {
            type : Boolean,
            require:true
        }
    }],
    image : {
        type: String,
    }
});

PortfolioSchema.pre("save", function(){
    this.image = ""
    this.gallery = []
})

const {
    findByLanguage,
    findAll,
    createImageById
} = require("./portfolioDB.statics");


PortfolioSchema.statics.findByLanguage = findByLanguage;
PortfolioSchema.statics.findAll = findAll;
PortfolioSchema.statics.createImageById = createImageById;
const Portfolio = mongoose.model('portfolio', PortfolioSchema);

module.exports =  Portfolio ;
