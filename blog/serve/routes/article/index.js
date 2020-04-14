const express = require('express');

let router = express.Router();

router.post("/",require('./getArticle'));
/*获取热门文章 8 篇*/
router.post("/getHot",require('./getHot'));
router.post("/getArticleInfo",require('./getArticleInfo'));
router.post("/getArticleList",require('./getArticleList'));
router.post("/extend",require('./getArticleExtend'));
router.post("/articleSearch",require('./getArticleSearch'));
//导出
module.exports = router;
