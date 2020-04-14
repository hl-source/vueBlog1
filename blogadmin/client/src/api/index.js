import axios from 'axios'
import sk from "element-ui/src/locale/lang/sk";

//配置默认的参数
axios.defaults.baseURL = 'http://localhost:3001';//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式

//发表文章
export function postArticle({type,title,content,tag,surface}){
  return axios.post("/article/add",{type,title,content,tag,surface});
}
//更新文章
export function postUpdateArticle({_id,type,title,content,tag,surface}){
  return axios.post("/article/update",{_id,type,title,content,tag,surface});
}

export function getArticle(skip=0,limit=5) {
  return axios.get("/article/get?skip="+skip+"&limit="+limit);
}

export function getArticleInfo() {
  return axios.get("/article/getArticleInfo");
}

export function deleteArctile(_id) {
  return axios.post("/article/delete",{_id});
}
