var express = require('express');
var router = express.Router();


/*上传接口*/
router.use("/upload",require('./upload/index'));

/*文章接口*/
router.use("/article",require('./article/index'));



module.exports = router;
