// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import * as commonFilters from '@/util/filter.js'


import './util/config.js'
import Vue from 'vue'

import commonFn from './util/common.js'
Vue.use(commonFn)


Object.keys(commonFilters).forEach(key => {
  Vue.filter(key, commonFilters[key])
})



import router from './router'
import store from './util/store.js';//引入store



import http from '@/util/http.js'
Vue.use(http);

import {  Message, MessageBox, Dialog  } from 'element-ui';
Vue.use(Dialog);
Vue.prototype.$message = Message;

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;


//公共组建
import Layout from './components/layout'

new Vue({
  el: '#app',
  template: '<Layout/>',
  router,
  store,
  components: { Layout },

})

