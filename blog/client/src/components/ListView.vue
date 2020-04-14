<template>
    <div style="width: 100%;">
      <div style="margin-bottom: 20px;background-color: white">
        <p class="title">热门文章</p>
        <ul style="padding: 0 18px" v-cloak>
          <li class="articList" v-for="item in articleList"><router-link :to="{name : 'Article',params : {_id : item._id}}">{{item.title}}</router-link></li>
        </ul>
      </div>
      <div style="background-color: white">
        <p class="title">置顶推荐</p>
        <ul style="padding: 0 18px">
          <li class="articList" v-if="hotRecommend"><router-link :to="{name : 'Article',params : {_id : hotRecommend._id}}">{{hotRecommend.title}}</router-link></li>
        </ul>
      </div>
    </div>
</template>

<script>
  import request from '../api/index';
  const getArticleHot = request.getArticleHot;

  export default {
    name: 'ListView',
    data(){
      return {
        articleList : [],
      }
    },
    computed : {
      hotRecommend(){
        return this.articleList[0] || {};
      },
    },
    created() {
      //请求热门文章
      getArticleHot().then(res=>{
        this.articleList = res.data.data;
      });

    }
  };

</script>

<style scoped lang="scss">

  $active-text-color : #6bc30d;
  .title {
    margin: 10px 20px;
    padding: 5px;
    line-height: 30px;
    font-weight: 400;
    border-bottom: 1px solid #e8e9e7;
    color: #383937;
    position: relative;
    font-size: 18px;
  }
  .articList {
    display: block;
    line-height: 32px;
    position: relative;
    margin: 3px 0;
    counter-increment: nums;
    padding-left: 30px;
    overflow: hidden;
    word-wrap: normal !important;
    white-space: nowrap;
    text-overflow: ellipsis;
    &::before {
      width: 22px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      content: counter(nums,decimal);
      position: absolute;
      left: 0;
      top: 5px;
      border-radius: 100%;
      background-color: #edefee;
      text-shadow: 0 1px 0 rgba(255,255,255,.5);
      color: #515250;
      font-family: SourceCodeProRegular,Menlo,Monaco,Consolas,"Courier New",monospace,'Helvetica Neue',Arial,sans-serif;
    }
    &:nth-child(1)::before {background-color: #e24d46;color: #fff;}
    &:nth-child(2)::before {background-color: #2ea7e0;color: #fff;}
    &:nth-child(3)::before {background-color: #6bc30d;color: #fff;}
    > a {
      color: #787977;
      &:hover {
        color: $active-text-color;
        text-decoration: underline;
      }
    }
  }
</style>
