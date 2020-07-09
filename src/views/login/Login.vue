<template>
  <div class="login">
    <div class="login_h_panel">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt="" /></a>
    </div>
    <div class="login_banner_panel">
      <!-- 表单区域 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="0px" class="login_form">
        <div class="nav-tabs">
          <a href="javascript:;" class="checked">账号登录</a>
          <span class="sep-line"></span>
          <a href="javascript:;">扫码登录</a>
        </div>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="手机号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :type="pwdType" placeholder="密码">
            <i slot="suffix" class="iconfont icon-showpassword" @click="showPwd"></i>
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
        <div class="tips">
          <div class="sms">手机短信登录/注册</div>
          <div class="reg">立即注册<span>|</span>忘记密码</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { postLogin,getUserInfo } from 'network/request'
  export default {
    name:'Login',
    props:[''],
    data () {
      return {
        username: '',
        password: '',
        userId: '',
        loginForm: {
          username: 'rzcoding',
          password: 'rzcoding'
        },
        loginRules: {
          username: [
            {required: true,message: '请输入用户名',trigger: 'blur'},
            {min: 3,max: 16,message: '用户名长度为3-16个字符', trigger: 'blur'}
          ],
          password: [
          {required: true,message: '请输入密码',trigger: 'blur'},
            {min: 3,max: 16,message: '密码长度为3-16个字符', trigger: 'blur'}
          ]
        },
        pwdType: 'password'
      };
    },

    methods: {
      showPwd() {
        if(this.pwdType === 'password') {
          this.pwdType = ''
        }else {
          this.pwdType = 'password'
        }
      },
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          if(!valid){
            return
          }
          await postLogin(this.loginForm)
          const data = await getUserInfo()
          // session级别是浏览器进程杀掉才结束
          this.$cookies.set('userId',data.userId, 60 * 60 * 24 *7)
          this.$store.dispatch('saveUserName',data.username)
          this.$store.dispatch('saveCartCnt',data.cartCnt)
          // 通过编程式导航跳转到后台主页
          this.$router.push({
            name: 'index',
            params: {
              from: 'login'
            }
          })
        })
      }
    }
  }

</script>
<style scoped lang="less">
.login {
  width: 1130px;
  height: 686px;
  margin: 0 auto;
}
.login_h_panel {
  height: 98px;
}
.login_h_panel img {
  width: auto;
  height: 100%;
}
.login_banner_panel {
  height: 588px;
  position: relative;
  background-color: #fff;
}
.el-form {
  box-sizing: border-box;
  padding-left: 31px;
  padding-right: 31px;
  width: 410px;
  height: 487px;
  background-color: #fff;
  position: absolute;
  top: 30px;
  right: 0;
}
.nav-tabs {
  padding: 27px 0 24px;
  text-align: center;
  font-size: 24px;
  color: #666;
}
.sep-line {
  width: 1px;
  height: 24px;
  margin: 0 42px;
  border: 1px solid #e0e0e0;
}
.checked {
  color: #f56600;
}
.el-form-item {
  width: 346px;
  height: 48px;
}
.el-input {
  height: 48px;
  line-height: 48px;
}
.el-button {
  background-color: #ff6700;
  border-color: #ff6700;
  width: 100%;
  height: 50px;
  line-height: 1;
}
.tips {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
}
.sms {
  color: #ff6600;
}
.reg {
  color: #999;
}
.reg span {
  margin: 0 7px;
}
</style>