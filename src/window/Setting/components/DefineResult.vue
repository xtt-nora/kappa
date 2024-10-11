<template>
  <div class="info">
    <div class="info-dataSet">
      <span class="labelC">Current unit system:</span>
      <vxe-input
        v-model="dataType"
        disabled
        style="margin-left: 12px"
      ></vxe-input>
      <div class="info-dataSelect">
        <vxe-upload v-model="fileList2" :show-list="false">
          <template #default>
            <n-button style="margin-left: 24px">Load</n-button>
          </template>
        </vxe-upload>
        <n-dropdown trigger="hover" :options="dataTypeList">
          <n-button>▼</n-button>
        </n-dropdown>
      </div>
      <n-button @click="saveFileToLocal" style="margin-left: 24px"
        >Save as</n-button
      >
    </div>
    <div class="info-unit">
      <vxe-grid
        ref="gridRef"
        v-bind="gridUnitOptions"
        @cell-click="cellClickEvent"
        :cell-class-name="cellClassName"
      >
        <template #edit_name="{ row }">
          <vxe-select v-model="row.unit" :options="getSelectOptions(row)">
          </vxe-select>
        </template>
      </vxe-grid>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { timeZoneObject, unitData } from "./data.ts";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import {
  VxeFormProps,
  VxeFormItemPropTypes,
  VxeFormInstance,
  VxeTableDefines,
  VxeTablePropTypes,
  VxeTableEvents,
  VxeColumnPropTypes,
  VxeGridInstance
} from "vxe-pc-ui";
import { VxeGridProps } from "vxe-table";
//定义数据
interface RowVO {
  col1: string;
  col2: string;
}
const dataType = ref("Oil Field");
const fileList2 = ref([]);
const dataTypeList = [
  {
    label: "SI",
    key: "SI"
  },
  {
    label: "Oil Field",
    key: "Oil Field"
  },
  {
    label: "Hydro",
    key: "Hydro"
  },
  {
    label: "French",
    key: "French"
  },
  {
    label: "From file",
    key: "From file"
  }
];
const showPull = ref(false);
const fileContent = ref<string | ArrayBuffer | null>(`<?xml version="1.0"?>
  <UnitSystem>
    <USKId>
      <int>1</int>
    </USKId>
    <USK>
      <UnitSystemKey>OilField</UnitSystemKey>
    </USK>
  </UnitSystem>`); // 文件内容（示例中的 XML 内容）

//reference
interface FormDataVO {
  reference: string;
  zone: string;
  longitude: "";
  latitude: "";
}

const formOptionsSp = reactive<VxeFormProps<FormDataVO>>({
  titleWidth: "30%",
  data: {
    longitude: "N/A",
    latitude: "N/A"
  },
  rules: {
    longitude: [
      { required: true, message: "请输入经纬度" },
      {
        validator({ itemValue }) {
          // 自定义校验
          if (Number(itemValue) > 180 || Number(itemValue) < -180) {
            return new Error("请输入-180~180之间的数值");
          }
        }
      }
    ],
    latitude: [
      { required: true, message: "请输入经纬度" },
      {
        validator({ itemValue }) {
          // 自定义校验
          if (Number(itemValue) > 180 || Number(itemValue) < -180) {
            return new Error("请输入-180~180之间的数值");
          }
        }
      }
    ]
  },
  items: [
    {
      field: "longitude",
      title: t("step.longitude"),
      span: 20,
      itemRender: {
        name: "VxeInput",
        props: {
          clearable: true,
          type: "float",
          controls: false,
          value: computed(() =>
            formOptionsSp.data.longitude === "N/A"
              ? ""
              : formOptionsSp.data.longitude
          )
        }
        // events: { blur: blurEvent }
      }
    },
    {
      field: "latitude",
      title: t("step.latitude"),
      span: 20,
      itemRender: {
        name: "VxeInput",
        props: {
          clearable: true,
          type: "float",
          controls: false
        }
        // events: { blur: blurEvent2 }
      }
    }
  ]
});
const selectRow = ref<RowVO>();
const selectColumn = ref<VxeTableDefines.ColumnInfo<RowVO>>();
const cellClassName: VxeTablePropTypes.CellClassName<RowVO> = ({
  row,
  column
}) => {
  if (row === selectRow.value && column === selectColumn.value) {
    return "col-orange";
  }
  return null;
};
const cellClickEvent: VxeTableEvents.CellClick<RowVO> = ({ row, column }) => {
  selectRow.value = row;
  selectColumn.value = column;
};
//units
const gridRef = ref<VxeGridInstance>();
function getSelectOptions(row) {
  return row.someCondition || [];
}

const gridUnitOptions = reactive<VxeGridProps<any>>({
  border: true,
  showOverflow: true,
  height: "auto",
  showHeader: false,
  editConfig: {
    trigger: "click",
    mode: "cell"
  },
  columns: [
    {
      field: "name",
      title: "name",
      minWidth: 200
    },
    {
      field: "unit",
      title: "unit",
      minWidth: 200,
      editRender: {},
      slots: { edit: "edit_name" }
    }
  ],
  data: unitData
});
const toggleEvent = () => {
  showPull.value = !showPull.value;
};
const clickEvent = (item: string) => {
  dataType.value = item;
};
function saveFileToLocal() {
  if (!fileContent.value) {
    alert("请先选择一个文件或输入内容");
    return;
  }

  const blob = new Blob([fileContent.value], { type: "application/xml" }); // 指定为 XML 类型
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "example.kus5"; // 你可以根据实际需求设置文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
<style lang="scss" scoped>
.step1 {
  margin-top: 18px * 0.8;
}

::v-deep .vxe-textarea:not(.def--cols),
::v-deep .vxe-textarea:not(.def--cols) .vxe-textarea--inner {
  width: 100%;
  height: 100%;
}
.info {
  width: 100%;
  height: 100%;
  &-dataSet {
    display: inline-block;
    padding: 12px 0;
    width: 100%;
    .vxe-button {
      float: right;
    }
  }
  &-dataSelect {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  &-unit {
    height: calc(100% - 18px);
  }
  .labelC {
    font-size: 12px;
  }
}
.my-dropdown-link {
  display: block;
  text-align: center;
  line-height: 28px;
  width: 72px;
  border: 1px solid transparent !important;
}
.contentBox {
  width: calc(100% - 30px * 0.8);
  height: 130px * 0.8;
  box-sizing: border-box;
  margin-left: 5px * 0.8;
  margin-right: 25px * 0.8;
  margin-bottom: 5px * 0.8;
  border: 1px solid $initBorder;
  border-radius: 2px;
  .title {
    height: 25px * 0.8;
    padding-left: 15px * 0.8;
    background-color: $dialogBg0;
  }
  .content {
    width: 100%;
    height: calc(100% - 25px * 0.8);
    background-color: $initBg;
  }
}
::v-deep .vxe-form .vxe-form--item {
  display: none;
  padding: 0;
  padding-left: 15px * 0.8;
}
::v-deep .vxe-form {
  width: 100%;
  height: 100%;
  background-color: $initBg;
}
::v-deep .mytable-style.vxe-table,
::v-deep .vxe-body--column.col-orange {
  background-color: $tableSelectedCollapseBg;
  color: #000000;
}
::v-deep .vxe-input {
  width: 180px * 0.8;
}
::v-deep .vxe-pulldown,
.vxe-pulldown--panel {
  width: 20px * 0.8;
}
::v-deep
  .vxe-form--item.is--asterisk.is--required
  .vxe-form--item-title-content:before {
  content: "";
}
// ::v-deep .vxe-button.type--button:not(.is--round) {
//   border-radius: 0;
//   line-height: 0;
// }
.loadButton {
  border-radius: 0 !important;
  line-height: 0 !important;
}
::v-deep .vxe-button.size--mini.type--button {
  /* height: var(--vxe-ui-button-height-mini); */
  height: 20px;
}
</style>
