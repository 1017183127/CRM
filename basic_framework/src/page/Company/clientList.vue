<template>
  <div>
    <!-- 头部 -->
  <van-sticky>
    <van-nav-bar title="公司" left-arrow style="background: #fff"   @click-left="onClickLeft" @click-right="onClickRight" >
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>
    <!-- 搜索框 -->
    <van-row type="flex" justify="center" style="background: #fff">
      <form action="/">
        <van-search class = "search" v-model="searchString" placeholder="请输入搜索关键词" @search="onSearch" @clear="onClear" />
      </form>
    </van-row>
    <!-- 两个排序 -->
    <van-row type="flex" justify="center" class="table2">
      <van-col span="8" v-if="click1" @click="onClickOrder"> <font color="grey" style="font-weight:300;">
        创建时间顺序⇋</font></van-col>
      <van-col span="8" v-if="click1p" @click="onClickOrder"> <font color="grey" style="font-weight:300;">
        创建时间顺序⇌</font></van-col>
      <van-col span="16">  </van-col>
    </van-row>
  </van-sticky>
  <!-- cell -->
    <van-cell-group>
      <van-cell center v-for="item in companyList" is-link :key="item.shortName" @click="onClickCell(item)" class="cell">
        <template #title>
          <span class="shortName">{{item.shortName}}</span>
          <span class="fullName">{{item.fullName}}</span>
        </template>
        <template #label>
          <span class="contact">{{item.contactCount}}个联系人</span>
          <span class="visit">已创建{{item.visitRecordCount}}条拜访记录</span>
          <br>
          <van-row>
            <van-col span="1">
              <img :src="require('../../assets/icon/chuang.png')" style="height:.38rem;margin:.1rem 0 0 0"/>
            </van-col>
            <van-col span="23">
              <div style="font-weight:200;font-size:.3rem;margin:.05rem 0 0 5px">{{item.creatorName}}</div>
            </van-col>
          </van-row>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  name: 'clientList',
  data(){
      return{
        searchString:'',
        navList:[
          {name:'/components/NewCompany',navItem:'测试界面'}
        ],
        click1: true,
        click1p: false,
      }
  },
  beforeRouteEnter(to, from, next) {
    // 添加背景色
    document.querySelector('body').setAttribute('style', 'background-color:#F5F5F5;font-family: Noto Sans SC;font-style: normal;')
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 去除背景色
    document.querySelector('body').setAttribute('style', '')
    next()
  },
  computed:{
    companyList:{
      get(){
        return this.$store.state.clientList.companyList;
      }
    },
  },
  methods: {
    onClickLeft() {
        if(this.$store.state.clientList.back == "Leader_main"){
          this.$router.push("/Leader_main");
        }
        else if(this.$store.state.clientList.back == "Staff_main"){
          this.$router.push("/Staff_main");
        }

    },
    onClickRight() {
      this.$router.push("/clientList/newClient");
    },
    onClickCell(company) {
      console.log(company)
      this.$router.push({
        path: '/clientList/companyInfo', // 路径
        query:{
          x: company, // 参数
        }
      });
    },
    onClickOrder(){
      this.click1 = !this.click1;
      this.click1p = !this.click1p;
      this.companyList.reverse();
    },
    onSearch(){
      // console.log(this.searchString);
      let paramsCom = {
        name:this.searchString
      }
      this.$store.dispatch('clientList/getCompany', paramsCom);
    },
    onClear(){
      this.searchString = null;
      let paramsCom = {
        name:""
      }
    this.$store.dispatch('clientList/getCompany', paramsCom);
    },
  },
  mounted(){
    let paramsCom = {
        name:""
      }
    this.$store.dispatch('clientList/getCompany', paramsCom);
    if(this.$route.query.from){
      this.$store.commit("clientList/setBack",this.$route.query.from);
    }


  }
}
</script>

<style scoped>
.back{
  font-size: 50px;
  margin:.1rem 0 0 0;
  text-align:center;
  font-weight: 100
}
.company{
  font-size: 20px;
  text-align:center;
  margin:5px 0 0 0;
}
.add{
  font-size: 50px;
  margin:.1rem 0 0 0;
  text-align:center;
  font-weight: 100
}
.search{
  margin: 0 0 0 0;
  width: 10rem;
  font-weight:300;
}
.table2{
  line-height: 25px;
  font-size: 13px;
  text-align: center;
  color:grey;
  background:#fff;
}
.shortName{
  font-size:.5rem;
  font-weight:300;
}
.fullName{
  color:grey;
  font-size:.42rem;
  font-weight:200;
}
.contact{
  font-size:.35rem;
  font-weight:200;
}
.visit{
  font-size:.35rem;
  font-weight:200;
}
</style>
