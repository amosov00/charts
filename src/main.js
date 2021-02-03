import Vue from 'vue'
import App from './App.vue'
import line from "@/components/line";

Vue.config.productionTip = false

Vue.component('t-line', line)

new Vue({
  render: h => h(App),
}).$mount('#app')
