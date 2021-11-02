<template >
  <div>
    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for="item in newslist"
        :key="item.id"
      >
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <p class="mui-ellipsis">
              <span>发表时间:{{ item.add_time | dataFormat() }}</span>
              <span>点击:{{ item.click }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
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
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newslist: [],
    }; //data是个函数，用来挂载数据
  },
  created() {
    this.getNewList();
  },
  methods: {
    getNewList() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getnewslist")
        .then((result) => {
          if (result.body.status == 0) {
            this.newslist = result.body.message;
            console.log(this.newslist);
          } else {
            Toast("加载新闻失败");
          }
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.mui-ellipsis {
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
</style>