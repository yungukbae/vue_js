<template>
  <div>
    <form @submit.prevent="submit">
      <div>
        <label for="username">id:</label>
        <input id="username" type="text" v-model="username" />
        <p class="warning" v-if="isUsernameValid">
          Please enter an email address
        </p>
      </div>
      <div>
        <label for="password">pw:</label>
        <input id="password" type="text" v-model="password" />
      </div>
      <button
        :disabled="!isUsernameValid || !password"
        type="submit"
        class="btn"
      >
        login
      </button>
    </form>
    <p>{{ logMessage }}</p>
  </div>
</template>

<script>
import { validateEmail } from '@/util/validation';

export default {
  data() {
    return {
      username: '',
      password: '',
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
        await this.$store.dispatch('LOGIN', body);
        this.$router.push('/main');
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
