<template>
    <div>
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item', item.id == 0 ? 'mui-active' :'']" v-for="item in cates"
						 :key="item.id" @tap="getPhotoListByCateId(item.id)">
							<!-- vue中处理类，当item.id=0时，即全部，咋加上mui-active属性，不等于0返回空 -->
							{{ item.title}}
						</a>
						
					</div>
				</div>

		</div>

		<ul class="photo-list">
  			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' +item.id" tag="li">  
			  <!-- :to代表这是一个表达式 -->
    		<img v-lazy="item.img_url">
			<div class="info">
				<h1 class="info-title"> {{ item.title }}</h1>
				<div class="info-body">{{ item.zhaiyao }}</div>
			</div>
  			</router-link>
		</ul>
    </div>
</template>

<script>
import mui from '../../lib/mui/css/js/mui.min.js'

export default {
    data(){
        return {
			cates: [],   //所有分类的列表数组
			list: [],
		}
    },
	created(){
		this.getAllCategory();
		this.getPhotoListByCateId(0);  //默认进入页面，主动请求所有图片
	},
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    },
    methods:{
		getAllCategory(){  
			this.$http.get("http://www.liulongbin.top:3005/api/getimgcategory").then(result => {
				if(result.body.status == 0){
					result.body.message.unshift({title:"全部", id:0})
					this.cates = result.body.message
					console.log(result)
				}
			})
		},
		getPhotoListByCateId(cateId){
			//根据分类id获取图片列表
			this.$http.get("http://www.liulongbin.top:3005/api/getimages/" +cateId).then(result => {
				if(result.body.status == 0){
					
					this.list= result.body.message
					console.log(result)
				}
			})
		}
    }
}
</script>

<style lang="scss" scoped>
.photo-list{
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
li{
	background-color: burlywood;
	text-align: center;
	margin-bottom: 10px;
	box-shadow: 0 0 9px #999;  //设置阴影
	position: relative;
	img{
		width: 100%;
		vertical-align: middle;
	}
	img[lazy=loading] {
  	width: 40px;
  	height: 300px;
  	margin: auto;
}

	.info{
		color: white;
		text-align: left;
		position: absolute;
		max-height: 84px;
		bottom: 0;
		.info-title{
			font-size: 18px;
		}
		.info-body{
			font-size: 14px;
		}
		}
	

}
}
    
</style>