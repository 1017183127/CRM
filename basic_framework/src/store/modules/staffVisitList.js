import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api';
const state=
{
    visitRecordOrderedList:[
    // {
    //     "visitRecordId": "VID202006251156220784",
    //     "visitMethod": "即时通讯",
    //     "visitResult": "成功！",
    //     "visitTime": "2020-06-25 11:56:22",
    //     "contactId": "CONTID2020062309520106642079",
    //     "visitAddress": "黑龙江漠河",
    //     "signIn": "已签到",
    //     "visitMainMatter": "新增拜访记录测试14",
    //     "visitor": "SID002",
    //     "relationship": "SHARED",
    //     "contactInfo": {
    //         "contactId": "CONTID2020062309520106642079",
    //         "name": "测试联系人",
    //         "nameSpell": null,
    //         "companyId": null,
    //         "duty": "CTO",
    //         "address": null,
    //         "phone": null,
    //         "landline": null,
    //         "email": null,
    //         "note": null,
    //         "creator": "SID001",
    //         "createdTime": null,
    //         "modifiedTime": null,
    //         "companyFullName": "中通集团",
    //         "creatorName": "张三",
    //         "tagList": null,
    //         "companyShortName": null,
    //         "shareList": null
    //     }
    // }
    ],
    
};
const mutations=
{
    setStaffVisitList(state,res)
    {
        state.visitRecordOrderedList=res.visitRecordOrderedList
    },
};
const actions=
{
    
    listStaffVisitList ({commit}, params) {
        http.post(GLOBAL_CONFIG.getStaffVisitList, params).then(function (res) {
          if (res.retCodeMsg.status) {
            console.log(res.retCodeMsg.msg);
            console.log(res.retCodeMsg.status);
            console.log(res.retCodeMsg.code);
            commit('setStaffVisitList', res);
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