<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title}}</h3>

        <hr>

        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info: {}
        }
    },
    created(){
        this.getGoodsDesc()
    },
    methods: {
        getGoodsDesc(){
            this.$http.get("http://www.liulongbin.top:3005/api/goods/getdesc/" + this.$route.params.id).then(result =>{
                if(result.body.status == 0){
                    this.info = result.body.message[0]
                }
            })
        }
    }
}
</script>

<style lang="scss" >
.goodsdesc-container{
    padding: 0 4px;
    h3{
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
     }
     .content{
        //  这里设置图片时要把scoped属性去掉
         img{
             width: 100%;
         }
     }
}  
</style>