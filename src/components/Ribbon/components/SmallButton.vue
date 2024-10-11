<template>
  <n-button
    text
    class="small-btn"
    :disabled="disabled"
    v-show="show"
    :class="{
      active,
      disabled
    }"
  >
    <SvgIcon
      class="small-icon"
      :name="icon"
      v-bind="$attrs"
      :size="size"
    ></SvgIcon>
    <span class="title small">{{ title }}</span>
  </n-button>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    onUpdateValue?: Function;
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
    size: "16"
  }
);
</script>
<style lang="scss" scoped>
.n-button {
  padding: 2px 4px;
  margin: 2px;
  &:hover {
    background-color: $hoveButton;
    border-radius: 4px;
    box-shadow: inset 0px 0px 2px 1px $hoverButtonBorder;
  }
  :deep(.n-button__content) {
    width: 100%;
    display: inline-flex;
    align-items: center;
  }

  .title {
    margin-left: 4px;
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
