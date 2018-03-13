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
    checkUploadImg,
    checkId
} = require("./banner.middleware");
module.exports = router;

router.get('/',               getBanner);
router.post('/add',           addBanner);
router.get('/@:lng',          getBannerByLng);
router.post('/upload',        uploadBanner);
router.delete('/@:id',        checkId, updateImg);
router.put('/update/:id',     checkId, updateBanner);
router.put('/updateimg/:id',  checkId, updateImg);
//router.use(checkUploadImg);
