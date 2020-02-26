import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globalPlugin from './plugins/global';
import "@/lib/parse";

import VueStash from 'vue-stash';
import store from './store';

Vue.config.productionTip = false

Vue.use(globalPlugin)
Vue.use(VueStash)

new Vue({
  router,
  data: { store },
  render: h => h(App)
}).$mount('#app')
