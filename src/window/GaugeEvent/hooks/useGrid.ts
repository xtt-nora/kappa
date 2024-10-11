import { reactive } from "vue";
import { VxeGridProps } from "vxe-table";
interface RowVO {
  time: string;
  pressure: string;
}
export default () => {
  const gridOptions = reactive<VxeGridProps<RowVO>>({
    border: true,
    height: "auto",
    showOverflow: true,
    scrollY: {
      enabled: true,
      gt: 0
    },
    size: "mini",
    columns: [
      { field: "time", title: "Time" },
      { field: "pressure", title: "Pressure" }
    ],
    data: [
      { time: "12", pressure: "1000.00" },
      { time: "12", pressure: "1200.00" },
      { time: "12", pressure: "1400.00" },
      { time: "48", pressure: "1500.00" },
      { time: "72", pressure: "0000.00" }
    ]
  });

  return {
    gridOptions
  };
};
