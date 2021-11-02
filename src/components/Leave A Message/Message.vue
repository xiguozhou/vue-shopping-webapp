<template>
  <div class="message">
    <el-table :data="getbook" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"> </el-table-column>
      <el-table-column prop="book" label="评论内容" width="180">
      </el-table-column>
    </el-table>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="发表评论">
        <el-input v-model="form.book"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">发表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      form: {
        book: "",
      },
      getbook: {},
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .post("http://localhost:8181/book/save", this.form)
        .then((result) => {
          console.log(result);
        });
      let instance = Toast("添加成功");
      setTimeout(() => {
        instance.close();
        this.$router.go("/home/message");
      }, 1000);
    },
  },
  created() {
    this.$axios.get("http://localhost:8181/book/findAll").then((result) => {
      console.log(result);
      this.getbook = result.data;
    });
  },
};
</script>
<style>
</style>