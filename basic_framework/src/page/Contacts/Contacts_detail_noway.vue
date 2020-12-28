<template>
  <div class="Contacts_detail_noway">
    <van-nav-bar title="联系人" left-arrow  @click-left="onClickLeft">
        <template #right>
          <router-link to="/contacts_edit">编辑</router-link>
        </template>
    </van-nav-bar>

    <div id="header">
      <label id="name">{{info.name}}</label>

        <van-row id="info">
          <van-col span=6><label style="color:#A9A9A9">公司：</label> </van-col>
          <van-col span=5> <label>{{info.companyName}}</label> </van-col>
          <van-col span=11> <label style="color:#A9A9A9">{{info.companyLocation}}</label> </van-col>
          <van-col span=2 type="flex"> <router-link to=""><van-icon name="arrow"/></router-link> </van-col>
        </van-row>
    </div>

        <van-row id="info" >
          <van-col span=6> <label style="color:#A9A9A9">职务：</label> </van-col>
          <van-col> <label >{{info.duty}}</label> </van-col>
        </van-row>

      <div id="info" style="margin-top:0.1rem">
          <van-row>
            <van-col span=6> <label style="color:#A9A9A9">归属人：</label> </van-col>
            <van-col > <label >{{info.belongTo}}</label> </van-col>
          </van-row>
      </div>
      <div id="info">
          <van-row>
            <van-col span=6> <label style="color:#A9A9A9">创建时间：</label> </van-col>
            <van-col > <label >{{info.createTime}}</label> </van-col>
          </van-row>
      </div>
      <div id="buttons">
          <van-row type="flex" justify="center" >
            <van-col>  
                <router-link to="">
                    <van-icon :name="icon_newVisit" size=3rem></van-icon>
                </router-link>
                &nbsp;&nbsp;
                <router-link to="/Visit_main">
                    <van-icon :name="icon_visitRecord" size=3rem></van-icon>
                </router-link> 
            </van-col>
          </van-row>
      </div>

      


    




  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    data () {
    return {
     info:
    {
      name:'天蓬6元帅', duty:'duty', companyName:'哇哈哈', companyLocation:'舜华路1500' ,
      phone:'110110110',tel:'911911911',email:'115@360.com',
      note:'嘟啦啦嘟啦啦嘟啦嘟啦嘟',
      createTime:'',
      belongTo:''
    },
      str_tags_fixed:'',
      str_tags_editable:'',
      str_authority:'',

      icon_phone: require('../../assets/icon/phone.png'),
      icon_newVisit: require('../../assets/icon/newVisitButton.png'),
      icon_visitRecord: require('../../assets/icon/visitRecordButton.png'),

    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      // Toast('返回');
    },
    updataData(){
      let params ={
        contactName:'王小明'
      };
      // console.log(this.$store.state.contact_info.tags_fixed);
      this.$store.dispatch("getContactInfo",params);

      this.info=this.$store.state.contact_info.info;
      console.log(this.$store.state.contact_info.info);

      this.str_tags_fixed=this.$store.state.contact_info.tags_fixed.join("，");
      this.str_tags_editable=this.$store.state.contact_info.tags_editable.join("，");
      this.str_authority=this.$store.state.contact_info.authority.join("，");
    }
  },
  mounted:function(){
      this.updateData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.Contacts_detail_noway{
  
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
  /* text-align: center; */
  position:absolute;
  bottom: 0;
  left: 0;right: 0;

}

a {
  color: rgb(58, 39, 238);
}
</style>
