<template>
  <div>
    <li>
      {{ item.title }}
      <hr />
      <div>
        {{ item.contents }}
      </div>
      <p>{{ item.createdAt }}</p>
    </li>
    <p @click="routeEditPage">수정</p>
    <p @click="deleteItem">제거</p>
  </div>
</template>

<script>
import { deletePost } from '@/api/posts';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteItem() {
      if (confirm('삭제 하시겠습니까?')) {
        await deletePost(this.item._id);
        this.$emit('refetch');
      }
    },
    routeEditPage() {
      const id = this.item._id;
      this.$router.push(`/post/${id}`);
    },
  },
};
</script>

<style></style>
