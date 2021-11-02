<template>
  <div class="Manage">
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>货物管理</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="1-1">进货</el-menu-item>
              <el-menu-item index="1-2">下货</el-menu-item>
              <el-menu-item index="1-2">发货</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="12">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // navList: [
      //   { name: "/shopManage",},
      //   { name: "/orderManage"},
      //   { name: "/remarkManage"},
      // ],
    };
  },
  beforeCreate() {
    var el = document.getElementsByClassName("");
  },
};
</script>

<style>
/* .tac {  
  display: inline-block;
  height: 300px;
  width: 20%;
}
.el-row{
  display: inline-block;
  height: 300px;
  width: 20%;
}
ul {
  width: 300px;
}
.el-col {
  height: 800px;
  width: 20%;
}
.el-col-12 {
  width: 20%;
}
.el-table  {
  width: 70%;
}
.el-table--fit{
  width: 70%;
}
.el-table--enable-row-hover{
  width: 70%;
} */
</style>