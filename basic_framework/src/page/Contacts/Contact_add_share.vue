<template>
  <div class="main">
    <van-nav-bar
      title="共享联系人"
      left-arrow
      right-text="确认"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar>
    <van-cell-group border:false style='margin-top:0.1rem'>
      <van-cell style="height:2rem;"  v-for="(item,idx) in xzlist" :key="idx">
        <template #title>
            <van-image style="height:1.4rem; width:1.4rem;float:left;display:inline-block;" :src="item.headPicture"/>
            <label style='width:1.5rem;height:1rem;display:inline-block;font-size:0.5rem;margin-top:0.5rem;margin-left:0.4rem;float:left'>{{item.name}}</label>
            <div style='float:left;height:0.5rem;display:inline-block;margin-left:0.3rem; '>
              <div style='font-size:0.4rem; '>&#8197;&#8197;&#8197;职务：<span style='font-size:0.4rem;color:#6495ED'>{{item.position}}</span></div>
              <div style='font-size:0.4rem; '>员工ID：<span style='font-size:0.4rem;color:#6495ED'>{{item.staffId}}</span></div>
            </div>
            <van-button v-if="item.isChoose" round size="small" color="#1E90FF" style="float:right;margin-top:0.5rem" @click="onClick(idx)">取消分享</van-button>
            <van-button v-if="!item.isChoose" round size="small" color="#1E90FF" style="float:right;margin-top:0.5rem" @click="onClick(idx)">分享</van-button>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      // Toast('返回');
    },
    onClick(idx) {
      //console.log(this.xzlist[idx].isChoose);
      var o = this.xzlist[idx];
      o.isChoose = !o.isChoose;
      this.$set(this.xzlist, idx, o);
      //console.log(this.xzlist[idx].isChoose);
    },
    onClickRight() {
      var params =[];
      var params2=[];
      var l = this.xzlist.length;
      for (var i = 0; i < l; i++) {
        if (this.xzlist[i].isChoose == true) {
          params.push({
            name: this.xzlist[i].name,
            staffId: this.xzlist[i].staffId,
            teamId: this.xzlist[i].teamId
          });
          params2.push({
            staffId: this.xzlist[i].staffId,
            teamId: this.xzlist[i].teamId
          });
        }
      }
      //console.log(params)
      this.$store.commit("contactsadd/changestaffInfo",params);
      this.$store.commit("contactsadd/changesharelist",params2);
      //console.log(this.$store.state.contactsadd.staffInfo)
      this.$router.push("Contact_add")
    }
  },
  computed: {
    xzlist: {
      get() {
        return this.$store.state.contactaddshare.xzlist;
      }
    },
    myid: {
      get() {
        return this.$store.state.staffInfo.staffId;
      }
    }
  },
  mounted: function() {
    let params = {
      orderBy: "newlyAddedVisitRecordCount",
      staff:this.$store.state.staffInfo.staffId,
      pageSize:1000
    };
    //console.log(params)
    this.$store.dispatch("contactaddshare/getxzlist", params);
    //console.log("请求团队列表成功")
  },
      //  改变背景颜色
    beforeRouteEnter (to, from, next) {
        window.document.body.style.backgroundColor = '#F5F5F5';
        next();
    },
    beforeRouteLeave (to, from, next) {
        window.document.body.style.backgroundColor = '';
        next();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#card {
  background-color: white;
  margin-bottom: 0.1rem;
  padding: 0.4rem;
  font-size: 0.5rem;
  text-align: left;
}
.aCell {
  padding-top: 0.1rem;
  padding-left: 0.2rem;
  padding-bottom: 0.1rem;
}
</style>
