const router = require("express").Router();

const {
    get,
    update,
    getByLanguage
} = require("./email.controller");

router.get('/',                          get);
router.get('/:lng',            getByLanguage);
router.put('/update',                 update);

module.exports = router;