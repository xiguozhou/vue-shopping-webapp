<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间:{{ photoinfo.add_time | dataFormat }}</span>
      <span>点击:{{ photoinfo.click }}次</span>
    </p>
    <hr />

    <!-- 缩略图 -->

    <vue-preview
      :list="list"
      :thumbImageStyle="{ width: '80px', height: '80px', margin: '10px' }"
      :previewBoxStyle="{ border: '1px solid #eee' }"
      :tapToClose="true"
      @close="closeHandler"
      @destroy="destroyHandler"
    />

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <hr />
    <p class="subtitle">
      <span>评论:</span>
    </p>
    <cmt-box :id="id"></cmt-box>
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
import comment from "../Leave A Message/Message.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: [
        {
          src: "https://www.escook.cn/vuebase/pics/7.png",
          w: 600,
          h: 600,
        },
        {
          src: "https://www.escook.cn/vuebase/pics/7.png",
          w: 1200,
          h: 900,
        },
        {
          src: "https://www.escook.cn/vuebase/pics/7.png",
          w: 1200,
          h: 900,
        },
      ],
    };
  },
  created() {
    this.getPhotoInfo();
    // this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id)
        .then((result) => {
          if (result.body.status == 0) {
            this.photoinfo = result.body.message[0];
            console.log(this.photoinfo);
          }
        });
    },
    closeHandler() {
      console.log("closeHandler");
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log("destroyHandler");
    },
  },
  components: {
    "cmt-box": comment,
  },
};
</script>

<style lang="scss" scopde>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .suntitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>