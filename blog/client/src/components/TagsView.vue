<template>
  <div style="width: 300px;background-color: white;">
    <div class="search">
      <div style="position: absolute; left: 0;right: 0;top: 0;bottom: 0;margin: auto;width: 260px;height: 44px;">
        <input type="text" v-model="searchValue" @input="handleInput" class="searchInput" placeholder="请输入关键字搜索">
        <i class="el-icon-search searchIcon"></i>
        <ul v-if="!!searchList.length">
          <li v-for="item in searchList"><router-link :to="'/Article/'+item._id">{{item.title}}</router-link></li>
        </ul>
      </div>
    </div>
    <div class="asideNav" @mouseleave="top0">
      <ul >
        <li v-for="(item,key) in listData" :class="['asideNavItem']" @mouseenter="topActive(key)">
          <router-link :to="'/blog/'+key">{{item}}</router-link>
        </li>
      </ul>
      <p class="activeNavCss" :style="{'top' : topValue * 40 + 'px'}"></p>
    </div>
  </div>
</template>

<script>
  import request from '../api/index';
  const getArticleInfo = request.getArticleInfo;
  const getArticleSearch = request.getArticleSearch;

  export default {
    name: 'TagsView',
    data(){
      return {
        listData : [],
        searchValue : '',
        searchList : [],
        topValue : this.$route.params.id * 1,

      }
    },
    methods : {
      top0(){
        this.topValue = this.$route.params.id * 1;
      },
      topActive(index){
        this.topValue = index;
      },
      handleInput(){
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(()=>{
          let keywords = this.searchValue.trim();//去除首位空格
          if (keywords) {
            getArticleSearch(keywords)
              .then(res=>{
                this.searchList = res.data.data;
              })
              .catch(()=>{
                this.searchList = [];
              });
          }else{
            this.searchList = [];
          }
        },1000);
      }
    },
    created() {
      getArticleInfo().then(res=>{
        this.listData = ['全部文章',...res.data.data.tags];
      });

    }
  };
</script>

<style scoped lang="scss">
  $active-text-color : #6bc30d;
  .search {
    position: relative;
    width: 100%;
    height: 80px;
    background-color: gray;

    .searchInput {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0;
      border: 0;
      border-radius: 20px;
      text-indent: 2em;
      z-index: 20;
    }

    .searchIcon {
      z-index: 22;
      color: gray;
      font-size: 20px;
      font-weight: 700;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      &:hover {
        color: $active-text-color;
      }
    }
    ul{
      z-index: 10;
      position: absolute;
      width: 260px;
      background-color: #fff;
      top: 28px;
      padding-top: 23px;
      border-radius:0 0 10px 10px;
      box-shadow: 0 0 2px #999;
      li{
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        line-height: 30px;
        padding: 5px;
        a{
          display: block;
          width: 100%;
          height: 100%;
          &:hover{
            background-color: #ddd;
          }
        }
      }
    }
  }

  .asideNav {
    margin-top: 20px;
    background-color: white;
    position: relative;
    z-index: 1;

    .asideNavItem {
      display: block;
      height: 40px;
      line-height: 39px;
      position: relative;
      z-index: 10;

      > a {
        display: block;
        margin: 0 30px;
        padding: 0 20px;
        height: 39px;
        border-bottom: 1px solid #f5f5f5;
        transition: none;
        text-decoration: none;
        color: #787977;
      }
    }

    .activeNavCss {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      background-color: #f8f9f7;
      border-right: 5px solid #484947;
      position: absolute;
      transition: top .3s;
    }
  }

</style>
