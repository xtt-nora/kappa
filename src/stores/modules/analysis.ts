import { defineStore } from "pinia";
import { EChartsType } from "echarts/core";
import { computed, ref } from "vue";

export interface editState {
  /**
   * 控制是否新建
   */
  showNewAnalysis: boolean;
  /**
   * 页面图表Ref
   */
  chartRef: null | EChartsType;
}
export const useAnalysisStore = defineStore("analysis", () => {
  const showNewAnalysis = ref(false);

  return { showNewAnalysis };
});
