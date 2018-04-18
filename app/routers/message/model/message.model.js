const mongoose = require('mongoose');
const URL = "mongodb://annaniks:annaniks@ds121189.mlab.com:21189/annaniks"; 
//const URL = "mongodb://localhost:27017/annaniks";
mongoose.connect(URL);

const messageShcema = new mongoose.Schema({
    sender  :{
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    data : {
        type : Date,
        default : Date.now
    },
    senderName : {
        type : String,
        required : true
    },
    isRead : {
        type : Boolean,
        default : false
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
})
messageShcema.pre('save',function(){
    this.isDeleted = false,
    this.isRead = false,
    this.data = Date.now
})

const {
    getByIndexAndCount,
    getCount,
    getMessage,
    editIsReade,
    deleted,
    createMessage
} = require('./message.statics');

messageShcema.statics.getByIndexAndCount = getByIndexAndCount;
messageShcema.statics.getCount = getCount;
messageShcema.statics.getMessage = getMessage;
messageShcema.statics.editIsReade = editIsReade;
messageShcema.statics.deleted = deleted;
messageShcema.statics.createMessage = createMessage;

const Message = mongoose.model('message',messageShcema);


module.exports = Message;

// Message.create({
//     sender : "example@mail.ru",
//     subject : "subject",
//     message : "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
//     senderName : "annaniks"
// })