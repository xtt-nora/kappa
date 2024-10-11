import { watch } from "vue";
import { useEditStore } from "@/stores/modules/edit";
export default function useBrush(type: string) {
  const { chartRef } = useEditStore(); // 从 store 获取 ref 对象
  const map = {
    select_box: "rect",
    select_time: "lineX",
    select_value: "lineY",
    select_lasso: "polygon",
    select_all: "rect",
    select_view: "rect"
  };
  watch(
    () => chartRef,
    newValue => {
      if (newValue) {
        handleBursh();
      }
    },
    { immediate: true }
  );
  function handleBursh() {
    const data = chartRef?.getInstance()?.getOption().series[0].data;
    const values = data.map(item => parseFloat(item[1]));
    const dateMin = data[0][0];
    const dateMax = data[data.length - 1][0];
    const valueMin = Math.min(...values);
    const valueMax = Math.max(...values);
    // console.log(chartRef?.getInstance()?.getOption());
    const brushType = map[type];
    // if (type === "select_point") {
    //   chartRef?.getInstance()?.on("click", function (params) {
    //     window.open(
    //       "https://www.baidu.com/s?wd=" + encodeURIComponent(params.name)
    //     );
    //   });
    // }
    if (type === "select_all") {
      chartRef?.getInstance()?.dispatchAction({
        type: "brush",
        areas: [
          {
            xAxisIndex: 0,
            brushType: "rect",
            coordRange: [
              [dateMin, dateMax],
              [valueMin, valueMax]
            ]
          }
        ]
      });
    } else {
      chartRef?.getInstance()?.dispatchAction({
        type: "takeGlobalCursor",
        key: "brush",
        brushOption: {
          brushType,
          brushMode: "single"
        }
      });
    }
  }
}
