const router = require('express').Router();


const  {
    getAll,
    create,
    update,
    remove
} = require('./tags.controller');

router.get('/find',getAll);
router.post('/create',create);
router.put('/update',update);
router.delete('/delete',remove);

module.exports = router;