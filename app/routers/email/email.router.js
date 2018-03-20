const router = require("express").Router();

const {
    get,
    update
} = require("./email.controller");

router.get('/',            get);
router.put('/update',update);

module.exports = router;