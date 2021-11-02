<template>
  <div class="goods">
    <van-cell-group class="goods-cell-group">
      <van-cell>
        <van-col span="16"
          ><van-icon name="location-o" style="margin-right: 30px" />收货人：{{
            ordershopcar[0].buyerName
          }}</van-col
        >
        <van-col>{{ data.tel }}</van-col>
        <van-col span="21" style="padding-left: 43px; font-size: 13px"
          >收货地址：{{ ordershopcar[0].buyerAddress }}</van-col
        >
      </van-cell>
    </van-cell-group>

    <van-card
      v-for="item in goodsShopcar"
      :key="item.id"
      :num="item.quantity"
      :price="item.price"
      
      :title="item.name"
      :thumb="item.icon"
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
        <van-col style="color: red">￥{{  ordershopcar[0].totalPrice }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <van-col span="20">运费</van-col>
        <van-col style="color: red">￥10</van-col>
      </van-cell>
    </van-cell-group>

    <van-submit-bar
      :price="ordershopcar[0].totalPrice *100 +1000"
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
      ordershopcar: [],
      goodsShopcar: [],
    };
  },
  created() {
    console.log(this.$route.query.orderId + "来自地址的orderid");

    console.log("来自购物车的地址");
    this.$axios
      .get(
        "http://localhost:8181/shopcar/getaddressandgoods/" +
          this.$route.query.orderId
      )
      .then((result) => {
        console.log(this.$route.query.orderId + "这是orderrid");
        for (let i = 0; i < result.data.data.ordershopcar.length; i++) {
          if (
            result.data.data.ordershopcar[i].id == this.$route.query.orderId
          ) {
            this.ordershopcar.push(result.data.data.ordershopcar[i]);
          }
        }
        console.log(this.ordershopcar);
        for (let i = 0; i < result.data.data.goodsShopcar.length; i++) {
          if (
            result.data.data.goodsShopcar[i].orderId ==
            this.$route.query.orderId
          ) {
            this.goodsShopcar.push(result.data.data.goodsShopcar[i]);
          }
        }
        console.log(this.goodsShopcar);
      });
  },
  methods: {
    onSubmit: function () {
      const _this = this;
      this.$axios
        .put("http://localhost:8181/shopcar/pay/" + this.$route.query.orderId)
        .then(function (resp) {
          if (resp.data.code == 0) {
            let instance = Toast("订单" + resp.data.data.orderId + "支付成功");
            setTimeout(() => {
              instance.close();
              _this.$router.push(
                "/shopcar/success?orderId=" +
                  _this.ordershopcar[0].id +
                  "&amount=" +
                  _this.ordershopcar[0].amount +
                  "&price=" +
                  _this.ordershopcar[0].totalPrice
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