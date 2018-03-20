const mongoose = require("mongoose");
const _ = require("lodash");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    e_mail_concat: {
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
    }
})

const {
    getAll,
    updateEmail
} = require("./emailDB.statics");

EmailSchema.statics.getAll = getAll;
EmailSchema.statics.updateEmail = updateEmail;

const Email = mongoose.model('email', EmailSchema);

// Email.create({
//     e_mail_concat: "example@gmail.com",
//     e_mail_hr : "example@gmail.com",
//     e_mail_info : "example@gmail.com"
// })

module.exports = { Email };