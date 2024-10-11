<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.correctTrend')"
    width="648"
    height="auto"
  >
    <div class="correctTrend">
      <div class="correctTrend-card">
        <n-radio-group
          v-model:value="formData.selectGauges"
          name="radiogroup"
          size="small"
        >
          <n-space vertical :size="6">
            <n-radio
              v-for="item in selectGaugesGroup"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
        <vxe-card>
          <vxe-grid ref="gridRef" v-bind="gridUnitOptions">
            <template #edit_name="{ row }">
              <vxe-input v-model="row.inputData"> </vxe-input>
            </template>
            <template #edit_unit="{ row }">
              <vxe-select v-model="row.unit" :options="row.unitOptions">
              </vxe-select>
            </template>
          </vxe-grid>
        </vxe-card>
        <n-form
          ref="formRef"
          label-width="auto"
          size="small"
          inline
          :model="formData"
          require-mark-placement="right-hanging"
          label-placement="left"
        >
          <n-form-item path="initValues">
            <n-checkbox v-model:checked="formData.initValues" disabled>
              {{ $t("menu.initValues") }}
            </n-checkbox>
          </n-form-item>
          <n-form-item path="initFrom">
            <n-select
              v-model:value="formData.initFrom"
              disabled
              :options="initOptions"
            />
          </n-form-item>
          <n-form-item path="output">
            <n-checkbox v-model:checked="formData.output" :disabled="isOutput">
              {{
                formData.selectGauges === "1"
                  ? $t("menu.outputOnly0")
                  : $t("menu.outputOnly")
              }}
            </n-checkbox>
          </n-form-item>
        </n-form>
      </div>
      <div class="correctTrend-button">
        <div>
          <SvgIcon
            class="room"
            name="VerticalScaleSettingsS"
            size="18"
          ></SvgIcon>
          <SvgIcon
            class="room"
            name="VerticalScaleSettingsS"
            size="18"
          ></SvgIcon>
        </div>
        <div>
          <n-button size="tiny" @click="showModal = false">{{
            $t("menu.cancel")
          }}</n-button>
          <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { VxeGridProps } from "vxe-table";
import { unitData, linearData } from "./data";
const formData = reactive({
  selectGauges: "1",
  smoothing: "0.00000",
  smoothingUnit: "hr",
  initValues: false,
  initFrom: "",
  output: true
});
const isOutput = ref(false);
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
      title: "Name",
      minWidth: 50
    },
    {
      field: "inputData",
      title: "inputData",
      minWidth: 220,
      editRender: {},
      slots: { edit: "edit_name" }
    },
    {
      field: "unit",
      title: "unit",
      minWidth: 30,
      editRender: {},
      slots: { edit: "edit_unit", default: "edit_unit" }
    }
  ],
  data: linearData
});
watch(
  () => formData.selectGauges,
  newData => {
    if (newData === "1") {
      gridUnitOptions.data = linearData;
      isOutput.value = false;
    } else {
      gridUnitOptions.data = unitData;
      isOutput.value = true;
      formData.output = true;
    }
  },
  { deep: true } // 确保深度监听
);
const showModal = defineModel({ type: Boolean, default: false });
const selectGaugesGroup = ref([
  {
    label: t("menu.linearY"),
    value: "1"
  },
  {
    label: t("menu.powerLaw"),
    value: "2"
  }
]);
const initOptions = [
  { label: "ms", value: "ms" },
  { label: "sec", value: "sec" },
  { label: "min", value: "min" },
  { label: "hr", value: "hr" },
  { label: "day", value: "213" },
  { label: "Week", value: "Week" },
  { label: "Month", value: "Month" },
  { label: "Year", value: "Year" }
];
</script>

<style lang="scss" scoped>
.correctTrend {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dialogBg;
  &-card {
    .vxe-card {
      margin-bottom: 12px;
    }
  }
  &-button {
    display: flex;
    margin-top: 12px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
  .room {
    margin-right: 20px;
    padding: 2px 5px;
    border: 1px solid $indexBorder;
  }
  .n-select {
    width: 200px;
  }
}
::v-deep .vxe-select > .vxe-input {
  width: 100%;
  height: 20px;
}
</style>
