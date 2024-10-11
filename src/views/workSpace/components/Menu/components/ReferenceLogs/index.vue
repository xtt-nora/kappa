<template>
  <RibbonMenu :options="options" @update:value="updateMenuValue" />
  <!-- 弹窗组件 -->
  <Dialog v-model="showCompletion" :title="t('menu.completion')"
    ><Completion
  /></Dialog>
  <Dialog v-model="showLogs" :title="t('menu.logs')"><ReferenceLogs /></Dialog>
</template>
<script lang="ts" setup>
import RibbonMenu from "@/components/Ribbon/RibbonMenu.vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Completion, ReferenceLogs } from "@/window";

const { t } = useI18n();

const showCompletion = ref(false);
const showLogs = ref(false);

const options = computed<MenuType[]>(() => [
  {
    label: t("menu.well"),
    type: "group",
    children: [
      {
        type: "smallButtonGroup",
        children: [
          {
            label: t("menu.well"),
            id: t("menu.well"),
            type: "select",
            options: [
              {
                label: "Drive My Car",
                value: "song1"
              },
              {
                label: "Norwegian Wood",
                value: "song2"
              }
            ],
            handleUpdateValue: (value: string) => updateWellValue(value)
          }
        ]
      }
    ]
  },
  {
    label: t("menu.data"),
    type: "group",
    children: [
      {
        label: t("menu.completion"),
        id: "reference_completion",
        type: "largeButton",
        icon: "NewWellSketchL"
      },
      {
        label: t("menu.logs"),
        id: "reference_logs",
        type: "largeButton",
        icon: "LoadL"
      }
    ]
  },
  {
    label: t("menu.plotOptions"),
    type: "group",
    children: [
      {
        label: t("menu.vertical"),
        id: t("menu.vertical"),
        type: "largeButton",
        icon: "WellSketchVerticalOffL"
      },
      {
        label: t("menu.horizontal"),
        id: t("menu.horizontal"),
        type: "largeButton",
        icon: "WellSketchHorizontalOnL"
      }
    ]
  },
  {
    label: t("menu.display"),
    type: "group",
    children: [
      {
        label: t("menu.paneManager"),
        id: t("menu.paneManager"),
        type: "largeButton",
        disabled: true,
        icon: "DisplayManagerL"
      },
      {
        label: t("menu.printPreviewLarge"),
        id: t("menu.printPreviewLarge"),
        type: "largeButton",
        icon: "tsPrintPreviewL"
      },
      {
        label: t("menu.print"),
        id: t("menu.print"),
        type: "largeButton",
        icon: "tsPrintL"
      }
    ]
  }
]);

const updateWellValue = (value: string) => {
  console.log(value);
};

const updateMenuValue = (value: string) => {
  console.log(101, value);
  const actions = new Map([
    ["reference_completion", () => (showCompletion.value = true)],
    ["reference_logs", () => (showLogs.value = true)]
  ]);
  const handler = actions.get(value) || (() => {});
  handler();
};
</script>
