<template>
  <RibbonMenu :options="options" @update:value="updateMenuValue" />

  <!-- 弹窗组件 -->
  <AnalyticalDesign
    v-model="showAnalyticalDesign"
    :title="$t('menu.analyticalDesign')"
  />
  <AveragePressure v-model="showAveragePressure" />
  <IPR v-model="showIPR" />
  <NumericalDesign
    v-model="showNumericalDesign"
    :title="$t('menu.numericalDesign')"
  />
  <ProductivityIndex v-model="showProductivityIndex" />
  <WellIntake v-model="showWellIntake" />
</template>
<script lang="ts" setup>
import RibbonMenu from "@/components/Ribbon/RibbonMenu.vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  AnalyticalDesign,
  AveragePressure,
  IPR,
  NumericalDesign,
  ProductivityIndex,
  WellIntake
} from "@/window";

const { t } = useI18n();

const showAnalyticalDesign = ref(false);
const showAveragePressure = ref(false);
const showIPR = ref(false);
const showNumericalDesign = ref(false);
const showProductivityIndex = ref(false);
const showWellIntake = ref(false);

const options = computed<MenuType[]>(() => [
  {
    label: t("menu.testDesign"),
    type: "group",
    children: [
      {
        label: t("menu.analyticalDesign"),
        id: "additional_analyticalDesign",
        type: "largeButton",
        icon: "PTA_TestDesignL"
      },
      {
        label: t("menu.numericalDesign"),
        id: "additional_numericalDesign",
        type: "largeButton",
        icon: "PTA_TestDesignNumL"
      }
    ]
  },
  {
    label: t("menu.moreTools"),
    type: "group",
    children: [
      {
        label: t("menu.averagePressure"),
        id: "additional_averagePressure",
        type: "largeButton",
        icon: "PAverageL"
      },
      {
        label: t("menu.ipr"),
        id: "additional_ipr",
        type: "largeButton",
        icon: "IprAofL"
      },
      {
        label: t("menu.wellIntake"),
        id: "additional_wellIntake",
        type: "largeButton",
        icon: "WellboreL"
      }
    ]
  },
  {
    label: t("menu.report"),
    type: "group",
    children: [
      {
        label: t("menu.preview"),
        id: t("menu.preview"),
        type: "largeButton",
        disabled: true,
        icon: "tsReportPreviewL"
      },
      {
        label: t("menu.print"),
        id: t("menu.print"),
        type: "largeButton",
        icon: "tsPrintL"
      },
      {
        label: t("menu.productivityIndex"),
        id: "additional_productivityIndex",
        type: "largeButton",
        icon: "ProductivityIndexL"
      }
    ]
  }
]);

const updateMenuValue = (value: string) => {
  console.log(101, value);
  const actions = new Map([
    ["additional_analyticalDesign", () => (showAnalyticalDesign.value = true)],
    ["additional_numericalDesign", () => (showNumericalDesign.value = true)],
    ["additional_averagePressure", () => (showAveragePressure.value = true)],
    ["additional_ipr", () => (showIPR.value = true)],
    ["additional_wellIntake", () => (showWellIntake.value = true)],
    ["additional_productivityIndex", () => (showProductivityIndex.value = true)]
  ]);
  const handler = actions.get(value) || (() => {});
  handler();
};
</script>
