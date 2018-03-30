const router = require('express').Router();
const {upload} = require("../../routers");
const {
    isImage
} = require('../../middleware');


const {
    getAll,
    createLanguage,
    getKeys,
    getByLng,
    createKey,
    updateIcon,
    updateByLng
} = require('./language.controller');

const {
    checkLng
} = require("./language.middlewale");

router.get('/',                       getAll);
router.get('/lng/:lng',             getByLng);
router.get('/keys',                  getKeys);
router.post('/create',        createLanguage);
router.post('/create/key',         createKey);
router.put('/updateicone/:lng',checkLng,upload.single('file'),isImage,updateIcon);
router.put('/update/language/:lng', updateByLng);
router.delete('/delete/@lng');
router.delete('/delete/key');

module.exports = router;