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
          <el-popover trigger="hover" placement="top">
            <p>未支付订单可以删除</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" type="danger">{{
                payStatus(scope.row.payStatus)
              }}</el-tag>
            </div>
          </el-popover>
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

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="OrderDetail(scope.$index, scope.row)"
            >查看</el-button
          >

          <el-button
            size="mini"
            type="danger"
            @click="handleShip(scope.$index, scope.row)"
            >发货</el-button
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
      console.log(result);
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].payStatus == 1 && result.data[i].whetherShip == 0) {
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
    findByName() {
      this.tableData = [];
      for (let i = 0; i < this.findByNametableData.length; i++) {
        if (this.search == this.findByNametableData[i].id) {
          this.tableData.push(this.findByNametableData[i]);
          // return this.tableData;
        } else if (this.search == "") {
          this.tableData = [];
          this.tableData = this.findByNametableData;
        }
      }
    },
    handleShip(index, row) {
      console.log(index, row);
      if (row.payStatus == 1 && row.whetherShip == 0) {
        //已支付且未发货才发货
        this.$axios
          .put("http://localhost:8181/shopcar/ship/" + row.id)
          .then((result) => {
            console.log(result);
            let ins = Toast("订单" + row.id + "发货成功");
            setTimeout(() => {
              ins.close;
              this.$router.go(0);
            }, 1000);
          });
      } else if (row.payStatus == 0) {
        let ins = Toast("订单" + row.id + "未支付，不能发货");
        setTimeout(() => {
          ins.close;
        }, 1000);
      } else {
        let ins = Toast("订单" + row.id + "已经发过货了，无需再发货");
        setTimeout(() => {
          ins.close;
        }, 1000);
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

    OrderDetail(index, row) {
      this.$router.push({
        path: "/shopcar/orderdetail",
        query: { id: row.id },
      });
    },
  },
};
</script>