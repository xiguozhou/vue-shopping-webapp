<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>已支付列表</span>
      </div>
    </el-card>

    <div slot="header" class="clearfix" style="margin-top: 50px">
      <el-input
        v-model="search"
        size="mini"
        placeholder="输入订单Id搜索"
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
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="顾客姓名">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.buyerName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="顾客电话">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.buyerTel }}</span>
        </template>
      </el-table-column>

      <el-table-column label="顾客地址">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.buyerAddress }} </span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="商品图片">
        <template slot-scope="scope">
          <span style="margin-left: 10px"
            ><img :src="scope.row.phoneIcon" alt="" width="80px" height="80px"
          /></span>
        </template>
      </el-table-column> -->

      <el-table-column label="订单来源">
        <template>
          <span style="margin-left: 10px">购物车</span>
        </template>
      </el-table-column>
      <el-table-column label="订单数量">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单总价">
        <template slot-scope="scope">
          <span style="margin-left: 10px"
            >{{ scope.row.totalPrice + 10 }}(+运费)</span
          >
        </template>
      </el-table-column>

      <el-table-column label="支付状态">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="danger">{{
              payStatus(scope.row.payStatus)
            }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="是否发货">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{
              whetherShip(scope.row.whetherShip)
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="退货申请" width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{
              whetherReturn(scope.row.whetherReturn)
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="OrderDetail(scope.$index, scope.row)"
            >查看</el-button
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
    this.$axios.get("http://localhost:8181/shopcar/findAll").then((result) => {
      console.log(result.data[0].payStatus);
      for (let i = 0; i < result.data.length; i++) {
        if (
          result.data[i].payStatus == 1 &&
          result.data[i].whetherShip == 1 &&
          result.data[i].orderComplete == 1
        ) {
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
        if (this.search == this.findByNametableData[i].id) {
          this.tableData.unshift(this.findByNametableData[i]);
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
    whetherShip(ship) {
      if (ship == 0) {
        return "未发货";
      } else {
        return "已发货";
      }
    },
    whetherReturn(ship) {
      if (ship == 0) {
        return "暂不申请退货";
      } else if (ship == 1) {
        return "申请退货中";
      } else if (ship == 2) {
        return "已退货";
      } else if (ship == 3) {
        return "已确认收货";
      }
    },
    whetherComplete(ship) {
      if (ship == 0) {
        return "未完结";
      } else {
        return "已完结";
      }
    },
    handleOk(index, row) {
      console.log(index, row);
      if (
        row.whetherShip == 1 &&
        row.whetherReturn == 3 &&
        row.payStatus == 1
      ) {
        this.$axios
          .put("http://localhost:8181/order/ordercomplete/" + row.orderId)
          .then((result) => {
            let ins = Toast("订单完结!!");
            setTimeout(() => {
              ins.close;
              this.$router.go(0);
            }, 1000);
          });
      }
    },
    handleAgreeReturn(index, row) {
      if (row.whetherReturn == 1) {
        console.log(index, row);
        this.$axios
          .put("http://localhost:8181/order/agreereturn/" + row.orderId)
          .then((result) => {
            let ins = Toast("退货成功!!");
            setTimeout(() => {
              ins.close;
              this.$router.go(0);
            }, 1000);
          });
      } else {
        let ins = Toast("没有退货申请");
        setTimeout(() => {
          ins.close;
        }, 1000);
      }
    },
    OrderDetail(index, row) {
      this.$router.push({
        path: "/shopcar/orderdetail",
        query: { id: row.id },
      });
    },
  },
};
</script>