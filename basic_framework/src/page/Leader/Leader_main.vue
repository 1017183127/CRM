<template>
  <div>
    <!-- 头部 -->
    <van-sticky>
    <van-nav-bar left-arrow left-text="退出登录" title="客户关系管理" style="background: #fff" @click-right="onClickRight" @click-left="onClickLeft">
      <template #right>
      <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>
    <van-popup v-model="show" position="top" style="background-color: #F5F5F5;height:88px;width:37%;" 
      :overlay-style="{top:'46px'}">
      <van-cell title="＋新建公司" to="/clientList/newClient"/>
      <van-cell title="＋新建联系人" @click="toContact_add"/>
    </van-popup>
    <!-- 四宫格 -->
    <van-grid>
      <van-grid-item>
          <img :src="require('../../assets/icon/contact.png')" class="img" @click="onClickContacts"/>
          <div style="font-size: 10px;margin: 5px 0 0 0;">联系人</div>
      </van-grid-item>
      <van-grid-item>
          <img :src="require('../../assets/icon/compLogo.png')" class="img" @click="onClickCompany"/>
          <div style="font-size:10px;margin: 5px 0 0 0;">公司</div>
      </van-grid-item>
      <van-grid-item>
          <img :src="require('../../assets/icon/visitLogo.png')" class="img" @click="onClickVisit"/>
          <div style="font-size:10px;margin: 5px 0 0 0;">拜访</div>
      </van-grid-item>
      <van-grid-item>
          <img :src="require('../../assets/icon/teamLogo.png')" class="img" @click="onClickGroup"/>
          <div style="font-size:10px;margin: 5px 0 0 0;">团队</div>
      </van-grid-item>
    </van-grid>
    <!-- 灰色线 -->
    <van-row>
      <van-col span="24" style="background-color: #F5F5F5;"></van-col>
    </van-row>
    <!-- 月新增行 -->
    <van-row type="flex" justify="center" style="line-height: 50px;background:#fff;">
      <van-col span="6">
        <van-dropdown-menu class="drop_down_menu">
          <van-dropdown-item v-model="value1" :options="option1" @change="onMenuChange"/>
        </van-dropdown-menu>
      </van-col>
      <van-col span="6">
        <div v-if="this.value1==0" class="rowDiv">联系人<font size=3 color="#2d7eff" style="font-weight:600;">{{contactCount}}</font>个</div>
        <div v-if="this.value1==1" class="rowDiv">联系人<font size=3 color="#2d7eff" style="font-weight:600;">{{contactCountY}}</font>个</div>
      </van-col>
      <van-col span="6">
        <div v-if="this.value1==0" class="rowDiv">拜访<font size=3 color="#2d7eff" style="font-weight:600;">{{visitCount}}</font>次</div>
        <div v-if="this.value1==1" class="rowDiv">拜访<font size=3 color="#2d7eff" style="font-weight:600;">{{visitCountY}}</font>次</div>
      </van-col>
      <van-col span="6">
        <div v-if="this.value1==0" class="rowDiv">公司<font size=3px color="#2d7eff" style="font-weight:600;">{{companyCount}}</font>个</div>
        <div v-if="this.value1==1" class="rowDiv">公司<font size=3px color="#2d7eff" style="font-weight:600;">{{companyCountY}}</font>个</div>
      </van-col>
    </van-row>
    <!-- 灰色线 -->
    <van-row>
      <van-col span="24" style="background-color: #D3D3D3;"></van-col>
    </van-row>
    </van-sticky>
    <!-- 标签页 -->
    <!-- 月 -->
    <van-tabs v-model="active" sticky offset-top=190 color="#2d7eff" title-active-color="#2d7eff" @click="onClickTabs" v-if="this.value1==0">
        <van-tab title="拜访次数TOP20" name="tab1">
          <van-row type="flex" justify="center" class="table2"  v-for="(list, index) in list" :key="index">
            <van-col span="4">
                <img :src="list.headPicture" class="headimg"/>
            </van-col>
            <van-col span="4">
                <div style="font-size:17px;font-weight:530;margin:0 0 0 5px;color:black;
                  ">{{list.name}}</div>
            </van-col>
            <van-col span="16">
            <van-cell center>
                第<font color="#2d7eff" size=4px style="font-weight:600;">{{index+1}}</font>名
                <template #title style="vertical-align: middle;">
                    <span style="font-size:5px;padding:0 0 0 0;color:grey;">新增拜访记录<font size=3 color="#2d7eff" style="font-weight:600;">{{list.newlyAddedVisitRecordCount}}</font>条</span>
                </template>
                <template #label style="vertical-align: middle;">
                    <span style="font-size:5px;color:grey;">负责<font color="grey" size=3px style="font-weight:600;">{{list.allContactCount}}</font>个联系人</span>
                </template>
            </van-cell>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="负责联系人TOP20" name="tab2">
            <van-row type="flex" justify="center" class="table2" v-for="(list2, index) in list2" :key="index">
            <van-col span="4">
                <img :src="list2.headPicture" class="headimg">
            </van-col>
            <van-col span="4">
                <div style="font-size:17px;font-weight:530;margin:0 0 0 5px;color:black;
                  ">{{list2.name}}</div>
            </van-col>
            <van-col span="16">
            <van-cell center>
                第<font color="#2d7eff" size=4px style="font-weight:600;">{{index+1}}</font>名
                <template #title style="vertical-align: middle;">
                    <span style="font-size:5px;color:grey;">负责<font color="#2d7eff" size=3px style="font-weight:600;">{{list2.allContactCount}}</font>个联系人</span>
                </template>
                <template #label style="vertical-align: middle;">
                    <span style="font-size:5px;padding:0 0 0 0;color:grey;">新增拜访记录<font size=3px style="font-weight:600;">{{list2.newlyAddedVisitRecordCount}}</font>条</span>
                </template>
            </van-cell>
            </van-col>
          </van-row>
        </van-tab>
    </van-tabs>

    <!-- 年 -->
    <van-tabs v-model="active2" sticky offset-top=190 color="#2d7eff" title-active-color="#2d7eff" @click="onClickTabs2" v-if="this.value1==1">
        <van-tab title="拜访次数TOP20" name="tab1">
          <van-row type="flex" justify="center" class="table2"  v-for="(list3, index) in list3" :key="index">
            <van-col span="4">
                <img :src="list3.headPicture" class="headimg"/>
            </van-col>
            <van-col span="4">
                <div style="font-size:17px;font-weight:530;margin:0 0 0 5px;color:black;
                  ">{{list3.name}}</div>
            </van-col>
            <van-col span="16">
            <van-cell center>
                第<font color="#2d7eff" size=4px style="font-weight:600;">{{index+1}}</font>名
                <template #title style="vertical-align: middle;">
                    <span style="font-size:5px;padding:0 0 0 0;color:grey;">新增拜访记录<font size=3px color="#2d7eff" style="font-weight:600;">{{list3.newlyAddedVisitRecordCount}}</font>条</span>
                </template>
                <template #label style="vertical-align: middle;">
                    <span style="font-size:5px;color:grey;">负责<font color="grey" size=3px style="font-weight:600;">{{list3.allContactCount}}</font>个联系人</span>
                </template>
            </van-cell>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="负责联系人TOP20" name="tab2">
            <van-row type="flex" justify="center" class="table2" v-for="(list4, index) in list4" :key="index">
            <van-col span="4">
                <img :src="list4.headPicture" class="headimg">
            </van-col>
            <van-col span="4">
                <div style="font-size:17px;font-weight:530;margin:0 0 0 5px;color:black;
                  ">{{list4.name}}</div>
            </van-col>
            <van-col span="16">
            <van-cell center>
                第<font color="#2d7eff" size=4px style="font-weight:600;">{{index+1}}</font>名
                <template #title style="vertical-align: middle;">
                    <span style="font-size:5px;color:grey;">负责<font color="#2d7eff" size=3px style="font-weight:600;">{{list4.allContactCount}}</font>个联系人</span>
                </template>
                <template #label style="vertical-align: middle;">
                    <span style="font-size:5px;padding:0 0 0 0;color:grey;">新增拜访记录<font size=3px style="font-weight:600;">{{list4.newlyAddedVisitRecordCount}}</font>条</span>
                </template>
            </van-cell>
            </van-col>
          </van-row>
        </van-tab>
    </van-tabs>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  name: 'Leader_main',
  data(){
      return{
        value1: 0,
        active:'',
        active2:'',
        option1: [
            { text: '月新增', value: 0 },
            { text: '年新增', value: 1 },
        ],
        show: false,
      } 
  },
  methods: {
      toContact_add()
      {
        this.$router.push({
          name:"Contact_add",
          query:{lxraddfrom:"Leader_main"}
        });
      },
      onClickRight() {
        this.show = !this.show;
      },
      onClickLeft(){
        this.$router.push('/');
      },
      onClickContacts() {   //点击联系人
          this.$router.push({
            name:'Contacts_main',
            query:{lxrlfrom:"Leader_main"}
          })
      },
      onClickCompany() {    //点击公司
          this.$router.push({
            path: "/clientList",
            query:{
              from: "Leader_main"
            }
          });
      },
      onClickVisit() {      //点击拜访
          this.$router.push({
            path: '/Visit_main',
            query:{
              from: "Leader_main",
            }
          });
      },
      onClickGroup() {      //点击团队
          this.$router.push('/Team');
      },
      onClickTabs(tab1,拜访次数TOP20){
        // console.log("111")
      },
      onClickTabs(tab2,负责联系人TOP20){
        // console.log("222")
        let params = {
          orderBy:"allContactCount",
          pageNum:1,
          limitedTime:'MONTH'
        }
        this.$store.dispatch('leaderMain/getStaffListByContact', params);
      },
      onMenuChange(){
        // console.log("222")
        let params = {
          orderBy:"newlyAddedVisitRecordCount",
          pageNum:1,
          limitedTime:'YEAR'
        }
        let paramsVisitRecordCountInThisY = {
          limitedTime:'YEAR'
        }
        let paramsCompanyCountThisY = {
          limitedTime:'YEAR'
        }
        let paramsContactCountThisY = {
          limitedTime:'YEAR'
        }
        this.$store.dispatch('leaderMain/getStaffListByVisitY', params);
        this.$store.dispatch('leaderMain/getNewlyAddedVisitRecordCountInThisY', paramsVisitRecordCountInThisY);
        this.$store.dispatch('leaderMain/getNewlyAddedCompanyThisY', paramsCompanyCountThisY);
        this.$store.dispatch('leaderMain/getContactCountY', paramsContactCountThisY);
      },
      onClickTabs2(tab2,负责联系人TOP20){
        // console.log("222")
        let params = {
          orderBy:"allContactCount",
          pageNum:1,
          limitedTime:'YEAR'
        }
        this.$store.dispatch('leaderMain/getStaffListByContactY', params);
      },
  },
  mounted:function(){
    let paramsVisitRecordCountInThisM = {
      limitedTime:'MONTH'
    }
    let paramsCompanyCountThisM = {
      limitedTime:'MONTH'
    }
    let paramsContactCountThisM = {
      limitedTime:'MONTH'
    }
    let paramsStaff = {
      orderBy:"newlyAddedVisitRecordCount",
      pageNum:1,
      limitedTime:'MONTH'
    }
    this.$store.dispatch('leaderMain/getNewlyAddedVisitRecordCountInThisM', paramsVisitRecordCountInThisM);
    this.$store.dispatch('leaderMain/getNewlyAddedCompanyThisM', paramsCompanyCountThisM);
    this.$store.dispatch('leaderMain/getContactCount', paramsContactCountThisM);
    this.$store.dispatch('leaderMain/getStaffListByVisit', paramsStaff);
  },
  computed:{
    visitCount:{
      get(){
        return this.$store.state.leaderMain.visitCount;
      }
    },
    companyCount:{
      get(){
        return this.$store.state.leaderMain.companyCount;
      }
    },
    visitCountY:{
      get(){
        return this.$store.state.leaderMain.visitCountY;
      }
    },
    companyCountY:{
      get(){
        return this.$store.state.leaderMain.companyCountY;
      }
    },
    list:{
      get(){
        return this.$store.state.leaderMain.list;
      }
    },
    list2:{
      get(){
        return this.$store.state.leaderMain.list2;
      }
    },
    list3:{
      get(){
        return this.$store.state.leaderMain.list3;
      }
    },
    list4:{
      get(){
        return this.$store.state.leaderMain.list4;
      }
    },
    contactCount:{
      get(){
        return this.$store.state.leaderMain.contactCount;
      }
    },
    contactCountY:{
      get(){
        return this.$store.state.leaderMain.contactCountY;
      }
    },
  }
}
</script>

<style scoped>
.img{
    width: 40px;
    height: 40px;
    vertical-align: middle;
}
.rowDiv{
    font-size: 10px;
    vertical-align: middle;
    text-align: center;
}
.drop_down_menu{
    color:#2d7eff;
}
.table2{
    align-items: center;
    background-color: #fff;
}
.headimg{
  border-radius:50%;
  width: 40px;
  height: 40px;
  padding: 5px 5px 5px 5px;
  margin: 10px 0 0 .25rem;
}
.van-tab{
  width: 10rem;
}
.van-popup--top{
  top: 46px;
  left: 6.5rem;
}
</style>
