<template>
  <div class="app-container">
    <mt-header fixed title="购物超市1">
      <span slot="left">
        <mt-button icon="back" @click="goBack" v-show="flag">back </mt-button>
      </span>
    </mt-header>

    <transition>
      <router-view></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab" v-show="flag">
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
    </nav>
  </div>
</template>

<script>
export default {
  data: {
    flag: false,
    tabbar: false,
  },

  created() {
    this.flag = this.$route.path == "/login" ? false : true; //这句话的意思是 如果是home则返回false，不是则返回true
    //由于flag默认为false，页面还没被渲染的时候即使不是home也没有返回按钮
    //  var hidden = document.getElementById('hidden').classList.add('mui-hidden');
    //  console.log(hidden)
    console.log(this.flag);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  watch: {
    "$route.path": function fun1(newVal) {
      console.log(newVal);
      if (newVal == "/home") {
        this.flag = false;
      } else if (newVal == "/unpaid") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
* {
  touch-action: none;
}
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active .v-leave-active {
  transition: all 0.5s ease;
}
</style>
