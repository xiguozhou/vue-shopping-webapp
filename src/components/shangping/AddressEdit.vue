<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-delete
      :address-info="addressInfo"
      save-button-text="修改"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import AreaList from "../../api/area";

export default {
  name: "AddressEdit",
  created() {
    // console.log(this);
    console.log("item", this.$route.query.item)
    let data = JSON.parse(this.$route.query.item); //parse还原成一个对象
    console.log("data", data)
    this.addressInfo = data;
    console.log( "address", this.addressInfo)

    let index = data.address.indexOf("区");
    if (index < 0) index = data.address.indexOf("县");
    this.addressInfo.addressDetail = data.address.substring(index + 1);
    console.log( "dqwqw",this.addressInfo.addressDetail)
  },
  data() {
    return {
      areaList: AreaList,
      addressInfo: {
        name: "san",
        tel: "123",
        areacode: "130105",
        addressDetail: "dsa",
      },
    };
  },
  methods: {
    onSave(item) {
      const _this = this;
      this.$axios
        .put("http://localhost:8181/address/update", item)
        .then(function (resp) {
          if (resp.data.code == 0) {
            let instance = Toast("修改成功");
            setTimeout(() => {
              instance.close();
              _this.$router.push("/home/address");
            }, 1000);
          }
        });
    },
    onDelete() {
      history.go(-1);
    },
  },
};
</script>

<style scoped>
</style>