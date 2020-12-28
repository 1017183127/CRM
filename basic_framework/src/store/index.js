import Vue from 'vue'
import Vuex from 'vuex';
import Visit from './modules/Visit.js'
import lxrlist from "./modules/lxrlist"
import contactsadd from "./modules/contactsadd"
import CompanyList from "./modules/CompanyList"
import info_907 from './modules/pages_zaj.js'
import staffInfo from '@/store/modules/staffInfo'
import staffVisitList from './modules/staffVisitList'
import contactaddshare from './modules/contactaddshare'
import leaderMain from "./modules/leaderMain"
import clientList from "./modules/clientList"
import companyInfo from "./modules/companyInfo"
import newClient from './modules/newClient';
import team from './modules/team';
Vue.use(Vuex);

export default new Vuex.Store({
  modules:
  {
    lxrlist,
    Visit,
    contactsadd,
    CompanyList,
    info_907,
    staffInfo,
    staffVisitList,
    contactaddshare,
    leaderMain,
    clientList,
    companyInfo,
    newClient,
    team,
  },
  state: {},
  mutations: {},
  actions: {}
})