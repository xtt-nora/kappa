<template>
  <Dialog
    v-model="showModal"
    width="40%"
    max-height="120"
    height="120"
    :title="$t('menu.saveTem')"
  >
    <div class="version">
      <n-space>
        <SvgIcon name="helpS" size="32"></SvgIcon>
        <span>{{ $t("menu.yagtl") }}</span>
      </n-space>
      <n-space class="version-footer" justify="end">
        <n-button>{{ $t("menu.ok") }}</n-button>
        <n-button @click="showModal = false">{{ $t("menu.no") }}</n-button>
      </n-space>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
const showModal = defineModel({ type: Boolean, default: false });
</script>
<style lang="scss" scoped>
.version {
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: calc(100% - 30px);
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
