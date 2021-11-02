import Vue from 'vue'
import app from './App.vue'  //导入app组件

import axios from 'axios'
Vue.prototype.$axios = axios;
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueRouter from 'vue-router'  //1.1导入路由的包
Vue.use(VueRouter)     //1.2安装路由
// VueRouter.router.beforeEach((to, from, next) => {
//     if(from.name)
//     // to and from are both route objects. must call `next`.
// })

import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')   //先从本地存储将购物车中的数据拿出来
var store = new Vuex.Store({
    state: {
//将购物车中的数据，用一个数组存储起来，里面包含了 加入购物车时要放到state中的数据，包括{id，count:要购买的数量，price:商品单价等 }
        car: car,
         
         
    },
    mutations:{
        
        addToCar(state, goodsinfo){
            var flag = false //如果没有找到对应的商品
            state.car.some(item =>{
                //点击加入购物车时，把商品信息保存到car中    1.如果购物车中已经有这个对应的商品，那么只需要跟新数量 
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            if(flag == false){  //没有找到对应的商品就直接加入到car中
                state.car.push(goodsinfo)
            }
            
            localStorage.setItem('car', JSON.stringify(state.car))  //本地存储加入购物车的数量
            // console.log(localStorage);
        },
        UpdateGoodsInfo(state, goodsinfo){ //这个方法是由于shopcontainer中的numbox中的count数量改变，要同步到购物车
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state, id){
            state.car.some((item, i)=> {
                if(item.id == id){
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        UpdateGoodsSelected(state, info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
        
    },
    
    getters:{
                 getAllCount(state){
            var c = 0
            state.car.forEach(item=> {
               
                c += item.count
                
            })
            return c
            
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item =>{
                o[item.id] = item.count  //这种写法是循环获取id和count得到一个{id:count}对象集合
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item =>{
                o[item.id] = item.selected
            })
            // console.log(o);
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item =>{
                if(item.selected){
                    o.count += item.count
                    o.amount +=  item.count * parseInt(item.price)
                }
            })
              console.log(o);
            return o
        }
    }
})

import moment from 'moment'  //导入时间插件
Vue.filter('dataFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){   //定义全局的时间过滤器
    return moment(dataStr).format(pattern) //直接调用moment是获得当前时间
})

import VueResource from 'vue-resource'
Vue.use(VueResource)
// Vue.http.options.root = 'http://vue.studyit.io'    //设置请求的根路径
Vue.http.options.emulateJSON = true;   //全局设置post请求时候的表单形式application/x-www-form-urlencoded作为Content-Type，就像普通的HTML表单一样。

 import './lib/mui/css/css/mui.css' 
 import './lib/mui/css/css/icons-extra.css'
import 'mint-ui/lib/style.css' 

// import { Header } from 'mint-ui'; 
// Vue.component(Header.name, Header);//按需导入mint-ui组件
// import { Swipe, SwipeItem,Button,Lazyload } from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(Button.name, Button);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.use(Lazyload);
// import { Tabbar, TabItem } from 'mint-ui';
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'


import VuePreview from 'vue2-preview'; //安装图片预览插件
Vue.use(VuePreview);


import router from './router.js'   //1.3导入自己的router.js路由模块



// import { Header } from 'mint-ui';
// Vue.component(Header.name, Header);
var vm = new Vue({
    el: '#app',
   render: function(createElement){
       return createElement(app)},
    router,  //1.4挂载路由对象到vm实例上
    store  //挂载store状态管理对象

})