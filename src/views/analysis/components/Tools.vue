<template>
  <div class="panel">
    <n-scrollbar>
      <LargeButton
        v-for="(item, index) in iconOptions"
        :key="index"
        :icon="item.icon"
        @click="handleUpdateValue(item.key)"
        :active="item.key === activeKey"
        :title="item.title"
        size="45"
        :disabled="item.disabled"
      />
    </n-scrollbar>

    <!-- 弹窗组件 -->
    <Teleport to="body">
      <AnalyticalDesign
        v-model="showAnalytical"
        :title="$t('main.analytical')"
      />
      <Deconvolution
        v-model="showDeconvolution"
        :title="t('main.deconvolution')"
      />
      <Extract v-model="showExtract" :title="t('main.extract')" />
      <Load id="loadP" v-model="showLoadP" :title="t('main.loadP')" />
      <Load id="loadQ" v-model="showLoadQ" :title="t('main.loadQ')" />
      <NumericalDesign v-model="showNumerical" :title="$t('main.numerical')" />
      <Improve v-model="showImprove" :title="$t('main.improve')" />
      <Forecast v-model="showForecast" :title="$t('main.forecast')" />
      <Sensitivity v-model="showSensitivity" :title="$t('main.sensitivity')" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  AnalyticalDesign,
  Deconvolution,
  Extract,
  Load,
  NumericalDesign,
  Improve,
  Forecast,
  Sensitivity
} from "@/window";

const { t } = useI18n();

const showAnalytical = ref(false);
const showDeconvolution = ref(false);
const showExtract = ref(false);
const showLoadP = ref(false);
const showLoadQ = ref(false);
const showNumerical = ref(false);
const showImprove = ref(false);
const showForecast = ref(false);
const showSensitivity = ref(false);

const activeKey = ref("");

const iconOptions = computed(() => [
  { icon: "PTA_LoadQ", key: "PTA_LoadQ", title: t("main.loadQ") },
  { icon: "PTA_LoadP", key: "PTA_LoadP", title: t("main.loadP") },
  { icon: "PTA_ExtractDP", key: "PTA_ExtractDP", title: t("main.extract") },
  {
    icon: "PTA_Deconvolution",
    key: "PTA_Deconvolution",
    title: t("main.deconvolution")
  },
  {
    icon: "PTA_AnalyticalModel",
    key: "PTA_AnalyticalModel",
    title: t("main.analytical")
  },
  {
    icon: "PTA_NumericalModel",
    key: "PTA_NumericalModel",
    title: t("main.numerical")
  },
  {
    icon: "PTA_Improve",
    key: "PTA_Improve",
    title: t("main.improve")
  },
  {
    icon: "PTA_Forecast",
    key: "PTA_Forecast",
    title: t("main.forecast")
  },
  {
    icon: "PTA_Sensitivity",
    key: "PTA_Sensitivity",
    title: t("main.sensitivity"),
    disabled: false
  }
]);

const handleUpdateValue = (value: string) => {
  console.log(value);
  activeKey.value === value;

  const actions = new Map([
    ["PTA_LoadQ", () => (showLoadQ.value = true)],
    ["PTA_LoadP", () => (showLoadP.value = true)],
    ["PTA_ExtractDP", () => (showExtract.value = true)],
    ["PTA_Deconvolution", () => (showDeconvolution.value = true)],
    ["PTA_AnalyticalModel", () => (showAnalytical.value = true)],
    ["PTA_NumericalModel", () => (showNumerical.value = true)],
    ["PTA_Improve", () => (showImprove.value = true)],
    ["PTA_Forecast", () => (showForecast.value = true)],
    ["PTA_Sensitivity", () => (showSensitivity.value = true)]
  ]);
  const handler = actions.get(value) || (() => {});
  handler();
};
</script>

<style scoped lang="scss">
.panel {
  :deep(.n-scrollbar-content) {
    display: inline-flex;
    flex-direction: column;
  }
}
</style>
