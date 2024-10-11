import { ECElementEvent, EChartsType } from "echarts/core";
import { computed, ref } from "vue";
import type { Ref } from "vue";

type ChartType = { getInstance: () => EChartsType };

export default (chartRef: Ref<ChartType | null>) => {
  /**
   * 当前所选图表
   */
  const seriesType = ref(null);
  /**
   * 当前所选图表索引
   */
  const seriesIndex = ref(-1);

  const chartInstance = computed<EChartsType | null>(() => {
    return chartRef.value ? chartRef.value.getInstance() : null;
  });

  const handleContextMenu = (params: ECElementEvent) => {
    try {
      // 获取当前鼠标点击canvas画布坐标
      const pointInPixel = [params.offsetX, params.offsetY];

      if (!chartInstance.value) {
        throw new Error("Chart instance is not available.");
      }

      const grid: any = chartInstance.value.getOption().grid;
      // 判断鼠标点击是否在图表series区域
      const inPixel = grid.findIndex((item: any) => {
        return chartInstance.value
          ? chartInstance.value.containPixel({ gridId: item.id }, pointInPixel)
          : -1;
      });
      if (inPixel !== -1) {
        if (typeof params.target !== "undefined") {
          // 遍历 target 对象的属性
          for (let key in params.target) {
            // 检查属性名称是否以 "__ec_inner_" 开头
            if (key.indexOf("__ec_inner_") === 0) {
              // 获取对应的值
              let value = params.target[key];
              // 如果值是一个对象，并且包含 seriesIndex 属性，则获取 seriesIndex 的值
              if (typeof value === "object" && "seriesIndex" in value) {
                seriesIndex.value = value.seriesIndex;
                const option = chartInstance.value.getOption() as any;
                seriesType.value = option.series[value.seriesIndex];

                // 可在此处进行其他操作
                break; // 可以跳出循环，因为找到了目标属性
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleContextMenu,
    seriesIndex,
    seriesType
  };
};
