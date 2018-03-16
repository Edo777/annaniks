const mongoose = require('mongoose');
Schema = mongoose.Schema;

const PlatformSchema = new Schema({
    description : {
        type: String,
        require : true
    },
    title : {
        type : String,
        require : true
    }
})

const PlatformModel = mongoose.model('platform',PlatformSchema);

module.exports = PlatformModel;