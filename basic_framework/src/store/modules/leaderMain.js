import Vue from 'vue'
import Vuex from 'vuex';
import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api'
Vue.use(Vuex);

const state = () => ({
    visitCount : 175,
    companyCount : 12,
    contactCount:0,
    visitCountY:'',
    companyCountY:'',
    contactCountY:'',
    list:[],
    list2:[],
    list3:[],
    list4:[],
})
 
const mutations = {
  setNewlyAddedVisitRecordCountInThisM(state,visitCountM) {
    state.visitCount = visitCountM.newlyAddedVisitRecordCountInThisMonth;
  },
  setNewlyAddedCompanyThisM(state,companyCountM){
    state.companyCount = companyCountM.newlyAddedCompanyCount;
  },
  setStaffVisit(state,staffVisitRes){
    state.list = staffVisitRes.staffInfoOrderedList;
  },
  setStaffContact(state,staffContactRes){
    state.list2 = staffContactRes.staffInfoOrderedList;
  },
  setNewlyAddedContactThisM(state,res){
    state.contactCount = res.newlyAddedContactCount;
  },

  setNewlyAddedContactThisY(state,res){
    state.contactCountY = res.newlyAddedContactCount;
  },
  setNewlyAddedVisitRecordCountInThisY(state,visitCountM) {
    state.visitCountY = visitCountM.newlyAddedVisitRecordCountInThisMonth;
  },
  setNewlyAddedCompanyThisY(state,companyCountM){
    state.companyCountY = companyCountM.newlyAddedCompanyCount;
  },
  setStaffVisitY(state,staffVisitRes){
    state.list3 = staffVisitRes.staffInfoOrderedList;
  },
  setStaffContactY(state,staffContactRes){
    state.list4 = staffContactRes.staffInfoOrderedList;
  },
}

const actions = {
  getNewlyAddedVisitRecordCountInThisM ({commit}, params) {
    http.post(GLOBAL_CONFIG.getvrl, params).then(function (visitCountM) {
    if (visitCountM.retCodeMsg.status) {
      console.log("===查询本月新增拜访记录计数===领导主页")
      console.log(visitCountM.retCodeMsg.status)
      console.log(visitCountM.retCodeMsg.code)
      console.log(visitCountM.retCodeMsg.msg)
      console.log(visitCountM.newlyAddedVisitRecordCountInThisMonth)
      commit('setNewlyAddedVisitRecordCountInThisM', visitCountM)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getNewlyAddedCompanyThisM ({commit}, params) {
    http.post(GLOBAL_CONFIG.getnacc, params).then(function (companyCountM) {
    if (companyCountM.retCodeMsg.status) {
      console.log("===查询本月新增公司计数===领导主页")
      console.log(companyCountM.retCodeMsg.status)
      console.log(companyCountM.retCodeMsg.code)
      console.log(companyCountM.retCodeMsg.msg)
      console.log(companyCountM.newlyAddedCompanyCount)
      commit('setNewlyAddedCompanyThisM', companyCountM)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getStaffListByVisit ({commit}, params) {
    http.post(GLOBAL_CONFIG.getpqsil, params).then(function (staffVisitRes) {
    if (staffVisitRes.retCodeMsg.status) {
      console.log("===查询本月拜访次数TOP20===领导主页")
      console.log(staffVisitRes.retCodeMsg.status)
      console.log(staffVisitRes.retCodeMsg.code)
      console.log(staffVisitRes.retCodeMsg.msg)
      console.log(staffVisitRes.staffInfoOrderedList)
      commit('setStaffVisit', staffVisitRes)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getStaffListByContact ({commit}, params) {
    http.post(GLOBAL_CONFIG.getpqsil, params).then(function (staffContactRes) {
    if (staffContactRes.retCodeMsg.status) {
      console.log("===查询本月新增联系人TOP20===领导主页")
      console.log(staffContactRes.retCodeMsg.status)
      console.log(staffContactRes.retCodeMsg.code)
      console.log(staffContactRes.retCodeMsg.msg)
      console.log(staffContactRes.staffInfoOrderedList)
      commit('setStaffContact', staffContactRes)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getContactCount ({commit}, params) {
    http.post(GLOBAL_CONFIG.getqnacc, params).then(function (res) {
    if (res.retCodeMsg.status) {
      console.log("===查询本月新增联系人TOP20===领导主页")
      console.log(res.retCodeMsg.status)
      console.log(res.retCodeMsg.code)
      console.log(res.retCodeMsg.msg)
      console.log(res.newlyAddedContactCount)
      commit('setNewlyAddedContactThisM', res)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getContactCountY ({commit}, params) {
    http.post(GLOBAL_CONFIG.getqnacc, params).then(function (res) {
    if (res.retCodeMsg.status) {
      console.log("===查询本月新增联系人TOP20===领导主页")
      console.log(res.retCodeMsg.status)
      console.log(res.retCodeMsg.code)
      console.log(res.retCodeMsg.msg)
      console.log(res.newlyAddedContactCount)
      commit('setNewlyAddedContactThisY', res)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getNewlyAddedVisitRecordCountInThisY ({commit}, params) {
    http.post(GLOBAL_CONFIG.getvrl, params).then(function (visitCountM) {
    if (visitCountM.retCodeMsg.status) {
      console.log("===查询本年新增拜访记录计数===领导主页")
      console.log(visitCountM.retCodeMsg.status)
      console.log(visitCountM.retCodeMsg.code)
      console.log(visitCountM.retCodeMsg.msg)
      console.log(visitCountM.newlyAddedVisitRecordCountInThisMonth)
      commit('setNewlyAddedVisitRecordCountInThisY', visitCountM)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getNewlyAddedCompanyThisY ({commit}, params) {
    http.post(GLOBAL_CONFIG.getnacc, params).then(function (companyCountM) {
    if (companyCountM.retCodeMsg.status) {
      console.log("===查询本年新增公司计数===领导主页")
      console.log(companyCountM.retCodeMsg.status)
      console.log(companyCountM.retCodeMsg.code)
      console.log(companyCountM.retCodeMsg.msg)
      console.log(companyCountM.newlyAddedCompanyCount)
      commit('setNewlyAddedCompanyThisY', companyCountM)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getStaffListByVisitY ({commit}, params) {
    http.post(GLOBAL_CONFIG.getpqsil, params).then(function (staffVisitRes) {
    if (staffVisitRes.retCodeMsg.status) {
      console.log("===查询本年拜访次数TOP20===领导主页")
      console.log(staffVisitRes.retCodeMsg.status)
      console.log(staffVisitRes.retCodeMsg.code)
      console.log(staffVisitRes.retCodeMsg.msg)
      console.log(staffVisitRes.staffInfoOrderedList)
      commit('setStaffVisitY', staffVisitRes)
    }
    else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
    }
    }).catch(function (err) {
    console.log('error!!', err)
    })
  },
  getStaffListByContactY ({commit}, params) {
    http.post(GLOBAL_CONFIG.getpqsil, params).then(function (staffContactRes) {
    if (staffContactRes.retCodeMsg.status) {
      console.log("===查询本年新增联系人TOP20===领导主页")
      console.log(staffContactRes.retCodeMsg.status)
      console.log(staffContactRes.retCodeMsg.code)
      console.log(staffContactRes.retCodeMsg.msg)
      console.log(staffContactRes.staffInfoOrderedList)
      commit('setStaffContactY', staffContactRes)
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