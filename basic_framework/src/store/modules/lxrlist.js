import Vue from 'vue'
import Vuex from 'vuex';
import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api'
Vue.use(Vuex);
const state = {
  contactName:"",
  lxrxl1:0,
  lxrxl2:'a',
  from:"",
  lx: [],
}

const mutations={
  changefrom(state,from)
  {
    state.from=from
  },
  changecontactName(state,val)
  {
    state.contactName=val
  },
  changelxrxl1(state,index){
    //console.log(index)
    state.lxrxl1=index
  },
  changelxrxl2(state,index){
    //console.log(index)
    state.lxrxl2=index
  },
  changelx(state,data)
  {
    state.lx=data
  },
  setContact(state,payload){
    console.log("zhixing setContact66666");
    console.log(payload);
    state.lx[payload.index]=payload.info;
  },
  setShare(state,payload)
    {
      console.log("lxr setShareList");
      console.log(payload);
      console.log(state.lx[payload.index]);
      if(state.lx[payload.index].shareList)
        state.lx[payload.index].shareList=payload.list;
      else
        {
          state.lx[payload.index].shareList=[];
          state.lx[payload.index].shareList=payload.list;
        }
    },
  pushContact(state,payload)
    {
      console.log("lxr pushContact");
      console.log(payload);
      state.lx=[];
      state.lx.push(payload.params);
    }
}

const actions={
  querylxrl({commit},params) {
    http.post(GLOBAL_CONFIG.querylxrl, params).then(function (res) {
      if (res.retCodeMsg.status) {
        //console.log(res)
        commit("changelx",res.contactInfoOrderedList)
      }
    }).catch(function (err) {
      console.log('err!', err)
    })
  },
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}