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
            },
            isActive : {
                type :Boolean
            },
            deletet : {
                type : Boolean,
                default : false,
            },
            translates  : {
                type : Object
            }
        }
    ],
    keysTranslation : [{
        type : String
    }]
})

const Language = mongoose.model('language',languageSchema);

module.exports = Language;