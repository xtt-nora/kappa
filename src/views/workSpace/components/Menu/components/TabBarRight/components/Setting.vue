<template>
  <n-button text @click="showSetting = true">
    <template #icon>
      <SvgIcon name="settingsS" size="16"></SvgIcon>
    </template>
  </n-button>
  <Setting v-model="showSetting" :title="$t('menu.setting')" />
</template>
<script setup lang="ts">
import { Setting } from "@/window";
import { ref } from "vue";

const showSetting = ref(false);
</script>
<style scoped></style>
