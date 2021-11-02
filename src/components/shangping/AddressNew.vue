<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-delete
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import AreaList from "../../api/area";

export default {
  name: "AddressNew",
  data() {
    return {
      areaList: AreaList,
    };
  },
  methods: {
    onSave(item) {
      console.log(item);
      const _this = this;
      this.$axios
        .post("http://localhost:8181/address/create", item)
        .then(function (resp) {
          if (resp.data.code == 0) {
            let instance = Toast("添加成功");
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