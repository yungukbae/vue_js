import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { formatDate } from '@/util/formatDate';

Vue.config.productionTip = false;
//전역 필터
Vue.filter('formatDate', formatDate);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
