import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api';
const state=
{
    istrue:false,
    staffId:'',
    name:'',
    teamId:'', 
    position:"",
    password:""
    //headPicture:"http://112.126.78.133:8080/staff_head_picture/default.png,2020-06-23",
};
const mutations=
{
    shuruid(state,id)
    {
      state.staffId=id
    },
    shurupassword(state,password)
    {
      state.password=password
    },
    setStaffInfo(state,payload)
    {
        console.log("staffinfo payload:");
        console.log(payload);
        state.staffId=payload.info.staffId;
        state.name=payload.info.name;
        state.teamId=payload.info.teamId;
    },
    setInfo(state,info)
    {
      state.staffId=info.staffId
      state.name=info.name
      state.teamId=info.teamId
      state.position=info.position
    }
};
const actions=
{
    /*denglu({commit}, params) {
      http.post(GLOBAL_CONFIG.denglu, params).then(function (res) {
        if (res.retCodeMsg.status) {
          console.log(res);
          commit("setistrue",res.verifyPass)
        }
        else{
          console.log('返回json错误');
        }
      }).catch(function (err) {
        console.log('err kawaii!!!', err)
      })
    },*/
};
export default(
{
    namespaced:true,
    state,
    mutations,
    actions
})