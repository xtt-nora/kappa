<template>
  <CollapseForm :default-expanded-names="['legend']" :form="aspectCollapse" />
</template>

<script setup lang="ts">
import CollapseForm from "@/components/CollapseForm/index.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const aspectCollapse = ref([
  {
    title: t("menu.legend"),
    name: "legend",
    children: [
      {
        type: "checkbox",
        label: t("menu.showEventDates"),
        value: false
      },
      {
        type: "checkbox",
        label: t("menu.showNormalizationFactors"),
        value: false
      },

      {
        type: "checkbox",
        label: t("menu.showGoodnessOfFit"),
        value: false
      }
    ]
  }
]);
</script>

<style scoped></style>
