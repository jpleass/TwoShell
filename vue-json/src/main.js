import Vue from 'vue'
import App from '@/App.vue'
import Router from '@/router'
import KirbyApi from '@/plugins/kirby-api'
import store from './store'
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs)

Vue.config.productionTip = false

const apiUrl =
  process.env.NODE_ENV === 'production' ? process.env.VUE_APP_KIRBY_URL : window.location.origin + process.env.VUE_APP_BASE_URL.slice(0, -1)

// self invoke async initialization
;(async () => {
  const api = KirbyApi.init(apiUrl)
  const site = await api.getSite()
  const router = await Router.init(site)

  // globals
  Vue.prototype.$api = api
  Vue.prototype.$site = site

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
