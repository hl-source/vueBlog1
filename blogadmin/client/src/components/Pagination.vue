<template>
    <el-pagination
            background
            layout="prev, pager, next"
            @current-change="currentChange"
            :total="total"
            :page-size="pageSize"
    >
    </el-pagination>
</template>

<script>
    export default {
        name: "Pagination",
        data(){
            return {

            }
        },
        props : ["pageSize","total"],
        methods : {
            currentChange(index){
                this.$emit("currentChange",index,this.pageSize);
            }
        }
    }
</script>

<style scoped>

</style>
