<template>
  <div class="goodsinfo-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-show="ballflag" ref="ball"></div>
    </transition>
    <!-- 小球动画会根据分辨率的不同，而到达不了购物车的位置。因此要将购物车横纵坐标减去小球初始位置的横纵坐标 -->

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          购买数量：<numbox
            @getcount="getSelectedCount"
            :max="goodsinfo.stock_quantity"
          ></numbox>

          <p class="price">
            市场价:<del>${{ goodsinfo.market_price }}</del
            >&nbsp;&nbsp; 销售价:<span class="now_price"
              >${{ goodsinfo.sell_price }}</span
            >
          </p>
          <mt-button type="primary" size="small" @click="Buy(id)"
            >立即购买</mt-button
          >
          <mt-button type="danger" size="small" @click="addToShopCar"
            >加入购物车</mt-button
          >
          <!-- 加入购物车时，拿到选择的数量，即子组件numbox向父组件goodsinfo传值 -->
          <!-- 子组件向父组件传值：父向子传递方法，子调用这个方法，同时把数据当做参数，传递给这个方法 -->
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{ goodsinfo.goods_no }}</p>
          <p>库存情况:{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间:{{ goodsinfo.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)"
          >图文介绍</mt-button
        >

        <mt-button type="danger" size="large" plain @click="goComment(id)"
          >商品评论</mt-button
        >
      </div>
     
    </div>
  </div>
</template>

<script>  
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: [],
      ballflag: false,
      SelectedCount: 1, //保存用户选中的商品数量，默认用户买一个
      show: false,
     
     
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then((result) => {
          if (result.body.status == 0) {
            //轮播图组件识别img属性，故先循环轮播图数组每一项，为item添加img属性
            result.body.message.forEach((item) => {
              item.img = item.src;
            });
            this.lunbotu = result.body.message;
          }
        });
    },
    getGoodsInfo() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id)
        .then((result) => {
          console.log(this)
          if (result.body.status == 0) {
            this.goodsinfo = result.body.message[0];
          }
        });
    },
    goDesc(id) {
      console.log(this)
      //点击使用编程时导航跳转到图文介绍页面
      
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballflag = !this.ballflag;
      // 加入购物车时要保存到state中的数据 {id，count:要购买的数量，price:商品单价等 }
      var goodsinfo = {
        id: this.id,
        count: this.SelectedCount,
        price: this.goodsinfo.sell_price,
        selected: true,
      };

      
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
      console.log(this.SelectedCount)
    },
    Buy(id) {
      this.show = true;
      //  this.$router.push({name: "buy", params: { id }})
    },
    onBuyClicked(item){
            console.log(item)
            this.$store.state.specsId = item.selectedSkuComb.s1
        this.$store.state.quantity = item.selectedNum
        this.$router.push('/home/address')
    }   
  },
  components: {
    swiper,
    numbox,
  },
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 18px;
    height: 18px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    top: 358px;
    left: 155px;
  }
}
</style>