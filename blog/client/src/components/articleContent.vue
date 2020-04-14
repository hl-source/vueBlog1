<template>
  <div>
    <ul style="width: 100%">
      <li v-for="item in dataList"  :class="['contentli',{fadeAni : ifFadeAni}]">
        <div class="card">
          <section class="title">
            <span class="type">【{{item.type}}】</span>
            <router-link :to="{name : 'Article',params : {_id : item._id}}"> {{item.title}}</router-link>
          </section>
          <span class="day" >{{item.date.day}}</span>
          <el-divider content-position="right"><i style="font-size: 16px;color: #989997;">{{item.date.month}} {{item.date.year}}</i></el-divider>
          <div class="content">
            <router-link :to="{name : 'Article',params : {_id : item._id}}" :style="{background : `url(${item.surface}) center/cover no-repeat`}"></router-link>
            {{item.content}}
          </div>
          <el-divider content-position="left" ><i style="font-size: 16px ;color: black;">继续阅读</i></el-divider>
          <span><i class="el-icon-collection-tag" style="font-size: 16px;line-height: 16px;"></i><span class="tag"> {{item.tag}} </span></span>
          <span style="float: right;"><i class="el-icon-view" style="font-size: 16px;line-height: 16px;"></i><span> {{item.pv}} </span></span>
        </div>
      </li>
    </ul>
    <div v-show="ifShowBottom" class="show-bottom">
      <p v-show="ifload"><i class="el-icon-loading"></i> 文章正在火速向你奔来... </p>
      <p v-show="!ifload">哼！ (ノ｀Д)ノ 人家也是有底线的...</p>
    </div>
    <el-backtop  :bottom="100" :right="100">
      <div class="backTop">^</div>
    </el-backtop>
  </div>
</template>

<script>
  import requset from '../api/index'
  const articleList = requset.getArticleList;
  export default {
    name: 'articleContent',
    data(){
      return {
        dataList : [],
        ifShowBottom : true,
        ifload : true,
        ifFadeAni : true
      }
    },
    computed : {
      tagsid(){
        return this.$route.params.id;
      }
    },
    watch : {
      tagsid(){
        this.ifFadeAni = !this.ifFadeAni;
        document.documentElement.scrollTop = 0;
        articleList(this.tagsid,true).then(res=>{
          this.dataList = res.data.data.map(item=>{
            item.date = this.formatTime(item.date);
            //动画刷新
            this.ifFadeAni = !this.ifFadeAni;
            return item;
          });
        });

      }
    },
    methods : {
      formatTime(date){
        date = new Date(Date.parse(date));
        let year = date.getFullYear();
        let month = date.getMonth() + 1 + '月';
        let day = date.getDate();
        date = {year,month,day};
        return date;
      },
      showBottom(){
        let top = document.documentElement.scrollTop;
        let height = document.documentElement.clientHeight;
        let bottom = document.documentElement.scrollHeight;
        if (top + height + 20 >= bottom){
          this.ifShowBottom = true;
          this.ifload = true;
          articleList(this.tagsid,false).then(res=>{
            if (res.data.data.length){
             this.dataList.push(...res.data.data.map(item=>{
               item.date = this.formatTime(item.date);
               return item;
             }));
            }else  {
              this.ifload = false;
            }
          });
        }
      },
    },
    mounted() {
      articleList(this.tagsid,true).then(res=>{
        this.dataList = res.data.data.map(item=>{
          item.date = this.formatTime(item.date);
          return item;
        });
      });
      addEventListener('scroll',this.showBottom);
    },
  };
</script>

<style scoped lang="scss">
  $active-text-color : #6bc30d;
  .contentli {
    position: relative;
    margin-bottom: 20px;
    padding: 20px;
    background-color: white;
    overflow: hidden;
    &.fadeAni {
      animation: fade .6s forwards ease-in-out;
      @keyframes fade {
        0% {
          transform: scale(0);
          opacity: .5;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    &:nth-child(1)::before{
      content: '置顶';
      position: absolute;
      top: 18px;
      left: -23px;
      width: 100px;
      text-align: center;
      background-color: #ff5722;
      color: white;
      transform: rotate(-45deg);

    }
    .card {
      position: relative;
      .title {
        display: block;
        height: 20px;
        padding:20px 0 5px;
        > span {
          float: left;
          font-size: 16px;
          font-weight: 400;
          display: inline-block;
          vertical-align: bottom;
          color: #2ea7e0;
          line-height: 30px;
          text-indent: 1em;
        }
        > a {
          float: left;
          color: #212220;
          text-decoration: none;
          border: none;
          font-weight: bold;
          line-height: 30px;
          cursor: pointer;
          &:hover {
            color: $active-text-color;
            text-decoration: underline $active-text-color;
            cursor: pointer;
          }
        }
      }
      .day {
        position: absolute;
        top: 2px;
        right: 35px;
        display: block;
        text-align: center;
        font-weight: 700;
        font-size: 40px;
        color: #6bc30d;

      }
      .content {
        width: 100%;
        height: 220px;
        margin-left: 20px;
        line-height: 28px;
        color: #515250;
        overflow: hidden;/*内容超出后隐藏*/
        text-overflow: ellipsis;/* 超出内容显示为省略号*/
        > a {
          float: left;
          margin-right: 15px;
          width: 260px;
          height: 180px;
          border: 1px solid rgba(0,0,0,.2);
        }

      }
      .tag {
        padding: 2px;
        font-size: 14px;
        background-color: #f1f2f0;
        &:hover {
          background-color: $active-text-color;
          color: white;
        }
      }
    }
  }
  .show-bottom {
    margin: 20px auto;
    width: 100%;
    height: 30px;
    background-color: white;
    text-align: center;
    line-height: 30px;
  }
  .backtop {
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }
</style>
