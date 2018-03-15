const mongoose = require("mongoose");
const _ = require("lodash");
// const URL = "mongodb://localhost:27017/Annaniks_DB";
// mongoose.connect(URL);
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
                return ((lng == 'arm') || (lng == 'rus') || (lng == 'eng'))
            },
            message : "language must be arm eng or rus",
        },
        required : true
    },
    tags : [{
        type : Schema.ObjectId,
        required : false
    }],
    platform : [{
        type : Schema.ObjectId,
        required : false
    }],
    gallery : [{
        image : {
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


// Portfolio.create({
//     title : "sdkm",
//     description : "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
//     language : "arm",
//     isActive : true,
//     tags : ['5aaab95ff7051910f96e5659'],
//     platform : ['5aaab95ff7051910f96e5659'],
//     gallery : [{
//         image:"dfg",
//         isActive : true
//     }]
// })
module.exports = { Portfolio };