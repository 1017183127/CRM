<template>
  <div>
    <div>
      <img :src="require('../assets/icon/crm.jpg')" style="width:100%;"/>
    </div>

    <div class="login_form" >
      <van-row>
        <van-col span="4">
          <van-icon name="manager" color="#07abfd" style="margin:15px 0 0 0"/>
        </van-col>
        <van-col span="20">
          <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="userName">
        </van-col>
      </van-row>
      <van-row>
        <van-col span="4">
          <van-icon name="bag" color="#07abfd" style="margin:15px 0 0 0"/>
        </van-col>
        <van-col span="20">
          <input type="password"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="password">
        </van-col>
      </van-row>
      <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
      <div style="margin-top: 10px">
        <!-- <span class="zhanghao" style="color: #000099;" @click="login">注册</span> -->
        <!-- <span class="zhanghao" style="float: right;color: #A9A9AB">忘记密码？</span> -->
      </div>
    </div>
  </div>
</template>
 
<script>

import http from '../net/httpService';
import GLOBAL_CONFIG from '../net/api';
  export default {
    data() {
      return {
        userName: '',
        password: '',
        isBtnLoading: false
      }
    },
    beforeRouteEnter(to, from, next) {
      // 添加背景色
      document.querySelector('body').setAttribute('style', 'background-color:#e9f8ff;')
      next()
    },
    beforeRouteLeave(to, from, next) {
      // 去除背景色
      document.querySelector('body').setAttribute('style', '')
      next()
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
        let params=
        {
          staffId:this.userName,
          password:this.password
        }
        http.post(GLOBAL_CONFIG.denglu, params).then((res)=>{
            if (res.retCodeMsg.status) {
              console.log(res);
              //commit("setistrue",res.verifyPass)
              if(res.verifyPass)
              {
                this.$store.commit("staffInfo/setInfo",res.staffInfo)
                //console.log(res);
                if(this.$store.state.staffInfo.position=="领导")
                {
                  this.$router.push("Leader_main")
                
                }
                else
                {
                  this.$router.push("Staff_main")
                }
              }
            }
            else{
              console.log('返回json错误');
            }
        }).catch(function (err) {
          console.log('err kawaii!!!', err)
        })
      }
    },

  }
</script>
<style>
  .login_form {
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    padding-bottom: 0.3rem;

    margin-left: 10%;
    margin-right: 10%;
    background-color: #e9f8ff;
  }
  .qxs-ic_user {
    background: #e9f8ff;
    background-size: 0.5rem 0.5rem;
    background-position: 3%;
    font-size: 0.5rem;
  }
  .qxs-ic_password {
    background: #e9f8ff;
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
    background: #07abfd;
  }
  .zhanghao {
      font-size: 0.3rem;
  }
</style>