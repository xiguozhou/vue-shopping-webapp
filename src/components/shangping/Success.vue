<template>
  <div>
    <div class="img">
      <van-image
        width="150px"
        height="150px"
        class="imgs"
        src="../src/images/paysuccess.png"
      />
    </div>
    <div class="img">
      <h3>{{ price }}</h3>
    </div>
    <van-cell-group>
      <van-cell>
        <van-col span="21">配送方式</van-col>
        <van-col>快递</van-col>
      </van-cell>
    </van-cell-group>
    <van-button type="primary" size="large" @click="showInfo"
      >查看订单详情</van-button
    >
  </div>
</template>

<script>
export default {
  name: "Success",
  data() {
    return {
      img: "./paysuccess.png",
      orderId: null,
      amount: "",
      price: "",
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.amount = this.$route.query.amount;
    this.price = this.$route.query.price + 10;
    console.log(this.price);
  },
  methods: {
    showInfo() {
      this.$router.push("/home/info?orderId=" + this.orderId);
    },
  },
};
</script>

<style scoped>
.img {
  display: flex;
  justify-content: center;
}
</style>