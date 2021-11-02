<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
     
    />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
 
  data() {
    return {
      chosenAddressId: "1",
      ifFromShopCar: false,
      list: [],
      from: "",
      orderId: { orderId: 8 },
      goodslist: [],
      
    };
  },
  created() {
    console.log(window.location.href)
    this.$store.state.windowaddressrouter = window.location.href   //完整的url地址
    const _this = this;
    this.$axios.get("http://localhost:8181/address/list").then(function (resp) {
      _this.list = resp.data.data;
      // console.log(resp)
    });
  },
  methods: {
   
    onAdd() {
      this.$router.push("/home/addressNew");
    },
    onEdit(item, index) {
      console.log("eqwd", item);
      let data = JSON.stringify(item); //js对象取成字符串对象
      console.log(data);
      this.$router.push({ path: "/home/addressEdit", query: { item: data } }); //传参
    },

   
    
  },
};
</script>