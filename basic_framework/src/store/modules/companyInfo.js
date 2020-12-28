import Vue from 'vue'
import Vuex from 'vuex';
import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api'
Vue.use(Vuex);

const state = () => ({
    contact:[],
    visit:[],
})
 
const mutations = {
    setContactInfo(state,res) {
        state.contact = res.contactInfoOrderedList
    },
    setVisitInfo(state,res) {
        state.visit = res.visitRecordOrderedList
    },
}

const actions = {
  getData ({commit}, params) {
    http.post(GLOBAL_CONFIG.getvrl, params).then(function (res) {
    if (res.retCodeMsg.status) {
        console.log(res.retCodeMsg.status)
        console.log(res.retCodeMsg.code)
        console.log(res.retCodeMsg.msg)
        commit('setData', res)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getContactInfo ({commit}, params) {
    http.post(GLOBAL_CONFIG.getpqcl, params).then(function (res) {
    if (res.retCodeMsg.status) {
        console.log("===公司联系人列表===公司信息页面")
        console.log(res.retCodeMsg.status)
        console.log(res.retCodeMsg.code)
        console.log(res.retCodeMsg.msg)
        console.log(res.contactInfoOrderedList)
        commit('setContactInfo', res)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getVisitInfo ({commit}, params) {
    http.post(GLOBAL_CONFIG.getqvrbc, params).then(function (res) {
    if (res.retCodeMsg.status) {
        console.log("===公司拜访记录列表===公司信息页面")
        console.log(res.retCodeMsg.status)
        console.log(res.retCodeMsg.code)
        console.log(res.retCodeMsg.msg)
        console.log(res.visitRecordOrderedList)
        commit('setVisitInfo', res)
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