const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
    localization:[
        {
            language : {
                type:String,
                required : true
            },
            name : {
                type:String,
                default : ""
            },
            rol : {
                type : String,
                default : ""
            }
        }
    ],
    image : {
        type : String,
        required : true        
    },
    email : {
        type : String,
        required : true        
    },
    linkedin : {
        type : String,
        required : true        
    },
    isActive:{
        type : Boolean,
        required : true
    }
})

const {
    findByLanguage,
    findAll,
    createStaff,
    createImageById
} = require("./staffDB.static");

StaffSchema.statics.findByLanguage = findByLanguage;
StaffSchema.statics.findAll = findAll;
StaffSchema.statics.createStaff = createStaff;
StaffSchema.statics.createImageById = createImageById;

StaffSchema.pre('save',function(){
    this.image = ""
})

const Staff = mongoose.model('staff',StaffSchema);

module.exports = Staff
