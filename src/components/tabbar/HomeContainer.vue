<template>
  <div>
    <swiper
      :lunbotuList="lunbotuList"
      :isfull="true"
      style="width: 100%; height: 200px"
    ></swiper>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <!-- 来自mui的样式-->
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/1.png" alt="" /><br />产品资讯
          <div class="mui-media-body">姓名：周国希 学号：21321312</div>
        </router-link>
      </li>
      <!-- <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/2.png" alt="" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li> -->
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/shangpinglist">
          <img src="../../images/3.png" alt="" />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="home/message">
          <img src="../../images/4.png" alt="" />
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="home/video">
          <img src="../../images/5.png" alt="" />
          <div class="mui-media-body">待支付(购物车)</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/call">
          <img src="../../images/6.png" alt="" />
          <div class="mui-media-body">收货(购物车)</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/address1">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">地址增改</div>
        </router-link>
      </li>

      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsinfo/13">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">地址增改11</div>
        </router-link>

        {{ "1" }}
      </li>
    </ul>
    <tabbar-view> </tabbar-view>

    <!-- <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>

      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">收货</span>
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
    </nav> -->
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
import tabbar from "./tabbar.vue";
export default {
  data() {
    return {
      lunbotuList: [], //保存轮播图的数组
    };
  },
  created() {
    //  this.getLunbotu(); //数据初始化
    // this.$axios.get("http://blog.veivina.top:8081/blogs").then(result =>{
    //    console.log(result)
    // })
    this.lunbotuList = [
      { id: 1, img: "../../src/images/width1.jpg" },
      { id: 2, img: "../../src/images/width4.jpg" },
      { id: 3, img: "../../src/images/width3.jpg" },
    ];
    // console.log(this.lunbotuList);
  },
  methods: {
    getLunbotu() {
      this.$axios.get("http://localhost:8181/swiper/img").then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          this.lunbotuList.push({
            id: result.data[i].id,
            img: result.data[i].img,
          });
        }

        // this.lunbotuList = {id: result.data.id}
        // console.log(this.lunbotuList);
      });
    },
  },
  components: {
    swiper,
    "tabbar-view": tabbar,
  },
};
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: white;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>