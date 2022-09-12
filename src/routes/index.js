import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
// Vue.use는 플러그인을 초기화 하기위한 코드
Vue.use(VueRouter);

const router = new VueRouter({
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
      path: '/main',
      component: () => import('@/view/MainPage'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/add',
      component: () => import('@/view/PostAddPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/post/:id',
      component: () => import('@/view/PostEditPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '*',
      component: () => import('@/view/NotFoundPage.vue'),
    },
  ],
});

//to 이동하려는 페이지
//from 현재 페이지
//next 다음페이지로 넘어갈수 있게 호출하는 api
router.beforeEach((to, from, next) => {
  // to.meta.auth === true ? console.log(to) : console.log('인증이 필요합니다.');
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다.');
    next('/login');
    return;
  }
  next();
});

export default router;
