<template>
  <div class="newsinfo-container">
    <h1 class="title">{{ newsinfo.title }}</h1>
    <!-- {{ $route.params }} -->
    <p class="subtitle">
      <span>发表时间: {{ newsinfo.add_time | dataFormat }}</span>
      <span>点击次数:{{ newsinfo.click }}次</span>
    </p>

    <hr />
    <div class="content" v-html="newsinfo.content"></div>
    <hr />
    <p class="subtitle">
      <span>评论:</span>
    </p>
    {{ id }}
    <comment-box :id="this.id"></comment-box>
    <!--这个id是父组件的，向comment组件传值-->
    <!-- <nav class="mui-bar mui-bar-tab">
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
    </nav> -->
  </div>
</template>

<script>
import comment from "../Leave A Message/Message.vue";
import { Toast } from "mint-ui";
export default {
  props: ["id"],
  data() {
    return {
      id: this.$route.params.id, //将url地址中传递过来的id值，挂载到data上
      newsinfo: {},
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getnew/" + this.id)
        .then((result) => {
          if (result.body.status == 0) {
            this.newsinfo = result.body.message[0];
            console.log(result.body.message);
          } else {
            Toast("获取新闻失败");
          }
        });
    },
  },
  components: {
    "comment-box": comment, //用来注册子组件的节点
  },
};
</script>


<style lang="scss" >
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: burlywood;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>