import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import google from 'vue-google-signin-button'
import facebook from 'vue-facebook-signin-button'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(google)
Vue.use(facebook)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
