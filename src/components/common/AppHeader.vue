<template>
  <header>
    <div>
      <router-link :to="logoLink" class="logo"> TIL </router-link>
    </div>
    <div>
      <template v-if="isLogin">
        <p>{{ $store.state.username }}</p>
        <a href="javascript:;" @click="logoutUser">logout</a>
      </template>

      <template v-else>
        <router-link to="/login">로그인</router-link> |
        <router-link to="/signup">회원가입</router-link>
      </template>
    </div>
  </header>
</template>

<script>
import { deleteCookie } from '@/util/cookies';

export default {
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    logoLink() {
      return this.$store.getters.isLogin ? '/main' : '/login';
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit('clearUserName');
      this.$store.commit('clearToken');
      deleteCookie('til_auth');
      deleteCookie('til_user');
      this.$router.push('/login');
    },
  },
};
</script>

<style></style>
