<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>待支付列表</span>
      </div>
    </el-card>

    <div slot="header" class="clearfix" style="margin-top: 50px">
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
    </div>

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
      <el-table-column label="顾客姓名">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" style="margin-left: 10px">{{
              scope.row.buyerName
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="顾客电话">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.buyerPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="顾客地址">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.buyerAddress }} </span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <span style="margin-left: 10px"
            ><img :src="scope.row.phoneIcon" alt="" width="80px" height="80px"
          /></span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px"> {{ scope.row.phoneName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品数量">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phoneQuantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品规格">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.specsName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总价">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orderAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" style="margin-left: 10px" type="danger">{{
              payStatus(scope.row.payStatus)
            }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handlePay(scope.$index, scope.row)"
            >支付</el-button
          >
        </template>
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
    this.$axios.get("http://localhost:8181/order/findAll").then((result) => {
      console.log(result.data[0].payStatus);
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].payStatus == 0) {
          this.tableData.push(result.data[i]);
          this.findByNametableData.push(result.data[i]);
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
    findByName() {
      this.tableData = [];
      for (let i = 0; i < this.findByNametableData.length; i++) {
        if (this.search == this.findByNametableData[i].phoneName) {
          this.tableData.push(this.findByNametableData[i]);
          // return this.tableData;
        } else if (this.search == "") {
          this.tableData = [];
          this.tableData = this.findByNametableData;
        }
      }
    },
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
    handlePay(index, row) {
      console.log(index, row);
      this.$axios.put("http://localhost:8181/order/payforforget/" + row.orderId).then( result => {
        let ins = Toast("支付成功!!")
                  setTimeout( ()=>{
                      ins.close;
                      this.$router.go(0);
                  }, 1000)
      })
    },
  },
};
</script>