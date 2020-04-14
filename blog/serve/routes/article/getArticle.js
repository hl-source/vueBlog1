const artcle = require('../../db/article');

module.exports = (req,res)=>{
    let {id} = req.body;
    artcle.findById(id)
        .then((data)=>{
           if (data){
               res.send({
                   code : 0,
                   msg  : '文章查询成功',
                   data
               });
           }else {
               res.send({
                   code : 4,
                   msg  : '服务器错误',
               });
           }

        })
        .catch(()=>{
            res.send({
                code : 4,
                msg  : '服务器错误',
            })
        })

};


