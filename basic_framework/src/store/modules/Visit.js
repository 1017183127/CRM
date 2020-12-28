import Vue from 'vue'
import Vuex from 'vuex';
import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api';
import router from '../../router' 
import { Toast } from "vant";
Vue.use(Vuex);

const state = () => ({
    RecordList : [
    //   {   
    //     name:"徐浩生", 
    //     company: "南京南瑞集团公司",
    //     position: "产品经理",
    //     date: "12-28",
    //     visit_type: "上门拜访",
    //     label_message: "滕王阁序怎么背，先帝创业未半，而中道崩殂，今天下三分。接下来我乱说一两句话，大家随便听听就好，了解熟悉html/css基础，学习Vue/Vant,运行demo，完成开发环境搭建，初步确定项目分工安排。建立github仓库，熟悉使用git进行团队协作，找后端组进行沟通协调。撰写每日工作日志。",
    //     visit_report: "成功！",
    //     sign_in: "已签到",
    //     visit_location: "南京市建邺区奥体大街1号"
    // },
    // {
    //     name:"张德平", 
    //     company: "南京南瑞集团公司",
    //     position: "产品经理",
    //     date: "12-28",
    //     visit_type: "电话联系",
    //     label_message: "撰写每日工作日志。",
    //     visit_report: "成功！",
    //     sign_in: "已签到",
    //     visit_location: "南京市建邺区奥体大街1号"
    // },  
    // {
    //     name:"徐浩生", 
    //     company: "南京南瑞集团公司",
    //     position: "产品经理",
    //     date: "12-28",
    //     visit_type: "上门拜访",
    //     label_message: "滕王阁序怎么背，先帝创业未半，而中道崩殂，今天下三分。接下来我乱说一两句话，大家随便听听就好，了解熟悉html/css基础，学习Vue/Vant,运行demo，完成开发环境搭建，初步确定项目分工安排。建立github仓库，熟悉使用git进行团队协作，找后端组进行沟通协调。撰写每日工作日志。",
    //     visit_report: "成功！",
    //     sign_in: "已签到",
    //     visit_location: "南京市建邺区奥体大街1号"
    // },
    // {
    //     name:"张德平", 
    //     company: "南京南瑞集团公司",
    //     position: "产品经理",
    //     date: "12-28",
    //     visit_type: "电话联系",
    //     label_message: "撰写每日工作日志。",
    //     visit_report: "成功！",
    //     sign_in: "已签到",
    //     visit_location: "南京市建邺区奥体大街1号"
    // },        
    ],
    ResStatus: null,
    RecordListByKeywords: [

    ],
    RecordListById: [

    ],
    back: null,
    back_visitrecord: null,
    back_search: null,
    back_repeat: null,
    x: null,
    x_repeat: null,
    visitRecordId_repeat: null,
    keyword: null,

})

const mutations = {
    setData(state,res) {
      state.RecordList = res.visitRecordOrderedList;
    },
    getStatus(state,res) {
      state.ResStatus = res.retCodeMsg.status;
    },
    setDataByKeywords(state, res) {
      state.RecordListByKeywords = res.visitRecordOrderedList;
    },
    EmptyList(state) {
      state.RecordListByKeywords = [];
    },
    setDataById(state,res) {
      // state.RecordListById =res.visitRecordOrderedList;
      state.RecordListById =res.visitRecord;
    },
    setBack(state,payload)
    {
      console.log("设置back 为：", payload);
      state.back=payload;
    },
    emptyBack(state){
      console.log("清空back");
      state.back = null;
    },
    setBack_visitrecord(state,payload)
    {
      console.log("设置back_visitrecord 为：", payload);
      state.back_visitrecord=payload;
    },
    emptyBack_visitrecord(state){
      console.log("清空back_visitrecord");
      state.back_visitrecord = null;
    },
    setX(state, payload){
      console.log("设置X为：", payload);
      state.x = payload;
    },
    emptyX(state){
      console.log("清空x");
      state.x = null;
    },
    setKeyword(state, payload){
      console.log("设置keyword为：", payload);
      state.keyword = payload;
    },
    emptyKeyword(state){
      console.log("清空keyword");
      state.keyword = null;
    },
    setBack_search(state, payload){
      console.log("设置back_search为：",payload);
      state.back_search = payload;
    },
    emptyBack_search(state){
      console.log("清空back_search");
      state.back_search = null;
    },
    setBack_repeat(state, payload){
      console.log("设置back_repeat为：",payload);
      state.back_repeat = payload;
    },
    emptyBack_repeat(state){
      console.log("清空back_repeat");
      state.back_repeat = null;
    },    
    setX_repeat(state, payload){
      console.log("设置X_repeat为：",payload);
      state.x_repeat = payload;
    },
    emptyX_repeat(state){
      console.log("清空X_repeat");
      state.x_repeat = null;
    },   
    setvisitRecordId_repeat(state, payload){
      console.log("设置visitRecordId_repeat为：",payload);
      state.visitRecordId_repeat = payload;
    },
}

const actions = {
  getData ({commit}, params) {
              http.post(GLOBAL_CONFIG.get_Visit_Record_List, params).then(function (res) {
                if (res.retCodeMsg.status) {
                  console.log(res.retCodeMsg.status)
                  console.log(res.retCodeMsg.code)
                  console.log(res.retCodeMsg.msg)
                  console.log(res.visitRecordOrderedList)
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

  getDataById ({commit}, params) {
    http.post(GLOBAL_CONFIG.get_Visit_Record_By_Id, params).then(function (res) {
      if (res.retCodeMsg.status) {
        console.log(res.retCodeMsg.status)
        console.log(res.retCodeMsg.code)
        console.log(res.retCodeMsg.msg)
        console.log(res.visitRecord)
        commit('setDataById', res)
      }
      else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
      }
    }).catch(function (err) {
      console.log('error!!', err)
    })
  },


  AddVisitRecord({commit, state}, params) {
    http.post(GLOBAL_CONFIG.add_visit_record, params).then(function (res) {
      if (res.retCodeMsg.status) {
        console.log(res.retCodeMsg.status)
        console.log(res.retCodeMsg.code)
        console.log(res.retCodeMsg.msg)
        commit('getStatus', res)
        if (res.retCodeMsg.status == 'FAIL'){
          Toast("不可拜访该联系人");
          console.log("不可拜访该联系人");
        }
        else{
          Toast("保存成功");
          console.log("保存成功");
            setTimeout( () => {
              if(state.back_repeat == "companyInfo"){
                router.push({
                  path: '/clientList/companyInfo',
                  query:{
                    x: state.x_repeat,
                  }
                })
              }
              else if(state.back_repeat == "Visit_record"){
                router.push({
                  path: '/Visit_main/Visit_record',
                  query:{
                    VisitRecordId: state.visitRecordId_repeat,
                  }
                })
              }
              else{
                // router.push("/Visit_main");
                router.go(-1);
              }
            }, 2200)
        }
      }
      else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
        // commit('getStatus', res)
      }
    }).catch(function (err) {
      console.log('error!!', err)
      commit('getStatus', res)
    })
  },

  SearchByKeywords({commit}, params){
    http.post(GLOBAL_CONFIG.search_by_keywords, params).then(function (res) {
      if (res.retCodeMsg.status) {
        console.log(res.retCodeMsg.status)
        console.log(res.retCodeMsg.code)
        console.log(res.retCodeMsg.msg)
        console.log(res.visitRecordOrderedList)
        commit('setDataByKeywords', res)
      }
      else{
        console.log("返回错误！");
        console.log(retCodeMsg.code)
      }
    }).catch(function (err) {
      console.log('error!!', err)
    })
  },
  EmptyRecordListByKeywords({commit}){
    commit('EmptyList');
  },
}

export default {
  namespaced : true,
  state,
  mutations,
  actions
}
