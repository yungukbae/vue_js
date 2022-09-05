<template>
  <div>
    <div>
      <h1>Main</h1>
      <hr />
      <LoadingProvider v-if="isLoading"></LoadingProvider>
      <ul v-else>
        <PostLisItem
          v-for="post in posts"
          :key="post._id"
          :item="post"
        ></PostLisItem>
      </ul>
    </div>
    <router-link to="/add" class="create-button">+</router-link>
  </div>
</template>

<script>
import { fetchPosts } from '@/api';
import PostLisItem from '@/components/PostListItem.vue';
import LoadingProvider from '@/components/common/LoadingProvider.vue';

export default {
  components: {
    PostLisItem,
    LoadingProvider,
  },
  data() {
    return {
      posts: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchNotes() {
      this.isLoading = true;
      const res = await fetchPosts();
      if (res) {
        setTimeout(() => {
          this.isLoading = false;
          this.posts = res.data.posts;
        }, 500);
      }
    },
  },
  created() {
    this.fetchNotes();
  },
};
</script>

<style></style>
