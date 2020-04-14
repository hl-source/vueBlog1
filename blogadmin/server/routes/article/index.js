
const express = require("express");
const articleDB = require("../../db/article");
const articleInfoDB = require("../../db/articleInfo");
let router = express.Router();

router.post("/add",(req,res)=>{
  let {type,title,tag,content,surface} = req.body;

  //后端数据验证
  if (!type||!title||!tag||!content){
    res.send({
      code : 1,
      msg : "数据不完整",
    });
    return;
  }

  /*数据库存储*/
  articleDB.create(
    surface?{type,title,tag,content,surface}:{type,title,tag,content}
  ).then(d=>{
    res.send({
      code : 0,
      msg : "发表成功"
    })
  }).catch(()=>{
    res.send({
      code : 4,
      msg : "发表失败，请稍后再试"
    })
  })

});

router.get("/get",(req,res)=>{
  let {skip,limit} = req.query;
  articleDB.find({},{},{skip:skip*1,limit:limit*1})
      .then(data=>{
        res.send({
            code : 0,
            msg  : '查询成功',
            data
        });
      })
      .catch(_=>{
          res.send({
              code : 4,
              msg  : '服务器错误',
              data : []
          })
      })
});
router.get("/getArticleInfo",(req,res)=>{
  articleInfoDB.findOne()
      .then(data=>{
        res.send({
          code : 0,
          msg : '请求成功',
          data
        });
      })
      .catch(_=>{
          res.send({
            code : 4,
            msg  : '服务器错误',
            data: {tags : [],num : 0}
          })
      });
});

router.post("/delete",(req,res)=>{
  let {_id} = req.body;

  articleDB.deleteOne({_id})
      .then(n=>{
        res.send({
          code : 0,
          msg : "删除成功",
        });
      }).catch(_=>{
          res.send({
              code : 4,
              msg  : '服务器错误',
          })
      })

});

router.post("/update",(req,res)=>{
    let {_id,type,title,tag,content,surface} = req.body;
    //后端数据验证
    if (!type||!title||!tag||!content){
        res.send({
            code : 1,
            msg : "数据不完整",
        });
        return;
    }

    /*数据库存储*/
    articleDB.update({_id},
        surface?{type,title,tag,content,surface}:{type,title,tag,content}
    ).then(d=>{
        res.send({
            code : 0,
            msg : "更新成功"
        })
    }).catch(()=>{
        res.send({
            code : 4,
            msg : "更新失败，请稍后再试"
        })
    })
});

module.exports = router;
