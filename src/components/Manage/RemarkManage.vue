<template>
  <div>
   
    <el-table :data="tableData" style="width: 100%; margin-left: -20px" :border="border">
      <el-table-column label="序号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论内容" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>序号: {{ scope.row.id }}</p>
            <p>评论内容: {{ scope.row.book }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.book }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  created() {
    this.$axios.get("http://localhost:8181/book/findAll").then((result) => {
      console.log(result);
      this.tableData = result.data;
    });
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      border: true
    };
  },
  methods: {
    handleDelete(index, row) {
      this.$axios.delete("http://localhost:8181/book/deleteById/"+ index).then(result =>{
            let dlsucc = Toast("删除成功")
              setTimeout(()=>{
                  dlsucc.close;
                  this.$router.go(0);
              }, 1000)
      })
      console.log(index, row);
    },
  },
};
</script>

<style>
el-table{
  border: 1px solid ;
}
</style>