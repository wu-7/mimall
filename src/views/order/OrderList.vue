<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container w">
        <div class="order-box">
          <div class="order" v-for="(order,index) in orderList" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ order.createTime }}
                <span>|</span>
                {{ order.receiverName }}
                <span>|</span>
                订单号：{{ order.orderId }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ order.amount }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItems" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.img" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ item.name }}</div>
                    <div class="p-money">{{ item.price + 'X' +item.quantity }}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status === 0">
                <a href="javascript:;" @click="goPay(order.orderId)">去支付</a>
              </div>
              <div class="good-state fr" v-if="order.status === 1">
                <a href="javascript:;">已支付</a>
              </div>
              <div class="good-state fr" v-if="order.status === -1">
                <a href="javascript:;">无效订单</a>
              </div>
            </div>
          </div>

          <!-- 分页区域 -->
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-size="queryInfo.pagesize"
            layput="total,prev,pager,next,jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import OrderHeader from 'components/content/order/OrderHeader'
  import NoData from 'components/content/public/NoData'

  import {getOrderList} from 'network/request'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        // 分页器参数
        queryInfo: {
          pagenum: 1,
          pagesize: 2
        },
        orderList: [],
        total: 0
      };
    },

    components: {
      OrderHeader
    },

    mounted() {
      this._getOrderList()
    },

    methods: {
      async _getOrderList(){
        let orderList = await getOrderList(this.queryInfo)
        this.orderList = orderList.list
        this.total = orderList.total
      },
      goPay(orderNo){
        this.$router.push({
          path: '/order/pay',
          query: {
            orderNo
          }
        })
      },
      // 监听页码值改变的事件
      handleCurrentChange(newPage){
        this.queryInfo.pagenum = newPage
        this._getOrderList()
      }
    },

    watch: {}

  }

</script>
<style scoped lang="less">
@import '~assets/css/mixin.less';
.wrapper {
  background-color: #f5f5f5;
  padding-top: 33px;
  padding-bottom: 110px;
}
.order {
  border: 1px solid #d7d7d7;
  background-color: #fff;
  margin-bottom: 31px;
}
.order-title {
  height: 74px;
  line-height: 74px;
  background-color: #fffaf7;
  padding: 0 43px;
  font-size: 16px;
  color: #666;
}
.item-info span {
  margin: 0 9px;
}
.money {
  font-size: 26px;
  color: #333;
}
.order-content {
  padding: 0 43px;
}
.good-box {
  width: 88%;
}
.good-list {
  display: flex;
  align-items: center;
  height: 145px;
}
.good-img {
  width: 112px;
}
.good-img img {
  width: 100%;
}
.good-name {
  font-size: 20px;
  color: #333;
}
.good-state {
  height: 145px;
  line-height: 145px;
  font-size: 20px;
  color: #ff6600;
}
.good-state a {
  color: #ff6600;
}
.el-pagination {
  text-align: right;
}
.el-pager.action {
  background-color: #f60;
  border-color: #f60;
  color: #fff;
}
</style>