const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
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

ServiceSchema.pre("save", function(){
    this.image = ""
})

const {
    findByLanguage,
    findAll,
    createService,
    createImageById
} = require("./serviceDB.statics");

ServiceSchema.statics.findByLanguage = findByLanguage;
ServiceSchema.statics.findAll = findAll;
ServiceSchema.statics.createService = createService;
ServiceSchema.statics.createImageById = createImageById;

const Service = mongoose.model('service', ServiceSchema);

module.exports =  Service ;