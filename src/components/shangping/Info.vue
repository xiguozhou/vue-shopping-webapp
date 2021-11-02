<template>
  <div class="goods">
    <van-cell-group>
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

    <van-cell-group>
      <van-cell>
        <van-col span="21">配送方式</van-col>
        <van-col>快递</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
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

    <van-cell-group>
      <van-cell>
        <van-col span="20">合计</van-col>
        <van-col style="color: red">￥{{ data.price * data.num + 10 }}</van-col>
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
      .get("http://localhost:8181/order/detail/" + this.$route.query.orderId)
      .then(function (resp) {
        _this.data = resp.data.data;
      });
  },
  data() {
    return {
      data: {},
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