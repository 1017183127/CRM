<template>
  <div class="main">
    <van-nav-bar title="共享联系人" left-arrow  @click-left="onClickLeft" @click-right="changeTeam">
        <template #right>
          <!-- <van-icon name="setting-o"></van-icon> -->
          <span style="color:#2d7eff;padding-left:0.1rem">{{team_cur}}</span>
        </template>
    </van-nav-bar>
            
    <form action="/">
      <van-search v-model="value" :clearable="true" placeholder="请输入员工ID或姓名或职务" show-action @clear="onSearch"  @search="onSearch">
          <template #action> <div @click="onSearch">搜索</div> </template>
      </van-search>
    </form>

    

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- <div id="card" v-for="(item,index) in sharedList" :key="item.staffId"> -->
            <!-- <span>已共享</span><br/>
            <span v-for="(item,index) in sharedList" :key="index">
                <van-tag v-if="show[index]" closeable size="large"  type="primary" @close="close(index,item.staffId)" style="margin-right:0.05rem">
                {{item.name}} 
                </van-tag>
            </span> -->

            <!-- <van-row>
                <van-col span=6> <span>{{item.name}}</span> </van-col>
                <van-col span=6> <span style="color:#A9A9A9;font-size:0.4rem">{{item.position}}</span> </van-col>
                <van-col span=8> <span style="color:#A9A9A9;font-size:0.4rem">{{item.staffId}}</span> </van-col>
            </van-row>
            <van-row >
                <van-col offset=19> <van-button round size="small" color="#2d7eff" @click="cancelShare(item.staffId,teamControl)">取消分享</van-button> </van-col>
            </van-row> -->
        <!-- </div> -->
                <!-- <div id="card" v-for="(item,index) in unsharedList" :key="index">
            <van-row>
                <van-col span=6> <span>{{item.name}}</span> </van-col>
                <van-col span=6> <span style="color:#A9A9A9;font-size:0.4rem">{{item.position}}</span> </van-col>
                <van-col span=8> <span style="color:#A9A9A9;font-size:0.4rem">{{item.staffId}}</span> </van-col>
            </van-row>
            <van-row >
                <van-col offset=19> <van-button round  size="small" color="#2d7eff" @click="share(item.staffId,teamControl)">&nbsp;&nbsp;&nbsp;分&nbsp;享&nbsp;&nbsp;&nbsp;</van-button> </van-col>
            </van-row>
        </div> -->
        <van-cell-group border:false style='margin-top:0.1rem'>
              <van-cell style="height:2rem;"  v-for="(item,index) in sharedList" :key="item.staffId">
                  <template #title>
                        <van-image round style="height:1.4rem; width:1.4rem;float:left;display:inline-block;" :src="item.headPicture"/>
                        <label style='width:1.5rem;height:1rem;display:inline-block;font-size:0.5rem;margin-top:0.5rem;margin-left:0.4rem;float:left'>{{item.name}}</label>
                        <div style='float:left;height:0.5rem;display:inline-block;margin-left:0.3rem; '>
                            <div style='font-size:0.4rem; '>&#8197;&#8197;&#8197;&#8197;职务：<span style='font-size:0.4rem;color:#6495ED'>{{item.position}}</span></div>
                            <div style='font-size:0.4rem; '>员工ID：<span style='font-size:0.4rem;color:#6495ED'>{{item.staffId}}</span></div>
                        </div>
                        <van-button round size="small" color="#1E90FF" style="float:right;margin-top:0.5rem" @click="cancelShare(item.staffId,teamControl)">取消分享</van-button>
                  </template>
              </van-cell>
        </van-cell-group>
        <van-cell-group border:false style='margin-top:0.1rem'>
              <van-cell style="height:2rem;"  v-for="(item,index) in unsharedList" :key="item.staffId">
                  <template #title>
                        <van-image round style="height:1.4rem; width:1.4rem;float:left;display:inline-block;" :src="item.headPicture"/>
                        <label style='width:1.5rem;height:1rem;display:inline-block;font-size:0.5rem;margin-top:0.5rem;margin-left:0.4rem;float:left'>{{item.name}}</label>
                        <div style='float:left;height:0.5rem;display:inline-block;margin-left:0.3rem; '>
                            <div style='font-size:0.4rem; '>&#8197;&#8197;&#8197;&#8197;职务：<span style='font-size:0.4rem;color:#6495ED'>{{item.position}}</span></div>
                            <div style='font-size:0.4rem; '>员工ID：<span style='font-size:0.4rem;color:#6495ED'>{{item.staffId}}</span></div>
                        </div>
                        <van-button round  size="small" color="#1E90FF" style="float:right;margin-top:0.5rem" @click="share(item.staffId,item.teamId,teamControl)">&nbsp;&nbsp;&nbsp;分&nbsp;享&nbsp;&nbsp;&nbsp;</van-button>
                  </template>
              </van-cell>
        </van-cell-group>

    </van-pull-refresh>

    



  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    data () {
    return {
        isLeader:false,
        team_cur:'全部团队',
        teamControl:true,
        show: [],
        isLoading: false,
        value:""//搜索框输入值
    };
  },
  methods: {
    setLeaderPage(){
      this.teamControl=false;
      this.isLeader=true;
      this.team_cur='';
    },
    changeTeam(){
      if(!this.isLeader)
      {
        this.teamControl=!this.teamControl;
        if(this.teamControl) this.team_cur='全部团队'
        else  this.team_cur='我的团队'
      }
      // var a="";var b="123";
      // console.log("空字符串长度："+a.length) 0
      // console.log("123长度："+b.length) 3
      this.getShareList2("",this.teamControl);

    },
    onRefresh() {
      setTimeout(() => {
        console.log("teamcontrol");
        console.log(this.teamControl)
        this.getShareList2("",this.teamControl);
        // Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 10);
    },
    onClickLeft(){
      this.$router.push({name:this.$route.query.from,
                query:{id:this.$route.query.id,
                idc:-1}});
      // Toast('返回');
    },
    getTeamData()
    {
        let params={
            teamId:this.teamId,
            pageSize:10000,
            orderBy:"newlyAddedVisitRecordCount"
        };
        this.$store.dispatch("info_907/getTeam",params);
    },
    share(id,tid,teamid)//选中进行分享
    {
      if(teamid)
        var params={  
            contactId:this.$route.query.contactId, 
            companyId:this.$route.query.companyId,
            teamId:this.teamId ,
            staffInfo:{ staffId:id,teamId:tid }  
        }
      else
      var params={  
            contactId:this.$route.query.contactId, 
            companyId:this.$route.query.companyId,
            staffInfo:{ staffId:id,teamId:tid }  
        }
        this.$store.dispatch("info_907/share",params);
        // this.getShareList();
        // this.refresh();
    },
    cancelShare(staffId,teamid)//取消分享
    {
        let params={  
            contactId:this.$route.query.contactId, 
            staffId:staffId
        }
        if(teamid)
        var p={params,teamId:this.teamId}
        else
        var p={params}
        console.log("cancelShare");console.log(p);
        this.$store.dispatch("info_907/cancelShare",p);
        // this.getShareList();
        // this.refresh();
    },
    setTags()
    {
        // if(this.sharedList!=null)
        for(var i=0;i<this.sharedList.length;i++)
          this.show.push(true);
    },
    // close(index,SID) {//关闭标签
    //   this.$set(this.show, index, false)
    //   this.cancelShare(SID);
    // },
    onSearch()
    {
        console.log(this.value);
        this.getShareList2(this.value,this.teamControl)
    },
    getShareList()
    {
      let params={
        contactId:this.$route.query.contactId, teamId:this.teamId};
      console.log("团队id是："+params.teamId);
      this.$store.dispatch("info_907/getShareList",params);
    },
    getShareList2(keyword,teamid)
    {
      if(teamid)//teamid为布尔值，等于teamContrl
        if(keyword.length!=0)
        var params={
          contactId:this.$route.query.contactId, teamId:this.teamId, keyword:keyword};
        else
        var params={
          contactId:this.$route.query.contactId, teamId:this.teamId};
      else
        if(keyword.length!=0)
        var params={
          contactId:this.$route.query.contactId, keyword:keyword};
        else
        var params={
          contactId:this.$route.query.contactId};
      console.log("团队id是："+params.teamId);
      this.$store.dispatch("info_907/getShareList",params);
    }
  },
  computed:{
    teamId:{
        get(){
            return this.$store.state.staffInfo.teamId;
        }
    },
    staffId:{
        get(){
            return this.$store.state.staffInfo.staffId;
        }
    },
    sharedList:{
      get(){
        return this.$store.state.info_907.sharedList;
      },
    },
    unsharedList:{
      get(){
        return this.$store.state.info_907.unsharedList;
      },
    },
    
  },
  mounted:function(){
    // if(this.$store.state.staffInfo.teamId=="TID100")
    // {
    //   this.setLeaderPage();
    //   this.changeTeam();
    // }
    // else
      this.getShareList();
    // this.setTags();
    console.log("sharelist");
    console.log(this.sharedList);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main{
  
  width:100%;
  height: 100%;
  background-color:whitesmoke;
  position: absolute;
}


#card{
  background-color:white;
  margin-bottom:0.1rem;
  padding:0.4rem;
  font-size: 0.5rem;
  text-align: left;
}

#header{
  background-color:white;
  margin-bottom:0.1rem;
  padding-left:0.4rem;
  font-size: 0.25rem;
  text-align: left;
}
a {
  color: rgb(58, 39, 238);
}
</style>
