<template>
  <Dialog v-model="showModal" width="1100" height="690">
    <div class="parameters">
      <div class="parameters-header">
        <n-form-item :label="$t('menu.calculationType')" label-placement="left">
          <n-select
            v-model:value="calculationTypeValue"
            :options="calculationTypeOptions"
          ></n-select>
          <n-button v-if="calculationTypeValue === 'monteCarloImprove'">{{
            $t("menu.improveSettings")
          }}</n-button>
        </n-form-item>
      </div>
      <div class="parameters-content">
        <n-card class="parameters-content__tree" :title="$t('menu.variables')">
          <n-scrollbar>
            <n-tree
              v-model:checked-keys="checkedKeys"
              :default-expand-all="true"
              block-line
              cascade
              checkable
              :selectable="false"
              :data="treeData"
            />
          </n-scrollbar>
        </n-card>
        <n-card :title="$t('menu.samplingCFinal')">
          <div class="form">
            <n-form
              :model="formData"
              label-placement="left"
              label-width="auto"
              label-align="right"
            >
              <n-form-item :label="$t('menu.mode')">
                <n-select
                  v-model:value="formData.mode"
                  :options="modeOptions"
                ></n-select>
                <n-checkbox
                  v-model:checked="formData.log"
                  style="margin-left: 6px"
                  >{{ $t("menu.log") }}?</n-checkbox
                >
              </n-form-item>
              <n-form-item
                v-show="
                  calculationTypeValue !== 'monteCarloImprove' &&
                  calculationTypeValue !== 'monteCarlo'
                "
                :label="$t('menu.number')"
              >
                <n-input v-model:value="formData.number"></n-input>
              </n-form-item>
              <n-form-item :label="$t('menu.modelValue')">
                <n-input-group>
                  <n-input
                    disabled
                    v-model:value="formData.modelValue"
                    placeholder=" "
                  />
                  <n-popselect
                    v-model:value="formData.modelvalueUnit"
                    :options="[]"
                    trigger="click"
                  >
                    <n-button>{{ formData.modelvalueUnit }}</n-button>
                  </n-popselect>
                </n-input-group>
              </n-form-item>
              <n-form-item
                v-show="
                  calculationTypeValue !== 'monteCarloImprove' &&
                  calculationTypeValue !== 'monteCarlo'
                "
                :label="$t('menu.minimum')"
              >
                <n-input v-model:value="formData.minimum"></n-input>
              </n-form-item>
              <n-form-item
                v-show="
                  calculationTypeValue !== 'monteCarloImprove' &&
                  calculationTypeValue !== 'monteCarlo'
                "
                :label="$t('menu.maximum')"
              >
                <n-input v-model:value="formData.maximum"></n-input>
              </n-form-item>
              <n-form-item
                v-show="
                  calculationTypeValue === 'monteCarloImprove' ||
                  calculationTypeValue === 'monteCarlo'
                "
                :label="$t('menu.mean')"
              >
                <n-input v-model:value="formData.mean"></n-input>
              </n-form-item>
              <n-form-item
                v-show="
                  calculationTypeValue === 'monteCarloImprove' ||
                  calculationTypeValue === 'monteCarlo'
                "
                :label="$t('menu.stdDev')"
              >
                <n-input v-model:value="formData.stdDev"></n-input>
              </n-form-item>
            </n-form>
          </div>
          <Echarts
            v-if="
              calculationTypeValue === 'monteCarloImprove' ||
              calculationTypeValue === 'monteCarlo'
            "
            :option="option"
            :show-pane="false"
          />

          <vxe-grid v-else ref="gridRef" v-bind="gridOptions"> </vxe-grid>
        </n-card>
      </div>
      <div class="parameters-footer">
        <n-form-item
          :label="$t('menu.totalNumberOfModels')"
          style="width: 60%"
          label-placement="left"
        >
          <n-input disabled></n-input>
          <n-button
            style="min-width: auto"
            :disabled="calculationTypeValue === 'deterministic'"
          >
            <template #icon>
              <SvgIcon name="tsShowS" size="16"></SvgIcon>
            </template>
          </n-button>
          <n-checkbox
            style="margin-left: 12px"
            v-show="
              calculationTypeValue === 'monteCarloImprove' ||
              calculationTypeValue === 'monteCarlo'
            "
            v-model:checked="formData.saveMinMedianMaxRunsOnly"
            >{{ $t("menu.saveMinMedianMaxRunsOnly") }}</n-checkbox
          >
        </n-form-item>
        <div class="button">
          <n-button size="tiny">{{ $t("menu.run") }}</n-button>
          <n-button size="tiny" @click="showModal = false">{{
            $t("menu.cancel")
          }}</n-button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ECOption } from "@/components/Echarts/config";
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { VxeGridProps } from "vxe-table";
const { t } = useI18n();

const showModal = defineModel({ type: Boolean, default: false });

const calculationTypeOptions = computed(() => [
  { label: t("menu.deterministic"), value: "deterministic" },
  {
    label: t("menu.deterministicMultivariate"),
    value: "deterministicMultivariate"
  },
  { label: t("menu.monteCarlo"), value: "monteCarlo" },
  { label: t("menu.monteCarloImprove"), value: "monteCarloImprove" }
]);

const modeOptions = computed(() => {
  if (
    calculationTypeValue.value === "monteCarlo" ||
    calculationTypeValue.value === "monteCarloImprove"
  ) {
    return [
      { label: t("menu.normal"), value: "normal" },
      { label: t("menu.lognormal"), value: "lognormal" },
      { label: t("menu.truncatedNormal"), value: "truncatedNormal" },
      { label: t("menu.truncatedlognormal"), value: "truncatedlognormal" },
      { label: t("menu.uniform"), value: "uniform" },
      { label: t("menu.triangular"), value: "triangular" }
    ];
  } else {
    return [
      { label: t("menu.automatic"), value: "automatic" },
      { label: t("menu.manual"), value: "manual" }
    ];
  }
});

const calculationTypeValue = ref("deterministic");

const treeData = computed(() => [
  {
    key: "wellAndWellbore",
    label: `${t("menu.wellAndWellbore")}`,
    children: [
      {
        label: "C[Final]",
        key: "finalWellboreStorage"
      },
      {
        label: "Ci/Cf",
        key: "cInitialAndCFinal"
      },
      {
        label: "Delta_t",
        key: "dtChangingStorage"
      },
      {
        label: "Skin",
        key: "skin"
      }
    ]
  },
  {
    key: "reservoirAndBoundary",
    label: t("menu.reservoirAndBoundary"),
    children: [
      {
        label: "k",
        key: "permeability"
      },
      {
        label: "h",
        key: "thickness"
      },
      {
        label: "🖊",
        key: "porosity"
      },
      {
        label: "Ri",
        key: "compositeRadius"
      },
      {
        label: "M",
        key: "mobilityRatio"
      },
      {
        label: "D",
        key: "diffusivityRatio"
      }
    ]
  },
  {
    key: "compositeConstraints",
    label: t("menu.compositeConstraints"),
    children: [
      {
        label: t("menu.totalTransmissiblity"),
        key: "totalTransmissiblity"
      }
    ]
  }
]);
const checkedKeys = ref([""]);

const formData = reactive({
  mode: "automatic",
  log: true,
  number: "5",
  modelValue: "0.207832",
  modelvalueUnit: "m³/MPa",
  minimum: "0.021",
  maximum: "2.10000",
  mean: "0.207832",
  stdDev: "0.0692774",
  saveMinMedianMaxRunsOnly: false
});

const gridOptions = computed<VxeGridProps<any>>(() => {
  return {
    border: true,
    height: "auto",
    editConfig: {
      trigger: "click",
      showIcon: false,
      mode: "cell"
    },
    columns: [
      {
        title: t("menu.values"),
        field: "values",
        align: "center"
      }
    ],
    data: [
      {
        id: 10001,
        values: "0.101325"
      },
      {
        id: 10002,
        values: "0.1325"
      }
    ]
  };
});

const option = reactive<ECOption>({
  toolbox: {
    showTitle: false,
    itemSize: 0,
    feature: {
      dataZoom: {
        type: "slider"
      }
    }
  },
  legend: {
    show: true
  },
  brush: {
    throttleType: "debounce",
    throttleDelay: 100
  },
  dataZoom: {
    show: false,
    type: "slider",
    start: 0,
    end: 100
  },
  grid: [
    {
      show: true,
      backgroundColor: "white",
      left: 50,
      right: 0,
      top: 0,
      bottom: 50
    }
  ],
  xAxis: [
    {
      id: "double",
      name: "Time[hr]",
      type: "log",
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        color: "#000"
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        color: "black",
        showMaxLabel: false
      },
      axisTick: {
        show: true
      },
      minorTick: {
        show: true
      }
    }
  ],
  yAxis: [
    {
      type: "log",
      id: "double",
      name: "Pressure Difference[MPa]",
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        color: "#000"
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        color: "black",
        showMaxLabel: false
      },
      axisTick: {
        show: true
      },
      minorTick: {
        show: true
      }
    }
  ],
  series: [
    {
      name: "Pressure Difference",
      type: "scatter",
      id: "doubleOne",
      symbolSize: 3,
      large: true,
      data: [
        ["0.000156", "5.66542"],
        ["0.000312", "9.73223"],
        ["0.000468", "12.7397"],
        ["0.000624", "15.7681"],
        ["0.00078", "18.5197"],
        ["0.000936", "20.8623"],
        ["0.001092", "23.1573"],
        ["0.001248", "24.9305"],
        ["0.001404", "27.1735"],
        ["0.001575", "29.1678"],
        ["0.001768", "31.3874"],
        ["0.001983", "33.6277"],
        ["0.002225", "36.0547"],
        ["0.002497", "38.4919"],
        ["0.002801", "40.9902"],
        ["0.003143", "43.9749"],
        ["0.003527", "46.7851"],
        ["0.003957", "49.8713"],
        ["0.00444", "53.2989"],
        ["0.004982", "56.7017"],
        ["0.005589", "59.9831"],
        ["0.006271", "63.8781"],
        ["0.007037", "67.613"],
        ["0.007895", "71.435"],
        ["0.008859", "75.8676"],
        ["0.009939", "80.1886"],
        ["0.011152", "84.3584"],
        ["0.012513", "89.0634"],
        ["0.01404", "93.9726"],
        ["0.015753", "98.9101"],
        ["0.017675", "104.183"],
        ["0.019832", "109.295"],
        ["0.022252", "115.035"],
        ["0.024967", "120.856"],
        ["0.028014", "126.367"],
        ["0.031432", "132.71"],
        ["0.035267", "138.999"],
        ["0.03957", "145.239"],
        ["0.044398", "151.81"],
        ["0.049816", "158.653"],
        ["0.055894", "165.706"],
        ["0.062714", "172.773"],
        ["0.070367", "179.743"],
        ["0.078953", "186.805"],
        ["0.088586", "194.121"],
        ["0.099396", "201.04"],
        ["0.111524", "208.286"],
        ["0.125132", "215.111"],
        ["0.1404", "221.953"],
        ["0.157531", "228.94"],
        ["0.176753", "235.133"],
        ["0.19832", "241.253"],
        ["0.222519", "247.499"],
        ["0.249671", "252.899"],
        ["0.280135", "258.188"],
        ["0.314316", "263.178"],
        ["0.352669", "267.99"],
        ["0.395701", "272.459"],
        ["0.443984", "276.38"],
        ["0.498158", "280.198"],
        ["0.558942", "283.779"],
        ["0.627144", "287.019"],
        ["0.703667", "290.448"],
        ["0.789527", "293.717"],
        ["0.885864", "296.77"],
        ["0.993956", "300.165"],
        ["1.11524", "303.65"],
        ["1.25132", "307.101"],
        ["1.404", "310.945"],
        ["1.57531", "314.86"],
        ["1.76753", "319.479"],
        ["1.9832", "324.218"],
        ["2.22519", "329.502"],
        ["2.4967", "335.309"],
        ["2.80135", "341.221"],
        ["3.14316", "347.561"],
        ["3.52669", "354.687"],
        ["3.95701", "362.108"],
        ["4.43984", "369.911"],
        ["4.98158", "378.109"],
        ["5.58942", "386.625"],
        ["6.27144", "395.245"],
        ["7.03667", "404.592"],
        ["7.81667", "413.032"],
        ["8.59667", "420.922"],
        ["9.37667", "428.204"],
        ["10.1567", "434.9"],
        ["10.9367", "441.195"],
        ["11.7167", "447.042"],
        ["12.4967", "452.501"],
        ["13.2767", "457.465"],
        ["14.0567", "462.248"],
        ["14.8367", "466.655"],
        ["15.6167", "471.043"],
        ["16.3967", "475.292"],
        ["17.1767", "478.986"],
        ["17.9567", "482.543"],
        ["18.7367", "485.959"],
        ["19.5167", "489.543"],
        ["20.2967", "492.76"],
        ["21.0767", "495.507"],
        ["21.8567", "498.419"],
        ["22.6367", "501.318"],
        ["23.4167", "504.106"],
        ["24.1967", "506.719"],
        ["24.9767", "508.922"],
        ["25.7567", "511.29"],
        ["26.5367", "513.538"],
        ["27.3167", "515.861"],
        ["28.0967", "517.857"],
        ["28.8767", "520.295"],
        ["29.6567", "522.149"],
        ["30.4367", "523.832"],
        ["31.2167", "526.036"],
        ["31.9967", "527.726"],
        ["32.7767", "529.389"],
        ["33.5567", "530.918"],
        ["34.3367", "532.649"],
        ["35.8967", "535.958"],
        ["37.4567", "538.677"],
        ["39.0167", "541.535"],
        ["40.5767", "544.366"],
        ["42.1367", "546.864"],
        ["43.6967", "549.208"],
        ["45.2567", "551.52"],
        ["46.8167", "553.816"],
        ["48.3767", "556.059"],
        ["49.9367", "557.727"],
        ["51.4967", "559.867"],
        ["53.0567", "561.73"],
        ["54.6167", "563.431"],
        ["56.1767", "565.15"],
        ["57.7367", "566.73"],
        ["59.2967", "568.289"],
        ["60.8567", "569.676"],
        ["62.4167", "571.229"],
        ["63.9767", "572.702"],
        ["65.5367", "574.037"],
        ["67.0967", "575.415"],
        ["68.6567", "576.755"],
        ["70.9967", "578.543"]
      ]
    }
  ]
});

watch(calculationTypeValue, val => {
  if (!val) return;
  if (val === "monteCarloImprove" || val === "monteCarlo") {
    formData.mode = "normal";
  } else {
    formData.mode = "automatic";
  }
});
</script>

<style lang="scss" scoped>
.parameters {
  height: 100%;
  padding: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  &-header {
    padding: 12px;
  }
  &-content {
    flex: 1;
    display: flex;
    overflow: hidden;
    > :first-child {
      width: 250px;
      margin-right: 12px;
    }
    > :nth-child(2) {
      flex: 1;
      height: 100%;
      > :deep(.n-card__content) {
        overflow: hidden;
        display: flex;
        .form {
          flex: 1;
          margin-right: 12px;
          .n-form {
            > .n-form-item {
              width: 100%;
              max-width: 300px;
            }
          }
        }
        .vxe-grid {
          width: 20%;
        }
        .comChart {
          width: 60%;
        }
      }
    }
  }
  &-footer {
    padding: 12px 0;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }

  .n-form-item {
    width: 50%;
  }

  .n-button {
    margin-left: 12px;
    min-width: 80px;
  }
}
</style>
