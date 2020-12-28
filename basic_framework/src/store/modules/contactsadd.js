import Vue from 'vue'
import Vuex from 'vuex';
import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api'
Vue.use(Vuex);
const state = {
      name:"",
      nameSpell:"",
      companyId:"",
      companyFullName:"",
      duty:"",
      address:"",
      phone:"",
      landline:"",
      email:"",
      note:"",
      click1: true,
      click1p: false,
      click2: true,
      click2p: false,
      click3: true,
      click3p: false,
      zdy:"",
      contid:"",
      staffInfo:[],
      sharelist:[],
      from:""
}

const mutations = {
  changefrom(state,from)
  {
    state.from=from
  },
  chushihua(state)
  {
    state.name="",
    state.nameSpell="",
    state.companyId="",
    state.companyFullName="",
    state.duty="",
    state.address="",
    state.phone="",
    state.landline="",
    state.email="",
    state.note="",
    state.click1=true,
    state.click1p=false,
    state.click2=true,
    state.click2p=false,
    state.click3=true,
    state.click3p=false,
    state.zdy="",
    state.contid="",
    state.staffInfo=[],
    state.sharelist=[]
  },
  changename(state,name)
  {
    state.name=name;
    //console.log("姓名",state.name);
  },
  changecompanyId(state,companyId)
  {
    state.companyId=companyId
  },
  changecompanyFullName(state,companyFullName)
  {
    state.companyFullName=companyFullName
  },
  changenameSpell(state,nameSpell)
  {
    state.nameSpell=nameSpell;
    //console.log("姓名拼音",state.name);
  },
  changeduty(state,duty)
  {
    state.duty=duty;
    //console.log("职务",state.duty);
  },
  changeaddress(state,address)
  {
    state.address=address;
    //console.log("地址",state.address);
  },
  changephone(state,phone)
  {
    state.phone=phone;
    //console.log("手机",state.phone);
  },
  changelandline(state,landline)
  {
    state.landline=landline;
    //console.log("座机",state.landline);
  },
  changeemail(state,email)
  {
    state.email=email;
   // console.log("邮箱",state.email);
  },
  changeclick1(state,click1)
  {
    state.click1=click1;
  },
  changeclick2(state,click2)
  {
    state.click2=click2;
  },
  changeclick3(state,click3)
  {
    state.click3=click3;
  },
  changeclick1p(state,click1p)
  {
    state.click1p=click1p;
  },
  changeclick2p(state,click2p)
  {
    state.click2p=click2p;
  },
  changeclick3p(state,click3p)
  {
    state.click3p=click3p;
  },
  changezdy(state,zdy)
  {
    state.zdy=zdy;
    //console.log("自定义标签",state.zdy);
  },
  changenote(state,note)
  {
    state.note=note;
    //console.log("备注",state.note);
  },
  changeqx(state,qx)
  {
    state.qx=qx;
    //console.log("权限",state.qx);
  },
  changecontid(state,data)
  {
    state.contid=data
  },
  changestaffInfo(state,data)
  {
    state.staffInfo=data
  },
  changesharelist(state,data)
  {
    state.sharelist=data
  }
}

const actions = {
      createlxr ({dispatch},params) {
        return new Promise((resolve, reject) => {
          //console.log(params);
          http.post(GLOBAL_CONFIG.createlxr, params).then(function (res) {
          if (res.retCodeMsg.status) {
            //console.log(res.retCodeMsg.status);
            //console.log(res.retCodeMsg.code);
            //console.log(res.retCodeMsg.msg);
            //console.log("res.contid:");
            //console.log(res.contid);
            //console.log(state);
            //console.log(params);
            var sl=params.sharelist
            var l=sl.length
            for(var i=0;i<l;i++)
            {
              let params2={
                contactId:res.contid,
                companyId:params.companyId,
                staffInfo:sl[i]
              }
              //console.log(params2);
              //this.$store.dispatch("contactaddshare/share",params2)
              dispatch("share",params2)
            }
            resolve()
          }
          }).catch(function (err) {
            console.log('err!', err)
            reject()
          })
        })
      },
      share({commit}, params) 
      {
        //console.log(params);
        http.post(GLOBAL_CONFIG.share, params).then(function (res) {
        if (res.retCodeMsg.status) {
          console.log(res)
          //commit("chushihua")
        }
        }).catch(function (err) {
          console.log('err kawaii!!!', err)
        })
      },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
