import Vue from 'vue'
import Vuex from 'vuex';
import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api'
Vue.use(Vuex);

const state = () => ({

})
 
const mutations = {
    setCom(state,res){

    }
}

const actions = {
  setCompany ({commit}, params) {
    http.post(GLOBAL_CONFIG.newCom, params).then(function (res) {
    if (res.retCodeMsg.status) {
        console.log("===新增公司===新增公司页")
        console.log(res.retCodeMsg.status)
        console.log(res.retCodeMsg.code)
        console.log(res.retCodeMsg.msg)
        commit('setCom', res)
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