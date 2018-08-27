// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import vueMonent from 'vue-moment'
import config from '@/config'
import importDirective from '@/directive'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import constants from '@/api/constants'
import utils from '@/api/utils'


// import '@/mock'
// 实际打包时应该不引入mock
import env from '../config/env'
/* eslint-disable */
env === 'development' ? require('@/mock') : ''

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(vueMonent)
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * @description 常用字典项
 */
Vue.prototype.$constants = constants
/**
 * @description 常用方法
 */
Vue.prototype.$utils = utils
/**
 * 字典过滤器
 */
Vue.filter('fDict', (value, arr) => {
  if (value != null && value !== '') {
    let rows = arr.filter(x => { return x.value == value });
    if (rows.length > 0) {
      return rows[0].label;
    }
  }
  return value==null?'':value;
})

/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
