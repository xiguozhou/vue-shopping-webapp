<!-- # 项目描述文件 -->






## 轮播图
1. 获取数据，使用vue-resource的this.$http.get
2. 获取到的数据，要保存到data上
3. 使用vue-for渲染每个item


## 新闻资讯
1. 界面使用mui中的media list
2. 使用vue-ressource获取数据

## 新闻资讯跳转新闻详情
1. 列表每一项改造为router-link，在跳转的时候提供id作为唯一标识符
2. 新闻详情页面NewsIn

## 单独封装一个评论子组件
1. 创建一个commen.vue组件，在需要的页面中，导入  'import comment from '

## 从后台获取数据并渲染到页面无非几步
1. 定义一个获取数据的方法
            getComments(){
            this.$http.get("http://www.liulongbin.top:3005/"+ this.id + "?pageIndex=" + this.pageIndex).then(result => {
                if(result.body.status ==0){
                    this.comments = result.body.message;
                }else{
                    Toast("获取评论失败")
                }
            })
        }        
2. 将获取到的数据放到data中
data(){
        return{
            pageIndex: 1,
            comments: []
        } 
    },
3.渲染数据
 created(){
        this.getComments();
    },
4. 循环渲染

获取评论失败可能是由于status设置为了1  也可能是接口没有这个数据
加载更多<!-- 即让pageIndex+1，同时重新获取数据(重新调用getComments) -->

## 发表评论
1. 在获取到的最新评论列表中，以数组的形式拼接到数组开头

## 图片分享
1. tab-top-webview-main.html  同时需要把slider区域的mui-fullscreen类去掉
2. 滑动条无法正常滑动，需要初始化，导入mui.js
3. 图片需要使用懒加载，使用mint-ui


## 实现了点击图片跳转图片详情页面
1. 在改造router-link时，需要使用tag属性指定要渲染哪种元素

缩略图需要最新的 vue-preview

## 一个组件导入轮播图组件
可用父组件向子组件（轮播图组件）传值，传的值为图片