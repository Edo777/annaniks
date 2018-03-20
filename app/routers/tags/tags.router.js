const router = require('express').Router();

const {checkId} =require("./tags.middlewale");
const  {
    getAll,
    create,
    update,
    remove
} = require('./tags.controller');

router.get('/find',getAll);
router.post('/create',create);
router.put('/update/:id',checkId,update);
router.delete('/delete/:id',checkId,remove);

module.exports = router;