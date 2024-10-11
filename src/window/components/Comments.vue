<template>
  <n-input
    v-model:value="formData.comments"
    type="textarea"
    style="height: 100%"
  />
</template>

<script setup lang="ts">
const formData = defineModel({
  type: Object,
  default: {
    comments: ""
  }
});
</script>
