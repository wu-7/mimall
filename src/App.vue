<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {getUserInfo} from 'network/request.js'
export default {
  name: 'App',
  mounted() {
    if(this.$cookies.get('userId')){
      this._getUserInfo()
    }
  },
  methods: {
    async _getUserInfo() {
      const data = await getUserInfo()
      if(data){
        this.$store.dispatch('saveUserName',data.username)
        this.$store.dispatch('saveCartCnt',data.cartCnt)
      }else{
        this.$cookies.remove('userId')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
