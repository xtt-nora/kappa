<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.layerInfomation')"
    width="750"
    height="410"
  >
    <div class="LayerInfomation">
      <div class="table">
        <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
      </div>
      <n-space class="tool" vertical>
        <n-button @click="insertEvent()">{{ $t("menu.add") }}</n-button>
        <n-button @click="insertEvent(-1)">{{ $t("menu.insert") }}</n-button>
        <n-button @click="removeSelectRowEvent">{{
          $t("menu.delete")
        }}</n-button>
        <n-button>{{ $t("menu.size") }}</n-button>
      </n-space>
      <div class="box"></div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { NSelect } from "naive-ui";
import { h, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { VxeGridInstance, VxeGridProps } from "vxe-pc-ui";

const { t } = useI18n();

const showModal = defineModel({ type: Boolean, default: false });

const gridRef = ref<VxeGridInstance<any>>();

const gridOptions = reactive<VxeGridProps<any>>({
  border: true,
  height: "auto",
  showFooter: true,
  editConfig: {
    trigger: "click",
    mode: "row",
    showIcon: false
  },
  columns: [
    {
      type: "checkbox",
      width: 35
    },
    {
      title: t("menu.layerName"),
      children: [
        {
          field: "layerName",
          minWidth: 100,
          editRender: { name: "input" }
        }
      ]
    },
    {
      title: t("menu.thickness"),
      field: "thickness",
      children: [
        {
          field: "thickness",
          minWidth: 100,
          slots: {
            header() {
              return h(NSelect, {
                modelValue: bHPFlowing.value,
                placeholder: "",
                defaultValue: "hr",
                options: [
                  { label: "hr", value: "hr" },
                  { label: "ms", value: "ms" },
                  { label: "MPa", value: "MPa" }
                ]
              });
            }
          },
          editRender: { name: "input" }
        }
      ]
    },
    {
      title: t("menu.thicknessPercent"),
      field: "thicknessPercent",
      children: [
        {
          field: "thicknessPercent",
          minWidth: 100,
          editRender: { name: "input" }
        }
      ]
    }
  ],
  data: [
    {
      layerName: "Layer #1",
      thickness: 15,
      thicknessPercent: 50
    },
    {
      layerName: "Layer #2",
      thickness: 15,
      thicknessPercent: 50
    }
  ],
  footerMethod({ columns, data }) {
    return [
      columns.map((column, columnIndex) => {
        if (columnIndex === 1) {
          return "Total";
        }
        if (["thickness", "thicknessPercent"].includes(column.field)) {
          return `${sumNum(data, column.field)}`;
        }
        return null;
      })
    ];
  }
});

const sumNum = (list: any[], field: string) => {
  let count = 0;
  list.forEach(item => {
    count += Number(item[field]);
  });
  return count.toFixed(2);
};

/**
 * 新增插入数据
 */
const insertEvent = async (row?: number) => {
  const $grid = gridRef.value;
  if ($grid) {
    const data = $grid.getData();
    const record = {
      layerName: `Layer #${data.length + 1}`,
      thickness: "",
      thicknessPercent: ""
    };
    const { row: newRow } = await $grid.insertAt(record, row);
    // 插入一条数据并触发校验
    await $grid.setEditCell(newRow, "name");
  }
};

/**
 * 删除选中数据
 */
const removeSelectRowEvent = () => {
  const $grid = gridRef.value;
  if ($grid) {
    $grid.removeCheckboxRow();
  }
};

const bHPFlowing = ref("");
</script>

<style scoped lang="scss">
.LayerInfomation {
  height: 100%;
  display: flex;
  padding: 12px;
  box-sizing: border-box;
  .table {
    overflow: hidden;
  }
  .tool {
    margin: 0 12px;
  }
  .box {
    flex: 1;
    border: 1px solid #ccc;
  }
}
</style>
