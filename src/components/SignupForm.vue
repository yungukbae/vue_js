<template>
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
    <button type="submit">login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
    };
  },
  methods: {
    submit() {
      console.log('form');
    },
  },
};
</script>

<style></style>
