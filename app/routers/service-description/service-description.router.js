const router = require("express").Router();

const {
    create,
    getByLng,
    update,
    remove,
    getAll
} = require("./service-description.controller");

router.get('/all',getAll)
router.get('/:lng',getByLng);
//router.post('/create',create);
router.put('/update/:id',update);
router.delete('/delete/:lng',remove);

module.exports = router;