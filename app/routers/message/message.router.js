const router = require('express').Router();

const {
    getByIndexAndCount,
    getMessage,
    getCount,
    editIsReade,
    deleted,
    createMessage
} = require('./message.controller');

router.get('/getbyindex/:index/:count',getByIndexAndCount);
router.get('/getmessage/:id',getMessage);
router.get('/getcount',getCount);
router.post('/create',createMessage);
router.put('/edit/reade/:id',editIsReade);
router.delete('/deleted/:id',deleted);

module.exports = router;