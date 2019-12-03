import Vue from 'vue'
import App from './App.vue'
import axios from "axios";

const baseDomain = "https://127.0.0.1:5050";
const baseURL = `${baseDomain}/api`;


Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  render: h => h(App),
}).$mount('#app')

export default axios.create({
  baseURL
});
