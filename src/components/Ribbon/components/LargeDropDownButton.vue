<template>
  <n-dropdown
    trigger="click"
    :options="options"
    placement="bottom-start"
    v-bind="$attrs"
    size="small"
    @select="handleSelect"
  >
    <div
      class="large-btn"
      v-show="show"
      :class="{
        active,
        disabled
      }"
    >
      <div class="large-icon">
        <SvgIcon :name="icon" size="32"></SvgIcon>
      </div>
      <div class="title large">{{ title }} <br />▼</div>
    </div>
  </n-dropdown>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string;
    options: any;
    icon: string;
    show: boolean;
    disabled: boolean;
    active: boolean;
  }>(),
  {
    icon: "",
    show: true,
    disabled: false,
    title: "",
    active: false,
    options: []
  }
);

const emits = defineEmits<{
  (e: "updateValue", value: string): void;
}>();

const handleSelect = (value: string) => {
  emits("updateValue", value);
};
</script>
<style lang="scss" scoped>
.large-btn {
  padding: 4px;
  margin: 2px;
  cursor: default;
  &:hover {
    background-color: $hoveButton;
    border-radius: 4px;
    box-shadow: inset 0px 0px 2px 1px $hoverButtonBorder;
  }

  .large-icon {
    height: 30px;
    width: 30px;
    margin: 0 auto;
    // background-color: $color-17;
  }

  .title {
    font-size: 12px;
    margin-top: 4px;
    white-space: pre-line;
    text-align: center;
    height: 28px;
    line-height: 14px;
  }
}

.disabled {
  pointer-events: none;
  color: $fristMenuBg;
}

.active {
  background-color: $hoveButton;
  border-radius: 4px;
  box-shadow: inset 0px 0px 2px 1px $hoverButtonBorder;
}
</style>
