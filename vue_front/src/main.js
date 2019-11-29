import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  data() {
    return {
      userID: 1,
      name: '',
      email: '',
      firstSon: '',
      response: '',
      success: '',
      activeClass: 'active'
    }
  }
}).$mount('#app')

