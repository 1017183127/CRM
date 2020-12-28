<template>
  <div class="Contacts_detail">
    <van-nav-bar title="联系人" left-arrow  @click-left="onClickLeft" @click-right="toEdit">
        <template #right>
          编辑
        </template>
    </van-nav-bar>

    <div id="header">
      <label id="name">{{info.name}}</label>

        <van-row id="info">
          <van-col span=6><label style="color:#A9A9A9">公司：</label> </van-col>
          <van-col span=5> <label>{{info.companyShortName}}</label> </van-col>
          <van-col span=11> <label style="color:#A9A9A9">{{info.companyFullName}}</label> </van-col>
          <van-col span=2 type="flex"><van-icon name="arrow" @click="toCompany"/> </van-col>
        </van-row>
    </div>

        <van-row id="info" >
          <van-col span=6> <label style="color:#A9A9A9">职务：</label> </van-col>
          <van-col> <label >{{info.duty}}</label> </van-col>
        </van-row>



    <van-cell center title="联系方式" style="background-color:#F5F5F5"/>
      <div id="info" style="margin-bottom:0.03rem">
          <van-row>
            <van-col span=6> <label style="color:#A9A9A9">手机：</label> </van-col>
            <van-col span=16> <label style="color:rgb(58, 39, 238)">{{info.phone}}</label> </van-col>
            <van-col><van-icon :name="icon_phone" size=0.4rem></van-icon></van-col>
          </van-row>
      </div>

      <div id="info" style="margin-bottom:0.03rem">
          <van-row>
            <van-col span=6> <label style="color:#A9A9A9">座机：</label> </van-col>
            <van-col span=16> <label style="color:rgb(58, 39, 238)">{{info.landline}}</label> </van-col>
            <van-col> <van-icon :name="icon_phone" size=0.4rem></van-icon> </van-col>
          </van-row>
      </div>

      <div id="info">
          <van-row>
            <van-col span=6> <label style="color:#A9A9A9">邮箱：</label> </van-col>
            <van-col> <label >{{info.email}}</label> </van-col>
          </van-row>
      </div>

    <van-cell center title="标签" style="background-color:#F5F5F5;margin-bottom:0.01rem"/>
      <div id="info">
          <van-row>
            <van-col span=6> <label style="color:#A9A9A9">固定：</label> </van-col>
            <!-- <van-col v-for="i in tags_fixed"> <label >{{i}}</label> </van-col> -->
            <van-col > <label >{{str_tags_fixed}}</label> </van-col>
          </van-row>
      </div>
      <div id="info" style="margin-bottom:0.1rem">
          <van-row>
            <van-col span=6> <label style="color:#A9A9A9">自定义：</label> </van-col>
            <!-- <van-col > <label v-for="i in tags_editable">{{i}}</label> </van-col> -->
            <van-col > <label >{{str_tags_editable}}</label> </van-col>
          </van-row>
      </div>
      <div id="info" style="margin-bottom:0.1rem">
          <van-row>
            <van-col span=6> <label style="color:#A9A9A9">备注：</label> </van-col>
            <van-col > <label >{{info.note}}</label> </van-col>
          </van-row>
      </div>
      <div id="info">
          <van-row type="flex">
            <van-col span=6> <label style="color:#A9A9A9">权限：</label> </van-col>
            <!-- <van-col > <label v-for="i in authority">{{i}}</label> </van-col> -->
            <van-col > <label >{{str_authority}}</label> </van-col>
          </van-row>
      </div>
      <div id="buttons">
<!--到新建拜访页-->
          <van-icon :name="icon_newVisit" size=3rem @click="toNewVisit"></van-icon>
        
        &nbsp;&nbsp;
          <van-icon :name="icon_visitRecord" size=3rem @click="toVisitRecord"></van-icon>
        
      </div>

  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    data () {
    return {
    index:3,

      str_tags_fixed:'',
      str_tags_editable:'',
      str_authority:'',

      icon_phone: require('../../assets/icon/phone.png'),
      icon_newVisit: require('../../assets/icon/newVisitButton.png'),
      icon_visitRecord: require('../../assets/icon/visitRecordButton.png'),

    };
  },
  methods: {
    sleep(numberMillis) {
      var now = new Date();
      var exitTime = now.getTime() + numberMillis;
      while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
        return;
          }
    },
    toCompany(){
      this.$store.dispatch("info_907/getCompany",{companyId:this.info.companyId}).then(res => {
        this.$router.push
        ({
            name: 'companyInfo',
            query: {x:res.companyInfo,id:this.$route.query.id,from:'Contacts_detail'}
        })
      }).catch( err => {
          console.log(err);
      })    
    },

    toNewVisit()
    {
      this.$router.push({
        name:"Visit_repeat",
        query: {c: this.info.companyFullName,n:this.info.name,p:this.info.position,
        contactId:this.info.contactId,staffId: this.$store.state.staffInfo.staffId,teamId:this.$store.state.staffInfo.teamId,from:"Contacts_detail"}
      })
    },
    toVisitRecord()
    {
      this.$router.push(
        {
          path:"/Visit_main_display",
          query: {from:'Contacts_detail',id:this.$route.query.id,staffId: this.$store.state.staffInfo.staffId,teamId:this.$store.state.staffInfo.teamId,contactId:this.info.contactId}
        }
      )
    },
    toEdit(){
      // console.log("当前员工信息")
      // console.log(this.info.creator);
      // console.log(this.$store.state.staffInfo.staffId);
      if(this.info.creator==this.$store.state.staffInfo.staffId)
        this.$router.push
        ({
            name: 'Contacts_edit',
            query: {id: this.$route.query.id}
        })
      else
        Toast("权限不足，无法编辑！");
    },
    onClickLeft(){
      
      if(this.route_params)
        this.$router.push({
          name:this.$store.state.info_907.back,
          query:this.route_params
        });
      else
        this.$router.push(this.$store.state.info_907.back);
      // Toast('返回');
    },
    transTags(){
      // console.log(this.info);
      var fixed=[];var editable=[];
      //处理标签
      if(this.tagList&&this.tagList.length)
      for(var i=0;i<this.tagList.length;i++)
        switch(this.tagList[i].tagId)
        {
          case "1"://一般
            fixed.push("一般");
            break;
          case "2"://重要
            fixed.push("重要");
            break;
          case "3"://客户
            fixed.push("客户");
            break;
          default:
            editable.push(this.tagList[i].value);
        }

      this.str_tags_fixed=fixed.join("，");
      this.str_tags_editable=editable.join("，");
      //处理权限
      this.str_authority=this.info.creatorName+"(负责)";
      var list=[];
      console.log("share list")
      console.log(this.shareList)
      if(this.shareList)
        for(var i=0;i<this.shareList.length;i++)
        {
          if(this.shareList[i]!="")
          list.push(this.shareList[i].name);
        }
      if(list.length)
      {
        this.str_authority+="，";
        this.str_authority+=list.join("(共享)，");
        this.str_authority+="(共享)";
      }
    }
  },
  computed:{
    info:{
      get(){
        return this.$store.state.lxrlist.lx[this.$route.query.id];
      }
    },
    tagList:{
      get(){
        return this.$store.state.lxrlist.lx[this.$route.query.id].tagList;
      }
    },
    shareList:{
      get(){
        return this.$store.state.lxrlist.lx[this.$route.query.id].shareList;
      }
    },
    route_params:{
      get(){
        return this.$store.state.info_907.route_params;
      }
    },
    companyDetail:{
      get(){
        return this.$store.state.info_907.companyDetail;
      }
    }
  },
  mounted:function(){
    if(this.$route.query.from)
      this.$store.commit("info_907/setBack",this.$route.query.from);
    if(this.$route.query.params)
      this.$store.commit("info_907/setRouteParams",this.$route.query.params);
    this.transTags();
    console.log("联系人信息：")
    console.log(this.info)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Contacts_detail{
  
  width:100%;
  height: 100%;
  background-color:whitesmoke;
  position: absolute;
}

.van-cell{

  font-size: 0.35rem;
  padding-left:0.5rem;
}



#header{

  padding-top: 0.3rem;
  font-size: 0.5rem;
  text-align: center;
  background-color:white
}
#info{
  background-color:white;
  margin-bottom: 0.04rem;

  padding-top:0.35rem;
  padding-bottom:0.35rem;
  padding-left: 0.5rem;
  font-size: 0.35rem;
  text-align: left;
}
#buttons{
  background-color:whitesmoke;
  text-align: center;
  
}

a {
  color: rgb(58, 39, 238);
}
</style>
