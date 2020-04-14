const articleInfo = require('../../db/articleInfo');

module.exports = (req,res)=>{
    articleInfo.findOne({},{_v:0})
        .then((data)=>{
            res.send({
                code : 0,
                data,
            })
        }).catch(()=>{
        res.send({
            code : 4,
            msg : "服务器错误",
            data : null
        });
    });

};
