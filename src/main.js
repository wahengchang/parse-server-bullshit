import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globalPlugin from './plugins/global';
import "@/lib/parse";

import VueStash from 'vue-stash';
import store from './store';

import Default from "./layouts/Default.vue";
import NoSidebar from "./layouts/NoSidebar.vue";

Vue.config.productionTip = false

Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);
Vue.use(globalPlugin)
Vue.use(VueStash)

new Vue({
  router,
  data: { store },
  render: h => h(App)
}).$mount('#app')
