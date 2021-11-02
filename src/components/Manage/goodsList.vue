<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
        <el-button
          size="mini"
          style="float: right"
          type="primary"
          @click="toAdd"
          >添加</el-button
        >
      </div>
    </el-card>

    
      <div slot="header" class="clearfix" style="margin-top: 50px">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入商品名称搜索"
          style="width: 200px"
        />

        <el-button
          style="float: right; margin-right: 20px"
          type="primary"
          size="mini"
          @click="findByName"
          >搜索</el-button
        >
      </div>
     

    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      style="width: 100%; margin-top: 10px"
      :border="border"
    >
      <el-table-column label="编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phoneId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.phoneName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phonePrice }}</span>
        </template>
      </el-table-column>

      <el-table-column label="商品描述">
        <template slot-scope="scope">
          <span style="margin-left: 10px"
            >{{ scope.row.phoneDescription }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="商品库存">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phoneStock }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            <img :src="scope.row.phoneIcon" alt="" width="80px" height="80px"
          /></span>
        </template>
      </el-table-column>
      <el-table-column label="商品标签">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phoneTag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >下架</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  created() {
    this.$axios.get("http://localhost:8181/phone/findAll").then((result) => {
      // console.log(result);
      this.tableData = result.data;
      // console.log(this.tableData instanceof Array)
      this.findByNametableData = result.data;
      // console.log(this.search == "")
      // console.log(this.tableData);
    });
  },
  data() {
    return {
      tableData: [],
      findByNametableData: [],
      findAll: [],    //实现删除搜索框中的文字展示所有数据
      currentPage: 1,
      pagesize: 2,
      border: true,
      search: "",
    };
  },
  methods: {
    toAdd() {
      this.$router.push("/purchase");
    },
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    handleDelete(index, row) {
      console.log(index, row);
      console.log(row.phoneId);
      this.$axios
        .delete("http://localhost:8181/phone/deleteById/" + row.phoneId)
        .then((result) => {
          const ins = Toast("删除成功");
          
          setTimeout(() => {
            ins.close;
            this.$router.go(0);
          }, 1000);
        });
    },
    findByName() {
      for(let i = 0; i<this.findByNametableData.length; i++){
        if(this.findByNametableData[i].phoneName == this.search){
          // console.log(this.tableData)
          this.tableData = [];
          // console.log(this.tableData)
          this.tableData.push(this.findByNametableData[i]);
          // console.log(this.tableData)
          // console.log(this.tableData instanceof Array);
          return this.tableData;
        }else if(this.search == ""){
          this.tableData = [];
          this.tableData = this.findByNametableData;
          //  console.log(this.tableData);
          //  console.log(this.search);
          return this.tableData;
         
        }        
      }
      console.log(this.findByNametableData);
      console.log(this.search);
    },
  },
};
</script>