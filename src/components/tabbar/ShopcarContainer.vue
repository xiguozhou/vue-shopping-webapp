<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.phoneId">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.phoneId]"
              @change="
                selectedChanged(
                  item.phoneId,
                  $store.getters.getGoodsSelected[item.phoneId]
                )
              "
            ></mt-switch>
            <img :src="item.phoneIcon" />
            <div class="info">
              <h1>{{ item.phoneName }}</h1>
              <p>
                <span class="price">${{ item.phonePrice }}</span>
                <numbox
                  :initcount="$store.getters.getGoodsCount[item.phoneId]"
                  :goodsid="item.phoneId"
                >
                </numbox>
                <!-- 从购物车中获取商品数量：先创建一个空对象，循环购物车中所以商品数据，把id作为属性名，count作为属性值{88: 2, 89: 10} -->
                <a href="#" @click.prevent="remove(item.phoneId, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计(不含运费)</p>
              <p>
                已勾选商品
                <span class="red">{{
                  $store.getters.getGoodsCountAndAmount.count
                }}</span>
                件， 总价<span class="red">
                  {{ $store.getters.getGoodsCountAndAmount.amount }}$
                </span>
              </p>
            </div>
            <mt-button type="danger" @click="pay">结算</mt-button>
          </div>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: [],
      ListId: [],
      realgoodslist: [],
      a: [],
      quantity: {quantity: 1},
    };
  },
  created() {
    console.log(localStorage)
    // localStorage.clear();
    this.getGoodsList();
   
  },
  methods: {
    getGoodsList() {
      // 由于接口中的id数据用"，"号分隔，所以要拼接处一个用逗号分隔的id
      // var idArr = []
      // this.$store.state.car.forEach(item => idArr.push(item.id))
      // 如果购物车没有商品，则直接返回，否则会报错，因为请求数据接口少了id
      // if(idArr.length == 0){
      //     return
      // }
      // this.$http.get("http://www.liulongbin.top:3005/api/goods/getshopcarlist/" + idArr.join(",")).then(result => {
      //     if(result.body.status == 0){
      //         this.goodslist = result.body.message
      //         console.log(this.goodslist);
      //         console.log(this.$store.state.car)
      //     }
      // })
      //  console.log(this.$store.state.car);
      for (let i = 0; i < this.$store.state.car.length; i++) {
        this.$axios
          .get(
            "http://localhost:8181/phone/findAllCarById/" +
              this.$store.state.car[i].id
          )
          .then((result) => {
            //   console.log(result.data.data)
            this.goodslist.push(result.data.data);
             console.log(result)
            // if(result.body.status == 0){
            //     this.goodslist = result.body.message
                // console.log(this.goodslist + "这是goodslist");
            //     console.log(this.$store.state.car)
            // }
          });
      }
      // console.log(this.goodslist);
    },
    remove(id, index) {
      //点击删除，把商品从store中传递的id删除，以及当前组件的goodslist中的商品也要删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    selectedChanged(id, val) {
      this.$store.commit("UpdateGoodsSelected", { id, selected: val });
      
    },
    pay(id){
      // console.log(id)
      //  console.log(this.$store.getters.getGoodsCountAndAmount.count)
      //  console.log(this.$store.getters.getGoodsCountAndAmount.amount)
      // console.log(typeof localStorage.car)
      // this.a = JSON.parse(localStorage.car)
      // console.log( this.$store.getters.getGoodsCount[130])
     console.log( this.$store.getters.getGoodsSelected)
      console.log(this.goodslist);
      for(let i =0; i<this.goodslist.length; i++){
        if( this.$store.getters.getGoodsSelected[this.goodslist[i].phoneId] == true){
          this.quantity.quantity = this.$store.getters.getGoodsCount[this.goodslist[i].phoneId];
            const all = Object.assign(this.goodslist[i],  this.quantity)
            this.realgoodslist.push(this.goodslist[i]);
        }
      }
      // console.log(this.quantity)
      // console.log(this.realgoodslist)
      console.log(this.realgoodslist);
      this.$router.push({path: "/home/address", query: {goodslist: this.realgoodslist}});
     
    }
  },
  components: {
    numbox,
  },
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #ccc;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;

      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 15px;
    }
    .info {
      .price {
        color: red;
        font-weight: bold;
      }
    }
    .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red {
        color: red;
        font-size: 16px;
      }
    }
  }
}
</style>