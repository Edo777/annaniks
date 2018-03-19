const mongoose = require('mongoose');
Schema = mongoose.Schema;

const PlatformSchema = new Schema({
    description : {
        type: String,
        required : true
    },
    title : {
        type : String,
        required : true
    }
})

const {
    createPlatform,
    updatePlatform,
    removePlatform,
    findAll
} = require('./platformDB.statics');

PlatformSchema.statics.createPlatform = createPlatform;
PlatformSchema.statics.updatePlatform = updatePlatform;
PlatformSchema.statics.removePlatform = removePlatform;
PlatformSchema.statics.findAll = findAll;

const PlatformModel = mongoose.model('platform',PlatformSchema);

module.exports = PlatformModel;