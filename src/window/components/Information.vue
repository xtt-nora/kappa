<template>
  <vxe-grid v-bind="gridOptions"></vxe-grid>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import type { VxeGridProps } from "vxe-table";
import { useI18n } from "vue-i18n";

interface RowVO {
  type: string;
  content: string;
}

const { t } = useI18n();
const formData = defineModel({
  type: Object,
  default: {
    information: []
  }
});

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  showOverflow: true,
  height: "auto",
  editConfig: {
    trigger: "click",
    mode: "cell"
  },
  columns: [
    { field: "type", title: t("step.type") },
    {
      field: "content",
      title: t("step.content"),
      editRender: { name: "input" }
    }
  ],
  data: formData.value.information
});
</script>
