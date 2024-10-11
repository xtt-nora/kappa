<template>
  <div class="ribbonSelect" v-show="show">
    <label class="ribbonSelect__label">{{ title }}:</label>
    <SelectPane v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
import SelectPane from "@/components/SelectPane/index.vue";

withDefaults(
  defineProps<{
    title: string;
    show: boolean;
  }>(),
  {
    title: "",
    show: true
  }
);
</script>
<style lang="scss" scoped>
.ribbonSelect {
  margin: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .n-select {
    margin-left: 4px;
    width: 180px;
  }

  &__label {
    font-size: 12px;
  }
}
</style>
