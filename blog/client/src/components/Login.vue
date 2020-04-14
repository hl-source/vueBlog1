<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
      <h2 style="text-align: center;line-height: 40px;font-size: 20px;color: #67c23a;">登入</h2>
      <el-form-item label="有户名"  prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="vCode">
        <div style="display: flex;">
          <el-input v-model="ruleForm.vCode"  style="flex: 2;margin-top: 10px;" ></el-input>
          <div style="flex: 2;padding: 0 10px;"><p v-html="vCode"></p></div>
          <div style="flex: 1;font-size: 16px;line-height: 18px;" >
            <p @click="getVcodeSvg" style="cursor: pointer;"><i class="el-icon-refresh-left" style="padding: 0 10px;margin-top: 10px;"></i>刷新</p>
          </div>
        </div>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: 30px;">登入</el-button>
        <el-button type="danger" @click="emit('')" style="margin-left: 30px;">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import requrest from '../api/index';
  const getSvg = requrest.getVCodeSVG;
  const ajaxLogin = requrest.ajaxLogin;
  export default {
    name: 'Login',
    data(){
      return {
        vCode : '',
        ruleForm : {
          username : '',
          password : '',
          vCode : ''
        },
        rules : {
          username : [
            { required : true , message : '请输入用户名名称' , trigger : 'blur' },
          ],
          password : {
            validator: (rule,value,cb)=>{
              if (value === ''){
                cb(new Error('请输入密码'));
              }else {
                cb();
              }
            },
            trigger: 'blur'
          },
        },
      }
    },
    methods : {
      emit(data){
        this.$emit('ifLoginDialogVisible',data);
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            ajaxLogin(this.ruleForm).then(res=>{
              if (res.data.code === 0){
                layer.msg('登入成功');
                this.$refs[formName].resetFields();
                this.getVcodeSvg();
                this.emit(res.data.data);
              }else if(res.data.code === 2){
                layer.msg('登入失败,验证码错误');
              }else if(res.data.code === 3){
                layer.msg('登入失败,用户不存在');
              }else if(res.data.code === 5){
                layer.msg('登入失败,密码错误');
              }
            });
          } else {
            return false;
          }
        });
      },
      getVcodeSvg(){
        getSvg().then((res)=>{
          this.vCode = res.data.data;
        }).catch();
      },
    },
    created() {

      getSvg().then((res)=>{
        this.vCode = res.data.data;
      }).catch();
    }
  };
</script>

<style scoped>

</style>
