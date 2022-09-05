import Vue from 'vue';
import Vuex from 'vuex';
import { getAuthFromCookie, getUserFromCookie } from '@/util/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    setUserName(state, username) {
      state.username = username;
    },
    clearUserName(state) {
      state.username = '';
    },
    setToken(state, token) {
      state.token = token;
    },
  },
});
