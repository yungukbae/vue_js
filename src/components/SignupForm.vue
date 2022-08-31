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
      <div>
        <label for="nickname">nickname:</label>
        <input id="nickname" type="text" v-model="nickname" />
      </div>
      <button type="submit">signup</button>
    </form>
    <p>{{ logmessage }}님 회원가입 되었습니다</p>
  </div>
</template>

<script>
import { registerUser } from '@/api/index';

export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
      //log
      logmessage: '',
    };
  },
  methods: {
    async submit() {
      console.log('form');
      const body = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      };
      const res = await registerUser(body);
      this.logmessage = res.data.username;
      this.initForm();
    },
    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style></style>
