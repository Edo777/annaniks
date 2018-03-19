const mongoose = require('mongoose');
Schema = mongoose.Schema;

const TagsSchema = new Schema({
    description : {
        type: String,
        required : true
    },
    title : {
        type : String,
        required : true
    }
});

const {
    createTags,
    updateTags,
    removeTags,
    findAll
} = require('./tagsDB.statics');

TagsSchema.statics.createTags = createTags;
TagsSchema.statics.updateTags = updateTags;
TagsSchema.statics.removeTags = removeTags;
TagsSchema.statics.findAll = findAll;

const Tags = mongoose.model('tags',TagsSchema);


module.exports = Tags;