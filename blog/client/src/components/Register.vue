<template>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <h2 style="text-align: center;line-height: 40px;font-size: 20px;color: #67c23a;">注册</h2>
        <el-form-item label="有户名"  prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" v-model="ruleForm.repassword"></el-input>
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
          <el-button type="success" @click="submitForm('ruleForm')" style="margin-left: 30px;">立即创建</el-button>
          <el-button type="danger" @click="emit('')" style="margin-left: 30px;">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import requrest from '../api/index';
  const getSvg = requrest.getVCodeSVG;
  const ajaxegister = requrest.ajaxRegister;
  export default {
    name: 'Register',
    data(){
      return {
        vCode : '',
        ruleForm : {
          username : '',
          password : '',
          repassword : '',
          vCode : ''
        },
        rules : {
          username : [
            { required : true , message : '请输入用户名名称' , trigger : 'blur' },
            { min : 6, message: '最少6个字符', trigger: ['change','blur']}
          ],
          password : {
            validator: (rule,value,cb)=>{
              if (value === ''){
                cb(new Error('请输入密码'));
              }else {
                if (this.ruleForm.repassword !== ''){
                  this.$refs.ruleForm.validateField('checkPass');
                }
                cb();
              }
            },
            trigger: 'blur'
          },
          repassword : {
            validator : (rule,value,cb)=>{
              if(value === ''){
                cb(new Error('请确认密码'));
              }else if(value !== this.ruleForm.password){
                cb(new Error('俩此密码不一致'));
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
        this.$emit('ifRegisterDialogVisible',data);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ajaxegister(this.ruleForm)
            .then(res=>{
              if (res.data.code === 0) {
                layer.msg('注册成功');
                this.$refs[formName].resetFields();
                this.getVcodeSvg();
                this.emit(res.data.data);
              }else if(res.data.code === 2) {
                layer.msg('注册失败,验证码错误');
              }else if (res.data.code === 3){
                layer.msg('注册失败,有户名以存在');
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
