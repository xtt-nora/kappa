import { log, VxeGridProps } from "vxe-table";
import { NSelect, SelectOption } from "naive-ui";
import { unitConvert } from "@/api/modules/home";
import { h, reactive, ref, watch } from "vue";
import { commonApi } from "@/api/modules/workSpace";
import { useProjectStore } from "@/stores/modules/project";
import { storeToRefs } from "pinia";
import { useEditStore } from "@/stores/modules/edit";

interface RowVO {
  [key: string]: any;
}

const projectStore = useProjectStore();
const editStore = useEditStore();
const obj = ref({});
const { activeGuage, radioPressure, radioProduction } =
  storeToRefs(projectStore);
const { editMode } = storeToRefs(editStore);

const unitObj = ref({});

export default (seriesType: any) => {
  const gridOptions = reactive<VxeGridProps<RowVO>>({
    border: true,
    height: "auto",
    loading: false,
    showOverflow: true,
    scrollY: {
      enabled: true,
      gt: 0
    },
    columns: [],
    data: []
  });

  const currentUnits = ref({});
  const getGridData = async (fieldId: string) => {
    try {
      gridOptions.loading = true;
      const res = await commonApi.getFileData(
        fieldId,
        projectStore.projectId as string
      );

      const columns: any = [
        {
          children: [
            {
              width: 50,
              type: "seq",
              title: "\n"
            }
          ]
        }
      ];
      res.data.tableColumns.forEach(item => {
        columns.push({
          title: item.title,
          children: [
            {
              field: item.key,
              slots: {
                header() {
                  return h(NSelect, {
                    defaultValue: item.value,
                    placeholder: "",
                    options: item.options ?? [],
                    "onUpdate:value": newValue =>
                      handleUpdateValue(item.key, newValue, item.options)
                  });
                }
              }
            }
          ]
        });
        obj.value[item.key] = item.value;
        currentUnits.value[item.key] = item.value;
      });
      gridOptions.columns = columns;
      gridOptions.data = res.data.tableDataArr;
    } catch (error) {
      console.log(error);
    } finally {
      gridOptions.loading = false;
    }
  };
  const handleUpdateValue = async (
    key: string,
    value: string,
    option: SelectOption
  ) => {
    // console.log(key, value, option);
    const oldUnit = currentUnits.value[key];
    // console.log(currentUnits.value, "currentUnits.value");
    const newUnit = option.find(item => item.value === value);
    const params = {
      fieldName: key,
      fileId: projectStore.activeGuage,
      fromUnit: oldUnit,
      toUnit: newUnit.name
    };
    try {
      const res = await unitConvert(params);
      const data: any = res.data;
      const newUnitData = data[newUnit.name];
      const oldUnitData = data[oldUnit];

      gridOptions.data?.forEach((item: any) => {
        if (item[key]) {
          item.temp =
            ((item[key] - oldUnitData.offset) / oldUnitData.value) *
              newUnitData.value *
              Math.pow(10, newUnitData.exponent - oldUnitData.exponent) +
            newUnitData.offset;
          item[key] = item.temp.toFixed(6);
        }
      });
      currentUnits.value[key] = newUnit.name;
      gridOptions.data = [...gridOptions.data];
    } catch (error) {
      console.log(error);
    }
  };
  watch(
    activeGuage,
    val => {
      val && getGridData(val);
    },
    {
      immediate: true
    }
  );

  watch([editMode, radioPressure, radioProduction], () => {
    switch (editMode.value) {
      case "Pressure":
        radioPressure.value && getGridData(radioPressure.value);
        break;
      case "Production":
        radioProduction.value && getGridData(radioProduction.value);
    }
  });

  return {
    gridOptions
  };
};
