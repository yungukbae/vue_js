<template>
  <div>
    <h1>Edit Post</h1>
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
      <button type="submit">edit</button>
    </form>
    <p>{{ logMessage }}</p>
  </div>
</template>

<script>
import { fetchPost, editPost } from '@/api/posts';
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
      const id = this.$route.params.id;
      console.log('submit');
      try {
        await editPost(id, { title: this.title, contents: this.contents });
        this.$router.push('/main');
      } catch (e) {
        this.logMessage = e;
      }
    },
  },
  async created() {
    const id = this.$route.params.id;
    const { data } = await fetchPost(id);
    this.title = data.title;
    this.contents = data.contents;
  },
};
</script>

<style></style>
