const router = require('express').Router();


router.get('/');
router.get('/@lng');
router.post('/create');
router.post('/create/icone');
router.put('/updateicone/:id');
router.put('/update/:id');
router.delete('/delete/:id');
module.exports = router;