import axios from 'axios';

//配置默认的参数
axios.defaults.baseURL = 'http://localhost:3000';//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式

export default {
  getArticleHot(limit= 8){
    return axios.post('/article/getHot',{limit});
  },
  getArticleInfo(){
    return axios.post('/article/getArticleInfo');
  },
  getArticleList : (function(){
    let skip = 0;
    let limit = 5;
    return function (index=0,iffresh=false){
      if (iffresh){
        skip = 0;
        limit = 5;
      }
      let tag = ["","HTML&Css","JavaScript","Node","Vue&React","Other"][index];
      let data = {skip,limit,tag};
      skip += limit;
      return axios.post('/article/getArticleList',data);
    }
  })(),
  getVCodeSVG(){
    return axios.post('/user/getVCode');
  },
  ajaxRegister(options){
    return axios.post('/user/register',options);
  },
  ajaxLogin(options){
    return axios.post('/user/login',options);
  },
  getArticle(id){
    return axios.post('/article',{id});
  },
  getArticleExtend(tag,skip,limit){
    let data = {tag,skip,limit};
    return axios.post('/article/extend',data);
  },
  getArticleSearch(keywords){
    return axios.post('/article/articleSearch',{keywords});
  },
  getVisitor(){
    return axios.post('./user/visitor');
  },
  handleLoginOut(){
    return axios.post('./user/loginout');
  }
};
