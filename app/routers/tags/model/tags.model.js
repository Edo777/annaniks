const mongoose = require('mongoose');
Schema = mongoose.Schema;

const TagsSchema = new Schema({
    description : {
        type: String,
        require : true
    },
    title : {
        type : String,
        require : true
    }
})

const TagsModel = mongoose.model('tags',TagsSchema);


module.exports = TagsModel;