import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
import ShangPingList from './components/shangping/ShangPingList.vue'    
import Buy from './components/goods/Buy.vue'     
import Address from './components/shangping/Address.vue'   
import AddressNew from './components/shangping/AddressNew.vue'    
import AddressEdit from './components/shangping/AddressEdit.vue'  
import Detail from './components/shangping/Detail.vue'   
import Success from './components/shangping/Success.vue'
import Info from './components/shangping/Info.vue'
import change from './components/tabbar/change.vue'
import message from './components/Leave A Message/Message.vue'
import call from './components/call us/call.vue'
import video from './components/video/video.vue'
import login from './components/Login/Login.vue'
import manage from './components/Manage/Manage.vue'
import remarkmanage from './components/Manage/RemarkManage.vue'
import ordermanage from './components/Manage/OrderManage.vue'
import purchase from './components/Manage/Purchase.vue'
import warehouse from './components/Manage/WareHouse.vue'
import goodslist from './components/Manage/goodsList.vue'
import paid from './components/OrderManage/Paid.vue'
import unpaid from './components/OrderManage/Unpaid.vue'
import ship from './components/OrderManage/Ship.vue'
import return1 from './components/OrderManage/Return.vue'
import ordercomplete from './components/OrderManage/complete.vue'
import shopcardetail from './components/ShopCar/Detail.vue'
import shopcarsuccess from './components/ShopCar/Success.vue'
import shopcarinfo from './components/ShopCar/Info.vue'

import paid2 from './components/ShopCarOrderManage/OrderManage/Paid.vue'
import unpaid2 from './components/ShopCarOrderManage/OrderManage/Unpaid.vue'
import ship2 from './components/ShopCarOrderManage/OrderManage/Ship.vue'
import return2 from './components/ShopCarOrderManage/OrderManage/Return.vue'
import ordercomplete2 from './components/ShopCarOrderManage/OrderManage/Complete.vue'
import orderdetail from './components/ShopCarOrderManage/OrderManage/OrderDetail.vue'
import orderdetail1 from './components/video/OrderDetail.vue'
import addressfromhome from './components/AddressAddAndEdit/Address.vue'
var router = new VueRouter({
    routes:[
        {path:'/', redirect:'/login'},
        {path: '/home', component: HomeContainer},    //path里面的路径要和app.vue中to里面的一致
        {path:'/member', component:MemberContainer},
        {path:'/search', component:SearchContainer},
        {path:'/shopcar', component:ShopcarContainer},
        {path: '/home/newslist', component: NewsList},
        {path: '/home/address1', component:addressfromhome},
        {path: '/home/newsinfo/:id', component: NewsInfo,props:true}, //id前面的冒号代表id是个参数
        {path: '/home/photolist', component: PhotoList},
        {path: '/home/photoinfo/:id', component: PhotoInfo},
        {path: '/home/goodslist', component:GoodsList},
        {path: '/home/goodsinfo/:id', component:GoodsInfo},
        {path: '/home/goodsdesc/:id', component:GoodsDesc, name: 'goodsdesc'},
        {path: '/home/goodscomment/:id', component:GoodsComment, name: 'goodscomment'},
        {path: '/home/shangpinglist', component:ShangPingList},
        {path: '/home/buy/:id', component:Buy, name: 'buy'},
        {path: '/home/address', component:Address},                      
        {path: '/home/addressnew', component:AddressNew},
        {path: '/home/addressedit', component:AddressEdit},
        {path: '/home/detail', component:Detail},
        {path: '/home/success', component:Success},
        // {path: '/home/success/:orderid', component:Success,name: 'success'},
        {path: '/home/info', component:Info},
        {path: '/home/change', component:change},
        {path: '/home/message', component:message},
        {path: '/home/call', component:call},
        {path: '/home/video', component:video},
        {path: '/login', component:login},
        {path: '/Manage', component:manage,  redirect: '/remarkManage',children:[
            {path: '/goodslist', component:goodslist},
            {path: '/remarkmanage', component:remarkmanage},
            {path: '/ordermanage', component:ordermanage},
            {path: '/purchase', component:purchase},
            {path: '/warehouse', component:warehouse},
            {path: '/paid', component:paid},
            {path: '/unpaid', component:unpaid},
            {path: '/ship', component:ship},
            {path: '/return', component:return1},
            {path: '/ordercomplete', component:ordercomplete},

            {path: '/shopcar/paid', component:paid2},
            {path: '/shopcar/unpaid', component:unpaid2},
            {path: '/shopcar/ship', component:ship2},
            {path: '/shopcar/return', component:return2},
            {path: '/shopcar/ordercomplete', component:ordercomplete2},
            {path: '/shopcar/orderdetail', component:orderdetail},
            ]},
        {path: '/shopcar/detail', component:shopcardetail},
        {path: '/shopcar/success', component:shopcarsuccess},
        {path: '/shopcar/info', component:shopcarinfo},
        {path: '/home/video/detail', component:orderdetail1},
        // {path: '/Manage', redirect: '/remarkManage'},
       
        
    ],
    linkActiveClass: 'mui-active'  //覆盖默认的路由高亮（让被点击的有背景色）的类，默认的类叫做router-link-active
})



export default router