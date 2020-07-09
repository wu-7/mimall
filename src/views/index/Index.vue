<template>
  <div class="index">
    <!-- 菜单和活动 -->
    <div class="container w">
      <div class="h-swiper">
        <!-- 左侧分类栏 -->
        <ul class="nav-menu">
          <li class="menu-item" v-for="(cate,index) in allCateList" :key=index @mouseover="selectItem(index)" @mouseleave="tabPaneVisible = false">
            <a href="javascript:;">{{cate.cateName}}<i class="el-icon-arrow-right"></i></a>
          </li>
        </ul>

        <!-- 隐藏 -->
        <div class="tab-pane" v-show="tabPaneVisible" @mouseover="tabPaneVisible = true" @mouseleave="tabPaneVisible = false">
          <div class="tab-pane-items" v-for="(item,index) in curCateList" :key="index">
            <a :href="`/#/product/${item.id}`"> <img :src="item.img" /> {{item.name}}</a>
          </div>
        </div>

        <!-- 轮播图 -->
        <swiper :options="swiperOptions">
          <!-- 图片轮播 -->
          <swiper-slide v-for="(banner, index) in bannerList" :key="index">
            <a :href="`/#/product/${banner.productId}`"><img :src="banner.img" /></a>
          </swiper-slide>
          <!-- 分页器 -->
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- 前后按钮 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>

    <!-- 产品 -->
    <div class="h-container">
      <div class="h-product w">
        <div class="content" v-for="(item,index) in productList" :key="index">
          <!-- 标题 -->
          <h2>{{item.cateType}}</h2>
          <!-- 内容区域 -->
          <div class="p-wrapper">
            <!-- 左侧广告位 -->
            <div class="h-banner">
              <div v-for="(banner,index) in item.advert" :key="index">
                <a :href="`/#/product/houseEle`">
                  <img v-lazy="banner" :key="banner" />
                </a>
              </div>
            </div>
            <!-- 右侧广告位 -->
            <div class="list-box">
              <div class="tab-pro" v-show="0 == tabProIndex" v-for="(tabPro,tabProIndex) in item.content" :key="tabProIndex">
                <div class="h-p-item" v-for="(proDetail,proDetailIndex) in tabPro.children" :key="proDetailIndex">
                  <a :href="`/#/detail/${proDetail.productId}`">
                    <img v-lazy="proDetail.img" :key="proDetail.img" />
                    <h4 class="h-pro-title">{{ proDetail.name }}</h4>
                    <h4 class="h-pro-desc">{{ proDetail.brief }}</h4>
                    <h4 class="h-pro-price">{{ proDetail.price }}</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar />
  </div>
</template>

<script>
  import ServiceBar from 'components/content/public/ServiceBar'
  import {Swiper,SwiperSlide} from 'vue-awesome-swiper'  
  import 'swiper/css/swiper.css'

  import {getCateList, getBanners,getHomeProductList} from 'network/request.js'

  export default {
    name:'index',
    data () {
      return {
        // 列表参数
        allCateList:[],
        curCateList:[],
        tabPaneVisible:false,
        // 轮播图配置参数
        swiperOptions: {
          loop: true, // 循环
          effect: 'cube',
          cubeEffect: {
            shadowOffset: 100,
            shadowScale: 0.6
          },
          autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false // 触摸滑动后是否继续轮播
          },
          // 分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          // 前后按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        bannerList: [],
        productList: []
      }
    },
    created(){
      this._getCateList()
      this._getBanners()
      this._getProductList()
    },
    components: {
      ServiceBar,
      Swiper,
      SwiperSlide
    },

    computed: {},

    methods: {
      // 获取分类列表
      async _getCateList(){
        const data = await getCateList()
        data.forEach(cate => {
          cate.children.forEach(product => {
            product.id = cate.cateId
          })
        })
        this.allCateList = data
        this.curCateList = data[0].children
      },
      // 选择分类项
      selectItem(index){
        this.curCateList = this.allCateList[index].children
        this.tabPaneVisible = true
      },
      // 获取轮播图列表
      async _getBanners() {
        const data = await getBanners()
        this.bannerList = data
      },
      async _getProductList() {
        const data =await getHomeProductList()
        this.productList = data
      }
    },

    watch: {}

  }

</script>
<style scoped lang="less">
@import '~assets/css/mixin.less';

.container {
  position: relative;
}
.h-swiper .nav-menu{
  position: absolute;
  width: 234px;
  height: 460px;
  z-index: 9;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: rgba(105, 101, 101, 0.6);
}
.h-swiper .nav-menu .menu-item{
  height: 42px;
  line-height: 42px;
}
.h-swiper .nav-menu .menu-item:hover{
  background: #ff6700;
}
.h-swiper .nav-menu .menu-item a{
  font-size: 14px;
  color: #fff;
  padding-left: 30px;
  position: relative;
  display: block;
}
.h-swiper .nav-menu .menu-item a i{
  position: absolute;
  right: 22px;
  top: 12.5px;
}
.tab-pane{
  height: 458px;
  position: absolute;
  left: 234px;
  z-index: 99;
  border: 1px solid #e0e0e0;
  border-left: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
  background-color: #fff;
  writing-mode: vertical-lr;
}
.tab-pane-items{
  display: inline-block;
  writing-mode: horizontal-tb;
  width: 248px;
  height: 76px;
}
.tab-pane-items a {
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 14px;
  padding: 18px 20px;
  color: #333;
  transition: color 0.2s;
}
.tab-pane-items a:hover{
  color: #ff6700;
}
.tab-pane-items a img{
  margin-right: 15px;
}

.swiper-button-prev {
  left:254px;
}

.swiper-container {
  height: 460px;
}
.swiper-container img{
  width: 100%;
  height: 100%;
}
.h-container {
  background-color: #f5f5f5;
}
.h-product {
  margin-top: 20px;
}
.content{
  height: 686px;
}
.content h2{
  display: block;
  font-size: 22px;
  line-height: 58px;
}
.p-wrapper{
  display: flex;
  height: 614px;
}
.h-banner {
  display: flex;
  flex-flow: column nowrap;
  width: 234px;
  height: 614px;
}
.h-banner div {
  transition: all 0.8s;
}
.h-banner div:hover{
  transform: translateX(-5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.h-banner div:nth-child(1){
  margin-bottom: 8px;
}
.h-banner div a{
  display: block;
}
.h-banner div a img{
  width: 234px;
}
.list-box{
  width: 992px;
  height: 614px;
  margin-left: 14px;
  overflow: hidden;
}
.tab-pro {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.h-p-item {
  width: 234px;
  height: 300px;
  box-sizing: border-box;
  border: 1px solid #fff;
  background: #fff;
  text-align: center;
  transition: all 0.8s;
}
.h-p-item:hover{
  transform: translateX(-5px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.h-p-item:nth-child(-n + 4){
  margin-bottom: 14px;
}
.h-p-item img{
  margin: 18px 0; 
  width: 160px;
  height: 160px;
}
.h-pro-title {
  line-height: 21px;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.h-pro-desc {
  height: 18px;
  font-size: 12px;
  color: #b0b0b0;
  margin-bottom: 8px;
}
.h-pro-price {
  color: #ff6700;
}
</style>