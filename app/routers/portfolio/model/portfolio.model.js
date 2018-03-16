const mongoose = require("mongoose");

const PoerfolioSchema = new mongoose.Schema({
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
    tags : [
        {
            type: mongoose.Schema.ObjectId,
            ref: Feature,
            required: true,
            validate: [notEmpty, 'Please add at least one feature in the features array'] 
        }
    ],
    platform : [

    ],
    gallery :[

    ],
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

PoerfolioSchema.pre("save", function(){
    this.image = ""
})

// const {
//     findByLanguage,
//     findAll,
//     createPortfolio,
//     createImageById
// } = require("./bannerDB.statics");

// PoerfolioSchema.statics.findByLanguage = findByLanguage;
// PoerfolioSchema.statics.findAll = findAll;
// PoerfolioSchema.statics.createPortfolio = createPortfolio;
// PoerfolioSchema.statics.createImageById = createImageById;

const Banner = mongoose.model('portfolio', PoerfolioSchema);

Banner.create({
    lasj :"dfg"
})
// module.exports =  Banner ;