import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api';
const state=
{
    companyInfoList:[
        /*{
            shortName:"南京供电",
            fullName:"南京南瑞集团公司",
            address:"江苏省南京市鼓楼区草场门大街96号中青大厦",
            creatorName:"任松柏"
        },
        {
            shortName:"南京供电111",
            fullName:"南京南瑞集团公司111",
            address:"江苏省南京市鼓楼区草场门大街96号中青大厦111",
            creatorName:"任松柏111"
        }*/
    ],
    back: null,
    
};
const mutations=
{
    setCompanyList(state,res)
    {
        console.log(res.companyInfoList)
        state.companyInfoList=res.companyInfoList
    },
    setBack(state, payload){
      console.log("设置Back为：", payload)
      state.back = payload
    }
};
const actions=
{
    
    list ({commit}, params) {
        http.post(GLOBAL_CONFIG.getCompanyList, params).then(function (res) {
          if (res.retCodeMsg.status) {
            console.log(res.retCodeMsg.msg);
            console.log(res.retCodeMsg.status);
            console.log(res.retCodeMsg.code);
            commit('setCompanyList', res);
          }
          else{
            console.log('返回json错误');
            console.log(res.retCodeMsg.msg);
            console.log(res.retCodeMsg.status);
            console.log(res.retCodeMsg.code);
          }
        }).catch(function (err) {
          console.log('err kawaii!!!', err)
        })
      },
};
export default(
{
    state,
    mutations,
    actions
})