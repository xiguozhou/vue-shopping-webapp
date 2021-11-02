<template>
  <div>
    <el-container>
      <el-aside>
        <el-col :span="18">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>货物管理</span>
              </template>

              <el-menu-item-group>
                <el-menu-item index="/goodsList">在售商品</el-menu-item>
                <el-menu-item index="/purchase">上架</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单管理</span>
              </template>

              <el-menu-item-group>
                <el-menu-item index="/unpaid">未支付订单</el-menu-item>
                <el-menu-item index="/paid">已支付订单</el-menu-item
                ><el-menu-item index="/ship">已发货订单</el-menu-item>
                <el-menu-item index="/return">退货订单</el-menu-item>
                <el-menu-item index="/ordercomplete">完结订单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>购物车订单管理</span>
              </template>

              <el-menu-item-group>
                <el-menu-item index="/shopcar/unpaid">未支付订单</el-menu-item>
                <el-menu-item index="/shopcar/paid">已支付订单</el-menu-item>
                <el-menu-item index="/shopcar/ship">已发货订单</el-menu-item>
                <el-menu-item index="/shopcar/return">退货订单</el-menu-item>
                <el-menu-item index="/shopcar/ordercomplete"
                  >完结订单</el-menu-item
                >
                <el-menu-item index="/shopcar/orderdetail"
                  >订单详情</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="/ordermanage">
              <i class="el-icon-menu"></i>
              <span slot="title">订单管理</span>
            </el-menu-item> -->
            <el-menu-item index="/remarkmanage">
              <i class="el-icon-document"></i>
              <span slot="title">评论沟通</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <transition>
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   alert(key);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    handleSelect(index, indexPath) {
      this.$router.push(index);
    },
  },
};
</script>