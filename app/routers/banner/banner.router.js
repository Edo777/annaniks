const router = require("express").Router();
const {upload} = require("../../routers/file.upload");
const {
    isImage
} = require('../../middleware/middleware');
const { 
    getall,
    getByLng,
    create,
    createImage,
    update,
    updateImg
} = require('./banner.controller');

const {
    checkId
} = require("./banner.middleware");

module.exports = router;
router.use('/create/image/:id', upload.single('file'), isImage)
router.get('/',                          getall);
router.post('/create',                   create);
router.get('/@:lng',                     getByLng);
router.post('/create/image/:id',         checkId, createImage);
router.delete('/:id',                    checkId, updateImg);
router.put('/update/:id',                checkId, update);
router.put('/updateimg/:id',             checkId, updateImg);
//router.use(checkUploadImg);
