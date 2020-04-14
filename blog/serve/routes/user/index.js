const express = require('express');

let router = express.Router();

router.post('/getVCode',require('./getVCodeSVG'));
router.post('/register',require('./register'));
router.post('/login',require('./login'));
router.post('/visitor',require('./visitor'));
router.post('/loginout',require('./loginout'));

module.exports = router;

