<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input v-model="form.stock"></el-input>
      </el-form-item>
      <el-form-item label="商品标签">
        <el-input v-model="form.tag"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          action="http://localhost:8181/phone/img"
          accept=".jpg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeupload"
          :on-success="succ"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.type" placeholder="请选择商品分类">
          <el-option label="手机电脑类" value="0"></el-option>
          <el-option label="日常用品类" value="1"></el-option>
          <el-option label="饮料酒水类" value="2"></el-option>
          <el-option label="蔬菜水果类" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格">
        <el-select v-model="form.specs" placeholder="请选择商品规格">
          <el-option label="64GB" value="64GB"></el-option>
          <el-option label="128GB" value="128GB"></el-option>
          <el-option label="斤" value="斤"></el-option>
          <el-option label="个" value="个"></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
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
        name: "",
        desc: "",
        tag: "",
        price: "",
        stock: "",
        type: [],
        specs: "",
        icon: "",
      },
        dialogImageUrl: '',
        dialogVisible: false
    };
  },
  methods: {
     handleRemove(file) {
        console.log(file.url);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.response.url;
        this.dialogVisible = true;
      },
      beforeupload(file){
        console.log(file);
      },
      succ(file){
        console.log(file.url);
        this.form.icon = file.url;
        console.log(this.form);
      },
      
    onSubmit() {
      this.$axios
        .post("http://localhost:8181/phone/save", this.form)
        .then((result) => {
          console.log(result);
          let instance = Toast("添加成功");
          setTimeout(() => {
            instance.close();
            // _this.$router.push('/home/address')
          }, 1000);
        });
      console.log(this.form);
    },
  },
};
</script>