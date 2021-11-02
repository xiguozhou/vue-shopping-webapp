<template>
  <div class="wrap" id="wrap">
    <div class="logGet">
      <!-- 头部提示信息 -->
      <div class="logD logDtip">
        <p class="p1">登录</p>
      </div>
      <!-- 输入框 -->
      <div class="lgD">
        <input type="text" placeholder="输入用户名" v-model="user" />
      </div>
      <div class="lgD">
        <input type="password" placeholder="输入用户密码" v-model="manage" />
      </div>
      <div class="logC">
        <button @click="Login">登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      user: "", //后端的用户名
      manage: "",
      username: {}, //用户名
      passwd: "",
      Form: [],
    };
  },
  methods: {
    Login() {
      for (let i = 0; i < this.Form.length; i++) {
        if (
          this.user == this.Form[i].username &&
          this.Form[i].type == 0 &&
          this.manage == this.Form[i].passwd
        ) {
          this.$router.push("/home");
        } else if (
          this.user == this.Form[i].username &&
          this.Form[i].type == 1 &&
          this.manage == this.Form[i].passwd
        ) {
          this.$router.push("/manage");
        } else {
          //  Toast("用户名或密码错误，请重新输入");
        }
      }

      // console.log(this.user)
    },
  },
  created() {
    this.$axios.get("http://localhost:8181/login/findAll").then(
      (result) => {
        for (var i = 0; i < result.data.length; i++) {
          this.Form[i] = {
            username: result.data[i].username,
            type: result.data[i].type,
            passwd: result.data[i].passwd,
          };
        }
        console.log(this.Form);
      },
      (reason) => {
        console.warn("rea", reason);
      }
    );
  },
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
/* body {
  background: url(../../images/99.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
} */
#wrap {
  height: 719px;
  width: 100;
  background-image: url(../../images/99.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
#head {
  height: 120px;
  width: 100;
  background-color: #66cccc;
  text-align: center;
  position: relative;
}
#foot {
  width: 100;
  height: 126px;
  background-color: #cc9933;
  position: relative;
}
#wrap .logGet {
  height: 408px;
  width: 368px;
  position: absolute;
  background-color: #ffffff;
  top: 20%;
  right: 15%;
}
.logC a button {
  width: 100%;
  height: 45px;
  background-color: #ee7700;
  border: none;
  color: white;
  font-size: 18px;
}
.logGet .logD.logDtip .p1 {
  display: inline-block;
  font-size: 28px;
  margin-top: 30px;
  width: 86%;
}
#wrap .logGet .logD.logDtip {
  width: 86%;
  border-bottom: 1px solid #ee7700;
  margin-bottom: 60px;
  margin-top: 0px;
  margin-right: auto;
  margin-left: auto;
}
.logGet .lgD img {
  position: absolute;
  top: 12px;
  left: 8px;
}
.logGet .lgD input {
  width: 100%;
  height: 42px;
  text-indent: 2.5rem;
}
#wrap .logGet .lgD {
  width: 86%;
  position: relative;
  margin-bottom: 30px;
  margin-top: 30px;
  margin-right: auto;
  margin-left: auto;
}
#wrap .logGet .logC {
  width: 86%;
  margin-top: 0px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
}

.title {
  font-family: "宋体";
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 使用css3的transform来实现 */
  font-size: 36px;
  height: 40px;
  width: 30%;
}
</style>