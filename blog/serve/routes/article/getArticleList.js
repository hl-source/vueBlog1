const articleList = require('../../db/article');

module.exports = (req,res)=>{
    let {skip,limit,tag} = req.body;
    let options = tag?{tag } : {};
  articleList.find(options,{_v:0},{sort : {pv : -1},skip,limit})
      .then(data=>{
          res.send({
              code : 0,
              data
          });
      })
      .catch(()=>{
          res.send({
              code : 4,
              msg : "服务器错误",
              data : null
          });
      })

};


