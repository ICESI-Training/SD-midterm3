import Vue from 'vue'
import App from './App'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import routes from './router/routes'
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueRouter);

const router = new VueRouter({

  //mode: 'history',
  routes 
})


new Vue({
  vuetify: new Vuetify(),
  router,
  render: h => h(App)
}).$mount('#app')
