import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api';
const state=
{
  keyword:"",
  xzlist:[],
};
const mutations=
{
  getteamlist(state,data)
  {
    //console.log(data)
    state.xzlist=[]
    var l=data.length
    for(var i=0;i<l;i++)
    {

      //console.log(data[i].staffId)
      //console.log(data.this)
      if(data[i].staffId!=data.this)
      {
        data[i].isChoose=false
        state.xzlist.push(data[i])
      }
    }
    //console.log(state.xzlist)
  }
};
const actions=
{
    getxzlist({commit}, params) 
    {
      http.post(GLOBAL_CONFIG.getTeam, params).then(function (res) {
        if (res.retCodeMsg.status) {
          console.log(params)
          res.staffInfoOrderedList.this=params.staff
          commit("getteamlist",res.staffInfoOrderedList);
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