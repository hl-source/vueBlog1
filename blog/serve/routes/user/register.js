const express = require('express');
const userDB = require('../../db/user');
const visitorDB = require('../../db/visitor');
module.exports = (req,res)=>{
    let {username,password,vCode} = req.body;
    if (!username || !password || !vCode){
        res.send({
            code : 1,
            msg : "数据无效，请检查后再注册。"
        });
        return;
    }
    //后端再次验证验证码
    if (vCode.toLocaleLowerCase() !== req.session.registerVCode.toLocaleLowerCase()) {
        res.send({
            code : 2,
            msg : "验证码错误"
        });
        return;
    }
    userDB.findOne({username})
        .then(userRes=>{
            if(userRes){
                res.send({
                    code : 3,
                    msg : '用户名已存在',
                })
            }else {
                userDB.create({username,password})
                    .then(data=>{
                        userDB.findOne({username}).then(data=>{
                            req.session.login = data;
                            res.send({
                                code : 0,
                                msg : '注册成功',
                                data,
                            });
                            visitorDB.create({
                                user : data._id
                            },()=>{});
                        });
                    })
                    .catch(data=>{
                        res.send({
                            code : 4,
                            msg : '服务器错误',
                        })
                    });
            }
        })
        .catch(()=>{
            res.send({
                    msg: '服务器错误',
                    code: 4,
                })
            });

};



