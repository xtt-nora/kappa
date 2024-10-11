<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
import { nextTick, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import LuckyExcel from "luckyexcel";
import { useMessage } from "naive-ui";
import { VxeGridProps } from "vxe-table";
import { numberToExcelColumn } from "@/utils/tool.ts";

const $luckysheet = luckysheet;
const message = useMessage();
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    multiVisable: boolean;
  }>(),
  {
    multiVisable: false
  }
);
/**
 * 导入类型
 */
const sourceTypeOptions = ref<
  {
    name: string;
    hint: string;
    icon: string;
    visable: boolean;
  }[]
>([
  {
    name: "ascii",
    hint: t("load.sourceType.ascii"),
    icon: "AsciiL",
    visable: true
  },
  {
    name: "excel",
    hint: t("load.sourceType.excel"),
    icon: "ExcelL",
    visable: true
  },
  {
    name: "clipboard",
    hint: t("load.sourceType.clipboard"),
    icon: "ClipboardL",
    visable: true
  },
  {
    name: "keyboard",
    hint: t("load.sourceType.keyboard"),
    icon: "KeyboardL",
    visable: true
  },
  {
    name: "database",
    hint: t("load.sourceType.database"),
    icon: "databaseL",
    visable: true
  },
  {
    name: "wellData",
    hint: t("load.sourceType.wellData"),
    icon: "Realtime",
    visable: props.multiVisable
  }
]);
/**
 * 选中的导入类型
 */
const sourceTypeValue = ref<string>("");

/**
 * 选择导入类型
 */
const updateSourceTypeCb = (sourceTypeName: string) => {
  emits("updateNextDisabled", true);
  sourceTypeValue.value = sourceTypeName;
  // 清空数据
  ascii.value = {
    previewData: null,
    allData: null
  };
  dataSourceFormData.value.keyboardDataTypeValue = "";
  previewTitle.value = "";
  switch (sourceTypeName) {
    case "ascii":
      uploadRef.value.clear();
      uploadAccept.value = ["*"].join(",");
      nextTick(() => {
        uploadRef.value.openOpenFileDialog();
      });
      break;
    case "excel":
      uploadRef.value.clear();
      uploadAccept.value = [".xlsx"].join(",");
      nextTick(() => {
        uploadRef.value.openOpenFileDialog();
      });
      break;
    case "clipboard":
      try {
        ascii.value = {
          previewData: null,
          allData: null
        };
        navigator.clipboard.readText().then(text => {
          if (text !== "") {
            ascii.value = {
              previewData: text,
              allData: text
            };
            emits("updateNextDisabled", false);
          }
        });
        previewTitle.value = t("load.previewOfClipboard");
      } catch (err) {
        message.error(t("load.message.cannotGetClipboardContents"));
      }
      break;
    case "keyboard":
      dataSourceFormData.value.keyboardDataTypeValue = "notepad";
      previewTitle.value = t("load.previewOfkeyboard");
      break;
    case "database":
      // TODO: 完善数据库导入
      break;
    case "wellData":
      uploadRef.value.clear();
      uploadAccept.value = [".xlsx", ".csv", ".98c", ".98f"].join(",");
      nextTick(() => {
        uploadRef.value.openOpenFileDialog();
      });
      break;
  }
};

/**
 * 预览标题
 */
const previewTitle = ref(t("load.preview"));

/**
 * 上传组件ref
 */
const uploadRef = ref();

/**
 * 上传组件的允许的文件类型
 */
const uploadAccept = ref("");

/**
 * 上传前验证
 */
const beforeUpload = () => {
  //TODO: 文件预处理
};

/**
 * 自定义上传组件
 */
const changeUploadData = (fileInfo: any) => {
  const reader = new FileReader();
  // 清空数据
  ascii.value = {
    previewData: null,
    allData: null
  };
  // 读取数据
  if (sourceTypeValue.value === "ascii") {
    reader.readAsText(fileInfo.file.file, "UTF-8");
    reader.onload = (event: any) => {
      const data = event.target.result.split("\n").slice(0, 100).join("\n");
      ascii.value = {
        previewData: data,
        allData: event.target.result
      };
      emits("updateNextDisabled", false);
    };
  } else if (sourceTypeValue.value === "excel") {
    reader.readAsBinaryString(fileInfo.file.file);
    LuckyExcel.transformExcelToLucky(
      fileInfo.file.file,
      function (exportJson: any) {
        $luckysheet.destroy();
        let option = {
          container: "luckySheetExcel",
          showinfobar: false,
          data: exportJson.sheets,
          allowEdit: true,
          allowCopy: false,
          showtoolbar: false,
          sheetFormulaBar: false,
          showsheetbar: true,
          row: 10,
          column: 10,
          showsheetbarConfig: {
            add: false,
            menu: true,
            sheet: false
          },
          enableAddRow: false,
          enableAddBackTop: false,
          loading: false,
          config: {
            authority: {
              sheet: 1
            }
          },
          isPivotTable: true,
          chart: [],
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
          cellRightClickConfig: {
            copy: false, // 复制
            copyAs: false, // 复制为
            paste: false, // 粘贴
            insertRow: false, // 插入行
            insertColumn: false, // 插入列
            deleteRow: false, // 删除选中行
            deleteColumn: true, // 删除选中列
            deleteCell: false, // 删除单元格
            hideRow: false, // 隐藏选中行和显示选中行
            hideColumn: false, // 隐藏选中列和显示选中列
            rowHeight: false, // 行高
            columnWidth: false, // 列宽
            clear: false, // 清除内容
            matrix: false, // 矩阵操作选区
            sort: false, // 排序选区
            filter: false, // 筛选选区
            chart: false, // 图表生成
            image: false, // 插入图片
            link: false, // 插入链接
            data: false, // 数据验证
            cellFormat: false // 设置单元格格式
          }
        };
        $luckysheet.create(option);
        updateLuckySheetExcelResize();
        emits("updateNextDisabled", false);
      }
    );
  } else {
    // TODO: 多井数据导入
  }
  fileName.value = fileInfo.file.name;
  previewTitle.value = `${t("load.previewOf")} ${fileInfo.file.name}`;
};

const fileName = ref("");

/**
 * 更新键盘输入格式
 */
const updateKeyBoardDataTypeValue = (value: string) => {
  ascii.value = {
    previewData: null,
    allData: null
  };
  emits("updateNextDisabled", true);
  if (value === "table") {
    const columnNum = dataSourceFormData.value.tableColumnValue;
    // 生成表头配置
    const columns: any[] = [];
    columns.push({ type: "seq" });
    for (let i = 0; i < columnNum; i++) {
      const field = numberToExcelColumn(i);
      columns.push({
        field: field,
        title: field,
        editRender: { name: "input" }
      });
    }
    gridOptions.columns = columns;
    gridOptions.data = [{}];
  }
  fileName.value = "text.txt";
};

/**
 * 更新编辑状态的回调
 */
const updateEditStatus = (event: any) => {
  let rowIsNull = true;
  for (const column of tableGridRef.value.getColumns()) {
    if (column.field in event.row) {
      rowIsNull = false;
      break;
    }
  }
  if (
    !rowIsNull &&
    event.rowIndex == tableGridRef.value.getTableData().fullData.length - 1
  ) {
    tableGridRef.value.insertAt({}, -1);
    emits("updateNextDisabled", false);
  }
};

/**
 * 表格ref
 */
const tableGridRef = ref();

/**
 * 表格配置
 */
const gridOptions = reactive<VxeGridProps<any>>({
  border: true,
  editConfig: {
    trigger: "click",
    mode: "cell"
  },
  columns: [],
  data: []
});

/**
 * excel表格自适应
 */
const updateLuckySheetExcelResize = () => {
  let getLuckysheet = document.getElementById("luckySheetExcel") as Element;
  let ob = new ResizeObserver(() => {
    $luckysheet.resize();
  });
  ob.observe(getLuckysheet);
};

/**
 * 更新列数
 */
const updateTableColumnValue = (value: number) => {
  if (value > tableGridRef.value.getColumns().length) {
    const field = numberToExcelColumn(value);
    gridOptions.columns?.push({
      field: field,
      title: field,
      editRender: { name: "input" }
    });
  } else if (value < tableGridRef.value.getColumns().length) {
    gridOptions.columns?.pop();
  }
};

/**
 * 文本预览数据
 */
const ascii = ref<{
  previewData: any;
  allData: any;
}>({
  previewData: null,
  allData: null
});

/**
 * 参数表单
 */
const dataSourceFormData = ref({
  databaseValue: null,
  // TODO: 从导入历史中获取数据值
  databaseOptions: [],
  // TODO: 未知标签名，猜测为数据表名称
  tableValue: "",
  keyboardDataTypeValue: "",
  tableColumnValue: 5
});

/**
 * 更新数据源值
 */
const updateDataSourceValue = () => {
  console.log("updateDataSourceValue");
};

/**
 * 更新数据表值
 */
const updateTableValue = () => {
  console.log("updateTableValue");
};

/**
 * 更新键盘输入
 */
const updateInputData = (value: string) => {
  const data = value;
  ascii.value = {
    previewData: data,
    allData: data
  };
  emits("updateNextDisabled", false);
};

const emits = defineEmits<{
  (e: "updateNextDisabled", isDisabled: boolean): void;
}>();

/**
 * 获取全量数据
 */
const getBlobData = () => {
  switch (sourceTypeValue.value) {
    case "ascii":
      return new Blob([ascii.value.allData], { type: "text/plain" });
    case "excel":
      const sheetData = $luckysheet.getSheetData();
      const data = [];
      sheetData.forEach(row => {
        data.push(row.map(col => (col ? col.v : "")).join(" "));
      });
      return new Blob([data.join("\n")], { type: "text/plain" });
    case "clipboard":
      return new Blob([ascii.value.allData], { type: "text/plain" });
    case "keyboard":
      if (dataSourceFormData.value.keyboardDataTypeValue === "table") {
        const data = tableGridRef.value
          .getTableData()
          .fullData.map((item: any) =>
            tableGridRef.value
              .getColumns()
              .map((column: any) =>
                column.field in item ? item[column.field] : ""
              )
              .join(" ")
          );
        return new Blob([data.join("\n")], { type: "text/plain" });
      }
      return new Blob([ascii.value.allData], { type: "text/plain" });
    case "database":
      // TODO: 数据库数据获取
      return;
    case "wellData":
      // TODO: 井文件数据获取
      return;
  }
};

/**
 * 获取预览数据
 */
const getPreviewData = () => {
  switch (sourceTypeValue.value) {
    case "ascii":
      return ascii.value.previewData.split(/\r\n|\r|\n/);
    case "excel":
      const sheetData = $luckysheet.getSheetData();
      const data = [];
      sheetData.forEach(row => {
        data.push(row.map(col => (col ? col.v : "")).join(" "));
      });
      return data;
    case "clipboard":
      return ascii.value.previewData.split(/\r\n|\r|\n/);
    case "keyboard":
      if (dataSourceFormData.value.keyboardDataTypeValue === "table") {
        return tableGridRef.value.getTableData().fullData.map((item: any) =>
          tableGridRef.value
            .getColumns()
            .map((column: any) =>
              column.field in item ? item[column.field] : ""
            )
            .join(" ")
        );
      }
      return ascii.value.previewData.split(/\r\n|\r|\n/);
    case "database":
      // TODO: 数据库数据获取
      return;
    case "wellData":
      // TODO: 井文件数据获取
      return;
  }
};

/**
 * 获取文件名称
 */
const getFileName = () => {
  return fileName.value;
};

defineExpose({ getPreviewData, getBlobData, getFileName });
</script>

<template>
  <div class="main">
    <div class="load_main_left">
      <vxe-card :title="$t('load.dataSourceType')" class="load_card">
        <div class="data_source_type">
          <div v-for="(item, index) in sourceTypeOptions">
            <n-popover :key="index" v-if="item.visable">
              <template #trigger>
                <n-button
                  class="data_source_type_button"
                  @click="updateSourceTypeCb(item.name)"
                >
                  <SvgIcon
                    :name="item.icon"
                    class="large-icon"
                    size="32"
                  ></SvgIcon>
                </n-button>
              </template>
              {{ item.hint }}
            </n-popover>
          </div>

          <!-- 文件选择组件 -->
          <n-upload
            v-show="false"
            ref="uploadRef"
            @before-upload="beforeUpload"
            @change="changeUploadData"
            :accept="uploadAccept"
          ></n-upload>
        </div>
        <div class="data_source_form">
          <div class="data_source_form_item">
            <n-select
              v-model:value="dataSourceFormData.databaseValue"
              :options="dataSourceFormData.databaseOptions"
              placeholder=""
              class="data_source_form_item_input"
              size="tiny"
              :disabled="sourceTypeValue !== 'database'"
            />
            <n-button
              class="data_source_form_button"
              @click="updateDataSourceValue"
              :disabled="sourceTypeValue !== 'database'"
            >
              <!--  TODO: 确定图标名称  -->
              <SvgIcon name="" class="small-icon" size="16"></SvgIcon>
            </n-button>
          </div>

          <div class="data_source_form_item">
            <n-input
              v-model:value="dataSourceFormData.tableValue"
              placeholder=""
              class="data_source_form_item_input"
              size="tiny"
              :disabled="dataSourceFormData.databaseValue === null"
            />
            <n-button
              class="data_source_form_button"
              @click="updateTableValue"
              :disabled="dataSourceFormData.databaseValue === null"
            >
              <!--  TODO: 确定图标名称  -->
              <SvgIcon name="" class="small-icon" size="16"></SvgIcon>
            </n-button>
          </div>

          <div class="data_source_form_item">
            <n-radio-group
              v-model:value="dataSourceFormData.keyboardDataTypeValue"
              name="keyboardDataTypeValue"
              size="small"
              @update:value="updateKeyBoardDataTypeValue"
            >
              <n-space vertical>
                <n-radio
                  value="notepad"
                  :disabled="sourceTypeValue !== 'keyboard'"
                  >{{ $t("load.keyboard.notepad") }}
                </n-radio>
                <div class="data_source_form_item_group">
                  <n-radio
                    value="table"
                    :disabled="sourceTypeValue !== 'keyboard'"
                  >
                    {{ $t("load.keyboard.table") }}
                  </n-radio>
                  <n-input-number
                    class="data_source_form_input_number"
                    v-model:value="dataSourceFormData.tableColumnValue"
                    :disabled="
                      sourceTypeValue !== 'keyboard' ||
                      dataSourceFormData.keyboardDataTypeValue !== 'table'
                    "
                    :min="1"
                    @update:value="updateTableColumnValue"
                  >
                  </n-input-number>
                  <span
                    :class="
                      sourceTypeValue !== 'keyboard' ? 'text_diasbled' : ''
                    "
                  >
                    {{ $t("load.keyboard.columns") }}
                  </span>
                </div>
              </n-space>
            </n-radio-group>
          </div>
        </div>
      </vxe-card>
    </div>
    <div class="load_main_right">
      <vxe-card :title="previewTitle" class="load_card">
        <div v-if="sourceTypeValue === 'ascii'" class="load_card_content">
          <n-input
            v-model:value="ascii.previewData"
            :readonly="true"
            type="textarea"
            class="load_card_content_input"
            size="tiny"
            placeholder=""
            autosize="true"
          ></n-input>
        </div>
        <div v-if="sourceTypeValue === 'excel'" class="load_card_content">
          <div id="luckySheetExcel"></div>
        </div>
        <div v-show="sourceTypeValue === 'clipboard'" class="load_card_content">
          <n-input
            v-model:value="ascii.previewData"
            :readonly="true"
            type="textarea"
            class="load_card_content_input"
            size="tiny"
            placeholder=""
            autosize="true"
          ></n-input>
        </div>
        <div v-if="sourceTypeValue === 'keyboard'" class="load_card_content">
          <div
            v-show="dataSourceFormData.keyboardDataTypeValue === 'notepad'"
            class="load_card_content"
          >
            <n-input
              v-model:value="ascii.previewData"
              type="textarea"
              class="load_card_content_input"
              size="tiny"
              placeholder=""
              autosize="true"
              @update:value="updateInputData"
            ></n-input>
          </div>
          <div
            v-show="dataSourceFormData.keyboardDataTypeValue === 'table'"
            class="load_card_content"
          >
            <vxe-grid
              ref="tableGridRef"
              v-bind="gridOptions"
              height="auto"
              @edit-closed="updateEditStatus"
            ></vxe-grid>
          </div>
        </div>
      </vxe-card>
    </div>
  </div>
</template>

<style src="./index.scss" lang="scss" scoped></style>
