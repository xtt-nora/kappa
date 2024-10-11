<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { defineProps, onMounted, reactive, ref, watch } from "vue";
import { VxeGridProps } from "vxe-table";
import { commonApi } from "@/api/modules/workSpace.ts";
import { ImportConfigDTO } from "@/api/interface/load.ts";
import { numberToExcelColumn } from "@/utils/tool.ts";
import { useProjectStore } from "@/stores/modules/project.ts";
import { useMessage } from "naive-ui";
import { useEditStore } from "@/stores/modules/edit";
import { storeToRefs } from "pinia";

const message = useMessage();
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    previewData: string[];
    fileName: string;
  }>(),
  {
    fileName: ""
  }
);

const projectStore = useProjectStore();
const editStore = useEditStore();
const { editMode } = storeToRefs(editStore);

watch(
  () => props.previewData,
  () => {
    updatePreviewTableData();
  }
);

/**
 * 时间类型
 */
const timeFormatOptions = ref<{ value: number; label: string }[]>([
  {
    label: t("load.param.timeFormatParam.points"),
    value: 0
  },
  {
    label: t("load.param.timeFormatParam.duration"),
    value: 1
  },
  {
    label: t("load.param.timeFormatParam.timeStart").toString(),
    value: 2
  },
  {
    label: t("load.param.timeFormatParam.timeEnd").toString(),
    value: 3
  }
]);

/**
 * 日期系统
 */
const timeSystemOptions = [
  {
    label: "(UTC-12:00) 国际日期变更线西间点",
    value: "UTC-12:00"
  },
  {
    label: "(UTC-11:00) 诺姆时间",
    value: "UTC-11:00"
  },
  {
    label: "(UTC-10:00) 夏威夷－阿留申标准时间",
    value: "UTC-10:00"
  },
  {
    label: "(UTC-09:00) 阿拉斯加标准时间",
    value: "UTC-09:00"
  },

  {
    label: "(UTC-08:00) 太平洋时间",
    value: "UTC-08:00"
  },
  {
    label: "(UTC-07:00) 山区时间",
    value: "UTC-07:00"
  },
  {
    label: "(UTC-06:00) 中部时间",
    value: "UTC-06:00"
  },
  {
    label: "(UTC-05:00) 东部时间",
    value: "UTC-05:00"
  },
  {
    label: "(UTC-04:00) 大西洋时间",
    value: "UTC-04:00"
  },
  {
    label: "(UTC-03:00) 巴西利亚时间",
    value: "UTC-03:00"
  },
  {
    label: "(UTC-02:00) 中大西洋时间",
    value: "UTC-02:00"
  },
  {
    label: "(UTC-01:00) 佛得角时间",
    value: "UTC-01:00"
  },
  {
    label: "(UTC+00:00) 格林尼治标准时间",
    value: "UTC+00:00"
  },
  {
    label: "(UTC+01:00) 中欧时间",
    value: "UTC+01:00"
  },
  {
    label: "(UTC+02:00) 东欧时间",
    value: "UTC+02:00"
  },
  {
    label: "(UTC+03:00) 莫斯科标准时间",
    value: "UTC+03:00"
  },
  {
    label: "(UTC+04:00) 阿拉伯标准时间",
    value: "UTC+04:00"
  },
  {
    label: "(UTC+05:00) 伊斯兰堡、卡拉奇时间",
    value: "UTC+05:00"
  },
  {
    label: "(UTC+06:00) 孟加拉国标准时间",
    value: "UTC+06:00"
  },
  {
    label: "(UTC+07:00) 泰国、越南、印度尼西亚西部时间",
    value: "UTC+07:00"
  },
  {
    label: "(UTC+08:00) 北京、重庆、香港特别行政区、乌鲁木齐时间",
    value: "UTC+08:00"
  },
  {
    label: "(UTC+09:00) 东京、首尔时间",
    value: "UTC+09:00"
  },
  {
    label: "(UTC+10:00) 悉尼、墨尔本时间",
    value: "UTC+10:00"
  },
  {
    label: "(UTC+11:00) 所罗门群岛时间",
    value: "UTC+11:00"
  },
  {
    label: "(UTC+12:00) 斐济时间",
    value: "UTC+12:00"
  }
];

/**
 * 夏令营时间复选框
 */
const dstTimeOptions = [
  {
    label: t("load.param.timeZoneParam.dst"),
    value: "dst"
  }
];

/**
 * 列表分隔符选项
 */
const listSeparatorOptions = [
  {
    label: t("load.param.separatorsParam.space"),
    value: "space"
  },
  {
    label: t("load.param.separatorsParam.tab"),
    value: "tab"
  },
  {
    label: t("load.param.separatorsParam.other"),
    value: "other"
  },
  {
    label: t("load.param.separatorsParam.consecutivesAsAField"),
    value: "consercutivsAsAField"
  }
];

/**
 * 小数符号选项
 */
const decimalSymbolOptions = [
  {
    label: t("load.param.separatorsParam.dot"),
    value: 0
  },
  {
    label: t("load.param.separatorsParam.comma"),
    value: 1
  }
];

/**
 * 数字分组选项
 */
const digitGroupingOptions = [
  {
    label: t("load.param.separatorsParam.comma"),
    value: 0
  },
  {
    label: t("load.param.separatorsParam.dot"),
    value: 1
  },
  {
    label: t("load.param.separatorsParam.space"),
    value: 2
  },
  {
    label: t("load.param.separatorsParam.none"),
    value: 3
  }
];

/**
 * 保存规范
 */
const savedFormatsOptions = [];

const loadParam = ref({
  timeFormatValue: editMode.value === "Production" ? 1 : 0,
  firstDataTime: new Date(),
  timeSystemValue: "UTC+08:00",
  dstTime: ["dst"],
  listSeparators: ["space"],
  otherSeparators: "",
  deicamilSymol: 0,
  digitGrouping: 0,
  absentValue: [],
  absentValueData: "",
  replaceWithValue: ["replaceWithValue"],
  replaceWithData: 0.0,
  savedFormats: "",
  saveOnvalidation: ["saveOnvalidation"]
});

/**
 * 预览数据表格Ref
 */
const previewDataRef = ref();

/**
 * 预览数据表格配置
 */
const previewDataOptions = reactive<VxeGridProps<any>>({
  border: true,
  height: "auto",
  showOverflow: true,
  scrollY: {
    enabled: true,
    gt: 0
  },
  columns: [],
  data: []
});

/**
 * 最大列数
 */
const maxColumnsNum = ref<number>(0);
const columnsConfig = ref<any>({});

/**
 * 更新分隔符相关
 */
const updatePreviewTableData = () => {
  let data = props.previewData;
  let dataFormat: any[] = [];
  maxColumnsNum.value = 0;
  // 处理数据划分依据
  let listSeparators = 0;
  listSeparatorOptions.forEach((item, index) => {
    if (loadParam.value.listSeparators.includes(item.value)) {
      listSeparators += Math.pow(2, index);
    }
  });
  let regexParts: string[] = [];
  if (listSeparators & 1) regexParts.push(" ");
  if (listSeparators & 2) regexParts.push("\t");
  if (listSeparators & 4 && loadParam.value.otherSeparators !== "")
    regexParts.push(loadParam.value.otherSeparators);
  const regex =
    listSeparators === 0
      ? ""
      : new RegExp(
          `[${regexParts.join("|")}]${listSeparators & 8 ? "" : "+"}`,
          "g"
        );
  for (const row of data) {
    // 排除非asicii字符行
    if (/[^\x00-\x7F]/.test(row) || row.length === 0) {
      continue;
    }
    let rowData: string[] = row.trim().split(regex);

    const result: any = {};
    for (let j = 0; j < rowData.length; j++) {
      result[numberToExcelColumn(j)] = rowData[j];
    }
    if (rowData.length !== 0) {
      dataFormat.push(result);
      maxColumnsNum.value = Math.max(maxColumnsNum.value, rowData.length);
    }
  }
  const columns: any[] = [{ fixed: "left", field: "seq", width: 120 }];
  for (let i = 0; i < maxColumnsNum.value; i++) {
    columns.push({
      field: numberToExcelColumn(i),
      width: 120
    });
  }
  previewDataOptions.columns = columns;
  previewDataOptions.data = dataFormat;
  updateConfigTable(dataFormat[0]);
};

const importConfig = reactive<ImportConfigDTO>({});

onMounted(async () => {
  const res = await commonApi.getImportConfig(editMode.value);
  Object.assign(importConfig, res.data);
});

/**
 * 数据配置据表格配置
 */
const configTableOptions = reactive<VxeGridProps<any>>({
  border: true,
  height: "auto",
  showOverflow: true,
  scrollY: {
    enabled: true,
    gt: 0
  },
  columns: [],
  data: [],
  editConfig: {
    trigger: "click",
    mode: "cell"
  }
});

/**
 * 配置表头基础信息
 */
const baseTableData = [
  {
    title: t("load.config.type"),
    index: 1
  },
  { title: t("load.config.unit"), index: 2 },

  { title: t("load.config.name"), index: 3 },
  { title: t("load.config.gaugeType"), index: 4 },
  { title: t("load.config.serialNumber"), index: 5 },
  { title: t("load.config.depth"), index: 6 },
  { title: t("load.config.interpretation"), index: 7 },
  { title: t("load.config.measure"), index: 8 },
  { title: t("load.config.well"), index: 9 },
  { title: t("load.config.appendTo"), index: 10 }
];

/**
 * 更新表头配置
 */
const updateConfigTable = (firstRow: any) => {
  columnsConfig.value = [];
  const columns: any[] = [];
  columns.push({
    field: "title",
    width: 120,
    fixed: "left",
    editRender: { name: "input" }
  });
  const tableData: any[] = [];
  Object.assign(tableData, baseTableData);

  for (let i = 0; i < maxColumnsNum.value; i++) {
    const field = numberToExcelColumn(i);
    const column = {
      field: field,
      width: 120,
      slots: { edit: `edit_${field}` },
      editRender: {
        autoFocus: ".input"
      }
    };
    columnsConfig.value.push({
      field,
      slot: `edit_${field}`
    });
    columns.push(column);

    tableData[5][field] = 0;
    tableData[6][field] = firstRow[field];
    tableData[8][field] = "N/A";
    tableData[9][field] = "N/A";
  }
  configTableOptions.columns = columns;
  configTableOptions.data = tableData;
};

const configTableRef = ref();
/**
 * 获取表头待选项
 */
const importConfigFieldOptinons = () => {
  const columns: any[] = [];
  const tableData = configTableRef.value.getTableData().fullData;
  const data = Object.values(toRaw(tableData[0]));
  importConfig.columnFields?.forEach(column => {
    if (!data.includes(column.fieldName)) {
      columns.push({ label: column.fieldName, value: column.fieldName });
    }
  });
  return columns;
};

/**
 * 单位选择回显方法
 */
const importConfigUnitOptions = (field: string) => {
  const tableData = configTableRef.value.getTableData().fullData;
  if (importConfig.columnFields) {
    let unitOptions: any = [];
    for (const item of importConfig?.columnFields) {
      if (item.fieldName === tableData[0][field] && item.units) {
        unitOptions = item.units.map(unit => {
          return {
            label: unit.label,
            value: unit.label
          };
        });
        break;
      }
    }
    return unitOptions;
  }
  return [];
};

/**
 * 更新列头
 */
const updateFieldOptions = (field: string) => {
  const tableData = configTableRef.value.getTableData().fullData;
  if (importConfig.columnFields) {
    for (const item of importConfig?.columnFields) {
      if (item.fieldName === tableData[0][field]) {
        tableData[1][field] = item.standardUnit;
        tableData[7][field] = item.measure;
        if (!importConfig?.requiredFields?.includes(item.fieldName)) {
          tableData[8][field] = projectStore?.activeWellOption?.wellName;
          tableData[2][field] = props.fileName;
        }
        return;
      }
    }
  }
};

/**
 * 获取上传信息
 */
const getUploadData = () => {
  const formData = new FormData();
  formData.append("importType", editMode.value);
  formData.append("contextType", "txt");
  formData.append("param.timeType", loadParam.value.timeFormatValue);
  formData.append("param.startTime", Number(loadParam.value.firstDataTime));
  formData.append("param.timeZone", loadParam.value.timeSystemValue);
  formData.append(
    "params.summerTimeFlag",
    loadParam.value.dstTime.length !== 0
  );
  const splitMark: any[] = [];
  listSeparatorOptions.forEach((item, index) => {
    if (loadParam.value.listSeparators.includes(item.value)) {
      splitMark.push(index);
    }
  });
  formData.append("param.splitMark", splitMark);
  formData.append("param.customSymbol", loadParam.value.otherSeparators);
  formData.append("param.decimalSymbol", loadParam.value.deicamilSymol);
  formData.append("param.digitGroup", loadParam.value.digitGrouping);
  formData.append(
    "param.fillFlag",
    loadParam.value.replaceWithValue.length !== 0
  );
  formData.append("param.fillValue", loadParam.value.replaceWithData);
  formData.append("param.dataRangeFlag", false);

  const tableData = configTableRef.value.getTableData().fullData;
  const fieldNameList: string[] = [];
  for (let i = 0; i < maxColumnsNum.value; i++) {
    const fieldIndex = numberToExcelColumn(i);
    const columnField = importConfig?.columnFields?.find(
      item => item.fieldName === tableData[0][fieldIndex]
    );
    if (columnField) {
      fieldNameList.push(columnField.fieldName);
      formData.append(`field[${i}].fieldName`, columnField.fieldName);
      formData.append(`field[${i}].standardUnit`, columnField.standardUnit);
      formData.append(`field[${i}].measure`, columnField.measure);
      formData.append(`field[${i}].axis`, columnField.axis);
      formData.append(`field[${i}].uploadUnit`, tableData[1][fieldIndex]);
    }
  }
  const fieldSet = new Set([...fieldNameList, ...importConfig.requiredFields]);
  if (
    fieldSet.size ===
    fieldNameList.length + importConfig.requiredFields.length
  ) {
    message.warning(t("load.message.missingRequiredColumnData"));
    return;
  }
  return formData;
};

defineExpose({ getUploadData });
</script>

<template>
  <div class="main">
    <div class="main_left">
      <n-collapse accordion default-expanded-names="timeFormat">
        <n-collapse-item name="timeFormat">
          <template #header>
            <div class="collapse_header">{{ $t("load.param.timeFormat") }}</div>
          </template>
          <div class="param_panel">
            <n-space vertical size="small">
              <n-radio-group
                v-model:value="loadParam.timeFormatValue"
                name="radiogroup"
              >
                <n-space vertical size="small">
                  <n-radio
                    v-for="timeFormat in timeFormatOptions"
                    :key="timeFormat.value"
                    :value="timeFormat.value"
                    size="small"
                  >
                    {{ timeFormat.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>

              <div class="input_label">
                {{ $t("load.param.timeFormatParam.firstDataTime") }}
              </div>
              <n-date-picker
                v-model:value="loadParam.firstDataTime"
                type="datetime"
                clearable
                class="input_grpup"
                placeholder=""
              />
            </n-space>
          </div>
        </n-collapse-item>
        <n-collapse-item name="timeZone">
          <template #header>
            <div class="collapse_header">{{ $t("load.param.timeZone") }}</div>
          </template>
          <div class="param_panel">
            <n-space vertical size="small">
              <n-select
                v-model:value="loadParam.timeSystemValue"
                :options="timeSystemOptions"
                class="input_grpup"
                size="tiny"
              />
              <n-checkbox-group v-model:value="loadParam.dstTime">
                <n-space vertical size="small">
                  <n-checkbox
                    v-for="dstTime in dstTimeOptions"
                    :key="dstTime.value"
                    :value="dstTime.value"
                    size="small"
                    :label="dstTime.label"
                  />
                </n-space>
              </n-checkbox-group>
            </n-space>
          </div>
        </n-collapse-item>
        <n-collapse-item name="separators">
          <template #header>
            <div class="collapse_header">{{ $t("load.param.separators") }}</div>
          </template>
          <div class="param_panel">
            <n-space vertical size="small">
              <div class="input_label">
                {{ $t("load.param.separatorsParam.listSeparators") }}
              </div>
              <n-checkbox-group
                v-model:value="loadParam.listSeparators"
                @update:value="updatePreviewTableData"
              >
                <n-space vertical size="small">
                  <div
                    v-for="listSeparator in listSeparatorOptions"
                    :key="listSeparator.value"
                  >
                    <n-checkbox
                      :value="listSeparator.value"
                      size="small"
                      :label="listSeparator.label"
                      style="width: 100px"
                    />
                    <n-input
                      v-if="listSeparator.value === 'other'"
                      v-model:value="loadParam.otherSeparators"
                      size="tiny"
                      placeholder=""
                      style="width: calc(100% - 100px)"
                      :disabled="!loadParam.listSeparators.includes('other')"
                      @update:value="updatePreviewTableData"
                    ></n-input>
                  </div>
                </n-space>
              </n-checkbox-group>
              <div class="input_label">
                {{ $t("load.param.separatorsParam.number") }}
              </div>
              <div class="input_grpup">
                <div class="input_grpup_label">
                  <n-ellipsis>
                    {{ t("load.param.separatorsParam.decimalSymbol") }}:
                  </n-ellipsis>
                </div>
                <div class="input_grpup_input">
                  <n-select
                    v-model:value="loadParam.deicamilSymol"
                    :options="decimalSymbolOptions"
                    class="input"
                    size="tiny"
                  />
                </div>
              </div>
              <div class="input_grpup">
                <div class="input_grpup_label">
                  <n-ellipsis>
                    {{ t("load.param.separatorsParam.digitGrouping") }}:
                  </n-ellipsis>
                </div>
                <div class="input_grpup_input">
                  <n-select
                    v-model:value="loadParam.digitGrouping"
                    :options="digitGroupingOptions"
                    class="input"
                    size="tiny"
                  />
                </div>
              </div>
            </n-space>
          </div>
        </n-collapse-item>
        <n-collapse-item name="absentValue">
          <template #header>
            <div class="collapse_header">
              {{ $t("load.param.absentValue") }}
            </div>
          </template>
          <div class="param_panel">
            <n-space vertical size="small">
              <div class="input_grpup">
                <div class="input_group_checkbox">
                  <n-checkbox-group v-model:value="loadParam.absentValue">
                    <n-space vertical size="small">
                      <n-checkbox value="absentValue" size="small" label="" />
                    </n-space>
                  </n-checkbox-group>
                </div>
                <n-input
                  :value="loadParam.absentValueData"
                  placeholder=""
                  size="tiny"
                ></n-input>
              </div>
              <div class="input_grpup">
                <div class="input_group_checkbox">
                  <n-checkbox-group v-model:value="loadParam.replaceWithValue">
                    <n-space vertical size="small">
                      <n-checkbox
                        value="replaceWithValue"
                        size="small"
                        label=""
                      />
                    </n-space>
                  </n-checkbox-group>
                </div>
                <div class="input_grpup_label">
                  <n-ellipsis>
                    {{ t("load.param.absentValueParam.replaceWith") }}:
                  </n-ellipsis>
                </div>
                <n-input
                  :value="loadParam.replaceWithData"
                  placeholder=""
                  size="tiny"
                ></n-input>
              </div>
            </n-space>
          </div>
        </n-collapse-item>
        <n-collapse-item name="savedFormats">
          <template #header>
            <div class="collapse_header">
              {{ $t("load.param.savedFormats") }}
            </div>
          </template>
          <div class="param_panel">
            <n-space vertical size="small">
              <n-select
                v-model:value="loadParam.savedFormats"
                :options="savedFormatsOptions"
                class="input_grpup"
                size="tiny"
                placeholder=""
              />
              <n-space reverse class="input_grpup">
                <n-button size="tiny"
                  >{{ $t("load.param.savedFormatsParam.delete") }}
                </n-button>
              </n-space>
              <n-checkbox-group v-model:value="loadParam.saveOnvalidation">
                <n-space vertical size="small">
                  <n-checkbox
                    value="saveOnvalidation"
                    size="small"
                    :label="$t('load.param.savedFormatsParam.saveOnValidation')"
                  />
                </n-space>
              </n-checkbox-group>
            </n-space>
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
    <div class="main_right">
      <div class="main_right_top">
        <vxe-grid
          ref="configTableRef"
          v-bind="configTableOptions"
          height="auto"
          :show-header="false"
          :auto-resize="true"
          size="mini"
        >
          <template
            v-for="item in columnsConfig"
            :key="item.field"
            #[item.slot]="{ row }"
          >
            <div v-if="row.index === 1">
              <vxe-select
                v-model="row[item.field]"
                :options="importConfigFieldOptinons()"
                class-name="vxe-default-select"
                :on-change="updateFieldOptions(item.field)"
              ></vxe-select>
            </div>
            <div v-else-if="row.index === 2">
              <vxe-select
                v-model="row[item.field]"
                :options="importConfigUnitOptions(item.field)"
                class-name="vxe-default-select"
              ></vxe-select>
            </div>
            <div v-else>
              <vxe-input
                v-model="row[item.field]"
                placeholder=""
                class-name="vxe-default-input"
                :disabled="row.index === 6 || row.index === 7"
              ></vxe-input>
            </div>
          </template>
        </vxe-grid>
      </div>
      <div class="main_right_bottom">
        <vxe-grid
          ref="previewDataRef"
          v-bind="previewDataOptions"
          :show-header="false"
          size="mini"
        >
        </vxe-grid>
      </div>
    </div>
  </div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
<style lang="scss">
.n-checkbox-box {
  width: 14px !important;
}

.input {
  width: 100%;
}
</style>
