<template>
  <vxe-modal
    v-model="showModal"
    :title="$t('menu.rename')"
    width="280"
    height="auto"
    :mask="false"
  >
    <n-form-item :label="$t('menu.name')" label-placement="left">
      <n-input v-model:value="value"></n-input>
    </n-form-item>
    <n-space justify="end">
      <n-button @click="showModal = false">{{ $t("menu.ok") }}</n-button>
      <n-button @click="showModal = false">{{ $t("menu.cancel") }}</n-button>
    </n-space>
  </vxe-modal>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const showModal = defineModel({ type: Boolean, default: false });

const value = ref("");
</script>

<style lang="scss" scoped></style>
