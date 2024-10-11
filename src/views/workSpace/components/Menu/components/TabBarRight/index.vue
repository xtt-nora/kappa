<template>
  <div class="tabBarRight">
    <Save />
    <Setting />
    <User />
  </div>
</template>
<script setup lang="ts">
import Setting from "./components/Setting.vue";
import Save from "./components/Save.vue";
import User from "./components/User.vue";
</script>
<style scoped lang="scss">
.tabBarRight {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > :deep(.n-button) {
    margin-right: 6px;
  }
}
</style>
