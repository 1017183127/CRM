// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/theme.css'  //自己写的样式
import './style/characters.css' //自己写的样式


import store from './store'
import 'amfe-flexible'
import {
  Button, 
  Cell, 
  CellGroup,
  Divider,
  Field,
  Search,
  NavBar,
  Icon,
  Grid, 
  GridItem, 
  Sticky, 
  Col, 
  Row, 
  Image as VanImage, 
  Tab, 
  Tabs, 
  List, 
  Tag, 
  PullRefresh,
  DropdownMenu, 
  DropdownItem,
  Checkbox,
  CheckboxGroup,
  Switch,
  Tabbar, 
  TabbarItem,
  Uploader,
  Popup,
  NumberKeyboard,



} from 'vant';
Vue.use(ElementUI)
Vue.use(Button).use(Col).use(Row)
Vue.use(Cell).use(PullRefresh).use(DropdownMenu)
Vue.use(CellGroup).use(DropdownItem).use(Checkbox)
Vue.use(Divider).use(CheckboxGroup).use(Switch)
Vue.use(Field).use(Tabbar).use(TabbarItem)
Vue.use(Search).use(Uploader).use(Popup)
Vue.use(NavBar).use(Icon).use(Grid).use(GridItem).use(Sticky)
Vue.use(VanImage)
Vue.use(List).use(Tag)
Vue.use(Tab).use(Tabs).use(Popup).use(NumberKeyboard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
