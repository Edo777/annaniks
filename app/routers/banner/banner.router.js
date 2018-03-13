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
    checkIdObjectMongod
} = require("./banner.middleware");
module.exports = router;

router.get('/',               getBanner);
router.post('/add',           addBanner);
router.get('/@:lng',          getBannerByLng);
router.delete('/@:id',        updateImg);
router.post('/upload', uploadBanner);
router.put('/update/:id',  checkIdObjectMongod,   updateBanner);
router.put('/updateimg/:id',  updateImg);
//router.use(checkUploadImg);
