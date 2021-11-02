<template>
    <div>
         <mt-swipe :auto="4000">
        <mt-swipe-item v-for= "item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="" :class="{'full': isfull}">
        </mt-swipe-item>
        
        </mt-swipe>
    </div>



    <!--  HomeContainer和GoodsInfo中的轮播图宽度需要设置得不一样，可以定义一个属性，让使用轮播图的调用者，手动指定是否为100%的宽度 -->
</template>



<script>
export default {
    props: ["lunbotuList", "isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
       text-align: center;
        img{
            // width: 100%;
            height: 100%;
        }
    }
}
.full{
    width: 100%;
}
</style>