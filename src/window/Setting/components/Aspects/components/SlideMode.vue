<template>
  <CollapseForm
    :default-expanded-names="['text', 'data', 'plot']"
    :form="aspectCollapse"
  />
</template>

<script setup lang="ts">
import CollapseForm from "@/components/CollapseForm/index.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const aspectCollapse = ref([
  {
    title: t("menu.plot"),
    name: "plot",
    children: [
      {
        type: "input",
        label: t("menu.gridWidth"),
        value: "1.5"
      },
      {
        type: "input",
        label: t("menu.tickWidth"),
        value: "2"
      }
    ]
  },
  {
    title: t("menu.data"),
    name: "data",
    children: [
      {
        type: "input",
        label: t("menu.markerSize"),
        value: "2"
      },
      {
        type: "input",
        label: t("menu.straightLineWidth"),
        value: "2"
      },
      {
        type: "input",
        label: t("menu.curveWidth"),
        value: "2"
      }
    ]
  },
  {
    title: t("menu.text"),
    name: "text",
    children: [
      {
        type: "input",
        label: t("menu.axesFontSize"),
        value: "1.5"
      },
      {
        type: "checkbox",
        label: t("menu.axesFontBold"),
        value: false
      },
      {
        type: "input",
        label: t("menu.resultsAndPlotsFontSize"),
        value: "2"
      },
      {
        type: "checkbox",
        label: t("menu.resultsAndPlotsFontBold"),
        value: false
      }
    ]
  }
]);
</script>

<style scoped></style>
