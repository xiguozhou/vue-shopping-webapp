<template>
  <div class="goods-list">
    <router-link
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      :to="'/home/goodsinfo/' + item.id"
      tag="div"
    >
      <img :src="item.img_url" alt="" />

      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">${{ item.sell_price }}</span>
          <span class="old">${{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/home/goodslist">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">购买</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{
            this.$store.getters.getAllCount
          }}</span></span
        >
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">待支付</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodslist: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http
        .get(
          "http://www.liulongbin.top:3005/api/getgoods?pageindex=" +
            this.pageindex
        )
        .then((result) => {
          if (result.body.status == 0) {
            // this.goodslist = result.body.message
            this.goodslist = this.goodslist.concat(result.body.message); //加载更多就是让第一页的数据拼接上后面的数据
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
  }
  img {
    width: 100%;
  }
  .title {
    font-size: 14px;
  }
  .info {
    background-color: #eee;
    p {
      margin: 0;
      padding: 5px;
    }
    .price {
      .now {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .sell {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
  }
}
</style>