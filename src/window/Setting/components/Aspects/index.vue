<template>
  <n-tabs type="card" size="small" v-model:value="selectedKey">
    <n-tab-pane :tab="$t('menu.plot')" name="aspects_plot"
      ><Plot />
    </n-tab-pane>
    <n-tab-pane :tab="$t('menu.slideMode')" name="aspects_slideMode">
      <SlideMode />
    </n-tab-pane>
    <n-tab-pane :tab="$t('menu.colorScale')" name="aspects_colorScale">
      <ColorScale />
    </n-tab-pane>
    <n-tab-pane :tab="$t('menu.analysisPlots')" name="aspects_analysisPlots">
      <AnalysisPlots />
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import Plot from "./components/Plot.vue";
import SlideMode from "./components/SlideMode.vue";
import AnalysisPlots from "./components/AnalysisPlots.vue";
import ColorScale from "./components/ColorScale.vue";
const selectedKey = defineModel({
  type: String,
  default: ""
});
</script>

<style scoped lang="scss">
.n-tabs {
  height: 100%;
  .n-tab-pane {
    overflow: hidden;
  }
}
</style>
