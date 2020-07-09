<template>
  <div>
    <div class="ali-pay">
      <div class="form" v-html="content"></div>
    </div>
  </div>
</template>

<script>
  import{ pay } from 'network/request'
  export default {
    name:'alipay',
    data () {
      return {
        orderId: this.$route.query.orderId,
        content: '',
        timer: ''
      }
    },

    mounted() {
      this._paySubmit()
    },

    methods: {
      async _paySubmit() {
        let content = await pay({
          orderId: this.orderId,
          orderName: 'GoodLucky_wu',
          amount: 0.01,
          payType: 1,
        })
        this.content = content
        setTimeout(() => {
          document.forms[0].submit()
        },100)
      },
      loopOrderState(){
        clearTimeout(this.timer)
        let timer = setInterval(() => {
          // todo 获取订单状态并跳转
          if(timer == 10) {
            clearInterval(this.timer)
          }
        },1000)
      },
      beforeDestory() {
        clearTimeout(this.timer)
      }
    },

    watch: {}

  }

</script>
<style scoped>

</style>