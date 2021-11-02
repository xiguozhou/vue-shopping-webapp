<template>
  <div class="home">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      
    >
      <div class="ball" v-show="ballflag" ref="ball"></div>
    </transition>
    <van-tabs @click="onClick">
      <van-tab :title="item.name" v-for="item in categories" :key="item.name">
        <van-card
          v-for="(item, index) in phones"
          :key="item.name"
          :num="item.stock"
          :tag="item.tag[0].name"
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.thumb"
        >
          <!-- :thumb="phones.thumb" -->

          <template #footer>
            <numbox @getcount="getSelectedCount"></numbox>
            <van-button
              size="normal"
              type="danger"
              @click="addToShopCar(item.id)"
              >加入购物车</van-button
            >

            <van-button size="normal" type="primary" @click="goDesc(item.id)"
              >图文介绍</van-button
            >

            <van-button size="normal" type="danger" @click="Buy(index)"
              >购买</van-button
            >
          </template>
        </van-card></van-tab
      >
    </van-tabs>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
    >
      <template #sku-actions="props">
        <div class="van-sku-actions">
          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button
            square
            size="large"
            type="danger"
            @click="props.skuEventBus.$emit('sku:buy')"
          >
            买买买
          </van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>
<script>
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      show: false,
      goods: {},
      sku: {},
      categories: "",
      phones: "",
      id: "",
      ballflag: false,
      selectedNum: "1",
      count: "1",
      SelectedCount: 1,
    };
  },
  methods: {
    onClick(index) {
      const _this = this;
      this.$axios
        .get(
          "http://localhost:8181/phone/findByCategoryType/" +
            this.categories[index].type
        )
        .then(function (resp) {
          _this.phones = resp.data.data;
          // console.log( _this.phones)
        });
    },
    Buy(index) {
      const _this = this;
      this.show = true;

      this.$axios
        .get(
          "http://localhost:8181/phone/findSpecsByPhoneId/" +
            this.phones[index].id
        )
        .then(function (resp) {
          // console.log(resp);

          _this.goods = resp.data.data.goods;
          _this.sku = resp.data.data.sku;
          console.log(_this.sku);
          _this.sku.price *= 100;
          _this.sku.list[0].price = _this.sku.price;
          // console.log( _this.sku.list[0].price)
          // _this.sku.list[1].price = 10000
          console.log(_this.sku);
        });
    },
    onBuyClicked(item) {
      this.$store.state.specsId = item.selectedSkuComb.s1;
      this.$store.state.quantity = item.selectedNum;

      console.log(this.$store.state.specsId);

      this.$router.push("/home/address");
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
      console.log(id);
    },

    addToShopCar(id) {
      console.log(id);

      this.ballflag = !this.ballflag;
      // 加入购物车时要保存到state中的数据 {id，count:要购买的数量，price:商品单价等 }
      for (let i = 0; i < this.phones.length; i++) {
        if (this.phones[i].id == id) {
          var goodsinfo = {
            id: id,
            count: this.SelectedCount,
            price: this.phones[i].price,
            selected: true,
          };
        }
      }
      console.log(goodsinfo);
      this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //获取小球的位置  const即var定义的意思
      const ballposition = this.$refs.ball.getBoundingClientRect();
      //获取购物车的位置
      const badgeposition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgeposition.left - ballposition.left;
      const yDist = badgeposition.top - ballposition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`; //字符串的拼接
      el.style.transition = "all 1.5s ease";
      done();
    },
    afterEnter(el) {
      this.ballflag = !this.ballflag;
    },
    getSelectedCount(count) {
      this.SelectedCount = count; //每当要买的数量加1,SelectedCount相应加1
      console.log(this.SelectedCount);
    },
  },
  created() {
    const _this = this;
    this.$axios.get("http://localhost:8181/phone/index").then(function (resp) {
      // for(let item of resp.data.data.phones){
      //   _this.id = item.id
      //   console.log(_this.id)
      // }
      // console.log(resp.data.data);
      _this.categories = resp.data.data.categories;
      _this.id = resp.data.data.phones[0].id;
      _this.phones = resp.data.data.phones;
      console.log(_this.phones);
    });
  },
  components: {
    numbox,
  },
};
</script>

<style lang="scss" scoped>
.ball {
  width: 18px;
  height: 18px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
  top: 192px;
  left: 907px;
}
</style>