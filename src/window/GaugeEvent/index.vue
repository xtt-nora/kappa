<template>
  <Dialog v-model="showGaugeEvent" width="750" height="420" :title="title">
    <n-form
      ref="formRef"
      label-width="150"
      size="small"
      :model="formData"
      label-align="left"
      label-placement="left"
    >
      <n-tabs type="card" size="small">
        <n-tab-pane :tab="$t('menu.aspect')" name="1">
          <n-split direction="horizontal" :max="0.75" :min="0.25">
            <template #1>
              <CollapseForm
                :default-expanded-names="['symbol', 'line']"
                :form="
                  !type.toLowerCase().includes('production')
                    ? aspectCollapse
                    : aspectCollapseLine
                "
                v-model="formData"
              />
            </template>
            <template #2>
              <Echarts
                :option="
                  !type.toLowerCase().includes('production')
                    ? option
                    : optionLine
                "
                :show-pane="false"
                ref="chartRef"
            /></template>
          </n-split>
        </n-tab-pane>
        <n-tab-pane :tab="$t('menu.information')" name="2">
          <CollapseForm
            :default-expanded-names="['information', 'shift', 'statistics']"
            :form="infoCollapse"
          />
        </n-tab-pane>
        <n-tab-pane :tab="$t('menu.data')" name="3">
          <vxe-grid v-bind="gridOptions"></vxe-grid>
        </n-tab-pane>
      </n-tabs>
      <div class="gaugeEvent-button">
        <n-button size="tiny" @click="showGaugeEvent = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
      </div>
    </n-form>
  </Dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import CollapseForm from "@/components/CollapseForm/index.vue";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import { useProjectStore } from "@/stores/modules/project";
import { storeToRefs } from "pinia";
import useOptions from "./hooks/useOptions";
import useCollapse from "./hooks/useCollapse";
import useGrid from "./hooks/useGrid";
import { getFlatTreeData } from "@/utils";

const props = defineProps<{
  type: EditType;
}>();

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>();
const showGaugeEvent = defineModel({ type: Boolean, default: false });

const { t } = useI18n();
const proejctStore = useProjectStore();
const {
  activeGuageOption,
  activeGuage,
  radioPressure,
  radioProduction,
  treeData
} = storeToRefs(proejctStore);

const title = computed(() => {
  const treeList = getFlatTreeData(treeData.value);
  if (!treeList.length) return t("menu.propertiesset");
  switch (props.type) {
    case "QAQC":
      const guageInfo = treeList.find(item => item.id === activeGuage.value);
      return guageInfo
        ? guageInfo.name + " " + t("menu.propertiesset")
        : t("menu.propertiesset");
    case "Production":
      const productionInfo = treeList.find(
        item => item.id === radioProduction.value
      );
      return productionInfo
        ? productionInfo.name + " " + t("menu.propertiesset")
        : t("menu.propertiesset");
    case "Pressure":
      const pressureInfo = treeList.find(
        item => item.id === radioPressure.value
      );
      return pressureInfo
        ? pressureInfo.name + " " + t("menu.propertiesset")
        : t("menu.propertiesset");
    default:
      return t("menu.propertiesset");
      break;
  }
});

const formData = reactive({
  color: "#454545",
  colorLine: "#454545",
  size: 4,
  style: "solid",
  width: "2",
  type: "circle",
  filled: false,
  name: "压力与流量数据",
  xFactor: "1.00000",
  xFactorUnit: "",
  xShift: "0.00000",
  xShiftUnit: "hr",
  numberOfPoints: "5",
  minimumTime: "0.00000",
  minimumTimeUnit: "hr",
  maximumTime: "156.00",
  maximumTimeUnit: "hr",
  minimumValue: "0.00000",
  minimumValueUnit: "psig",
  maximumValue: "1500.00",
  maximumValueUnit: "psig",
  average: "1020.00",
  averageUnit: "psig",
  estimatedResolution: "100.000",
  estimatedResolutionUnit: "psig",
  standardDeviation: "538.145",
  standardDeviationUnit: "psig",
  cumulative: "4800.000",
  cumulativeUnit: "m"
});

const { gridOptions } = useGrid();
const { option, optionLine } = useOptions(formData, chartRef);
const { aspectCollapse, aspectCollapseLine, infoCollapse } = useCollapse();
</script>

<style lang="scss" scoped>
.n-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
  box-sizing: border-box;
  background-color: $dialogBg;

  .gaugeEvent-button {
    display: inline-block;
    margin-top: 12px;
    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }

  :deep(.n-tabs) {
    flex: 1;
    overflow: hidden;
    .n-tab-pane {
      flex: 1;
      overflow: hidden;
    }
    .n-tabs-nav {
      background: none !important;
    }
  }

  :deep(.n-form-item) {
    padding: 0 12px;
    margin: 0;
    .n-form-item-label {
      border: 1px solid rgb(224, 224, 230);
      border-right: none;
    }
    * {
      height: 18px;
      min-height: 18px;
      line-height: 18px;
      box-sizing: border-box;
    }
    .n-button {
      min-width: 100px;
    }
  }

  :deep(#echarts) {
    background: none;
    border: none;
  }

  :deep(.vxe-grid) {
    width: 100%;
  }
}
</style>
