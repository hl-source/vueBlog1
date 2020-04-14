const article = require('../../db/article');

module.exports = (req,res)=>{
    let {limit} = req.body;
    article.find({},{__v:0},{sort:{pv:-1},skip:0,limit})
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
