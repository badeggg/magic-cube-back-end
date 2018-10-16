const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/history', require('./history'));

module.exports = router;