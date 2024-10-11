<template>
  <n-tabs type="card" size="small" v-model:value="selectedKey">
    <n-tab-pane :tab="$t('menu.versusDepth')" name="load_versusDepth"
      ><versusDepth />
    </n-tab-pane>
    <n-tab-pane :tab="$t('menu.versusTime')" name="load_versusTime">
      <VersusTime />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import VersusDepth from "./components/VersusDepth.vue";
import VersusTime from "./components/VersusTime.vue";
const selectedKey = defineModel({
  type: String,
  default: ""
});
</script>

<style scoped lang="scss">
.n-tabs {
  height: 100%;
  .n-tab-pane {
    overflow: hidden;
  }
}
</style>
