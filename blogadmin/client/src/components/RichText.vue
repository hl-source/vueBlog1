<template>
  <div>
    <textarea id="demo" ref="demo" :value="value" style="display: none;"></textarea>
  </div>
</template>

<script>

  export default {
    name: "RichText",
    data(){
      return {
        layedit : null,
        index : 0,
      }
    },
    props : ['value'],
    watch : {
      value(){
        this.$refs.demo.value = this.value;
        layui.use('layedit', ()=>{
          this.layedit = layui.layedit;
          this.index = this.layedit.build('demo',{
            // tool : ['face']
          }); //建立编辑器
        });
      }
    },
    mounted() {
      this.$refs.demo.value = this.value;
      layui.use('layedit', ()=>{
        this.layedit = layui.layedit;
        this.index = this.layedit.build('demo',{
          // tool : ['face']
        }); //建立编辑器
      });
    }
  }
</script>

<style scoped>
</style>
