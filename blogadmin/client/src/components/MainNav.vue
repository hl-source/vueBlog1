<template>
  <div class="MainNav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
          v-for="item in getRouters"
          :to="item.path">
        {{item.meta.cnName || item.name}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{$route.meta.cnName || $route.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "MainNav",
    computed : {
      getRouters(){
        let arr = [...this.$route.matched];
        arr.pop();
        return arr;
      }
    }
    ,watch:{
      $route(router){
      }
    }
  }
</script>

<style scoped lang="less">
  .MainNav{
    box-sizing: border-box;
    padding: 0 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #d8ecec;
    .el-breadcrumb{
      line-height: 50px;
    }
  }
</style>
