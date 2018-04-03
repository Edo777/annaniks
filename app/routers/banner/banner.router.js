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
} = require('./banner.controller');

const {
    checkId
} = require("./banner.middleware");

module.exports = router;
// router.use('/create/image/:id',checkId, upload.single('file'), isImage)

/**
 * This function comment is parsed by doctrine
 * @route Get /banner
 * @group Banner - Operations about user
 * @returns {object} 200 - An array of banner info
 * @returns {Error}  default - Unexpected error
 */
router.get('/',                          getall);
/**
* This function comment is parsed by doctrine
* @route Get /banner/@{lng}
* @group Banner - Operations about user
* @param {string} lng.path.required - language is banner
* @returns {object} 200 - An array of banner language isactive true info
* @returns {Error}  default - Unexpected error
*/
router.get('/:lng',                     getByLng);
/**
 * @typedef Banner
 * @property {string} language.required
 * @property {string} title.required
 * @property {string} description.required
 * @property {boolean} isActive
 */
 // Now I can use it as below:
 /**
  * Insert a banner
  * @route POST /banner/create
  * @group Banner - Operations about user
  * @param {Banner.model} Banner.body.required - the new point
  */
router.post('/create',                   create);
/**
 * This function comment is parsed by doctrine
 * @typedef BannerCreateImage
 * @property {file} file.required
 * @returns {object} 200 - An array of banner language isactive true info
  * @returns {Error}  default - Unexpected error
 */
 // Now I can use it as below:
/**
  * Insert a bannercreateimage
  * @route POST /banner/create/image/{id}
  * @group Banner - Operations about user
  * @param {objectId} id.path.required
  * @param {BannerCreateImage.model} BannerCreateImage.body.required - the new point
  */
router.post('/create/image/:id',         checkId,upload.single('file'), isImage,createImage);
/**
 * @typedef BannerUpdate
 * @property {string} language
 * @property {string} title
 * @property {string} description
 * @property {boolean} isActive
 */
 // Now I can use it as below:
 /**
  * Insert a banner
  * @route PUT /banner/update/{id}
  * @group Banner - Operations about user
  * @param {objectId} id.path.required
  * @param {BannerUpdate.model} BannerUpdate.body.required - the new point
  */
router.put('/update/:id',                checkId, update);
/**
 * @typedef BannerUpdateImage
 * @property {file} file.required
 */
 // Now I can use it as below:
/**
  * Insert a bannerupdateimage
  * @route PUT /banner/updateimg/{id}
  * @group Banner - Operations about user
  * @param {objectId} id.path.required
  * @param {BannerUpdateImage.model} BannerUpdateImage.body.required - the new point
  */
router.put('/updateimg/:id',             checkId,upload.single('file'), isImage,createImage);
/**
 * @typedef BannerUpdateImg
 * @property {string} file.required
 */
 // Now I can use it as below:
/**
  * Insert a bannercreateimage
  * @route DELETE /banner/delete/{id}
  * @group Banner - Operations about user
  * @param {objectId} id.path.required
  * @param {BannerUpdateImg.model} BannerUpdateImg.body.required - the new point
  */
router.delete('/delete/:id' ,            checkId,remove);

//router.use(checkUploadImg);
