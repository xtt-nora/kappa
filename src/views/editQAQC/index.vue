<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed="!editStore.display.includes('showTable')"
      :collapsed-width="0"
      :width="290"
    >
      <vxe-grid v-bind="gridOptions"></vxe-grid>
    </n-layout-sider>
    <n-layout-content content-class="editQAQC">
      <Echarts
        ref="chartRef"
        :option="options"
        :on-click-zr="handleContextMenu"
      />
    </n-layout-content>
    <n-layout-sider
      v-if="editStore.editMode === 'QAQC'"
      collapse-mode="width"
      :collapsed="editStore.showPane"
      :collapsed-width="0"
      :width="240"
      :show-collapsed-content="false"
      bordered
    >
      <PaneManager />
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Echarts from "@/components/Echarts/index.vue";
import { useEditStore } from "@/stores/modules/edit.ts";
import { EChartsType } from "echarts/core";
import PaneManager from "@/window/PaneManager/index.vue";
import useEditOption from "./hooks/useEditOption";
import useClickSeries from "./hooks/useClickSeries";
import useGrid from "./hooks/useGrid";
import { watch } from "vue";
import { getFlatTreeData } from "@/utils";
import { useProjectStore } from "@/stores/modules/project";
import { storeToRefs } from "pinia";

type ChartType = { getInstance: () => EChartsType };

const chartRef = ref<ChartType | null>(null);

const editStore = useEditStore();
const { options } = useEditOption();
const { handleContextMenu, seriesType } = useClickSeries(chartRef);
const { gridOptions } = useGrid(seriesType);
const projectStore = useProjectStore();

const { treeData } = storeToRefs(projectStore);

watch(seriesType, (val: any) => {
  if (val && treeData.value.length) {
    try {
      // 文件列表扁平化
      const treeList = getFlatTreeData(treeData.value);
      // 获取当前选择图表的数据的父节点
      const parentId = treeList.find(item => item.id === val.id).parentId;
      // 找到父节点
      const parentNode = treeList.find(item => item.id === parentId);

      // 更新activeGauge列表
      projectStore.$patch({
        activeGuage: val.id,
        activeGuageOption: parentNode.children.map(item => {
          return {
            label: item.name,
            value: item.id
          };
        })
      });

      // 更新产量/压力数据
      if (parentNode.name.toLowerCase().includes("production")) {
        projectStore.$patch({
          radioProduction: val.id
        });
      } else if (parentNode.name.toLowerCase().includes("pressure")) {
        projectStore.$patch({
          radioPressure: val.id
        });
      }
    } catch (error) {}
  }
});

watch(
  chartRef,
  val => {
    val &&
      editStore.$patch({
        chartRef
      });
  },
  {
    deep: true
  }
);
</script>

<style scoped lang="scss">
.n-layout {
  height: 100%;
  :deep(.editQAQC) {
    height: 100%;
    .comChart {
      box-sizing: border-box;
    }
  }
}
</style>
