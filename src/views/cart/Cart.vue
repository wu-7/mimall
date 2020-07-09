<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container w">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" :class="{ checked: isChecked != -1 }" @click="toggleAll">
                <i class="el-icon-check" v-show="isChecked == 1"></i>
                <i class="el-icon-minus" v-show="isChecked == 0"></i>
              </span>全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list" v-for="(item,index) in CartProducts" :key="index">
            <li class="cart-item">
              <div class="item-check">
                <span class="checkbox" :class="{ checked:item.selected === 1 }" @click="updCart(item,'selected')"><i v-show="item.selected" class="el-icon-check"></i></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.img + '?thumb=1&w=320&h=320'" />
                <span>{{item.name}}</span>
              </div>
              <div class="item-price">{{item.price}}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updCart(item,'decrNum')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updCart(item,'incrNum')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.quantity * item.price}}元</div>
              <div class="item-del">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delCartProtById(item.id)"></el-button>
              </div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共<span>{{CartProducts.length}}</span>件商品，已选择<span>{{selectedCartCnt}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{ amount }}</span>元
            <a href="javascript:;" class="btn btn-large" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar />
    <nav-footer />
  </div>
</template>

<script>
  import OrderHeader from 'components/content/order/OrderHeader'
  import ServiceBar from 'components/content/public/ServiceBar'
  import NavFooter from 'components/content/public/NavFooter'

  import { getCartList,cartSelectAll,updCartCnt,delCart } from 'network/request'
  export default {
    name:'Cart',
    props:[''],
    data () {
      return {
        isChecked: -1, // -1:一个都没有选中，0：选中一个或多个，1：全选
        amount: 0,
        selectedCartCnt: 0,
        CartProducts: []
      };
    },

    components: {
      OrderHeader,
      ServiceBar,
      NavFooter
    },
    mounted() {
      this._getCartList()
    },

    methods: {
      // 获取购物车列表
      async _getCartList(){
        let data = await getCartList({})
        this.renderg(data)
      },
      // 渲染数据
      renderg(data){
        if(data) {
          let {amount,CartProducts,selectedCartCnt} = data
          if(selectedCartCnt === 0){
            this.isChecked = -1
          }else if (selectedCartCnt === CartProducts.length) {
            this.isChecked = 1
          }else {
            this.isChecked = 0
          }
          this.CartProducts = CartProducts
          this.selectedCartCnt =selectedCartCnt
          this.amount = amount
        }else {
          this.amount = 0
          this.selectedCartCnt = 0
          this.CartProducts = []
          this.isChecked = -1
        }
      },
      // 全选
      async toggleAll() {
        if(this.CartProducts.length === 0){
          return this.$message.error('购物车没有一件商品')
        }
        let selectAll = this.isChecked === 1 ? 0 : 1
        let data = await cartSelectAll(selectAll)
        this.renderg(data)
      },
      // 删除购物车
      async delCartProtById(id) {
        let data = await delCart(id)
        this.renderg(data)
      },
      // 修改购物车数量
      async updCart(item,type){
        if('selected' !== type && item.selected == 0){
          item.selected = 1
        }
        let selected = item.selected === 1 ? 1 : 0
        let quantity = item.quantity
        if('selected' === type){
          selected = item.selected === 1 ? 0 : 1
        }else if('decrNum' === type){
          if(item.quantity <= 1) {
            return this.$message.error('商品至少保留一件')
          }
          quantity = --item.quantity
        }else if('incrNum' === type){
          if(item.quantity >= item.stock){
            return this.$message.error('商品超出库存数量')
          }
          quantity = ++item.quantity
        }
        let data = await updCartCnt(item.id,{ quantity,selected })
        this.renderg(data)
      },
      order(){
      if(this.isChecked === -1){
        return this.$message.error('请至少选择一件商品')
      }
      this.$router.push('/order/confirm')
    }
    },
  }

</script>
<style lang="less" scoped>
.wrapper{
  background-color: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 114px;
}
.cart-box {
  background-color: #fff;
  font-size: 14px;
  color: #999;
  text-align: center;
}
.cart-box .checkbox {
  display: inline-block;
  width: 22px;
  height: 22px;
  font-size: 16px;
  border: 1px solid #e5e5e5;
  vertical-align: middle;
  margin-right: 17px;
  cursor: pointer;
}
.cart-box .checkbox.checked{
  background-color: #ff6600;
  color: #fff;
}
.cart-item-head {
  display: flex;
  height: 79px;
  align-items: center;
  /* 居中对齐弹性盒 */
}
.col-1 {
  flex: 1;
}
.col-2 {
  flex: 2;
}
.col-3 {
  flex: 3;
}
.cart-item{
  display: flex;
  align-items: center;
  height: 125px;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
}
.item-check {
  flex: 1;
}
.item-name {
  flex: 3;
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
}
.item-name img {
  width: 80px;
  height: 80px;
  vertical-align: middle;
}
.item-name span {
  margin-left: 30px;
}
.item-price {
  flex: 1;
  color: #333;
}
.item-num {
  flex: 2;
}
.num-box {
  display: inline-block;
  width: 150px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
}
.num-box a {
  display: inline-block;
  width: 50px;
  color: #333;
}
.num-box span {
  display: inline-block;
  width: 50px;
  color: #333;
}
.item-total {
  flex: 1;
  color: #ff6600;
}
.item-del {
  flex: 1;
  width: 14px;
  height: 12px;
  margin-top: -18px;
}
.order-wrap{
  font-size: 14px;
  color: #666;
  margin-top: 20px;
  height: 50px;
  line-height: 50px;
}
.cart-tip {
  margin-left: 29px;
}
.cart-tip a{
  color: #666;
  margin-right: 37px;
}
.cart-tip span {
  color: #ff6600;
  margin: 0 5px;
}
.total {
  font-size: 14px;
  color: #ff6600;
}
.total span {
  font-size: 24px;
}
.total a {
  font-size: 18px;
  margin-left: 37px;
}
</style>