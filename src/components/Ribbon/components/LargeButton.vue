<template>
  <n-button
    text
    :disabled="disabled"
    v-show="show"
    class="large-btn"
    :class="{
      active,
      disabled
    }"
  >
    <SvgIcon class="large-icon" :name="icon" :size="size"></SvgIcon>
    <div class="title large">{{ title }}</div>
  </n-button>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    onUpdateValue?: () => void;
    icon: string;
    show: boolean;
    disabled: boolean;
    title: string;
    active: boolean;
    size: string;
  }>(),
  {
    icon: "",
    show: true,
    disabled: false,
    title: "",
    active: false,
    size: "32"
  }
);
</script>
<style lang="scss" scoped>
.n-button {
  padding: 4px;
  margin: 2px;
  &:hover {
    background-color: $hoveButton;
    border-radius: 4px;
    box-shadow: inset 0px 0px 2px 1px $hoverButtonBorder;
  }

  :deep(.n-button__content) {
    white-space: pre;
    height: 100%;
    flex-direction: column;
    .title {
      margin-top: 4px;
    }
  }
}

.disabled {
  pointer-events: none;
}

.active {
  background-color: $hoveButton !important;
  border-radius: 4px;
  box-shadow: inset 0px 0px 2px 1px $hoverButtonBorder;
}
</style>
