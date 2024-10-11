import { commonApi } from "@/api/modules/workSpace";
import { ECOption } from "@/components/Echarts/config";
import { useEditStore } from "@/stores/modules/edit";
import { useProjectStore } from "@/stores/modules/project";
import { getFlatTreeData } from "@/utils";
import { storeToRefs } from "pinia";
import { computed, nextTick, reactive, watch } from "vue";

const projectStore = useProjectStore();
const editStore = useEditStore();
const { editMode, showPane } = storeToRefs(editStore);
const { treeData, activeWell, projectId, activePressure, activeProduction } =
  storeToRefs(projectStore);

export default () => {
  const options = reactive<ECOption>({
    toolbox: {
      showTitle: false,
      itemSize: 0,
      top: "-20%",
      feature: {
        dataZoom: {
          type: "slider"
        }
      }
    },
    legend: {
      show: true,
      type: "scroll",
      left: "10%"
    },
    brush: {
      throttleType: "debounce",
      throttleDelay: 100,
      toolbox: ["lineX", "lineY"] // 启用 X 轴和 Y 轴的刷选工具
      // xAxisIndex: [0, 1], // 允许 x 轴刷选
      // yAxisIndex: [0, 1] // 允许 y 轴刷选
    },
    dataZoom: [
      {
        show: false,
        type: "slider",
        start: 0,
        end: 100,
        filterMode: "filter"
      },
      {
        show: false,
        type: "slider",
        filterMode: "filter",
        start: 0,
        end: 100
      }
    ]
  });

  const well = computed(() => {
    const treeList = getFlatTreeData(treeData.value ?? []);
    const well = treeList.find(
      (item: { id: string }) => item.id === activeWell.value
    );
    let child: any = [];
    switch (editStore.editMode) {
      case "QAQC":
        return well;
      case "Production":
      case "Pressure":
        // 过滤除压力和产量之外的文件类型
        child = well.children.filter(
          (item: { name: string }) =>
            item.name.toLowerCase().includes("pressure") ||
            item.name.toLowerCase().includes("production")
        );
        // 过滤产量/压力复选框中未选择的文件
        child.forEach(item => {
          item.children.forEach((file: { id: string }, fileIndex: number) => {
            if (
              !activePressure.value.includes(file.id) &&
              !activeProduction.value.includes(file.id)
            ) {
              item.children.splice(fileIndex, 1);
            }
          });
        });
        well.children = child;
        return well;
      default:
        return undefined;
    }
  });

  const initOption = async () => {
    if (!projectId.value || typeof well.value === "undefined") return {};
    // 获取grid数量
    const wellNotEmpty = well.value.children.filter(
      item => item.children.length
    );
    // 生成grid
    let grid: any = [];
    // 生成xAxis
    let xAxis: any = [];
    // 生成yAxis
    let yAxis: any = [];
    // 生成series
    let series: any = [];
    /**
     * 记录x轴数据
     */
    let totalArray: any = [];
    let yAxisIndex: any = [];
    for (let i = 0; i < wellNotEmpty.length; i++) {
      for (const child of wellNotEmpty[i].children) {
        try {
          const res = await commonApi.getSampledData(
            child.id,
            projectId.value as string
          );

          totalArray = totalArray
            .concat(res.data.points.map(item => item[0]))
            .sort();

          series.push({
            name: child.name,
            type: wellNotEmpty[i].name.toLowerCase().includes("product")
              ? "line"
              : "scatter",
            step: "end",
            id: child.id,
            data: res.data.points,
            sampling: "lttb",
            large: true,
            symbolSize: 2,
            xAxisIndex: i,
            yAxisIndex: i
          });
        } catch (error) {}
      }
      grid.push({
        id: wellNotEmpty[i].id,
        name: wellNotEmpty[i].name,
        show: true,
        backgroundColor: "white",
        right: 0,
        height: 90 / wellNotEmpty.length + "%",
        top: (95 / wellNotEmpty.length) * i + "%"
      });
      xAxis.push({
        id: wellNotEmpty[i].id,
        type: "time",
        name: i === wellNotEmpty.length - 1 ? "Time" : "",
        nameLocation: "middle",
        nameGap: 20,
        nameTextStyle: {
          color: "#000"
        },
        axisLine: {
          show: i === wellNotEmpty.length - 1 ? true : false
        },
        axisLabel: {
          show: i === wellNotEmpty.length - 1 ? true : false,
          color: "black"
        },
        axisTick: {
          show: i === wellNotEmpty.length - 1 ? true : false
        },
        min: () => {
          return totalArray[0];
        },
        max: () => {
          return totalArray[totalArray.length - 1];
        },
        minorTick: {
          show: i === wellNotEmpty.length - 1 ? true : false
        },
        gridIndex: i
      });
      yAxis.push({
        id: wellNotEmpty[i].id,
        type: "value",
        name: wellNotEmpty[i].name,
        nameLocation: "middle",
        nameGap: 45,
        boundaryGap: ["10%", "10%"],
        nameTextStyle: {
          color: "#000"
        },
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
          color: "black",
          showMaxLabel: false
        },
        axisTick: {
          show: true
        },
        minorTick: {
          show: true
        },
        gridIndex: i
      });
      yAxisIndex.push(i);
    }
    options.grid = grid;
    options.xAxis = xAxis;
    options.yAxis = yAxis;
    options.series = series;
    options.dataZoom[0].xAxisIndex = yAxisIndex;
    options.dataZoom[1].yAxisIndex = yAxisIndex;
    options.brush.xAxisIndex = yAxisIndex;
    options.brush.yAxisIndex = yAxisIndex;
    // console.log(options, "options");
  };

  watch(
    [treeData, activeWell, editMode, activePressure, activeProduction],
    () => {
      if (treeData.value?.length && activeWell.value) {
        nextTick(() => initOption());
      }
    },
    {
      immediate: true,
      deep: true
    }
  );

  return {
    options
  };
};
