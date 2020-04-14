const userDB = require('../../db/user');

module.exports = (req,res)=>{
    //已经登录就不需要往下走了
    if (req.session.login) {
        req.session.destroy();
        res.send({
            code : 0,
            msg : "退出登入成功",
        });
    }else {
        res.send({
            code : 4,
            msg  : '服务器错误',
        });
    }
};
