import { reactive, watch } from "vue";

export default (formData: any, chartRef: any) => {
  const styleMap = {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted",
    dashot: [10, 6, 2, 3],
    ashdot: [2, 1, 3, 3, 2]
  };

  const option = reactive({
    xAxis: {
      type: "value",
      show: false
    },
    yAxis: {
      type: "category",
      show: false,
      data: ["0", "10", "20", "30", "40", "50", "60", "70", "80"]
    },
    series: [
      {
        type: "scatter",
        smooth: true,
        showSymbol: false,
        data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5],
        symbol: formData.type,
        symbolSize: formData.size,
        itemStyle: {
          color: formData.filled ? formData.color : "rgba(0, 0, 0, 0)",
          borderColor: formData.color
        }
      }
    ]
  });
  const optionLine = reactive({
    color: formData.colorLine,
    xAxis: {
      type: "value",
      show: false
    },
    yAxis: {
      type: "category",
      show: false,
      data: ["0", "10", "20", "30", "40", "50", "60", "70", "80"]
    },
    series: [
      {
        type: "line",
        smooth: true,
        showSymbol: false,
        data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
        // lineStyle: {
        //   width: formData.width,
        //   type: styleMap[formData.style],
        //   dashOffset: 30
        // }
      }
    ]
  });

  watch(
    [
      () => formData.color,
      () => formData.size,
      () => formData.type,
      () => formData.filled
    ],
    ([newColor, newSize, newType, newFilled]) => {
      // console.log(newColor, newSize, newType, newFilled);
      const options = chartRef.value?.getInstance()?.getOption();
      if (options) {
        options.series[0].symbol = newType;
        options.series[0].symbolSize = newSize;
        newFilled
          ? (options.series[0].itemStyle.color = newColor)
          : (options.series[0].itemStyle.color = "rgba(0, 0, 0, 0)");
        options.series[0].itemStyle.borderColor = newColor;
        chartRef.value?.getInstance()?.setOption(options, { Merge: false });
      }
    }
  );
  watch(
    [() => formData.colorLine, () => formData.style, () => formData.width],
    ([newColor, newStyle, newWidth]) => {
      const options = chartRef.value?.getInstance()?.getOption();
      if (options) {
        options.color = newColor;
        options.series[0].lineStyle.width = newWidth;
        options.series[0].lineStyle.type = styleMap[newStyle];
        options.series[0].lineStyle.dashOffset = 30;
        chartRef.value?.getInstance()?.setOption(options, { Merge: false });
      }
    }
  );

  return {
    option,
    optionLine
  };
};
