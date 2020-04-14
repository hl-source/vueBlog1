const mongoose = require("mongoose");


let user = mongoose.model("user",new mongoose.Schema({
    username : {type:String,required:true},
    password : {type:String,required: true},
    //注册时间
    regDate : {type:Number , default:new Date().getTime()},
    //头像
    photo : {type:String,default:"http://localhost:3000/img/defaultPhoto.jpeg"},
    //是否权限禁用
    disabled : {type:Boolean,default: false},
    //是否是管理员
    admin : {type:Boolean,default:false}
}));


module.exports = user;
