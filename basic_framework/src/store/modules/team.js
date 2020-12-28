import Vue from 'vue'
import Vuex from 'vuex';
import http from '../../net/httpService';
import GLOBAL_CONFIG from '../../net/api'
Vue.use(Vuex);
const state = {
    team_list:[],
    team_list_all:[],


      team_add_contact_m:0,
      team_add_contact_y:1,
      team_add_visit_m:0,
      team_add_visit_y:1,
      team_add_company_m:0,
      team_add_company_y:1,

      team_contact_list:[],

      list_charge:[],
      list_shared:[],
      list_visit:[],
}

const mutations={
    team_data_m_1(state,data){
        state.team_add_contact_m=data;
    },
    team_data_m_2(state,data){
        state.team_add_visit_m=data;
    },
    team_data_m_3(state,data){
        state.team_add_company_m=data;
    },
    team_data_y_1(state,data){
        state.team_add_contact_y=data;
    },
    team_data_y_2(state,data){
        state.team_add_visit_y=data;
    },
    team_data_y_3(state,data){
        state.team_add_company_y=data;
    },
    getTeamList(state,data){
        state.team_list=data;
        state.team_list_all=data;
    },

    getTeam(state,data){
        state.team_list=data;
        console.log(state.team_list);
    },

    getTeamContactList(state,data){
        state.team_contact_list=data;
    },
    getChargeList(state,data){
        state.list_charge=data;
    },
    getSharedList(state,data){
        state.list_shared=data;
        console.log(state.list_charge);
    },
    getVisitList(state,data){
        state.list_visit=data;
    },
}

const actions={

    getTeamList({commit},payload){
        let data={};

        http.post('http://112.126.78.133:8080/crm_back_end/team_info/paged_query_team_info_list',data).then(function (res) {
            if (res.retCodeMsg.status) {
              console.log(res.teamInfoList);
              commit('getTeamList',res.teamInfoList);
            }
          }).catch(function (err) {
            console.log('err!', err)
          })
    },

    getTeam({commit},payload){
         commit('getTeam',payload);
         console.log(payload);
    },

    getChargeList({commit},payload){
        commit('getChargeList',[]);
        let data={
            staffId:payload,
            relationship:'IN_CHARGE',
        };

        http.post('http://112.126.78.133:8080/crm_back_end/contact_info/paged_query_contact_list',data).then(function (res) {
            if (res.retCodeMsg.status) {
              commit('getChargeList',res.contactInfoOrderedList);
              console.log("chargelist:\n");
              console.log(res.contactInfoOrderedList);
            }
          }).catch(function (err) {
            console.log('err!', err)
          })
    },

    getSharedList({commit},payload){
        commit('getSharedList',[]);
        let data={
            staffId:payload,
            relationship:'SHARED',
        };

        http.post('http://112.126.78.133:8080/crm_back_end/contact_info/paged_query_contact_list',data).then(function (res) {
            if (res.retCodeMsg.status) {
              commit('getSharedList',res.contactInfoOrderedList);
              console.log("sharedList:\n");
              console.log(res.contactInfoOrderedList)
            }
          }).catch(function (err) {
            console.log('err!', err)
          })
    },

    getVisitList({commit},payload){
        commit('getVisitList',[]);
        let data={
            staffId:payload,
        };

        http.post('http://112.126.78.133:8080/crm_back_end/visit_record_info/paged_query_visit_record_list',data).then(function (res) {
            if (res.retCodeMsg.status) {
              commit('getVisitList',res.visitRecordOrderedList);
              console.log("VisitList:\n");
              console.log(res.visitRecordOrderedList)
            }
          }).catch(function (err) {
            console.log('err!', err)
          })
    },

    getDataM({commit},payload){
        console.log('MonthData');
        let data = {
            teamId:payload,
            limitedTime:'MONTH'
        };
        let dataPList = {
            teamId:payload,
            orderBy:'allContactCount',
            limitedTime:'MONTH'
        };
        let num1=0;
        let num2=0;
        let num3=0;
        let teamPList=[];
      
        //getContactNUm
        http.post('http://112.126.78.133:8080/crm_back_end/contact_info/query_newly_added_contact_count',data).then(function (res) {
            if (res.retCodeMsg.status) {
               num1=res.newlyAddedContactCount;
               commit('team_data_m_1',num1); 
            }
            }).catch(function (err) {
                console.log('err!', err)
            })  

        //getVisitNum
        http.post('http://112.126.78.133:8080/crm_back_end/visit_record_info/query_newly_added_visit_record_count',data).then(function (res) {
            if (res.retCodeMsg.status) {
                num2=res.newlyAddedVisitRecordCountInThisMonth;
                commit('team_data_m_2',num2); 
            }
            }).catch(function (err) {
                console.log('err!', err)
            })
            
        //getCompanyNum
        http.post('http://112.126.78.133:8080/crm_back_end/company_info/query_newly_added_company_count',data).then(function (res) {
            if (res.retCodeMsg.status) {
                num3=res.newlyAddedCompanyCount;
                commit('team_data_m_3',num3); 
            }
            }).catch(function (err) {
                console.log('err!', err)
            })    
        
        //getPersonList
        http.post('http://112.126.78.133:8080/crm_back_end/staff_info/paged_query_staff_info_list',dataPList).then(function (res) {
            if (res.retCodeMsg.status) {
               teamPList=res.staffInfoOrderedList;
               console.log(teamPList);
               commit('getTeamContactList',teamPList);
            }
            }).catch(function (err) {
                console.log('err!', err)
            }) 
        
    },

    getDataY({commit},payload){
        console.log('YearData');
        let data = {
            teamId:payload,
            limitedTime:'YEAR'
        };
        let dataPList = {
            teamId:payload,
            orderBy:'allContactCount',
            limitedTime:'YEAR'
        };
        let num1=0;
        let num2=0;
        let num3=0;
        let teamPList=[];
      
        //getContactNUm
        http.post('http://112.126.78.133:8080/crm_back_end/contact_info/query_newly_added_contact_count',data).then(function (res) {
            if (res.retCodeMsg.status) {
               num1=res.newlyAddedContactCount;
               commit('team_data_y_1',num1); 
            }
            }).catch(function (err) {
                console.log('err!', err)
            })  

        //getVisitNum
        http.post('http://112.126.78.133:8080/crm_back_end/visit_record_info/query_newly_added_visit_record_count',data).then(function (res) {
            if (res.retCodeMsg.status) {
                num2=res.newlyAddedVisitRecordCountInThisMonth;
                commit('team_data_y_2',num2); 
            }
            }).catch(function (err) {
                console.log('err!', err)
            })
            
        //getCompanyNum
        http.post('http://112.126.78.133:8080/crm_back_end/company_info/query_newly_added_company_count',data).then(function (res) {
            if (res.retCodeMsg.status) {
                num3=res.newlyAddedCompanyCount;
                commit('team_data_y_3',num3); 
            }
            }).catch(function (err) {
                console.log('err!', err)
            })    
        
        //getPersonList
        http.post('http://112.126.78.133:8080/crm_back_end/staff_info/paged_query_staff_info_list',dataPList).then(function (res) {
            if (res.retCodeMsg.status) {
               teamPList=res.staffInfoOrderedList;
               console.log(teamPList);
               commit('getTeamContactList',teamPList);
            }
            }).catch(function (err) {
                console.log('err!', err)
            }) 
    },
}

export default {
    state,
    mutations,
    actions
}