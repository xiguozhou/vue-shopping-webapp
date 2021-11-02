<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  beforeRouteEnter(to, from, next) {
    // console.log(from, "组件独享守卫beforeRouteEnter第二个参数");
    next((vm11) => {
      if (from.path == "/home/shangpinglist") {
        vm11.from = from.path;
        console.log(vm11.from);
        return;
      } else if (from.path == "/shopcar") {
        vm11.from = from.path;
        console.log(vm11.from);
        return;
      }
      // 通过 `vm` 访问组件实例
    });
  },
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
    console.log(window.location.href);
    this.$store.state.windowaddressrouter = window.location.href; //完整的url地址
    const _this = this;
    this.$axios.get("http://localhost:8181/address/list").then(function (resp) {
      _this.list = resp.data.data;
      // console.log(resp)
    });
  },
  methods: {
    async getOrderId(shopCarForm) {
      let isSuccess = false;
      console.log(shopCarForm);
      await this.$axios
        .post("http://localhost:8181/shopcar/save", shopCarForm)
        .then((result) => {
          if (result) {
            this.orderId.orderId = result.data;
            isSuccess = true;
          }
          // console.log(result);
        });
      return isSuccess;
    },
    postcar() {
      console.log(this.orderId.orderId + "获取到了orderid");

      // console.log(this.$route.query.goodslist.length + "这是长度");
      // console.log(this.$route.query.goodslist);
      //  this.$axios.post("http://localhost:8181/shopcar/savegoodsshopcar", this.$route.query.goodslist).then(result =>{
      //   console.log(result);
      // })

      for (let i = 0; i < this.$route.query.goodslist.length; i++) {
        const all = Object.assign(this.$route.query.goodslist[i], this.orderId); //合并数组
        const all1 = Object.assign(
          this.$route.query.goodslist[i],
          this.quantity
        );
        console.log(
          this.$route.query.goodslist[i] + "这是address页面的goodslits"
        );
        //  this.goodslist = this.$route.query.goodslist[i];

        //  this.goodslist = JSON.parse(this.$route.query.goodslist[i])
        this.$axios
          .post(
            "http://localhost:8181/shopcar/savegoodsshopcar",
            this.$route.query.goodslist[i]
          )
          .then((result) => {
            console.log(result);
            let instance = Toast("下单成功");
            setTimeout(() => {
              instance.close();
              this.$router.push({
                path: "/shopcar/detail?orderId=" + result.data,
              });
            }, 1000);
          });
      }
    },
    onAdd() {
      this.$router.push("/home/addressNew");
    },
    onEdit(item, index) {
      console.log(item);
      let data = JSON.stringify(item); //json取成字符串对象
      console.log(data);
      this.$router.push({ path: "/home/addressEdit", query: { item: data } }); //传参
    },

    onSelect(item) {
      if (this.from == "/home/shangpinglist") {
        let orderForm = {
          name: item.name,
          tel: item.tel,
          address: item.address,
          specsId: this.$store.state.specsId,
          quantity: this.$store.state.quantity,
        };

        console.log(orderForm);
        const _this = this;
        this.$axios
          .post("http://localhost:8181/order/create", orderForm)
          .then(function (resp) {
            if (resp.data.code == 0) {
              console.log(resp);
              // this.$store.state.orderId = resp.data.data.orderId;
              let instance = Toast("下单成功");
              setTimeout(() => {
                instance.close();
                _this.$router.push(
                  "/home/detail?orderId=" + resp.data.data.orderId
                );
              }, 1000);
            }
          });
      } else if (this.from == "/shopcar") {
        //这里用async 和 await实现了同步
        // console.log("进入了shopcar");
        let shopCarForm = {
          amount: this.$store.getters.getGoodsCountAndAmount.count,
          price: this.$store.getters.getGoodsCountAndAmount.amount,
          name: item.name,
          tel: item.tel,
          address: item.address,
        };
        // this.getOrderId(shopCarForm);
        this.getOrderId(shopCarForm).then((result) => {
          console.log("1");
          if (result) {
            console.log("2");
            this.postcar();
          }
        });
      }
    },
  },
};
</script>