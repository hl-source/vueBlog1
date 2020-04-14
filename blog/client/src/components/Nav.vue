<template>
  <div style="position: fixed;width: 100%;top: 0;left: 0;z-index: 999;background-color: white;overflow: hidden;border-bottom: 1px solid #e8e9e7;">
  <ul class="mainNav">
    <li class="logo">My.Yellow</li>
    <!--登入后的头像-->
    <li style="font-size: 30px;line-height: 60px;float: right;" v-if="iflogin">
      <el-tooltip placement="bottom" effect="light">
        <div slot="content">
          <el-button type="primary" @click="ifShowAvatar = true" plain size="mini">修改头像</el-button>
          <el-button size="mini" type="danger" @click="logout" plain>退出登入</el-button>
        </div>
        <div :style="{background : 'url('+user.photo+') center/cover no-repeat'}" class="avatar" ></div>
      </el-tooltip>
    </li>
    <!--修改头像弹出-->
    <el-dialog
      :visible.sync="ifShowAvatar"
      width="220px"
      :show-close="true"
      :modal="false"
      :close-on-click-modal="false">
      <UploadAvatar></UploadAvatar>
    </el-dialog>
    <!--/修改头像弹出-->
    <!--/登入后的头像-->
    <li style="font-size: 30px;line-height: 60px;float: right;" v-if="!iflogin">
      <!--登录弹出-->
      <el-button type="primary" @click="loginDialogVisible = true">登入</el-button>
      <el-dialog
        :visible.sync="loginDialogVisible"
        width="440px"
        :show-close="false"
        :modal="false"
        :close-on-click-modal="false">
        <Login  @ifLoginDialogVisible="alreadyLogged"></Login>
      </el-dialog>
      <!--/登录弹出-->
      <!--注册弹出-->
      <el-button type="success" @click="registerDialogVisible = true">注册</el-button>
      <el-dialog
        :visible.sync="registerDialogVisible"
        width="440px"
        :show-close="false"
        :modal="false"
        :close-on-click-modal="false">
        <Register  @ifRegisterDialogVisible="ifRegisterDialogVisible"></Register>
      </el-dialog>
      <!--/注册弹出-->
    </li>
    <li  style="width: 570px;float: right;margin-right: 100px;">
          <el-menu  mode="horizontal">
            <el-menu-item :class="['nav',{'navActive': whichNavActive===key}]"
                          v-for="(item,key) in routerList"
                          v-if=" item.name !== 'Article' && item.name !== '404' ">
              <router-link :to="{name: item.name,params:{id: '0'}}" >{{item.chName}}</router-link>
            </el-menu-item>
          </el-menu>
    </li>
  </ul>
  </div>
</template>

<script>
  import routerList from '../router/routerList';
  import Register from './Register';
  import Login from './Login';
  import request from '../api/index';
  import UploadAvatar from './UploadAvatar';
  const ajaxLogin = request.ajaxLogin;
  const handleLoginout = request.handleLoginOut;
  export default {
    name: 'Nav',
    data(){
      return {
        routerList,
        registerDialogVisible: false,
        loginDialogVisible : false,
        iflogin : false,
        ifShowAvatar : false,
        user : {
          username : '',
          photo : '',
        }
      }
    },
    components : {
      Register,Login,UploadAvatar,
    },
    computed : {
      whichNavActive(){
        if(this.$route.name === 'Article'){
          return 1;
        }
        return  routerList.map(item=> {
            return item.name;
          }
        ).indexOf(this.$route.name);
      }
    },
    methods : {
      alreadyLogged(data){
        this.loginDialogVisible = false;
        if (data){
          this.iflogin = true;
          let {username,photo} = data;
          this.user.username = username;
          this.user.photo = photo;
        }

      },
      ifRegisterDialogVisible(data){
        this.registerDialogVisible = false;
        if(data){
          this.alreadyLogged(data);
        }
      },
      logout(){
        this.iflogin = false;
        handleLoginout();
      }
    },
    created() {
      ajaxLogin().then(res=>{
        if(res.data.data){
          this.alreadyLogged(res.data.data);
        }
      }).catch(e=>{console.log(e);})
    }
  };

</script>

<style scoped lang="scss">
  $active-text-color : #6bc30d;
  .mainNav {
    width: 100%;
    box-sizing: border-box;
    max-width: 1380px;
    min-width: 1046px;
    margin: 0 auto;
    padding: 0 50px;
    .avatar {
      width: 50px;
      height: 50px;
      margin-top: 5px;
      border-radius: 25px;
    }
    .logo {
      float: left;
      line-height: 60px;
      font-size: 24px;
    }
    .nav {
      position: relative;
      height: 59px !important;
      padding: 0 30px;
      color: #212220 !important;
      font-weight: 400;
      font-size: 16px;
      text-shadow: 0 1px 0 rgba(255,255,255,.2);
      transition: all .2s;
      a {
        display: inline-block;
        width: 100%;
      }
      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        right: 0;
        width: 0;
        height: 3px;
        margin: 0 auto;
        background-color: $active-text-color;
        transition: width .5s;
      }
      &:hover {
        color: $active-text-color !important;
        &::after{
          width: 100%;
        }
      }
    }
    .navActive {
      color: $active-text-color !important ;
      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: $active-text-color;
      }
    }
  }

</style>
