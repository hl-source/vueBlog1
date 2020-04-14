<template>
  <el-upload
    class="avatar-uploader"
    action="http://localhost:3000/upload/avatar"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :with-credentials="true">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  export default {
    name: 'UploadAvatar',
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        layer.msg('上传头像成功');
        setTimeout(()=>{
          window.location.reload();
        },1700)
      },
      beforeAvatarUpload(file) {
        const isType = /^(image\/jpeg|image\/png|image\/gif)$/.test(file.type);
        const isLt50K = file.size / 1024 < 50;

        if (!isType) {
          layer.msg('上传头像图片只能是 JPG/PNG/GIF 格式!');
        }
        if (!isLt50K) {
          layer.msg('上传头像图片大小不能超过 50K !');
        }
        return isType && isLt50K;
      },

      beforeClose(){
        this.$emit("handleClose");
      }
    }
  };
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    position: relative;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    &::before {
      content: "\e6d9";
      line-height: 178px;
    }
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
