<template>
  <RibbonMenu
    v-bind="$attrs"
    :options="options"
    @update:value="updateMenuValue"
  />

  <!-- 弹窗组件 -->
  <CorrectTrend v-model="showCorrectTrend" />
  <Gradient v-model="showGradient" />
  <Tides v-model="showTides" />
  <Derivative v-model="showDerivative" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { CorrectTrend, Gradient, Tides, Derivative } from "@/window";
import { useEditStore } from "@/stores/modules/edit";
import { VxeUI } from "vxe-pc-ui";

const props = defineProps<{
  controlKey: string;
}>();

const editStore = useEditStore();
const { t } = useI18n();
const chartInstance = computed(() => {
  return editStore.chartRef ? editStore.chartRef.getInstance() : null;
});

const showCorrectTrend = ref(false);
const showGradient = ref(false);
const showTides = ref(false);
const showDerivative = ref(false);

const options = computed<MenuType[]>(() => {
  return [
    {
      label: t("menu.qaqc"),
      show: props.controlKey === "QAQC" ? true : false,
      type: "group",
      children: [
        {
          type: "smallButtonGroup",
          children: [
            {
              type: "smallButton",
              label: t("menu.nearest"),
              id: t("menu.nearest"),
              icon: "tsPickNearestL"
            },
            {
              type: "smallButton",
              label: t("menu.autoSync"),
              id: t("menu.autoSync"),
              icon: "tsAutoTimeShiftL",
              disabled: true
            }
          ]
        },
        {
          label: t("menu.difference"),
          id: t("menu.difference"),
          type: "largeButton",
          disabled: true,
          icon: "tsDifferenceL"
        },
        {
          label: t("menu.derivative"),
          id: "qaqc_derivative",
          type: "largeButton",
          icon: "tsDerivativeL"
        },
        {
          label: t("menu.merge"),
          id: t("menu.merge"),
          type: "largeButton",
          icon: "tsMergeL",
          disabled: true
        },
        {
          label: t("menu.correctTrend"),
          id: "qaqc_correctTrend",
          type: "largeButton",
          icon: "tsCorrectTrendL"
        },
        {
          label: t("menu.convertToBh"),
          id: t("menu.convertToBh"),
          type: "largeButton",
          icon: "tsConvertToBHL"
        },
        {
          label: t("menu.gradient"),
          id: "qaqc_gradient",
          type: "largeButton",
          icon: "tsGradientL"
        },
        {
          label: t("menu.tides"),
          id: "qaqc_tides",
          type: "largeButton",
          icon: "tsTidesL"
        },
        { type: "divider" },
        {
          type: "smallButtonGroup",
          children: [
            {
              type: "smallButton",
              label: t("menu.paneManager"),
              id: "qaqc_paneManager",
              icon: "DisplayManagerL"
            },
            {
              type: "smallButton",
              label: t("menu.addUserPane"),
              id: t("menu.addUserPane"),
              icon: "tsAddUserPaneL"
            }
          ]
        },
        { type: "divider" },
        {
          label: t("menu.print"),
          id: "qaqc_print",
          type: "largeButton",
          icon: "tsPrintL"
        }
      ]
    }
  ];
});

const updateMenuValue = (value: string) => {
  const actions = new Map([
    ["qaqc_correctTrend", () => (showCorrectTrend.value = true)],
    ["qaqc_gradient", () => (showGradient.value = true)],
    ["qaqc_tides", () => (showTides.value = true)],
    ["qaqc_derivative", () => (showDerivative.value = true)],
    [
      "qaqc_paneManager",
      () => editStore.setEditState("showPane", !editStore.showPane)
    ],
    ["qaqc_print", () => handlePrint()]
  ]);

  const handler = actions.get(value) || (() => {});
  handler();
};

/**
 * 打印
 */
const handlePrint = () => {
  if (!chartInstance.value) return;
  let img = new Image();
  img.src = chartInstance.value?.getDataURL({
    pixelRatio: 2,
    backgroundColor: "#fff"
  }) as string;

  VxeUI.print({
    align: "center",
    pageBreaks: [
      {
        bodyHtml: `<img src="${img.src}" style="width: 100%;">`
      }
    ]
  });
};
</script>

<style scoped></style>
