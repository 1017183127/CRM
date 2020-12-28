import Vue from 'vue'
import Vuex from 'vuex';
import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api'
Vue.use(Vuex);

const state = () => ({
    companyList:[],
    back: null,
})
 
const mutations = {
    setCom(state,comRes) {
        state.companyList = comRes.companyInfoList
    },
    setBack(state, payload){
      console.log("设置back为：", payload);
      state.back = payload;
    }
}

const actions = {
  getCompany ({commit}, params) {
    http.post(GLOBAL_CONFIG.getcil, params).then(function (comRes) {
    if (comRes.retCodeMsg.status) {
        console.log("===查询公司===公司主页")
        console.log(comRes.retCodeMsg.status)
        console.log(comRes.retCodeMsg.code)
        console.log(comRes.retCodeMsg.msg)
        console.log(comRes.companyInfoList)
        commit('setCom', comRes)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
}

export default {
  namespaced : true,
  state,
  mutations,
  actions,
}