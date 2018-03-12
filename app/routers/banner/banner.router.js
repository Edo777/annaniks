const router = require("express").Router();
const upload = require("../file.upload")
const { 
    getBanner,
    getBannerByLng,
    addBanner,
    uploadBanner,
    updateBanner,
    updateImg
} = require('./banner.controller');
const {
    checkUploadImg
} = require("./banner.middleware");
module.exports = router;


router.get('/',               getBanner);
router.post('/add',           addBanner);
router.get('/@:lng',          getBannerByLng);
router.delete('/@:id',        updateImg);
router.post('/upload',  upload.single('file'), uploadBanner);
router.put('/update/:id',     updateBanner);
router.put('/updateimg/:id',  updateImg);
//router.use(checkUploadImg);
