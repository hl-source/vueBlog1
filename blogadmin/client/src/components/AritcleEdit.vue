<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" >
            <el-form-item label="分类" prop="type">
                <el-select v-model="form.type" placeholder="请选择分类">
                    <el-option label="原创" value="原创"></el-option>
                    <el-option label="转载" value="转载"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="标签"  prop="tag">
                <el-select v-model="form.tag" placeholder="请选择标签">
                    <el-option label="HTML&Css" value="HTML&Css"></el-option>
                    <el-option label="JavaScript" value="JavaScript"></el-option>
                    <el-option label="Node" value="Node"></el-option>
                    <el-option label="Vue&React" value="Vue&React"></el-option>
                    <el-option label="Other" value="Other"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容"  prop="content">
                <RichText :value="form.content" ref="richText"></RichText>
            </el-form-item>
            <el-form-item label="封面">
                <Upload @uploadSuccess="uploadSuccess"></Upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="onSubmit('form')">发表文章</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Upload from "./Upload";
    import RichText from "./RichText";

    export default {
        name: "AritcleEdit",
        components:{Upload,RichText},
        data(){
            return {
                form : {
                    type : "",
                    title : "",
                    tag : "",
                    surface : "",
                    content : "",
                },
                rules : {
                    type : [{ required: true, message: '请选择type' }],
                    title : [{ required: true, message: '请输入title' }],
                    tag : [{ required: true, message: '请输入tag' }],
                    content : {
                        validator : (rule,value,cb)=>{
                            (function(){
                                if (this.layedit.getContent(this.index)) {
                                    cb();
                                }else{
                                    cb(new Error("请输入文章内容！"));
                                }
                            }).call(this.$refs.richText);
                        },
                        required : true
                    },
                },
            }
        },
        props : ["defaultData"],
        watch : {
            defaultData(){
                if(this.defaultData){
                    this.form = {
                        title : this.defaultData.title,
                        type : this.defaultData.type,
                        tag : this.defaultData.tag,
                        content : this.defaultData.content,
                        surface : this.defaultData.surface
                    }
                }
            }
        },
        methods:{
            uploadSuccess(url){
                this.form.surface = url;
            },
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                       this.$emit("handleSubmit",{
                           _id : this.defaultData._id,
                           type : this.form.type,
                           title : this.form.title,
                           tag : this.form.tag,
                           surface : this.form.surface,
                           content : (function(){
                               return this.layedit.getContent(this.index);
                           }).call(this.$refs.richText)
                       });

                    } else {
                        return false;
                    }
                });
            }
        },
        created() {
            if(this.defaultData){
                this.form = {
                    title : this.defaultData.title,
                    type : this.defaultData.type,
                    tag : this.defaultData.tag,
                    content : this.defaultData.content,
                    surface : this.defaultData.surface,
                }
            }
        }
    }
</script>

<style scoped>

</style>
