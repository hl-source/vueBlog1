const express = require('express');
const article = require('../../db/article');

module.exports = (req,res)=>{
    let {tag,skip ,limit} = req.body;
    article.find({tag},{_id : 1, title : 1},{sort : {pv : -1},skip,limit})
        .then((data)=>{
           if (data) {
               res.send({
                   code : 0,
                   msg  : '延伸文章查询成功',
                   data,
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



