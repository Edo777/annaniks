const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    localization:[
        {
            language : {
                type:String,
                required : true
            },
            icon : {
                type:String,
                default : ""
            },
            isActive : {
                type :Boolean,
                default : false
            },
            deleted : {
                type : Boolean,
                default : false,
            },
            translates  : {
                type : Object
            }
        }
    ],
    keysTranslation : [{
        type : String,
        unique: true
    }]
})

const {
    createLanguage,
    getByLng,
    createKey,
    updateIcon,
    updateByLng
} = require("./languageDB.statics");

languageSchema.statics.createLanguage = createLanguage;
languageSchema.statics.getByLng = getByLng;
languageSchema.statics.createKey = createKey;
languageSchema.statics.updateIcon = updateIcon;
languageSchema.statics.updateByLng = updateByLng;

const Language = mongoose.model('language',languageSchema);

module.exports = Language;