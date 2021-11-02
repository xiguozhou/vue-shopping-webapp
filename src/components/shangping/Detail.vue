<template>
  <div class="goods">
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <van-col span="16"
          ><van-icon name="location-o" style="margin-right: 30px" />收货人：{{
            data.buyerName
          }}</van-col
        >
        <van-col>{{ data.tel }}</van-col>
        <van-col span="21" style="padding-left: 43px; font-size: 13px"
          >收货地址：{{ data.address }}</van-col
        >
      </van-cell>
    </van-cell-group>

    <van-card
      :num="data.num"
      :price="data.price"
      :desc="data.specs"
      :title="data.phoneName"
      :thumb="data.icon"
    />

    <van-cell-group class="goods-cell-group">
      <van-cell>
        <van-col span="21">配送方式</van-col>
        <van-col>快递</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell>
        <van-col span="20">商品金额</van-col>
        <van-col style="color: red">￥{{ data.price * data.num }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <van-col span="20">运费</van-col>
        <van-col style="color: red">￥{{ data.freight }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-submit-bar
      :price="data.price * 100 * data.num + 1000"
      button-text="确认付款"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  //  beforeRouteEnter(to, from, next) {
  //   // console.log(from, "组件独享守卫beforeRouteEnter第二个参数");
  //   // console.log(from.path);
  //   console.log(to.path)
  //   next((vm11) => {
  //     if (from.path == "/home/address") {     //   \s是匹配空白字符
  //       vm11.from = from.path;
  //       console.log(vm11.from+ "来自购买地址栏");
  //       return;
  //     } else {
  //       vm11.from = from.path;
  //       console.log(vm11.from + "来自购物车的地址栏路由");
  //       return;
  //     }
  //     // 通过 `vm` 访问组件实例
  //   });
  // },

  data() {
    return {
      from: "",
      data: {},
    };
  },
  created() {
    
    // console.log(this.$route.query.orderId + "来自地址的orderid")
   
      const _this = this;
      this.$axios
        .get("http://localhost:8181/order/detail/" + this.$route.query.orderId)
        .then(function (resp) {
          _this.data = resp.data.data;

          console.log(_this.data);
        });
    
  },
  methods: {
    onSubmit: function () {
      const _this = this;
      this.$axios
        .put("http://localhost:8181/order/pay/" + this.$route.query.orderId)
        .then(function (resp) {
          if (resp.data.code == 0) {
            let instance = Toast("订单" + resp.data.data.orderId + "支付成功");
            setTimeout(() => {
              instance.close();
              _this.$router.push(
                "/home/success?orderId=" +
                  _this.data.orderId +
                  "&amount=" +
                  _this.data.amount +
                  "&price=" +
                  _this.data.price
              );
            }, 1000);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>