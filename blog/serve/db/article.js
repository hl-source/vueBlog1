const mongoose = require('mongoose');

let Schema = mongoose.Schema;

/*
//链接数据库
mongoose.connect("mongodb://localhost:27017/blog",{useNewUrlParser: true,useUnifiedTopology: true})
    .then( ()=>{console.log("数据库链接成功");})
    .catch( ()=>{console.log("数据库链接失败");});
*/

let articleSchema = new Schema({
    type : {type: String,required : true},
    title : {type: String,required : true},
    content : {type: String,required : true},
    tag : {type: String,required : true},
    date : {type: Date,default : Date.now},
    surface : {type: String,default : 'https://www.yanshisan.cn/image/cover/201963164541362.jpg'},
    pv : {type: Number,default : 0},
    updateDate : {type : Date, default : Date.now}
    // comment : {type: String,required : true},
});

articleSchema.pre('update',function(next){
    this.updateDate = new Date;
    next();
});

let article = mongoose.model("article",articleSchema);

/*/!*假数据*!/
for (let i=0;i<100;i++){
  article.create({
      pv : parseInt(Math.random()*1000 + ''),
    type : ["原创","转载"][(Math.random()*2)|0],
    title : `第${i+1}篇文章`,
    content : (""+i+i+i+i+i+"哈哈哈哈哈我是文章的内容").repeat(10),
    tag : ["HTML&Css","JavaScript","Node","Vue&React","Other"][(Math.random()*5)|0]
  });
}*/



/*
//修改图片数据
article.updateMany({surface : 'https://www.yanshisan.cn/image/cover/201963164541362.jpg'},{$set : {surface : 'https://www.yanshisan.cn/Blog/Read/19'}},(err,res)=>{
    if(err) console.log(err);
    else {
        console.log(res);
        console.log('update!');
    }
});
*/

module.exports = article;
