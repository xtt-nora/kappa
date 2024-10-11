<template>
  <Dialog
    v-bind="config"
    v-model="showModal"
    :title="$t('main.loglogPlot')"
    height="49.8%"
    width="49.8%"
    :show-zoom="true"
    :position="{
      top: '0',
      left: '0'
    }"
  >
    <LoglogPlot />
  </Dialog>
  <Dialog
    v-model="showModal"
    v-bind="config"
    :show-zoom="true"
    :title="$t('main.standardWaterAnalysis')"
    height="49.8%"
    width="19.8%"
    :position="{
      top: '0',
      left: '80%'
    }"
  >
    <StandardWaterAnalysis />
  </Dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import LoglogPlot from "../LoglogPlot.vue";
import StandardWaterAnalysis from "../StandardWaterAnalysis.vue";
const showModal = ref(true);
const config = reactive({
  resize: true,
  mask: false,
  lockView: false,
  showClose: false,
  showMinimize: false,
  showFooter: false,
  transfer: false
});
</script>
