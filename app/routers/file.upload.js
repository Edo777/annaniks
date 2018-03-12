const PATH = require("path");

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null,__dirname + '/banner/imgs');
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
}) 
var upload = multer({ 
    storage: storage,
})
module.exports = upload;