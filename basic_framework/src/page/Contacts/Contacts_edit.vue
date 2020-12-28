<template>
  <div class="Contacts_edit">

    <van-nav-bar title="联系人" left-arrow  @click-left="onClickLeft" right-text="保存" @click-right="save"></van-nav-bar>

    <div id="header">
      <label id="name">{{info.name}}</label>

        <van-row id="info">
          <van-col span=6><label style="color:#A9A9A9" >公司：</label> </van-col>
          <van-col span=5> <label>{{info.companyShortName}}</label> </van-col>
          <van-col span=11> <label style="color:#A9A9A9">{{info.companyFullName}}</label> </van-col>
          <van-col span=2> <van-icon name="arrow" @click="toCompanySel"/> </van-col>
        </van-row>
    </div>

        <!-- <van-row id="info" >
          <van-col span=6> <label style="color:#A9A9A9">职务：</label> </van-col>
          <van-col> <label >{{info.duty}}</label> </van-col>
        </van-row> -->

    <van-cell-group >
      <van-field center v-model='info.duty'>
        <template #label>
          <label style="color:#A9A9A9">职务：</label>
        </template>  
      </van-field> 
    </van-cell-group>

    <van-cell-group >
      <van-field center v-model='info.address'>
        <template #label>
          <label style="color:#A9A9A9">地址：</label>
        </template>  
      </van-field> 
    </van-cell-group>


    <van-cell center title="联系方式"  style="background-color:#F5F5F5"/>
    <van-cell-group >
      <van-field type="digit" center v-model='info.phone'>
        <template #label>
          <label style="color:#A9A9A9">手机：</label>
        </template>  
      </van-field> 
    </van-cell-group>

    <van-cell-group>
      <van-field type="digit" center v-model='info.landline'>
        <template #label>
          <label style="color:#A9A9A9">座机：</label>
        </template>  
      </van-field>
    </van-cell-group>
    
    <van-cell-group>
      <van-field center v-model='info.email'>
        <template #label>
          <label style="color:#A9A9A9">邮箱：</label>
        </template>  
      </van-field>
    </van-cell-group>
    
  

    <van-cell center title="标签" style="background-color:#F5F5F5"/>
    <div id="info_tags">
      <van-row>
        <van-col span=6> <label style="color:#A9A9A9">固定：</label> </van-col>

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
    

    <van-cell-group style="margin-bottom:0.05rem">
      <van-field center v-model='str_tags_editable' >
        <template #label>
          <label style="color:#A9A9A9">自定义：</label>
        </template>  
      </van-field>
    </van-cell-group>
    

    
            
    <van-cell-group style="margin-bottom:0.05rem">
      <van-field center v-model='info.note' >
        <template #label>
          <label style="color:#A9A9A9">备注：</label>
        </template>  
      </van-field>
    </van-cell-group>
    

    <div id="info">
        <van-row type="flex" justify="space-around">
          <van-col span=6> <label style="color:#A9A9A9">权限：</label> </van-col>
          <van-col span=16> <label >{{str_authority}}</label> </van-col>
          <van-col span=2> <van-icon name="arrow" @click="toShare"/> </van-col>
          <!--到权限选择页-->
        </van-row>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';
import newlxr from '../../components/newlxr';

export default {
  components:{
    newlxr,
  },
    data () {
    return {

      // str_tags_fixed:'',
      // str_tags_editable:'',
      // str_authority:'',
      
      click1: true,
      click1p: false,
      click2: true,
      click2p: false,
      click3: true,
      click3p: false,




      icon_location: require('../../assets/icon/location.png'),


    };
  },
  computed:{
    info:{
      get(){
        return this.$store.state.info_907.info;
        
      }
    },
    tagList:{
      get(){
        return this.$store.state.info_907.info.tagList;
      }
    },
    shareList:{
      get(){
        return this.$store.state.info_907.info.shareList;
      }
    },
    str_authority:{
      get(){
          var list=[];
          console.log("share list")
          console.log(this.shareList)   
                  //处理权限
          var str=this.info.creatorName+"(负责)";
          if(this.shareList)
            for(var i=0;i<this.shareList.length;i++)
            {
              if(this.shareList[i]!="")
              list.push(this.shareList[i].name);
            }
          if(list.length)
          {
            str+="，";
            str+=list.join("(共享)，");
            str+="(共享)";
          }
          return str;
      }
    },
    str_tags_editable:{
      get(){
        var editable=[];
          //处理标签
          if(this.tagList&&this.tagList.length)
          for(var i=0;i<this.tagList.length;i++)
            switch(this.tagList[i].tagId)
            {
              case "1"://一般
                // this.onClicktag1();
                break;
              case "2"://重要
                // this.onClicktag2();
                break;
              case "3"://客户
                // this.onClicktag3();
                break;
              default:
                editable.push(this.tagList[i].value);
            }

          return editable.join("，");
      },
      set(val){
        console.log("tags:")
        console.log(this.tagList);
        var editable=val.split("，");
        var tags=[];

        if(this.click1p)
          tags.push({ tagId:"1", type:"", value:"一般", isFixed:true});
        if(this.click2p)
          tags.push({ tagId:"2", type:"", value:"重要", isFixed:true});
        if(this.click3p)
          tags.push({ tagId:"3", type:"", value:"客户", isFixed:true});

        for(var i=0;i<editable.length;i++)
          tags.push({ tagId:"", type:"", value:editable[i], isFixed:false});

        this.$store.commit('info_907/setTags',tags);
      }
    }
  },
  methods: {
    save(){
      
      console.log("tags:")
      console.log(this.tagList);
      var editable=this.str_tags_editable.split("，");
      var tags=[];

      if(this.click1p)
        tags.push({ tagId:"1", type:"", value:"一般", isFixed:true});
      if(this.click2p)
        tags.push({ tagId:"2", type:"", value:"重要", isFixed:true});
      if(this.click3p)
        tags.push({ tagId:"3", type:"", value:"客户", isFixed:true});

      for(var i=0;i<editable.length;i++)
        tags.push({ tagId:"", type:"", value:editable[i], isFixed:false});

      console.log("new tags:")
      console.log(tags);

      let params={
        creator:this.info.creator,
        name:this.info.name,
        companyFullName:this.info.companyFullName,
        duty:this.info.duty,
        address:this.info.address,
        contactId:this.info.contactId,
        companyId:this.info.companyId,
        phone:this.info.phone,
        landline:this.info.landline,
        email:this.info.email,
        tagList:tags,
        note:this.info.note,
      };

      this.$store.dispatch("info_907/editContactInfo",{params,index:this.$route.query.id});
      Toast.setDefaultOptions({ duration: 500 });
      Toast("保存");
    },
    toShare(){
      if(this.info.creator==this.$store.state.staffInfo.staffId)
        {
          console.log("sharelist:");
          console.log(this.shareList);
          this.$router.push({
            name:"Contact_share",
            query:{ from:"Contacts_edit",id:this.$route.query.id, 
                    contactId:this.info.contactId,
                    companyId:this.info.companyId}
                  });
        }
      
    },
    toCompanySel(){
      this.$router.push({
        name:"Contact_company",
        query:{ from:"Contacts_edit",id:this.$route.query.id }
      });
    },
    onClickLeft() {
      this.$store.commit("lxrlist/setShare",{list:this.shareList,index:this.$route.query.id});
      this.$router.push({
        name:"Contacts_detail",
        query:{id:this.$route.query.id}
        
      });
      // Toast('返回');
    },
    onClicktag1() {     //点击标签1
          this.click1 = !this.click1;
          this.click1p = !this.click1p;
          this.click2 = true;
          this.click2p = false;
      },
      onClicktag2() {     //点击标签2
          this.click2 = !this.click2;
          this.click2p = !this.click2p;
          this.click1 = true;
          this.click1p = false;
      },
      onClicktag3() {     //点击标签3
          this.click3 = !this.click3;
          this.click3p = !this.click3p;
      },
      transTags_Company()
      {
          if(this.$route.query.idc>=0)
            {
              console.log(this.$route.query);
              this.$store.commit("info_907/setCompany",JSON.stringify(this.$store.state.CompanyList.companyInfoList[this.$route.query.idc]))
            }
          else  if(this.$route.query.idc!=-1) 
            this.$store.commit("info_907/setInfo",JSON.stringify(this.$store.state.lxrlist.lx[this.$route.query.id]));

          //处理标签
          if(this.tagList&&this.tagList.length)
          for(var i=0;i<this.tagList.length;i++)
            switch(this.tagList[i].tagId)
            {
              case "1"://一般
                this.onClicktag1();
                break;
              case "2"://重要
                this.onClicktag2();
                break;
              case "3"://客户
                this.onClicktag3();
                break;
            }

          // this.str_tags_fixed=fixed.join("，");
          // this.str_tags_editable=editable.join("，"); 
          // var list=[];
          // console.log("share list")
          // console.log(this.shareList)   
          // //处理权限
          // this.str_authority=this.info.creatorName+"(负责)";
          // if(this.shareList)
          //   for(var i=0;i<this.shareList.length;i++)
          //   {
          //     if(this.shareList[i]!="")
          //     list.push(this.shareList[i]);
          //   }
          // if(list.length)
          // {
          //   this.str_authority+="，";
          //   this.str_authority+=list.join("(共享)，");
          //   this.str_authority+="(共享)";
          // }
      }
  },
  mounted:function(){
    this.transTags_Company();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Contacts_edit{

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
  padding-right:0.1rem;
  font-size: 0.35rem;
  text-align: left;
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
#buttons{
  background-color:whitesmoke;
  text-align: center;
  width:100%;
  height:100%;
}
#tag{
  margin-right:0.3rem;
}
a {
  color: rgb(58, 39, 238);
}


</style>
