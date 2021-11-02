<template>
  <div class="goods">
    <van-cell-group>
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

    <van-cell-group>
      <van-cell>
        <van-col span="21">配送方式</van-col>
        <van-col>快递</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <van-col span="20">商品金额</van-col>
        <van-col style="color: red">￥{{ ordershopcar[0].totalPrice }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <van-col span="20">运费</van-col>
        <van-col style="color: red">￥10</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <van-col span="20">合计</van-col>
        <van-col style="color: red">￥{{ ordershopcar[0].totalPrice + 10 }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <van-cell>
        <van-col span="20">订单状态</van-col>
        <van-col style="color: red">{{
          payStatusTrans(data.payStatus)
        }}</van-col>
      </van-cell>
    </van-cell-group>
    <comment-box></comment-box>
  </div>
</template>

<script>
import comment from "../Leave A Message/Message.vue";
export default {
  created() {
    const _this = this;
    this.$axios
      .get(
        "http://localhost:8181/shopcar/getaddressandgoods/" +
          this.$route.query.orderId
      )
      .then(function (resp) {
        console.log(resp.data.data.ordershopcar);
        console.log(_this.$route.query.orderId + "orderid");
        for (let i = 0; i < resp.data.data.ordershopcar.length; i++) {
          if (resp.data.data.ordershopcar[i].id == _this.$route.query.orderId) {
            _this.ordershopcar.push(resp.data.data.ordershopcar[i]);
          }
        }
        console.log(_this.ordershopcar);
        for (let i = 0; i < resp.data.data.goodsShopcar.length; i++) {
          if (
            resp.data.data.goodsShopcar[i].orderId == _this.$route.query.orderId
          ) {
            _this.goodsShopcar.push(resp.data.data.goodsShopcar[i]);
          }
        }
      });
  },
  data() {
    return {
      data: {},
      ordershopcar: [],
      goodsShopcar: [],
    };
  },
  methods: {
    payStatusTrans(status) {
      if (status == 1) return "已支付";
      if (status == 0) return "未支付";
    },
  },
  components: {
    "comment-box": comment,
  },
};
</script>

<style lang="less">
</style>