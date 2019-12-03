import Vue from 'vue'
import App from './App.vue'
import axios from "axios";

const baseDomain = "https://127.0.0.1:7070";
const baseURL = `${baseDomain}/api`;


Vue.config.productionTip = false

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.crossOrigin = true
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'


/* eslint-disable no-new */
new Vue({
  render: h => h(App),
}).$mount('#app')

export default axios.create({
  baseURL
});
