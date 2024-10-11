import { defineStore } from "pinia";
import { EChartsType } from "echarts/core";
import piniaPersisConfig from "@/stores/helper/persist";

type DisplayType = "showTable" | "showRateLines" | "showProductionEventLines";

type ChartRefType = {
  getInstance: () => EChartsType;
};

export interface editState {
  /**
   * @description 是否显示控制面板管理器
   */
  showPane: boolean;
  /**
   * @description edit页面图表Ref
   */
  chartRef: null | ChartRefType;
  /**
   * @description 可视化控制器
   */
  display: DisplayType[];
  /**
   * @description 编辑模式
   */
  editMode: EditType;
}

export const useEditStore = defineStore({
  id: "edit",
  state: (): editState => ({
    showPane: false,
    chartRef: null,
    display: ["showTable"],
    editMode: "QAQC"
  }),
  getters: {},
  actions: {
    // Set editState
    setEditState(...args: ObjToKeyValArray<editState>) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  persist: piniaPersisConfig("edit")
});
