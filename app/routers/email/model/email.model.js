const mongoose = require("mongoose");
const _ = require("lodash");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    e_mail_contact: {
        type: String,
        trim: true,
        validate: {
            validator: function (email) {
                return email
            },
            message: ""
        }
    },
    e_mail_hr: {
        type: String,
        trim: true,
        validate: {
            validator: function (email) {
                return email
            },
            message: ""
        }
    },
    e_mail_info: {
        type: String,
        trim: true,
        validate: {
            validator: function (email) {
                return email
            },
            message: ""
        }
    },
    phone : {
        type : Number,
        required : true
    },
    localization : [{
            language : {
                type : String,
                required : true,
            },
            address : {
                type : String,
                required : true
            }
        }
    ]

})

const {
    getAll,
    updateEmail,
    getByLanguage
    
} = require("./emailDB.statics");

EmailSchema.statics.getAll = getAll;
EmailSchema.statics.updateEmail = updateEmail;
EmailSchema.statics.getByLanguage = getByLanguage;

const Email = mongoose.model('email', EmailSchema);

// Email.create({
//     e_mail_concat: "example@gmail.com",
//     e_mail_hr : "example@gmail.com",
//     e_mail_info : "example@gmail.com",
//     phone :098888888 ,
//     localization : [{
//         language : "armenian",
//         address : "Gyumri"
//     }]
// })

module.exports = { Email };