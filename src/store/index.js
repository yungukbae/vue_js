import Vue from 'vue';
import Vuex from 'vuex';
import {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
} from '@/util/cookies';
import { loginUser } from '@/api/index';

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
  actions: {
    async LOGIN({ commit }, body) {
      const { data } = await loginUser(body);
      this.logMessage = `${data.user.username} 님 환영합니다.`;
      if (data.success) {
        commit('setToken', data.token);
        commit('setUserName', data.user.username);
        saveAuthToCookie(data.token);
        saveUserToCookie(data.user.username);
      }
      return data.success;
    },
  },
});
