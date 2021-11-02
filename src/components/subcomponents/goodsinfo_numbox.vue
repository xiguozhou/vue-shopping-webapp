<template>
    
        <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
            <!-- 注意！  这里的max由于父组件的获取数据请求是异步的，可能max传过来了，却没有值 -->
            <!-- 可以使用watch来监听父组件传来的max值 -->
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    
</template>

<script>
import mui from '../../lib/mui/css/js/mui.min.js'
export default {
   mounted(){
       mui(" .mui-numbox").numbox()
   },
  
   methods:{
       
       countChanged(){
           //每当文本框数据被修改的时候，立即把最新的数据通过事件调用，传递给父组件\
          
           this.$emit('getcount', parseInt(this.$refs.numbox.value)) //this.$refs.input1.value 可以减少获取dom节点的消耗
       },
      
       
       
   },
    props: ["max"],
   watch: {
           max: function(newVal, oldVal){
                mui(".mui-numbox").numbox().setOption("max", newVal)
                
           }

           
       },
}
</script>

<style lang="scss" scoped>
    
</style>