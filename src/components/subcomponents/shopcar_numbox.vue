<template>
    
        <div class="mui-numbox" data-numbox-min='1' style="height:25px">
            <!-- 注意！  这里的max由于父组件的获取数据请求是异步的，可能max传过来了，却没有值 -->
            <!-- 可以使用watch来监听父组件传来的max值 -->
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" 
                    ref="numbox" readonly>
                    <!-- ref标签进行了注册，然后便可以通过’this.$refs’再跟注册时的名称来引用DOM元素了 -->
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    
</template>

<script>
import mui from '../../lib/mui/css/js/mui.min.js'
export default {
   mounted(){
       mui(" .mui-numbox").numbox()
       console.log(this.initcount)
   },
  
   methods:{
       
       countChanged(){
          this.$store.commit("UpdateGoodsInfo", {
              //每当numbox数量改变，立即同步到购物车的store中,覆盖之前的数量值
              id: this.goodsid, count: this.$refs.numbox.value
          })
       },
      
       
       
   },
   props:["initcount", "goodsid"]
    
}
</script>

<style lang="scss" scoped>
    
</style>