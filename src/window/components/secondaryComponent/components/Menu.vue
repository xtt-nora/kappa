<template>
  <div class="sub_title">
    <RibbonMenu :options="controlOption" />
  </div>
</template>

<script lang="ts" setup>
import RibbonMenu from "@/components/Ribbon/RibbonMenu.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const controlOption = computed<MenuType[]>(() => [
  {
    label: t("step.qFlash"),
    type: "group",
    children: [
      {
        label: t("step.flash"),
        id: "Flash",
        type: "largeButton",
        icon: "tsQAQC"
      }
    ]
  },
  {
    label: t("step.import"),
    type: "group",
    children: [
      {
        label: t("step.kappa"),
        id: "KAPPA",
        type: "largeButton",
        icon: "tsQAQC"
      },
      {
        label: t("step.ascii"),
        id: "ASCII",
        type: "largeButton",
        icon: "tsPressure"
      },
      {
        label: t("step.excel"),
        id: "Excel",
        type: "largeButton",
        icon: "tsRate"
      },
      {
        label: t("step.clip"),
        id: "Clipboard",
        type: "largeButton",
        icon: "tsRate"
      },
      {
        label: t("step.petex"),
        id: "Petex",
        type: "largeButton",
        icon: "tsRate"
      },
      {
        label: t("step.ifp"),
        id: "Ifp",
        type: "largeButton",
        icon: "tsRate"
      },
      {
        label: t("step.exlipse"),
        id: "Eclipse",
        type: "largeButton",
        icon: "tsRate"
      }
    ]
  },
  {
    label: t("menu.export"),
    type: "group",
    children: [
      {
        label: t("step.kappa"),
        id: "Kappa",
        type: "largeButton",
        icon: "tsQAQC"
      },
      {
        label: t("step.ascii"),
        id: "Ascii",
        type: "largeButton",
        icon: "tsPressure"
      }
    ]
  }
]);
</script>
<style src="./index.scss" lang="scss" scoped></style>
