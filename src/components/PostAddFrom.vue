<template>
  <div>
    <h1>Create Post</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">title</label>
        <input id="title" type="text" v-model="title" />
      </div>
      <div>
        <label for="contents">contents</label>
        <textarea id="contents" type="text" rows="3" v-model="contents" />
        <p v-if="!isContentsValid">Contents length must be less than 200</p>
      </div>
      <button type="submit">Create</button>
    </form>
    <p>{{ logMessage }}</p>
  </div>
</template>

<script>
import { createPost } from '@/api/posts';

export default {
  data() {
    return {
      title: '',
      contents: '',
      logMessage: '',
    };
  },
  computed: {
    isContentsValid() {
      return this.contents.length <= 200;
    },
  },
  methods: {
    async submitForm() {
      try {
        const response = await createPost({
          title: this.title,
          contents: this.contents,
        });
        console.log(response);
      } catch (e) {
        this.logMessage = e.response.data.message;
      }
    },
  },
};
</script>

<style></style>
