const userDB = require('../../db/user');
const visitorDB = require('../../db/visitor');
module.exports = (req,res)=>{
    //已经登录就不需要往下走了
    if (req.session.login) {
        res.send({
            code : 0,
            msg : "已经登录，请退出之后再登录",
            data : req.session.login,
        });
        return;
    }

    let {username,password,vCode} = req.body;
    if (!username || !password || !vCode){
        res.send({
            code : 1,
            msg : "数据无效，请检查后再注册。"
        });
        return ;
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
                if(userRes.password !== password){
                    res.send({
                        code : 5,
                        msg : '密码错误',
                    })
                }else {
                    req.session.login = userRes;
                    res.send({
                        code : 0,
                        msg : '登入成功',
                        data : userRes
                    });
                    /*添加到最近访客列表*/
                    visitorDB.deleteMany({user:userRes._id})
                        .then(()=>{
                            visitorDB.create({
                                user : userRes._id
                            },()=>{});
                        })
                        .catch(()=>{})
                }
            }else {
                res.send({
                    code : 3,
                    msg : '有户名不存在',
                })
            }
        })
        .catch(()=>{
            res.send({
                msg: '服务器错误',
                code: 4,
            })
        });

};


