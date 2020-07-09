<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">客服</a><span>|</span>
      <a href="javascript:;">客服</a><span>|</span>
      <a href="javascript:;">客服</a><span>|</span>
      <a href="javascript:;">客服</a>
    </div>
    <div class="copyright">Copyright ©2020 <span class="domain">www.baidu.com</span> All Rights Reserved.</div>
    
  </div>
</template>

<script>
  export default {
    name:'nav-footer'
  }

</script>
<style scoped lang="less">
  .footer{
    height: 234px;
    border-top: 4px solid #ff6600;
    background-color: #333;
    color: #999;
    font-size: 16px;
    text-align: center;
  }
  .footer-logo{
    margin-top: 46px;
    margin-bottom: 31px;
  }
  .footer-logo img{
    width: 53px;
    height: 36px;
    margin-bottom: 13px;
  }
  .footer-link{
    margin-bottom: 13px;
  }
  .footer-link a{
    color: #999;
    display: inline-block;
  }
  .footer-link span{
    margin: 0 10px;
  }
  .copyright .domain{
    color: #ff6600;
  }
  

</style>