<template>
  <RibbonGroup :title="t('menu.display')">
    <LargeDropDownButton
      :title="t('menu.display')"
      :options="options"
      icon="DisplayShowL"
      :render-option="renderOption"
    />
  </RibbonGroup>
</template>

<script setup lang="ts">
import RibbonGroup from "@/components/Ribbon/components/RibbonGroup.vue";
import { computed, h, VNode } from "vue";
import { useI18n } from "vue-i18n";
import {
  DropdownGroupOption,
  DropdownOption,
  NCheckbox,
  NCheckboxGroup
} from "naive-ui";
import { useEditStore } from "@/stores/modules/edit";

const editStore = useEditStore();
const { t } = useI18n();

const options = computed(() => [
  { label: t("menu.showTable"), key: "showTable" },
  { label: t("menu.showRateLines"), key: "showRateLines" },
  {
    label: t("menu.showProductionEventLines"),
    key: "showProductionEventLines"
  }
]);

/**
 * 渲染函数
 */
const renderOption = ({
  option
}: {
  node: VNode;
  option: DropdownOption | DropdownGroupOption;
}) =>
  h(
    NCheckboxGroup,
    {
      value: editStore.display,
      onUpdateValue: (value: any) => {
        editStore.setEditState("display", value);
      },
      style: {
        padding: "0 4px"
      }
    },
    {
      default: () =>
        h(NCheckbox, {
          label: option.label as string,
          value: option.key
        })
    }
  );
</script>
