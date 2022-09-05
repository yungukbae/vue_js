<template>
  <div>
    <form @submit.prevent="submit">
      <div>
        <label for="usename">id:</label>
        <input id="usename" type="text" v-model="username" />
      </div>
      <div>
        <label for="password">pw:</label>
        <input id="password" type="text" v-model="password" />
      </div>
      <button :disabled="!isUsernameValid || !password" type="submit">
        login
      </button>
    </form>
    <p>{{ logMessage }}</p>
  </div>
</template>

<script>
import { loginUser } from '@/api/index';
import { validateEmail } from '@/util/validation';
import { saveAuthToCookie, saveUserToCookie } from '@/util/cookies';

export default {
  data() {
    return {
      username: 'yunguk@test.com',
      password: '1234',
      logMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submit() {
      try {
        const body = { username: this.username, password: this.password };
        const { data } = await loginUser(body);
        this.logMessage = `${data.user.username} 님 환영합니다.`;
        if (data.success) {
          this.$store.commit('setToken', data.token);
          this.$store.commit('setUserName', data.user.username);
          saveAuthToCookie(data.token);
          saveUserToCookie(data.user.username);
          this.$router.push('/main');
        }
      } catch (e) {
        console.log(e.response.data);
      } finally {
        this.initForm();
      }
    },
    initForm() {
      (this.username = ''), (this.password = '');
    },
  },
};
</script>

<style></style>
