import Vue from 'vue'
import App from './App'
import store from './store'
// import {
//   MdApp,
//   MdList,
//   MdButton
// } from 'vue-material/dist/components'
// TODO: change this to import individual components for runtime purposes...
// webpack throws an error?
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
