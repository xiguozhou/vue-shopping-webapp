<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要喷的(最多120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="{item, i} in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
                </div>
                <div class="cmt-body">
                   {{ item.content == 'undefined' ? '此用户很懒，什么都没说': item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>  
        <!-- 即让pageIndex+1，同时重新获取数据(重新调用getComments) -->

    </div>
</template>


<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            pageIndex: 1,
            comments: [],
            msg:""  //评论输入的内容
        } 
    },

    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get("http://vue.studyit.io/api/getcomments/"+ this.id + "?pageIndex=" + this.pageIndex)
            .then(result => {
                if(result.body.status == 0){
                    Toast("获取评")
                   
                    this.comments = result.body.message
                    // this.comments = this.comment.concat(result.body.message);  //this.comment数组连接result.body.message数组
                    
                }else{
                    console.log(result.body.status)
                   Toast("获取评论失败")  //这里获取评论失败可能是由于status设置为了1
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim.length == 0){
                return Toast("评论内容不能为空");
                }
            this.$http.post("http://www.liulongbin.top:3005/api/postcomment/" + this.$route.params.id, {
                content: this.msg.trim()
            }).then(function(result){
                if(result.body.status ==0){
                    var cmt = {
                        user_name: "匿名用户",
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(cmt)   //将最新的评论追加到comments数组开头
                    this.msg = ""  //发表完后把msg清空
                }
            });
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
    }
}

.cmt-list{
    margin: 5px 0;
    .cmt-item{

        .cmt-title{
            line-height: 30px;
            background-color: #ccc;
        }
        .cmt-body{
            line-height: 35px;
            text-indent: 30px;
        }
    }
}
</style>