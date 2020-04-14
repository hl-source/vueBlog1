const mongoose = require("mongoose");
const articleInfoDB = require('./articleInfo');

let Schema = mongoose.Schema;
let articleSchema = new Schema({
  type : {type: String,required: true},
  title : {type: String,required: true},
  content : {type:String,required: true},
  tag : {type: String,required: true},
  updateDate : {type: Date,default: Date.now},
  date : {type: Date, default: Date.now},
  surface : {type:String,default: 'http://localhost:3000/img/defaultSurface.jpg'},
  pv : {type: Number,default: 0},
  comment : [{type:Schema.Types.ObjectID,ref:"comment"}]
});

articleSchema.pre("update",function(next){
  this.update = new Date;
  next();
});

articleSchema.pre("save",function(next){
  let This = this;
  //保存的时候，更新articleInfo表
  articleInfoDB.findOne({})
    .then(data=>{
      if (data){

        articleInfoDB
          .update({},{$inc:{num:1}})
          .then(d=>{}).catch(e=>{})
      }else{
        //如果还没有数据，就新建一条
        articleInfoDB.create({
          tags : This.tag,
          num : 1
        });
      }
    });
  next();
});

articleSchema.pre("deleteOne",function (next) {
  articleInfoDB.update({},{$inc:{num:-1}})
      .then();
  next();
});

let article = mongoose.model("article",articleSchema);


module.exports = article;
