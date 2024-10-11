<template>
  <div class="versusDepth">
    <div class="versusDepth-table">
      <vxe-grid ref="gridRef" v-bind="gridOptions" v-on="gridEvents"></vxe-grid>
    </div>
    <div class="versusDepth-card">
      <n-card :title="dymicTitle">
        <n-form
          :model="formValue"
          label-placement="left"
          label-width="auto"
          label-align="right"
        >
          <n-form-item
            :label="$t('menu.decimalSeparator')"
            v-if="['ASCII', 'LAS'].includes(rowOption.id)"
          >
            <n-select
              v-model:value="formValue.decimalSeparator"
              :options="decimalOptions"
            ></n-select>
          </n-form-item>
          <n-form-item
            :label="$t('menu.valueDelimiter')"
            v-if="['ASCII', 'LAS'].includes(rowOption.id)"
          >
            <n-select
              v-model:value="formValue.valueDelimiter"
              :options="valueOptions"
            ></n-select>
          </n-form-item>
          <n-form-item
            :label="$t('menu.groupSeparator')"
            v-if="['ASCII', 'LAS'].includes(rowOption.id)"
          >
            <n-select
              v-model:value="formValue.groupSeparator"
              :options="groupOptions"
            ></n-select>
          </n-form-item>
          <n-form-item
            :label="$t('menu.encoding')"
            v-if="['ASCII', 'LAS', 'WITSML'].includes(rowOption.id)"
          >
            <n-select
              v-model:value="formValue.encoding"
              :options="[]"
            ></n-select>
          </n-form-item>
          <n-form-item
            :label="$t('menu.absentValue')"
            v-if="['ASCII', 'LAS', 'WITSML'].includes(rowOption.id)"
          >
            <n-input v-model:value="formValue.absentValue"></n-input>
          </n-form-item>
          <n-form-item
            :label="$t('menu.mnemonicRowIndex')"
            v-if="rowOption.id === 'Excel'"
          >
            <n-input v-model:value="formValue.mnemonicRowIndex"></n-input>
          </n-form-item>
          <n-form-item :label="$t('menu.wrap')" v-if="rowOption.id === 'LAS'">
            <n-checkbox v-model:checked="formValue.wrap"></n-checkbox>
          </n-form-item>
        </n-form>
        <span v-if="rowOption.id === 'LAS'"
          >* {{ $t("menu.lasDataImportTip") }}
        </span>
        <span v-if="rowOption.id === 'WITSML'"
          >* {{ $t("menu.witsmlDataImportTip") }}</span
        >
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { VxeGridListeners, VxeGridProps } from "vxe-table";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const dymicTitle = computed(() => {
  return rowOption.value
    ? rowOption.value?.name + " " + t("menu.settings") + ":"
    : "";
});

const gridOptions = reactive<VxeGridProps<any>>({
  border: true,
  showOverflow: true,
  rowConfig: {
    isCurrent: true,
    isHover: true
  },
  height: "auto",
  columns: [
    {
      title: t("menu.name"),
      field: "name"
    },
    {
      title: t("menu.id"),
      field: "id"
    },
    {
      title: t("menu.version"),
      field: "version"
    },
    {
      title: t("menu.author"),
      field: "author"
    }
  ],
  data: [
    {
      id: "ASCII",
      name: t("menu.asciiDataImport"),
      version: "1.0",
      author: "bbcpetro"
    },
    {
      id: "DLIS",
      name: t("menu.dlisDataImport"),
      version: "1.0",
      author: "bbcpetro"
    },
    {
      id: "Excel",
      name: t("menu.dlisDataImport"),
      version: "1.0",
      author: "bbcpetro"
    },
    {
      id: "LAS",
      name: t("menu.lasDataImport"),
      version: "1.0",
      author: "bbcpetro"
    },
    {
      id: "LIS",
      name: t("menu.lisDataimport"),
      version: "1.0",
      author: "bbcpetro"
    },
    {
      id: "WITSML",
      name: t("menu.witsmlDataImport"),
      version: "1.0",
      author: "bbcpetro"
    }
  ]
});

const rowOption = ref<any>({
  id: "ASCII",
  name: t("menu.asciiDataImport"),
  version: "1.0",
  author: "bbcpetro"
});

const gridEvents: VxeGridListeners<any> = {
  cellClick({ row }) {
    rowOption.value = row;
  }
};

const formValue = reactive({
  decimalSeparator: "dot",
  valueDelimiter: "space",
  groupSeparator: "comma",
  encoding: "Windows-1252",
  absentValue: "-999.25",
  mnemonicRowIndex: "1",
  wrap: false
});

const decimalOptions = computed(() => {
  return [
    { label: t("menu.dot"), value: "dot" },
    { label: t("menu.comma"), value: "comma" }
  ];
});

const valueOptions = computed(() => {
  return [
    { label: t("menu.space"), value: "space" },
    { label: t("menu.tab"), value: "tab" },
    { label: t("menu.comma"), value: "comma" }
  ];
});

const groupOptions = computed(() => {
  return [
    { label: t("menu.space"), value: "space" },
    { label: t("menu.none"), value: "none" },
    { label: t("menu.dot"), value: "dot" },
    { label: t("menu.comma"), value: "comma" }
  ];
});
</script>

<style scoped lang="scss">
.versusDepth {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-table {
    width: 100%;
    height: 200px;
  }
  &-card {
    flex: 1;
    .n-card {
      height: 100%;
      .n-form {
        display: grid;
        grid-template-columns: 50% 50%;
        .n-form-item {
          width: 80%;
        }
      }
    }
  }
}
</style>
