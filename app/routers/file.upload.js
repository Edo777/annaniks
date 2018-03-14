const multer  = require('multer');
const path = require('path');
const { Banner } = require("../routers/banner/model/banner.model")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      Banner.findById(req.params.id)
        .then((result) => {
            console.log(req.params.id)
            if(!result){
                return cb(new Error())
            }
            cb(null, path.join(__dirname, 'banner', 'imgs'))
        })      
    },
    filename: function (req, file, cb) {
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