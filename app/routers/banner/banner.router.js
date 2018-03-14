const router = require("express").Router();
const upload = require("../file.upload")

const { 
    getBanner,
    getBannerByLng,
    addBanner,
    uploadBanner,
    updateBanner,
    updateImg,
    deleteBanner
} = require('./banner.controller');

const {
    checkUploadImg,
    checkId
} = require("./banner.middleware");


router.get('/',               getBanner);
router.post('/add',           addBanner);
router.post('/upload',        uploadBanner);
router.get('/@:lng',          getBannerByLng);
router.put('/updateimg/:id',  checkId, updateImg);
router.put('/update/:id',     checkId, updateBanner);
router.delete('/@:id',        checkId, deleteBanner);
//router.use(checkUploadImg);

module.exports = router;