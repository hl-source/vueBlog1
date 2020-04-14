<template>
  <div>
  <el-table
          :data="articleList"
          style="width: 100%">
    <el-table-column
            label="标题"
            width="180"
            prop="title"
    >

    </el-table-column>
    <el-table-column
            label="时间"
            width="180"
            prop="date"
    >

    </el-table-column>
    <el-table-column
            label="时间"
            width="180"
            prop="date"
    >

    </el-table-column>
    <el-table-column
            label="标签"
            width="180"
            prop="tag"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <Pagination :page-size="5" :total="total"  @currentChange="currentChange"></Pagination>
    <el-dialog  :visible.sync="aritcleEditVisible" width="50%" >
      <AritcleEdit @handleSubmit="handleSubmit" :default-data="defaultData"></AritcleEdit>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from "../../../components/Pagination";
  import {getArticleInfo,getArticle,deleteArctile,postUpdateArticle} from "../../../api";
  import AritcleEdit from "../../../components/AritcleEdit";
  export default {
    name: "ArticleManage",
    components : {Pagination,AritcleEdit},
    data(){
      return {
        articleList : [],
        total : 0,
        aritcleEditVisible : false,
        defaultData : null
      }
    },
    methods : {
      handleEdit(index,row){
        this.defaultData = row;
        this.aritcleEditVisible = true;
      },
      handleDelete(index,row){
        deleteArctile(row._id)
        .then((res)=>{
          if (res.data.code===0) {
            this.$message({
              message : '删除成功',
              type : 'success',
              duration : 2000
            });
            this.articleList.splice(index,1);
            this.total--;
          }
        })
        .catch(()=>{
          this.$message({
            message : '删除失败',
            type : 'success',
            duration : 2000
          });
        });
      },
      currentChange(index,size){
        this.changArticleList((index-1)*size,size);
      },
      changArticleList(skip=0,limit=5){
        getArticle(skip,limit)
                .then(res=>{
                  this.articleList = res.data.data;
                }).catch(e=>{
          console.log(e);});
      },
      handleSubmit(data){
        postUpdateArticle(data)
        .then((res)=>{
          if (res.data.code === 0) {
            this.aritcleEditVisible = false;
            this.$message({
              message : '更新成功',
              type : 'success',
              duration : 2000
            });
          }
        });
      },
    },
    created() {
      getArticleInfo()
      .then(res=>{
        this.total = res.data.data.num;
      });
      this.changArticleList();
    }
  }
</script>

<style scoped>

</style>
