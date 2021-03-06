const router = require("express").Router();
const {upload} = require("../../routers");
const {
    isImage
} = require('../../middleware');


const { 
    getall,
    getByLng,
    create,
    createImage,
    update,
    updateImg,
    remove
} = require('./service.controller');

const {
    checkId
} = require("./service.middleware");

module.exports = router;
// router.use('/create/image/:id',checkId, upload.single('file'), isImage)
router.get('/',                          getall);
router.post('/create',                   create);
router.get('/@:lng',                     getByLng);
router.delete('/delete/:id' ,            checkId,remove);
router.put('/update/:id',                checkId, update);
router.put('/updateimg/:id',             checkId,upload.single('file'), isImage,createImage);
router.post('/create/image/:id',         checkId,upload.single('file'), isImage,createImage);
//router.use(checkUploadImg);
