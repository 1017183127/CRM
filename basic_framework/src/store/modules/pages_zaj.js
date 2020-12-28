import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api';
import store from '../index.js'
const state=
{
  //联系人信息
    info:{},
  //分享时用到的团队成员列表,已分享列表，未分享列表
    teamList:[],sharedList:[],unsharedList:[],
  //员工首页所需信息
    rank_contact:12,
    rank_visit:26,
    //记录页面参数
    back:"",
    route_params:null,

};
const mutations=
{
    setRouteParams(state,payload)
    {
      console.log("zhixing setRouteParams");
      console.log(payload);

      state.route_params=payload;
      console.log("路由参数：");
      console.log(state.route_params);
    },
    setRank(state,payload)
    {
      console.log("zhixing setrank");
      console.log(payload);
      state.rank_contact=payload.c;
      state.rank_visit=payload.v;
      // state.rank_contact=payload.res.newlyAddedVisitRecordRank;
      // state.rank_visit=payload.res.newlyAddedContactRank;
    },
    setInfo(state,payload)
    {
      console.log("zhixing setinfo");
      // console.log(payload);
      state.info=JSON.parse(payload);
    },
    setTeam(state,payload){
      console.log("zhixing setteam");
      // console.log(payload);
      state.teamList=payload.list;
    },
    setCompany(state,payload)
    {
      var obj=JSON.parse(payload);
      console.log("zhixing setcompany");
      // console.log(obj);
      state.info.companyFullName=obj.fullName;
      state.info.companyId=obj.companyId;

      state.info.companyShortName=obj.shortName;

      console.log("改完了");
      console.log(state.info);
    },
    setBack(state,payload)
    {
      console.log("zhixing setBack params");
      console.log(payload);

      state.back=payload;
    },
    setTags(state,payload)
    {
      console.log("zhixing setTags params");
      console.log(payload);
      if(state.info.tagList&&state.info.tagList.length)
        state.info.tagList.length=0;
      else state.info.tagList=[];

      if(payload.length)
      for(var i=0;i<payload.length;i++)
        state.info.tagList.push(payload[i]);
    },
    setShare(state,payload)
    {
      console.log("改共享列表");
      console.log(payload);
//arr.splice(0, arr.length)
// 第一个参数：必选。从哪个位置(index)开始删除数组项。
// 第二个参数：必选。希望删除的数组项个数，若arr.length则删除全部，若0则不删除。
// 其余参数：可选。希望向数组添加的项，可以多个。
      state.unsharedList.length=0;
      state.sharedList.length=0;
      // state.unsharedList.splice(0, state.unsharedList.length);
      // state.sharedList.splice(0, state.sharedList.length);

      if(state.info.shareList!=null)
        state.info.shareList.length=0;
        // state.info.shareList.splice(0, state.info.shareList.length);
      else
        state.info.shareList=[];
        

      // if(payload.sharelist!=null)
        for(var i=0;i<payload.sharelist.length;i++)
        {
          state.sharedList.push(payload.sharelist[i]);
          state.info.shareList.push(payload.sharelist[i]);
        }

      // if(payload.unsharelist!=null)
        for(var i=0;i<payload.unsharelist.length;i++)
          state.unsharedList.push(payload.unsharelist[i]);

      console.log("unshared list");
      console.log(state.unsharedList);
        
      console.log("shared list");
      console.log(state.sharedList);
      
    },


};
const actions=
{   
  getContact({commit},params) {
    return new Promise((resolve, reject) => 
    {
    http.post(GLOBAL_CONFIG.getContact, params)
      .then(response => {
        resolve(response);
        console.log("getContact back:");
        console.log(response);
        if (response.retCodeMsg.status) 
          commit('lxrlist/pushContact', {params:response.contactInfo}, {root: true})
        else
          console.log('返回json错误');
      })
        .catch(error => { reject(error) })
    })

  },
  getCompany({commit},params) {
    return new Promise((resolve, reject) => 
    {
    http.post(GLOBAL_CONFIG.getCompany, params)
      .then(response => {resolve(response)})
        .catch(error => { reject(error) })
    })
  },
    getRank ({commit}, params) {
      http.post(GLOBAL_CONFIG.getRank, params).then(function (res) {
        console.log("rank params:");
        console.log(params);
        if (res.retCodeMsg.status) {
          console.log(res);
          console.log('调用setRank');
          commit({
            type: 'setRank',
            c: res.newlyAddedContactRank,
            v: res.newlyAddedVisitRecordRank
            // res:res
          });
          console.log('执行完成setRank');
          
        }
        else{
          console.log('返回json错误');
        }
      }).catch(function (err) {
        console.log('err kawaii!!!', err)
      })
    },
    editContactInfo ({commit}, params) {
      http.post(GLOBAL_CONFIG.editContactInfo, params.params).then(function (res) {
        console.log("edit params:");
        console.log(params);
        if (res.retCodeMsg.status) {
          console.log("edit back：")
          console.log(res.contactInfo);
          // commit({
          //   type:'setContact',
          //   info:res.contactInfo,
          //   index:params.index
          // });
          commit('lxrlist/setContact', {info:res.contactInfo, index:params.index}, 
          {root: true})
        }
        else{
          console.log('返回json错误');
        }
      }).catch(function (err) {
        console.log('err kawaii!!!', err)
      })
    },
    getTeam ({commit}, params) {
      http.post(GLOBAL_CONFIG.getTeam, params).then(function (res) {
        console.log("team params:");
        console.log(params);
        if (res.retCodeMsg.status) {
          console.log("team back：")
          console.log(res);
          commit({
            type:'setTeam',
            list:res.staffInfoOrderedList
          });
        }
        else{
          console.log('返回json错误');
        }
      }).catch(function (err) {
        console.log('err kawaii!!!', err)
      })
    },
    share ({dispatch}, params) {
      http.post(GLOBAL_CONFIG.share, params).then(function (res) {
        console.log("share params:");
        console.log(params);
        if (res.retCodeMsg.status) {
          console.log("share back：")
          console.log(res);
          dispatch('getShareList',{contactId:params.contactId,teamId:params.teamId});
          
        }
        else{
          console.log('返回json错误');
        }
      }).catch(function (err) {
        console.log('err kawaii!!!', err)
      })
    },
    cancelShare ({dispatch}, params) {
      http.post(GLOBAL_CONFIG.cancelShare, params.params).then(function (res) {
        console.log("cancelShare params:");
        console.log(params);
        if (res.retCodeMsg.status) {
          console.log("cancelShare back：");
          console.log(res);

          dispatch('getShareList',{contactId:params.params.contactId,teamId:params.teamId});
        }
        else{
          console.log('返回json错误');
        }
      }).catch(function (err) {
        console.log('err kawaii!!!', err)
      })
    },
    getShareList ({commit}, params, callback) {
      http.post(GLOBAL_CONFIG.getShareList, params).then(function (res) {
        console.log("getShareList params:");
        console.log(params);
        if (res.retCodeMsg.status) {
          console.log("getShareList back：");
          console.log(res);
          
          console.log("设置分享列表");
            commit({
              type:'setShare',
              sharelist:res.shareList,
              unsharelist:res.unShareList
            });
          
          // callback && callback();
            
        }
        else{
          console.log('返回json错误');
        }
      }).catch(function (err) {
        console.log('err kawaii!!!', err)
      })
    },
};
export default(
{
    namespaced:true,
    state,
    mutations,
    actions
})