<template>
  <div>
    <div class="outer_label">
      <!-- <img class="inner_label login_logo" src="../assets/logo.png"> -->
    </div>
    <div class="login_form">
      <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="userName">
      <input type="text"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="password">
      <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
      <div style="margin-top: 10px">
        <!-- <span class="zhanghao" style="color: #000099;" @click="login">注册</span> -->
        <span class="zhanghao" style="float: right;color: #A9A9AB">忘记密码？</span>
      </div>
    </div>
  </div>
</template>
 

<script>
  export default {
    data() {
      return {
        userName: '',
        password: '',
        isBtnLoading: false
      }
    },
    created () {

    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      login() {
        if (!this.userName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
 
      }
    },
    
  }
</script>
<style>
  .login_form {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
  }
  .qxs-ic_user {
    background: url("../assets/login/ic_user.png") no-repeat;
    background-size: 0.5rem 0.5rem;
    background-position: 3%;
    font-size: 0.5rem;
  }
  .qxs-ic_password {
    background: url("../assets/login/ic_password.png") no-repeat;
    background-size: 0.5rem 0.5rem;
    background-position: 3%;
    margin-bottom: 20px;
    font-size: 0.5rem;
  }
  .login_logo {
    height: 100%;
  }
  .login_btn {
    width: 100%;
    font-size: 0.5rem;
    background: -webkit-linear-gradient(left, #2154FA, #2154FA); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #2154FA, #2154FA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #2154FA, #2154FA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #2154FA , #2154FA); /* 标准的语法 */
    filter: brightness(1.4);
  }
  .zhanghao {
      font-size: 0.3rem;
  }
</style>