<template>
  <n-select
    ref="selectRef"
    multiple
    :options="options"
    v-model:value="selectValue"
    :consistent-menu-width="false"
    placeholder=" "
    :render-option="renderOption"
    :show="showPane"
    :on-update:show="onUpdateShow"
    :max-tag-count="1"
  >
    <!-- <template #action>
      <div class="tool">
        <div class="tool-header">
          <n-button @click="checkedAllSelected">{{ $t("menu.all") }}</n-button>
          <n-button @click="clearSelected">{{ $t("menu.none") }}</n-button>
        </div>
        <div class="tool-content">
          <slot name="action_content"></slot>
        </div>
        <div class="tool-footer">
          <n-button @click="showPane = false">{{ $t("menu.ok") }}</n-button>
          <n-button @click="showPane = false">{{ $t("menu.cancel") }}</n-button>
        </div>
      </div>
    </template> -->
  </n-select>
</template>
<script lang="ts" setup>
import {
  NCheckbox,
  NCheckboxGroup,
  NRadio,
  NRadioGroup,
  NSpace,
  SelectOption
} from "naive-ui";
import { h, ref, VNode } from "vue";

const props = withDefaults(
  defineProps<{
    options: any;
  }>(),
  {
    options: []
  }
);

/**
 * 控制显示菜单
 */
const showPane = ref(false);

/**
 * 多选值
 */
const selectValue = defineModel("value", {
  default: [],
  type: Array<string>
});

/**
 * 单选值
 */
const radioValue = defineModel("radio", {
  type: String,
  default: ""
});

/**
 * 更新菜单显示状态
 */
const onUpdateShow = (show: boolean) => {
  showPane.value = show;
};

/**
 * 渲染函数
 */
const renderOption = ({ option }: { node: VNode; option: SelectOption }) =>
  h(
    NCheckboxGroup,
    {
      value: selectValue.value,
      onUpdateValue: (value: any) => {
        // 复选框最少选中一项
        if (value.length < 1) return;
        switch (value.length) {
          case 0:
            radioValue.value = "";
            break;
          case 1:
            radioValue.value = value[0];
        }
        selectValue.value = value;
      },
      style: {
        borderTop: "1px solid rgba(0, 0, 0, 0.05)",
        paddingBottom: "4px"
      }
    },
    [
      [
        h(
          NRadioGroup,
          {
            value: radioValue.value,
            onUpdateValue: (value: string) => {
              if (!selectValue.value.includes(value)) {
                selectValue.value.push(value);
              }
              radioValue.value = value;
            },
            style: { width: "100%", padding: "0 6px", boxSizing: "border-box" }
          },
          [
            h(NSpace, { justify: "space-between", style: { width: "100%" } }, [
              h(NCheckbox, {
                label: option.label as string,
                value: option.value
              }),
              h(NRadio, { label: "", value: option.value })
            ])
          ]
        )
      ]
    ]
  );

/**
 * 清除所有选项
 */
const clearSelected = () => {
  selectValue.value = [];
  radioValue.value = "";
};

/**
 * 选中所有选项
 */
const checkedAllSelected = () => {
  selectValue.value = props.options.map((item: any) => item.value);
  radioValue.value = props.options.length && props.options[0].value;
};
</script>

<style lang="scss" scoped>
.tool {
  &-header {
    .n-button {
      margin-right: 4px;
    }
  }
  &-content {
    padding: 4px 0;
  }
  &-footer {
    width: 100%;
    display: inline-block;
    text-align: right;
    .n-button {
      margin-left: 4px;
    }
  }
  .n-button {
    font-size: 12px;
  }
}
</style>
