const router = require('express').Router();
const {checkId} = require('./message.middlewale');
const {
    getByIndexAndCount,
    getMessage,
    getCount,
    editIsReade,
    deleted,
    createMessage
} = require('./message.controller');

router.get('/getbyindex/:index/:count',getByIndexAndCount);
router.get('/getmessage/:id',         checkId, getMessage);
router.get('/getcount',                          getCount);
router.post('/create',                      createMessage);
router.put('/edit/read/:id',         checkId, editIsReade);
router.delete('/deleted/:id',            checkId, deleted);

module.exports = router;