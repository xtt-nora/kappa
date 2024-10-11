<template>
  <CollapseForm
    :default-expanded-names="[
      'loadDialog',
      'separators',
      'numericSeparator',
      'absentDataTreatment'
    ]"
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
    title: t("menu.loadDialog"),
    name: "loadDialog",
    children: [
      {
        type: "input",
        label: t("menu.ofLinesDisplayed"),
        value: "100"
      }
    ]
  },
  {
    title: t("menu.separators"),
    name: "separators",
    children: [
      {
        type: "checkbox",
        label: t("menu.space"),
        value: true
      },
      {
        type: "checkbox",
        label: t("menu.tab"),
        value: true
      },
      {
        type: "checkbox",
        label: t("menu.otherSeparator"),
        value: false
      },
      {
        type: "input",
        label: t("menu.otherSeparator"),
        value: ""
      },
      {
        type: "checkbox",
        label: t("menu.treatConsecutiveSeparatorsAsAField"),
        value: false
      }
    ]
  },
  {
    title: t("menu.numericSeparator"),
    name: "numericSeparator",
    children: [
      {
        type: "select",
        label: t("menu.decimalSeparator"),
        options: [
          { label: t("menu.dot"), value: "dot" },
          { label: t("menu.comma"), value: "comma" }
        ],
        value: "dot"
      },
      {
        type: "select",
        label: t("menu.groupSeparator"),
        options: [
          { label: t("menu.dot"), value: "dot" },
          { label: t("menu.comma"), value: "comma" },
          { label: t("menu.space"), value: "space" },
          { label: t("menu.none"), value: "none" }
        ],
        value: "comma"
      }
    ]
  },
  {
    title: t("menu.absentDataTreatment"),
    name: "absentDataTreatment",
    children: [
      {
        type: "select",
        label: t("menu.action"),
        options: [
          { label: t("menu.doNothing"), value: "doNothing" },
          { label: t("menu.ignoreTheDataRow"), value: "ignoreTheDataRow" },
          { label: t("menu.replaceTheData"), value: "replaceTheData" }
        ],
        value: "doNothing"
      },
      {
        type: "select",
        label: t("menu.groupSeparator"),
        options: [
          { label: t("menu.dot"), value: "dot" },
          { label: t("menu.comma"), value: "comma" },
          { label: t("menu.space"), value: "space" },
          { label: t("menu.none"), value: "none" }
        ],
        value: "comma"
      },
      {
        type: "input",
        label: t("menu.absentValue"),
        value: ""
      },
      {
        type: "input",
        label: t("menu.replaceWithThisValue"),
        value: "0"
      }
    ]
  }
]);
</script>

<style scoped></style>
