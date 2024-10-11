<template>
  <div
    class="icon-btn"
    v-show="show"
    :class="{
      active,
      disabled
    }"
  >
    <SvgIcon :name="icon" v-bind="$attrs"></SvgIcon>
  </div>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    onUpdateValue?: Function;
    icon: string;
    show: boolean;
    disabled: boolean;
    active: boolean;
  }>(),
  {
    icon: "",
    show: true,
    disabled: false,
    active: false
  }
);
</script>
<style lang="scss" scoped>
.icon-btn {
  padding: 4px;
  margin: 2px;
  cursor: default;
  display: inline-flex;
  &:hover {
    background-color: $hoveButton;
    border-radius: 4px;
    box-shadow: inset 0px 0px 2px 1px $hoverButtonBorder;
  }

  .svg-icon {
    // background-color: $color-17;
  }
}

.disabled {
  pointer-events: none;
}

.active {
  background-color: $hoveButton;
  border-radius: 4px;
  box-shadow: inset 0px 0px 2px 1px $hoverButtonBorder;
}
</style>
