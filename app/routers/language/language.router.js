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
    updateByLng,
    deletedKey,
    deletedLng,
    updateLanguageName
} = require('./language.controller');

const {
    checkLng
} = require("./language.middlewale");

router.get('/',                                  getAll);
router.get('/lng/:lng',               checkLng,getByLng);
router.get('/keys',                             getKeys);
router.post('/create',                   createLanguage);
router.post('/create/key',                    createKey);
router.put('/updateicone/:lng',checkLng,upload.single('file'),isImage,updateIcon);
router.put('/update/language/:lng',checkLng,updateByLng);
router.put('/updateLanguageName/:lng',checkLng,updateLanguageName);
router.delete('/deletelng/:lng',    checkLng,deletedLng);
router.delete('/delete/key/:key',                 deletedKey);

module.exports = router;