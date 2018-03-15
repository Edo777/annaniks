const mongoose = require("mongoose");
const _ = require("lodash");
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
    platform : {
        type : Array,
        required : false
    },
    gallery : {
        type : Array,
        required : false
    },
    image : {
        type: String,
    }
});

PortfolioSchema.pre("save", function(){
    this.image = ""
})

const Portfolio = mongoose.model('portfolio', PortfolioSchema);

module.exports = { Portfolio };