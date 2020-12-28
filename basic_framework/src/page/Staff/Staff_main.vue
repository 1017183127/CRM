<template>
  <div class="Staff_main" id="main">

    <van-nav-bar left-arrow left-text="退出登录"  title="客户关系管理" @click-left="onClickLeft">
      <!-- <template #left>
        <van-icon :name="icon_back"/>
      </template> -->
    </van-nav-bar>

    <van-grid :column-num='3' :border='false' style="margin-bottom:0.12rem">
      <van-grid-item :icon="icon_contact" text="联系人" @click="toContacts_main" />
      <van-grid-item :icon="icon_company" text="公司" @click="toCompany_main"/>
      <van-grid-item :icon="icon_visit" text="拜访" @click="toVisit_main"/>
    </van-grid>

    <div class="mycell" style="margin-bottom:0.12rem">
      <!-- <van-row> -->
        <!-- <van-col span="12" offset="2"> -->
          <!-- <van-cell title="个人排行情况" is-link @click="showPopup" arrow-direction="down" value="本月" style="background-color:#F5F5F5"/> -->
          个人排行情况 
        <!-- </van-col> -->
        <!-- <van-col span="2" offset="5" class="myselect">
          {{area}}
        </van-col> -->

        <!-- <van-col span="8" offset=0> -->
          <!-- <van-icon name="arrow-down" style="padding-top:0.1rem" @click="showSelect"></van-icon> -->
            <!-- <select id="selector" @change="s_change($event)">
              <option value ="1">本月</option>
              <option value ="2">本年</option>
            </select> -->
        <!-- </van-col> -->

      <!-- </van-row> -->
      <el-dropdown trigger="click" style="float:right;" >
        <span class="el-dropdown-link">
          {{area_str_cn}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="getRank(1)">本月</el-dropdown-item>
          <el-dropdown-item @click.native="getRank(2)">本年</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    
    <van-grid :column-num='2'>
      <van-grid-item >
        <div style="font-size:0.4rem">新增联系人 </div> 
        <div style="font-size:0.4rem">第&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:0.8rem;color:#2d7eff;font-weight: bold;" >{{rank_contact}}&nbsp;&nbsp;</span>名</div> 
      </van-grid-item>

      <van-grid-item >
        <div style="font-size:0.4rem">新增拜访</div> 
        <div style="font-size:0.4rem">第&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:0.8rem;color:#2d7eff;font-weight: bold;">{{rank_visit}}&nbsp;&nbsp;</span>名</div> 
      </van-grid-item>  
    </van-grid>
    
    <div id="container">
        <newlxr/>
        <VisitRecord/>
    </div>


    



  </div>

</template>

<script>
import { Toast } from 'vant';
import newlxr from '../../components/newlxr';
import VisitRecord from '../../components/VisitRecord';

export default {
  components:{
    newlxr,
    VisitRecord
  },
    data () {
    return {
      area_str_cn:"本月",
      area_str:"MONTH",

      icon_contact: require('../../assets/icon/contactLogo.png'),
      icon_company: require('../../assets/icon/compLogo.png'),
      icon_visit: require('../../assets/icon/visitLogo.png'),
      icon_back: require('../../assets/icon/back.png'),

    };
  },
  methods: {
    onClickLeft() {
      // this.$router.go(-1);
      this.$router.push('/');
    },
    toContacts_main(){
      this.$router.push({
        name:'Contacts_main',
        query:{lxrlfrom:"Staff_main"}
      })
    },
    toCompany_main() {    //点击公司按钮
      this.$router.push({
        path: '/clientList',
        query:{
          from: "Staff_main"
        }
      });
    },
    toVisit_main() {      //点击拜访按钮
      this.$router.push({ 
        path: "/Visit_main",
        query:{
          from: "Staff_main"
        }
      });
    },
    getRank(val){
      if(val==1)
        {
          this.area_str="MONTH";
          this.area_str_cn="本月";
        }
      else
        {
          this.area_str="YEAR";
          this.area_str_cn="本年";
        }

      // console.log(this.area_str);
      this.rankData();
    },
    rankData()
    {
      let params ={
        staffId:this.staffId,
        timeArea:this.area_str
      };
      // console.log(this.$store.state.contact_info.tags_fixed);
      this.$store.dispatch("info_907/getRank",params);
      let params2={
        staffId:this.staffId,
        isASC:false,
        pageNum:1,
        pageSize:3
      }
      this.$store.dispatch("lxrlist/querylxrl",params2);

      // console.log(this.$store.state.info_907.rank_visit);
    },
  },
  computed:{
        rank_contact:
        {
          get(){
            return this.$store.state.info_907.rank_contact
          }
        },
        rank_visit:
        {
          get(){
            return this.$store.state.info_907.rank_visit
          }
        },
        staffId: 
        {
          get() 
          {
            return this.$store.state.staffInfo.staffId;
          }
        },
        name: 
        {
          get() 
          {
            return this.$store.state.staffInfo.name;
          }
        },


  },
  mounted:function(){
    console.log("id是"+this.staffId+"名字是"+this.name);
    this.rankData();//只有在mutations里更新数据才会触发数据更新
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main{
    width:100%;
    height: 100%;
    background: whitesmoke;
  position: auto;

}
#container{

    background: whitesmoke;
  position: auto;
  padding-left:0.2rem;
  padding-right:0.2rem;
}
.mycell{
  font-size:0.4rem;
  padding-top:0.2rem;
  padding-bottom:0.2rem;
  padding-left:0.8rem;
  padding-right:0.6rem;
}
#selector{
  
  /* color:#A9A9A9; */
  outline: none;
  border: none;
  background: #F5F5F5;
}
  .el-dropdown-link {
    font-size:0.3rem;
    cursor: pointer;
    color:black;
  }
  .el-icon-arrow-down {
    font-size: 0.3rem;
  }

a {
  color: #42b983;
}
</style>
