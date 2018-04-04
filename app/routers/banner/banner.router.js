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
    remove,
    findById
} = require('./banner.controller');

const {
    checkId
} = require("./banner.middleware");

module.exports = router;

router.get('/',                          getall);
router.get('/getone/:id',      checkId,findById)
router.get('/:lng',                    getByLng);
router.post('/create',                   create);
router.post('/create/image/:id',         checkId,upload.single('file'), isImage,createImage);
router.put('/update/:id',                checkId, update);
router.put('/updateimg/:id',             checkId,upload.single('file'), isImage,createImage);
router.delete('/delete/:id' ,            checkId,remove);

//router.use(checkUploadImg);
