<template>
  <li>
    {{ item.title }}
    <hr />
    <div>
      {{ item.contents }}
    </div>
    <p>{{ item.createdAt }}</p>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
