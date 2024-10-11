<template>
  <div class="smallButtonGroup" v-show="show">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: true
  }
);
</script>
<style lang="scss" scoped>
.smallButtonGroup {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
}
</style>
