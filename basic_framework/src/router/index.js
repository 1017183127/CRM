import Vue from 'vue'
import Router from 'vue-router'
//引入登录页面
import Sign_in from '@/page/Sign_in';
import Login from '@/page/Login';
//引入领导主页
import Leader_main from '@/page/Leader/Leader_main'
//引入员工主页
import staff_main from '@/page/Staff/Staff_main'
import Staff_guidePage from '@/page/Staff/Staff_guidePage'
//引入拜访页面
import Visit_main from '@/page/Visit/Visit_main'
import Search from '@/page/Visit/Search';
import Visit_record from '@/page/Visit/Visit_record'
import Visit_repeat from '@/page/Visit/Visit_repeat'
import Visit_record_display from '@/page/Visit/Visit_record_display'
import Visit_main_display from '@/page/Visit/Visit_main_display'
import Visit_main_leader from '@/page/Visit/Visit_main_leader'
//引入公司页面
import clientList from '@/page/Company/clientList'
import companyInfo from '@/page/Company/companyInfo'
import newClient from '@/page/Company/newClient'
//引入团队页面
import Team from '@/page/Group/Team'
import Team_dep from '@/page/Group/Team_dep'
import Team_person from '@/page/Group/Team_person';
//引入联系人页面
import Contacts_detail from '@/page/Contacts/Contacts_detail'
import Contacts_edit from '@/page/Contacts/Contacts_edit'
import Contacts_detail_noway from '@/page/Contacts/Contacts_detail_noway'
import Contacts_main from '@/page/Contacts/Contacts_main'
import Contact_company from '@/page/Contacts/Contact_company'
import Contact_add from '@/page/Contacts/Contact_add'
import Contact_share from '@/page/Contacts/Contact_share'
import Contact_add_share from '@/page/Contacts/Contact_add_share'
//引入测试页面（大家可以在里面测试组件效果等）
import Test from '@/components/Test'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

export default new Router({
  routes: [
    // 登陆主页
    {
      path: '/Sign_in',
      name: "Sign_in",
      component: Sign_in
    },
    {
      path: '/',
      name: "Login",
      component: Login
    },
    // 员工主页
    {   
      path: '/Staff_main',        //有联系人信息
      name: 'Staff_main',
      component: staff_main
    },
    {   
      path: '/Staff_guidePage',   //无联系人信息
      name: 'Staff_guidePage',
      component: Staff_guidePage
    },

    // 领导主页
    {
      path: '/Leader_main',
      name: 'Leader_main',
      component: Leader_main
    },
    // 拜访页面
    {
      path: '/Visit_main',            //拜访主页
      name: "Visit_main",
      component: Visit_main
    },
    {
      path: '/Visit_main/Search',     //拜访主页的搜索页面
      name: "Search", 
      component: Search
    },
    {
      path: '/Visit_main/Visit_record',//拜访记录详情页面
      name: "Visit_record",
      component: Visit_record
    },
    {
      path: '/Visit_main_display',    //拜访主页（展示）界面
      name: "Visit_main_display",
      component: Visit_main_display
    },
    {
      path: '/Visit_main_leader',     //拜访主页（领导专用）界面
      name: "Visit_main_leader",
      component: Visit_main_leader
    },
    {
      path: '/Visit_record_display',  //拜访记录详情（展示）页面
      name: "Visit_record_display",
      component: Visit_record_display
    },
    {
      path: '/Visit_main/Visit_repeat',//新增拜访页面
      name: "Visit_repeat",
      component: Visit_repeat
    },
    // 联系人页面
    {
      path: '/Contacts_main',          //联系人主页
      name: 'Contacts_main',
      component: Contacts_main
    },
    {
      path: '/Contacts_detail',       //联系人详情页面
      name: 'Contacts_detail',
      component: Contacts_detail
    },
    {
      path: '/Contacts_edit',         //编辑联系人信息页面
      name: 'Contacts_edit',
      component: Contacts_edit
    },
    {
      path: '/Contacts_detail_noway',   //联系人详情 无联系方式
      name: 'Contacts_detail_noway',
      component: Contacts_detail_noway
    },

    {
      path: '/Contact_company',       //选择联系人公司的选择页面
      name: 'Contact_company',
      component: Contact_company
    },
    {
      path: '/Contact_add',           //新增联系人页面
      name: 'Contact_add',
      component: Contact_add
    },
    // 公司页面
    {
      path: '/clientList',    //公司主页
      name: "clientList",
      component: clientList
    },
    {
      path: '/clientList/companyInfo',    //公司详情页
      name: "companyInfo",
      component: companyInfo
    },
    {
      path: '/clientList/newClient',      //添加新公司信息页
      name: "newClient",
      component: newClient
    },
    // 团队页面
    {
      path: '/Team',              //团队主页
      name: "Team",
      component: Team
    },
    {
      path: '/Team/Team_dep',     //部门详情页面
      name: "Team_dep",
      component: Team_dep
    },
    {
      path: '/Team/Team_person',  //员工个人信息页面
      name: 'Team_person',
      component: Team_person
    },
    // 测试页面（大家可以在里面测试组件效果等等）
    {
      path: '/Test',
      name: "Test",
      component: Test
    },
    // 分享页面
    {
      path: '/Contact_share',
      name: "Contact_share",
      component: Contact_share
    },
    //创建联系人分享页面
    {
      path: '/Contact_add_share',
      name: "Contact_add_share",
      component: Contact_add_share
    },

  ]
})
