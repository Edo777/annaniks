const router = require("express").Router();

const {
    get,
    update,
    getByLanguage,
    cretaeLanguage
} = require("./email.controller");

router.get('/',                     get);
router.get('/@lng',       getByLanguage);
router.post('/langauge', cretaeLanguage);
router.put('/update',            update);

module.exports = router;