<!-- 组件说明 -->
<template>
  <div class>
    <!--navbar-->
    <van-nav-bar title="联系人"   right-text="保存" @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
        <img src="../../assets/icon/back.png" class="nleft" />
      </template>
    </van-nav-bar>
    
    <!--联系人信息-->
    <!--输入姓名-->
    <van-cell-group>
      <van-field v-model="name" placeholder="请输入或添加手机联系人">
        <template #label>
        <label style="color:#A9A9A9">姓名:</label>
      </template>
      </van-field>
    </van-cell-group>
    <!--输入公司-->
    <van-cell-group>
      <van-field v-model="companyFullName" readonly right-icon="arrow" placeholder="请选择" @click-right-icon="xzc">
        <template #label>
          <label style="color:#A9A9A9">公司:</label>
        </template>
      </van-field>
    </van-cell-group>

    <!--输入职务-->
    <van-cell-group>
      <van-field v-model="duty" placeholder="请输入">
        <template #label>
        <label style="color:#A9A9A9">职务:</label>
      </template>
      </van-field>
    </van-cell-group>
    <!--地址-->
    <van-cell-group>
      <van-field v-model="address" placeholder="暂无">
        <template #label>
        <label style="color:#A9A9A9">地址:</label>
      </template>
      </van-field>
    </van-cell-group>
    <!--联系方式-->
    <van-cell value="联系方式" style="background-color:#F5F5F5" />
    <!--手机-->
    <van-cell-group>
      <van-field v-model="phone" placeholder="请输入手机号">
        <template #label>
        <label style="color:#A9A9A9">手机:</label>
      </template>
      </van-field>
    </van-cell-group>
    <!--座机-->
    <van-cell-group>
      <van-field v-model="landline" placeholder="请输入座机">
        <template #label>
        <label style="color:#A9A9A9">座机:</label>
      </template>
      </van-field>
    </van-cell-group>
    <!--邮箱-->
    <van-cell-group>
      <van-field v-model="email" placeholder="请输入邮箱">
        <template #label>
        <label style="color:#A9A9A9">邮箱:</label>
      </template>
      </van-field>
    </van-cell-group>
    <!--标签-->
    <van-cell value="标签" style="background-color:#F5F5F5" />
    <!--固定标签-->
    <div id="info_tags">
      <van-row>
        <van-col span=6> <label style="color:#A9A9A9">选择固定标签:</label> </van-col>

        <van-col style="background-color: #fff">
              <van-tag v-if="click1" id="tag" color="#f7f7f7" @click="onClicktag1"> <font color="#000000">一般 </font></van-tag>
              <van-tag v-if="click1p" id="tag" type="primary" @click="onClicktag1">一般</van-tag>

              <van-tag v-if="click2" id="tag" color="#f7f7f7" @click="onClicktag2" > <font color="#000000"> 重要 </font></van-tag>
              <van-tag v-if="click2p" id="tag" type="primary" @click="onClicktag2" >重要</van-tag>
                        
              <van-tag v-if="click3" id="tag"  color="#f7f7f7" @click="onClicktag3"> <font color="#000000">客户</font></van-tag>
              <van-tag v-if="click3p" id="tag"  type="primary" @click="onClicktag3">客户</van-tag>
        </van-col>
      </van-row>
    </div>

    <!--自定义标签-->
    <van-cell-group>
      <van-field v-model="zdy" placeholder="创建自定义标签 标签间用逗号分隔">
      </van-field>
    </van-cell-group>
    <!--标签备注-->
    <van-cell-group>
      <van-field v-model="note" placeholder="请输入">
        <template #label>
        <label style="color:#A9A9A9">备注:</label>
      </template>
      </van-field>
    </van-cell-group>
    <!--标签权限-->
    <van-cell-group>
      <van-field v-model="qx" readonly right-icon="arrow" placeholder="请选择" @click-right-icon="toshare">
        <template #label>
          <label style="color:#A9A9A9">权限:</label>
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
//import x from ''
import { Toast } from 'vant';
export default {
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    name:{
      get(){
        return this.$store.state.contactsadd.name
      },
      set(val){
        this.$store.commit("contactsadd/changename",val)
      }
    },
    nameSpell:{
      get(){
        return this.$store.state.contactsadd.nameSpell
      },
      set(val){
        this.$store.commit("contactsadd/changenameSpell",val)
      }
    },
    companyId:{
      get(){
        return this.$store.state.contactsadd.companyId
      },
    },
    companyFullName:{
      get(){
        return this.$store.state.contactsadd.companyFullName
      },
    },
    duty:{
      get(){
        return this.$store.state.contactsadd.duty
      },
      set(val){
        this.$store.commit("contactsadd/changeduty",val)
      }
    },
    address:{
      get(){
        return this.$store.state.contactsadd.address
      },
      set(val){
        this.$store.commit("contactsadd/changeaddress",val)
      }
    },
    phone:{
      get(){
        return this.$store.state.contactsadd.phone
      },
      set(val){
        this.$store.commit("contactsadd/changephone",val)
      }
    },
    landline:{
      get(){
        return this.$store.state.contactsadd.landline
      },
      set(val){
        this.$store.commit("contactsadd/changelandline",val)
      }
    },
    email:{
      get(){
        return this.$store.state.contactsadd.email
      },
      set(val){
        this.$store.commit("contactsadd/changeemail",val)
      }
    },
    click1:{
      get(){
        return this.$store.state.contactsadd.click1
      },
      set(val){
        this.$store.commit("contactsadd/changeclick1",val)
      }
    },
    click1p:{
      get(){
        return this.$store.state.contactsadd.click1p
      },
      set(val){
        this.$store.commit("contactsadd/changeclick1p",val)
      }
    },
    click2:{
      get(){
        return this.$store.state.contactsadd.click2
      },
      set(val){
        this.$store.commit("contactsadd/changeclick2",val)
      }
    },
    click2p:{
      get(){
        return this.$store.state.contactsadd.click2p
      },
      set(val){
        this.$store.commit("contactsadd/changeclick2p",val)
      }
    },
    click3:{
      get(){
        return this.$store.state.contactsadd.click3
      },
      set(val){
        this.$store.commit("contactsadd/changeclick3",val)
      }
    },
    click3p:{
      get(){
        return this.$store.state.contactsadd.click3p
      },
      set(val){
        this.$store.commit("contactsadd/changeclick3p",val)
      }
    },
    zdy:{
      get(){
        return this.$store.state.contactsadd.zdy
      },
      set(val){
        this.$store.commit("contactsadd/changezdy",val)
      }
    },
    note:{
      get(){
        return this.$store.state.contactsadd.note
      },
      set(val){
        this.$store.commit("contactsadd/changenote",val)
      }
    },
    shareList:{
      get()
      {
        return this.$store.state.contactsadd.staffInfo
      }
    },
    qx:{
      get()
      {
        var list=[];   
        //处理权限
        var str=this.$store.state.staffInfo.name+"(负责)";
        for(var i=0;i<this.shareList.length;i++)
        {
          if(this.shareList[i]!="")
          //console.log(this.shareList[i])
          list.push(this.shareList[i].name);
        }
        if(list.length)
        {
          str+="，";
          str+=list.join("(共享)，");
          str+="(共享)";
        }
        return str;
     },
    }
  },
  methods: {
      onClicktag1() {     //点击标签1
          this.click1 = !this.click1;
          this.click1p = !this.click1p;
      },
      onClicktag2() {     //点击标签2
          this.click2 = !this.click2;
          this.click2p = !this.click2p;
      },
      onClicktag3() {     //点击标签3
          this.click3 = !this.click3;
          this.click3p = !this.click3p;
      },
      xzc()
      {
        this.$router.push({
        name:"Contact_company",
        query:{from:"Contact_add"}
        })
      },
      toshare()
      {
        this.$router.push("Contact_add_share")
      },
     onClickLeft()
     {
        //this.$store.commit("contactsadd/chushihua")
        this.$router.push(this.$store.state.contactsadd.from);
     },
     
     onClickRight()
     {
        //这里会有一个向后台提交数据的东西
        //this.$store.dispatch()
        // this.$router.go('-1');
        if(this.name=="")
        {
          Toast("请输入姓名");
          return;
        }
        if(this.companyId=="")
        {
          Toast("请选择公司");
          return;
        }
        if(this.duty=="")
        {
          Toast("请输入职务");
          return;
        }
        if(this.address=="")
        {
          Toast("请输入职务");
          return;
        }
        let params= {
          name: this.name,
          nameSpell:"",
          companyId: this.companyId,
          companyFullName: this.companyFullName,
          duty: this.duty,
          address:this.address,
          phone:this.phone,
          landline:this.landline,
          email:this.email,
          note:this.note,
          tagList:[],
          creator:this.$store.state.staffInfo.staffId,
          sharelist:this.$store.state.contactsadd.sharelist,
        }
        if(this.click1p==true)
        {
          params.tagList.push(
            {tagId:"1",
             value:"一般",
             type:"",
             isFixed:true})
        }
        if(this.click2p==true)
        {
          params.tagList.push(
            {tagId:"2",
             value:"重要",
             type:"",
             isFixed:true})
        }
        if(this.click3p==true)
        {
          params.tagList.push(
            {tagId:"3",
             value:"客户",
             type:"",
             isFixed:true})
        }
        if(this.zdy!="")
        {
          var result=this.zdy.split(/[，]|,/);
          for(var i=0;i<result.length;i++){
          params.tagList.push(
          {
            tagId:"",
            value:result[i],
            type:"",
            isFixed:false})
          }
        }
        //console.log(params);
        //for((item,index) in (scope.row.auditUser|| '').split(','))
        //{
        //  Toast(item);
        //}

        //点击保存后返回联系人列表
        this.$store.dispatch("contactsadd/createlxr",params).then(() => {
          //console.log(response);
          Toast("保存");
          this.$router.push(this.$store.state.contactsadd.from);
        })
     },
  },
  mounted:function(){
    //console.log(this.$route.query.idc)
    if(this.$route.query.idc>=0)
    {
      //console.log(this.$store.state.CompanyList.companyInfoList)
      this.$store.commit("contactsadd/changecompanyId",this.$store.state.CompanyList.companyInfoList[this.$route.query.idc].companyId)
      this.$store.commit("contactsadd/changecompanyFullName",this.$store.state.CompanyList.companyInfoList[this.$route.query.idc].fullName)
    }
    //console.log(this.$store.state.contactsadd.staffInfo)
    //console.log(this.companyId)
    //console.log(this.companyFullName)
    if(this.$route.query.lxraddfrom!=null)
    {
      this.$store.commit('contactsadd/changefrom',this.$route.query.lxraddfrom)
      this.$store.commit("contactsadd/chushihua")
    }
  },
};
</script>

<style scoped>

.nleft {
  width: 0.25rem;
  height:0.5rem;
}

#info_tags{
  background-color:white;
  margin-bottom: 0.01rem;
  padding-top:0.35rem;
  padding-bottom:0.35rem;
  padding-left: 0.5rem;
  padding-right:0.1rem;
  font-size: 0.35rem;
  text-align: left;
}
#tag{
  margin-right:0.3rem;
}
</style>