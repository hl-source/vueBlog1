var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/article', require('./article/index'));
router.use('/user',require('./user/index'));
router.use('/upload',require('./upload/index'));

module.exports = router;
