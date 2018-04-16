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
    removeTags,
    removePlatform,
    removeGallery,
    addGallery,
    getById
} = require('./portfolio.controller');

const {
    checkId,
    checkFileEmpty
} = require("./portfolio.middleware");

module.exports = router;

router.get('/',                          getall);
router.get('/getById/:id',      checkId,getById);
router.post('/create',                   create);
router.get('/:lng',                     getByLng);
router.put('/update/:id',                checkId, update);
router.put('/updateimg/:id',             checkId,upload.single('file'), isImage,createImage);
router.post('/create/image/:id',         checkId,upload.single('file'), isImage,createImage);
router.post('/creategallery/:id',        checkId,upload.array('file', 12),checkFileEmpty,isImage,addGallery);
router.delete('/delete/gallery/:gallery',checkId,removeGallery);
router.delete('/delete/platform/:id',    removePlatform);
router.delete('/delete/tags/:id',        removeTags);
router.delete('/delete/:id' ,            checkId,remove);