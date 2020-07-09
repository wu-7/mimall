<template>
  <div class="header">
    <!-- 顶部导航栏顶部容器 -->
    <div class="nav-top">
      <!-- 内部容器 -->
      <div class="topbar w">
        <!-- 左侧 -->
        <ul class="nav-left">
          <li v-for="(item,index) in navleft" :key="index">
            <a href="javascript:;">{{item}}<span class="line">|</span></a>
          </li>
        </ul>

        <!-- 右侧 -->
        <ul class="nav-right">
          <li>
            <a v-if="username" href="javescript:;">{{username}}<span class="line">|</span></a>
          </li>
          <li>
            <a @click="logout" v-if="username" href="javescript:;">退出<span class="line">|</span></a>
          </li>
          <li>
            <a @click="goToOrder" v-if="username" href="javescript:;">我的订单<span class="line">|</span></a>
          </li>
          <li>
            <a @click="login" v-if="!username" href="javescript:;">登录<span class="line">|</span></a>
          </li>
          <li>
            <a v-if="!username" href="javescript:;">注册<span class="line">|</span></a>
          </li>
          <li class="shop-cart">
            <a @click="goToCart" href="javascript:;">
              <i class="el-icon-shopping-cart-full"></i>
              购物车（{{cartCnt}}）
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 导航栏搜索 -->
    <div class="nav-header">
      <div class="container w">
        <!-- 左侧图标 -->
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>

        <!-- 中间服务项 -->
        <div class="header-menu">
          <ul class="nav">
            <li class="show-goods" v-for="(item,index) in serviceList" :key="index">
              <a href="javascript:;" @mouseover="selectProdu">{{item}}</a>
            </li>
            <li class="other-goods"><a href="javascript:;">服务</a></li>
            <li class="other-goods"><a href="javascript:;">社区</a></li>

            <!-- 隐藏的服务项商品列表 -->
            <div class="goods-info">
              <ul class="product-list w">
                <li class="product" v-for="(item,index) in curProductList" :key="index">
                  <a :href="`/#/detail/${item.productId}`">
                    <div class="pro-img">
                      <img :src="item.img" >
                      <h4 class="pro-name">{{item.name}}</h4>
                      <h4 class="pro-price">{{item.price}}</h4>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </ul>
        </div>

        <!-- 右侧搜索框 -->
        <el-input v-model="input" class="input-with-select" clearable>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
  import {getNavItem,postLogout,getCartCnt} from 'network/request.js'

  export default {
    name:'NavHeader',
    data () {
      return {
        navleft:['小米商城', 'MIUI', 'loT', '云服务', '金融', '有品', '小爱开放平台', '企业团购', '资质证照', '协议规则', '下载app', 'Select Location'],
        serviceList:['小米手机', 'Redmi 红米', '电视', '笔记本', '家电', '路由器', '智能硬件'],
        input:'',
        allProductList:[],
        curProductList:[]
      }
    },
    created(){
      this._getProductiList()
      this._getCartCnt()
    },
    computed: {
      username(){
        return this.$store.state.username
      },
      cartCnt() {
        return this.$store.state.cartCnt
      }
    },
    methods: {
      // 退出
      async logout(){
        await postLogout()
        this.$store.dispatch('saveUserName','')
        this.$store.dispatch('saveCartCnt',0)
      },
      // 登录
      login(){
        this.$router.push('/login')
      },
      // 跳转到订单页面
      goToOrder(){
        this.$router.push('/order/list')
      },
      // 跳转到购物车
      goToCart(){
        this.$router.push('/cart')
      },
      // 获得商品列表
      async _getProductiList(){
        const data = await getNavItem()
        data.forEach(element => {
          element.children.forEach(product => {
            product.img += '?thumb=1&w=160&h=110&f=webp&q=90'
          })
        })
        this.allProductList = data
        this.curProductList = data[0].children
      },
      // 获得购物车数量
      async _getCartCnt(){
        const cartCnt = await getCartCnt()
        this.$store.dispatch('saveCartCnt',cartCnt)
      },
      // hover切换curProductList
      selectProdu(e){
        // 遍历分类名匹配分类项
        this.allProductList.forEach(item => {
          if(e.target.innerText.trim() == item.cateName){
            this.curProductList = item.children
            return false
          }
        })
      },
      // 搜索
      search(){
        return this.$message.error('未开发这个功能');
      }
    }
  }

</script>
<style lang="less" scoped>
@import '~assets/css/mixin.less';
/*顶层*/
.nav-top{
  width: 100%;
  height: 40px;
  line-height: 40;
  background-color: #333;
}

.topbar{
  .flex();
}

.topbar ul li{
  height: 40px;
  line-height: 40px;
}

.topbar a{
  font-size: 12px;
  color: #b0b0b0;
  display: block;
}
.topbar a:hover{
  color: #fff;
}
.nav-left,
.nav-right{
  display: flex;
}

.line{
  font-size: 12px;
  color: #424242;
  margin: 0 8px;
}
.shop-cart a{
  width: 120px;
  background-color: #424242;
  text-align: center;
}
.shop-cart a i{
  font-size: 18px;
}

.shop-cart:hover a{
  background-color: #fff;
  color: #ff6700;
}

/* 中间 */
.container{
  height: 100px;
  .flex();
}

.header-menu .nav{
  display: flex;
}
.show-goods a,
.other-goods a{
  display: block;
  line-height: 100px;
  font-size: 16px;
  margin-right: 20px;
}

.show-goods a:hover,
.other-goods a:hover{
  color: #ff6700;
}

/* 隐藏服务项 */
.goods-info{
  height: 0px;

  overflow: hidden;
  width: 100%;
  position: absolute;
  top: 140px;
  left: 0;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  transition: height 0.3s;
}

.product-list{
  display: flex;
}

.product{
  width: 16.6%;
  height: 220px;
  position: relative;
  .flex();
}

.product::after{
  content: ' ';
  display: inline-block;
  position: absolute;
  right: 0;
  top: 28px;
  border-right: 1px solid @colorF;
  /* border-right: 1px solid #d7d7d7; */
  height: 100px;
}
.product:last-child:after{
  display: none;
}
.product a{
  display: inline-block;
  width: 100%;
  height: 220px;
}
.product a .pro-img{
  height: 139px;
  width: 100%;
  text-align: center;
  margin-top: 28px;
}
.product a h4{
  font-size: 12px;
  line-height: 20px;
}
.pro-name {
  margin-top: 15px;
}
.pro-price{
  color: @colorA;
}

.show-goods:hover ~ .goods-info,
.goods-info:hover{
  height: 220px;
  background-color: #fff;
  border-top: 1px solid rgb(224, 224, 224);
}
.el-input {
  width: 300px;
}
.el-button {
  background-color: #fff !important;
}
.el-button:hover {
  background-color: #ff6600 !important;
}
</style>