// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import VueLazyload from 'vue-lazyload'
import { AlertPlugin, ToastPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyload, {
	error: '加载失败',//这个是请求失败后显示的图片
	loading: require('assets/loading.gif')//这个是加载的loading过渡效果
})

import reset from 'common/css/reset.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
