const multer  = require('multer');
const path = require('path');
const { Banner } = require("../routers/banner/model/banner.model")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/static/imgs")
    },
    filename: function (req, file, cb) {
        // console.log(file)
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
   
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'))
        }
        cb(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
});

module.exports = {
    upload
}