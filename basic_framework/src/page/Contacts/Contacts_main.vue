<!-- 联系人列表 -->
<template>
  <div id="main">
    <van-sticky>
    <!--navbar-->
    <van-nav-bar title="联系人" @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
        <img src="../../assets/icon/back.png" class="nleft" />
      </template>
      <template #right>
        <img src="../../assets/icon/add.png" class="nright" />
      </template>
    </van-nav-bar>
    
    <!--搜索框-->
    <van-search v-model="contactName" placeholder="请输入人名或者关键字查询" @search="sousuo" @clear="qk"/>

    <van-dropdown-menu active-color="green" >
      <van-dropdown-item v-model="value1" :options="option1" @change="change1" />
      <van-dropdown-item v-model="value2" :options="option2" @change="change2" />
    </van-dropdown-menu>
    </van-sticky>
    <!--联系人列表-->
    <lxrlist />


  </div>
</template>

<script>
//import x from ''
import lxrlist from "../../components/lxrlist";
export default {
  components: {
    lxrlist
  },
  data() {
    return {
        
        option1: [],
        option2: [
          { text: '创建时间顺序', value: 'a' },
          { text: '创建时间倒序', value: 'b' },
          { text: '拜访时间顺序', value:'c'},
          { text: '拜访时间倒序', value:'d'},
        ],
    };
  },
  computed: {
    value1:{
      get(){
        return this.$store.state.lxrlist.lxrxl1
      },
      set(val){
        this.$store.commit("lxrlist/changelxrxl1",val)
      }
    },
    value2:{
      get(){
        return this.$store.state.lxrlist.lxrxl2
      },
      set(val){
        this.$store.commit("lxrlist/changelxrxl2",val)
      }
    },
    contactName:{
      get(){
        return this.$store.state.lxrlist.contactName
      },
      set(val){
        this.$store.commit("lxrlist/changecontactName",val)
      }
    },
  },
  methods: {
     onClickLeft()
     {
       this.$router.push(this.$store.state.lxrlist.from);
     },
     sousuo()
     {
       //console.log("搜索")
       this.querylxrl()
     },
     qk()
     {
       this.querylxrl()
     },
     onClickRight()
     {
        this.$router.push({
          name:"Contact_add",
          query:{lxraddfrom:"Contacts_main"}
        });
     },
     change1(index){
       //console.log(index)
        this.$store.commit('lxrlist/changelxrxl1',index)
        this.querylxrl()
     },
     change2(index){
       //console.log(index)
        this.$store.commit('lxrlist/changelxrxl2',index)
        this.querylxrl()
     },


     querylxrl()
     {
      let params={
        contactName:this.contactName,
        pageSize:"1000",
      }
      if(this.value1==3)
      {
        params.teamId=this.$store.state.staffInfo.teamId
      }
      else
      {
        params.staffId=this.$store.state.staffInfo.staffId
      }
      if(this.value1==1)
      {
        params.relationship="IN_CHARGE"
      }
      if(this.value1==2)
      {
        params.relationship="SHARED"
      }
      if(this.value2=="c")
      {
        params.isOrderByVisitTime=true
      }
      if(this.value2=='d')
      {
        params.isOrderByVisitTime=false
      }
      if(this.value2=="a")
      {
        params.isASC=true
      }
      if(this.value2=='b')
      {
        params.isASC=false
      }
      console.log(params)
      this.$store.dispatch('lxrlist/querylxrl',params)
     },
  },
  mounted:function(){
    var zw = this.$store.state.staffInfo.position;
    if(zw=="经理")
    {
      this.option1= [
        { text: '全部', value: 0 },
        { text: '我负责的', value: 1 },
        { text: '共享给我的', value: 2 },
        { text: '我团队的', value: 3},
      ]
    }
    else
    {
      this.option1=[
        { text: '全部', value: 0 },
        { text: '我负责的', value: 1 },
        { text: '共享给我的', value: 2 },
      ]
    }
    this.$store.commit('lxrlist/changelxrxl1',0)
    this.$store.commit('lxrlist/changelxrxl2','a')
    this.$store.commit('lxrlist/changecontactName',"")
    this.querylxrl();
    //console.log("lxrlist from:",this.$route.query.lxrlfrom)
    if(this.$route.query.lxrlfrom!=null)
    {
      this.$store.commit('lxrlist/changefrom',this.$route.query.lxrlfrom)
    }
  },
};
</script>

<style scoped>
.nleft {
  width: 0.25rem;
  height:0.5rem;
}
.nright {
  width: 0.5rem;
  height:0.5rem;
}
#main{
  background-color:whitesmoke;
  width: 100%;
  height: 100%;
  position:absolute;
}
</style>