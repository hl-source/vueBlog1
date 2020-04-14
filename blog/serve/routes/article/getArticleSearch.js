const article = require('../../db/article');

module.exports = (req,res)=>{
    let {keywords} = req.body;
    /*判断keyword存在*/
    if (!keywords) {
        res.send({
            code: 1,
            msg: "请传入关键词参数",
            data: []
        });
        return;
    }
    /*查找*/
    let reg = new RegExp(keywords,'i');
    article.find(
        {$or : [{title : reg},{ tag : reg}]},
        {_id : 1,title : 1},
        {sort : {pv : -1},skip: 0 ,limit : 5,}
    ).then(data=>{
        res.send({
            code : 0,
            msg  : '查询结束',
            data,
        });
    }).catch(_=>{
        res.send({
            code : 4,
            msg  : '服务器错误',
        })
    })




};



