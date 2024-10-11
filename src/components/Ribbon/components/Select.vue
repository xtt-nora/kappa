<template>
  <div class="ribbonSelect" v-show="show">
    <label class="ribbonSelect__label">{{ title }}:</label>
    <n-select
      v-bind="$attrs"
      placeholder=""
      :consistent-menu-width="false"
      :render-option="renderOption"
    ></n-select>
  </div>
</template>

<script setup lang="ts">
import type { VNode } from "vue";
import { h } from "vue";
import type { SelectOption } from "naive-ui";
import { NPopover } from "naive-ui";

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
const emits = defineEmits<{
  (e: "update:value", value: string): void;
}>();

const renderOption = ({
  node,
  option
}: {
  node: VNode;
  option: SelectOption;
}) =>
  h(
    NPopover,
    {
      placement: "right-end"
    },
    {
      trigger: () => node,
      default: () => `${option.label}`
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
    width: 120px;
  }

  &__label {
    font-size: 12px;
  }
}
</style>
