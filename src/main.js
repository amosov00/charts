import Vue from 'vue'
import App from './App.vue'
import line from "@/components/line";
import vuetify from './plugins/vuetify';
import pie from "@/components/pie";
import chart from "@/components/chart";

Vue.config.productionTip = false

Vue.component('t-line', line)
Vue.component('t-pie', pie)
Vue.component('t-chart', chart)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
