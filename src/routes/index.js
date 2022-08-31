import Vue from 'vue';
import VueRouter from 'vue-router';

// Vue.use는 플러그인을 초기화 하기위한 코드
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/view/LoginPage'),
    },
    {
      path: '/signUp',
      component: () => import('@/view/SignUp'),
    },
    {
      path: '*',
      component: () => import('@/view/NotFoundPage.vue'),
    },
  ],
});
