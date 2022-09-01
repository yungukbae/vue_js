<template>
  <header>
    <div>
      <router-link to="/" class="logo"> TIL </router-link>
    </div>
    <div>
      <template v-if="isLogin">
        <p>{{ $store.state.username }}</p>
        <a href="javascript:;" @click="logoutUser"></a>
      </template>

      <template v-else>
        <router-link to="/login">로그인</router-link> |
        <router-link to="/signup">회원가입</router-link>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    logoutUser() {
      this.$state.commit('clearUserName');
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
