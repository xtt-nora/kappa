<template>
  <RibbonMenu
    v-bind="$attrs"
    :options="options"
    @update:value="updateMenuValue"
  />

  <!-- 弹窗组件 -->
  <Manual v-model="showManual" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Manual } from "@/window";
import useBrush from "../hooks/useBrush";

const { t } = useI18n();

const showManual = ref(false);

const options = computed<MenuType[]>(() => {
  return [
    {
      label: t("menu.select"),
      type: "group",
      children: [
        {
          label: t("menu.box"),
          id: "select_box",
          type: "largeButton",
          icon: "tsSelectBoxL"
        },
        {
          type: "smallButtonGroup",
          children: [
            {
              type: "smallButton",
              label: t("menu.time"),
              id: "select_time",
              icon: "tsSelectTimeRangeL"
            },
            {
              type: "smallButton",
              label: t("menu.value"),
              id: "select_value",
              icon: "tsSelectDataRangeL"
            },
            {
              type: "smallButton",
              label: t("menu.manual"),
              id: "select_manual",
              icon: "tsSelectManualL"
            }
          ]
        },
        {
          label: t("menu.lasso"),
          id: "select_lasso",
          type: "largeButton",
          icon: "tsSelectLassoL"
        },
        {
          type: "smallButtonGroup",
          children: [
            {
              type: "smallButton",
              label: t("menu.all"),
              id: "select_all",
              icon: "tsSelectAllS"
            },
            {
              type: "smallButton",
              label: t("menu.view"),
              id: "select_view",
              icon: "tsSelectDataRangeL"
            },
            {
              type: "smallButton",
              label: t("menu.point"),
              id: "select_point",
              icon: "tsSelectBoxS"
            }
          ]
        }
      ]
    }
  ];
});

const updateMenuValue = (value: string) => {
  const actions = new Map([["select_manual", () => (showManual.value = true)]]);

  const handler = actions.get(value) || (() => {});
  handler();
  useBrush(value);
};
</script>

<style scoped></style>
