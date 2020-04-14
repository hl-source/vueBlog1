<template>
  <div style="width: 100%;">
    <div style="background-color: white;height: 260px;">
      <p class="title">最近访客</p>
      <div class="photos">
        <ul style="padding: 0 18px">
          <li class="photoItem"  v-for="item in visitor"
              :style="{background:`url(${item.user.photo}) center/cover no-repeat`}"
              :data-user="item.user.username"
              v-cloak
          >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import request from '../api/index';
  const getVisitor = request.getVisitor;
  export default {
    name: 'PhotoWall',
    data(){
      return {
        visitor : [],
      }
    },
    created() {
      getVisitor().then(res=>{
        this.visitor = res.data.data;
      });
    }
  };
</script>

<style scoped lang="scss">
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
  .photos {
    background-color: #16418a;
    .photoItem {
      float: left;
      width: 60px;
      height: 60px;
      margin: 3px;
      box-shadow: 5px 5px 5px #212220;
      position: relative;
      &::after {
        content: attr(data-user);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        text-align: center;
        background-color: rgba(0,0,0,.2);
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
