<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>待支付列表</span>
      </div>
    </el-card>

    <!-- <div slot="header" class="clearfix" style="margin-top: 50px">
      <el-input
        v-model="search"
        size="mini"
        placeholder="输入订单名称搜索"
        style="width: 200px"
      />

      <el-button
        style="float: right; margin-right: 20px"
        type="primary"
        size="mini"
        @click="findByName"
        >搜索</el-button
      >
    </div> -->

    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      style="width: 100%; margin-top: 10px"
      :border="border"
    >
      <el-table-column label="订单编号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
    
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <span 
            ><img :src="scope.row.icon" alt="" width="70" height="80"
          /></span>
        </template>
      </el-table-column>
      <el-table-column label="订单来源">
        <template >
          <span style="margin-left: 10px">购物车</span>
        </template>
      </el-table-column>
      <el-table-column label="商品数量">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品单价">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
     

    

      <el-table-column label="操作" width="150">
        
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4, 8, 12, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  created() {
    this.$axios.get("http://localhost:8181/shopcar/findOrderDetail").then((result) => {
      console.log(result);
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].orderId == this.$route.query.id) {
          this.tableData.unshift(result.data[i]);
          this.findByNametableData.unshift(result.data[i]);
        }
      }
      console.log(this.tableData);
    });
  },
  data() {
    return {
      tableData: [],
      findByNametableData: [],
      findAll: [], //实现删除搜索框中的文字展示所有数据
      currentPage: 1,
      pagesize: 4,
      border: true,
      search: "",
    };
  },
  methods: {
    // findByName() {
    //   this.tableData = [];
    //   for (let i = 0; i < this.findByNametableData.length; i++) {
    //     if (this.search == this.findByNametableData[i].phoneName) {
    //       this.tableData.push(this.findByNametableData[i]);
    //       // return this.tableData;
    //     } else if (this.search == "") {
    //       this.tableData = [];
    //       this.tableData = this.findByNametableData;
    //     }
    //   }
    // },
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    payStatus(status) {
      if (status == 0) {
        return "未支付";
      } else {
        return "已支付";
      }
    },
    deleteOrder(index, row) {
      console.log(index, row);
      this.$axios
        .delete("http://localhost:8181/order/deleteById/" + row.orderId)
        .then((result) => {
          let ins = Toast("删除成功!!");
          setTimeout(() => {
            ins.close;
            this.$router.go(0);
          }, 1000);
        });
    },
  },
};
</script>