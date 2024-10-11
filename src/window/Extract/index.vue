<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.analyticalDesign')"
    width="980"
    height="630"
  >
    <div class="extract">
      <div class="extract-collapse">
        <n-scrollbar>
          <n-form
            label-placement="left"
            :model="formValue"
            label-width="auto"
            label-algin="right"
          >
            <n-collapse
              :default-expanded-names="[
                'extractionSource',
                'sharedExtractionParameters'
              ]"
            >
              <n-collapse-item
                :title="$t('menu.extractionSource')"
                name="extractionSource"
              >
                <n-form-item :label="$t('menu.pressureGauge')">
                  <SelectPane
                    :options="pressureGaugeOptions"
                    v-model:value="formValue.pressureGauge"
                    v-model:radio="formValue.pressureGaugeRadio"
                  >
                  </SelectPane>
                </n-form-item>
                <n-form-item :label="$t('menu.productionData')">
                  <SelectPane
                    :options="productionDataOptions"
                    v-model:value="formValue.productionData"
                    v-model:radio="formValue.productionDataRadio"
                  >
                  </SelectPane>

                  <IconButton name="tsAddProductionL" size="32"></IconButton>
                </n-form-item>
                <n-form-item :label="$t('menu.productionEvent')">
                  <SelectPane
                    :options="productionEventOptions"
                    v-model:value="formValue.productionEvent"
                    v-model:radio="formValue.productionEventRadio"
                  >
                    <template #action_content>
                      <n-form-item
                        :label="$t('menu.selectionOnType')"
                        label-placement="top"
                      >
                        <n-checkbox-group
                          v-model:value="formValue.selectionOnType"
                        >
                          <n-space justify="space-between">
                            <n-checkbox value="buildUp">
                              {{ $t("menu.buildUp") }}
                            </n-checkbox>
                            <n-checkbox value="production">
                              {{ $t("menu.production") }}
                            </n-checkbox>
                            <n-checkbox value="fallOff"
                              >{{ $t("menu.fallOff") }}
                            </n-checkbox>
                            <n-checkbox value="injection">
                              {{ $t("menu.injection") }}</n-checkbox
                            >
                          </n-space>
                        </n-checkbox-group>
                      </n-form-item>
                      <n-form-item
                        :label="$t('menu.selectionOnDuration')"
                        label-placement="top"
                      >
                        <n-checkbox value="duration"
                          >{{ $t("menu.duration") }}
                        </n-checkbox>
                        >
                        <n-input-group>
                          <n-input
                            v-model:value="formValue.durationValue"
                            placeholder=" "
                          />
                          <n-popselect
                            v-model:value="formValue.durationUnit"
                            :options="durationOptions"
                            trigger="click"
                          >
                            <n-button>{{ formValue.durationUnit }}</n-button>
                          </n-popselect>
                        </n-input-group>
                      </n-form-item>
                    </template>
                  </SelectPane>

                  <IconButton name="AddL" size="32"></IconButton>
                </n-form-item> </n-collapse-item
              ><n-collapse-item
                :title="$t('menu.sharedExtractionParameters')"
                name="sharedExtractionParameters"
              >
                <n-form-item :label="$t('menu.smoothing')">
                  <n-input v-model:value="formValue.smoothing"></n-input>
                  <n-button>
                    <template #icon>
                      <SvgIcon name="resetS" size="16"></SvgIcon>
                    </template>
                  </n-button>
                </n-form-item>
                <n-form-item :label="$t('menu.filtrationPtsCycle')">
                  <n-input
                    v-model:value="formValue.filtrationPtsCycle"
                  ></n-input>
                  <n-button>
                    <template #icon>
                      <SvgIcon name="resetS" size="16"></SvgIcon>
                    </template>
                  </n-button>
                </n-form-item>
                <n-form-item :label="$t('menu.pi')">
                  <n-input-group>
                    <n-input
                      v-model:value="formValue.piValue"
                      placeholder=" "
                    />
                    <n-popselect
                      v-model:value="formValue.piUnit"
                      :options="durationOptions"
                      trigger="click"
                    >
                      <n-button>{{ formValue.timeSpanIncludedUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-form-item>
                <n-form-item :label="$t('menu.timeSpanIncluded')">
                  <n-input-group>
                    <n-input
                      v-model:value="formValue.timeSpanIncludedValue"
                      placeholder=" "
                    />
                    <n-popselect
                      v-model:value="formValue.timeSpanIncludedUnit"
                      :options="durationOptions"
                      trigger="click"
                    >
                      <n-button>{{ formValue.timeSpanIncludedUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                  <n-button>
                    <template #icon>
                      <SvgIcon name="AddS" size="16"></SvgIcon>
                    </template>
                  </n-button>
                  <n-button>
                    <template #icon>
                      <SvgIcon name="resetS" size="16"></SvgIcon>
                    </template>
                  </n-button>
                </n-form-item> </n-collapse-item
              ><n-collapse-item
                :title="$t('menu.individualExtractionParameters')"
                name="individualExtractionParameters"
              >
                <vxe-grid
                  ref="gridRef"
                  v-bind="gridOptions"
                ></vxe-grid> </n-collapse-item
            ></n-collapse>
          </n-form>
        </n-scrollbar>
      </div>
      <div class="extract-preview">
        <n-card :title="$t('menu.preview')">
          <div class="tool">
            <n-radio-group v-model:value="value" name="radiogroup">
              <n-space>
                <n-radio value="automatic">
                  {{ $t("menu.automatic") }}
                </n-radio>
                <n-radio value="manaual"> {{ $t("menu.manual") }}</n-radio>
                <n-button size="small">
                  <template #icon>
                    <SvgIcon name="resetS" size="16"></SvgIcon> </template
                ></n-button>
              </n-space>
            </n-radio-group>
          </div>
          <div class="chart"><Echarts :option="option" /></div>
        </n-card>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from "vue";
import Echarts from "@/components/Echarts/index.vue";
import { ECOption } from "@/components/Echarts/config";
import SelectPane from "@/components/SelectPane/index.vue";
import { VxeGridProps } from "vxe-table";
import { useI18n } from "vue-i18n";
import { NSelect } from "naive-ui";

const { t } = useI18n();

const showModal = defineModel({ type: Boolean, default: false });
const value = ref();

const formValue = reactive({
  pressureGauge: ["HD4-63"],
  pressureGaugeRadio: "HD4-63",
  productionData: ["Production"],
  productionDataRadio: "Production",
  productionEvent: ["Fall-Off #1"],
  productionEventRadio: "Fall-Off #1",
  selectionOnType: ["fallOff"],
  durationValue: "1.0000",
  durationUnit: "hr",
  smoothing: "0.1",
  filtrationPtsCycle: "100",
  timeSpanIncludedValue: "2265.6",
  timeSpanIncludedUnit: "hr",
  piValue: "64.3408",
  piUnit: "MPa"
});

const doubleData = [
  {
    content: "Production",
    range: [7, 148],
    column: ["Time", "Pressure deference"],
    unit: ["hr", "psi"],
    startTime: 1713779566000,
    zone: "UTC+08",
    points: [
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
  },
  {
    content: "Pressure",
    range: [154, 296],
    column: ["Time", "Pressure deference"],
    unit: ["hr", "psi"],
    startTime: 1713779566000,
    zone: "UTC+08",
    points: [
      ["0.000156", "4.88913"],
      ["0.000312", "6.84524"],
      ["0.000468", "9.23644"],
      ["0.000624", "11.5431"],
      ["0.00078", "12.6159"],
      ["0.000936", "13.9539"],
      ["0.001092", "14.0264"],
      ["0.001248", "16.3423"],
      ["0.001404", "18.1877"],
      ["0.001575", "18.2748"],
      ["0.001768", "19.3625"],
      ["0.001983", "20.2987"],
      ["0.002225", "21.1052"],
      ["0.002497", "21.44"],
      ["0.002801", "23.8255"],
      ["0.003143", "25.1454"],
      ["0.003527", "25.6058"],
      ["0.003957", "28.2952"],
      ["0.00444", "29.6546"],
      ["0.004982", "29.0444"],
      ["0.005589", "31.1863"],
      ["0.006271", "33.1218"],
      ["0.007037", "32.8178"],
      ["0.007895", "35.8506"],
      ["0.008859", "38.024"],
      ["0.009939", "36.8924"],
      ["0.011152", "38.5411"],
      ["0.012513", "41.7551"],
      ["0.01404", "42.7712"],
      ["0.015753", "44.355"],
      ["0.017675", "45.1092"],
      ["0.019832", "47.1398"],
      ["0.022252", "50.2263"],
      ["0.024967", "49.2275"],
      ["0.028014", "51.4954"],
      ["0.031432", "54.8872"],
      ["0.035267", "54.446"],
      ["0.03957", "55.6706"],
      ["0.044398", "58.2866"],
      ["0.049816", "60.3885"],
      ["0.055894", "61.3698"],
      ["0.062714", "61.012"],
      ["0.070367", "60.9958"],
      ["0.078953", "62.512"],
      ["0.088586", "61.8969"],
      ["0.099396", "61.5969"],
      ["0.111524", "61.2003"],
      ["0.125132", "59.4549"],
      ["0.1404", "60.173"],
      ["0.157531", "57.3607"],
      ["0.176753", "53.6015"],
      ["0.19832", "53.8468"],
      ["0.222519", "50.7288"],
      ["0.249671", "46.5765"],
      ["0.280135", "44.8072"],
      ["0.314316", "42.7505"],
      ["0.352669", "40.4978"],
      ["0.395701", "36.6299"],
      ["0.443984", "33.8088"],
      ["0.498158", "32.3473"],
      ["0.558942", "29.8444"],
      ["0.627144", "29.206"],
      ["0.703667", "29.3632"],
      ["0.789527", "27.7466"],
      ["0.885864", "28.3392"],
      ["0.993956", "30.2802"],
      ["1.11524", "30.5724"],
      ["1.25132", "32.2155"],
      ["1.404", "34.333"],
      ["1.57531", "37.854"],
      ["1.76753", "41.6083"],
      ["1.9832", "44.6947"],
      ["2.22519", "49.6136"],
      ["2.4967", "52.6032"],
      ["2.80135", "55.2149"],
      ["3.14316", "60.9643"],
      ["3.52669", "66.1717"],
      ["3.95701", "69.6319"],
      ["4.43984", "73.6391"],
      ["4.98158", "77.4471"],
      ["5.58942", "79.9951"],
      ["6.27144", "84.6135"],
      ["7.03667", "89.0013"],
      ["7.81667", "90.8622"],
      ["8.59667", "92.3752"],
      ["9.37667", "94.5044"],
      ["10.1567", "95.9511"],
      ["10.9367", "97.009"],
      ["11.7167", "97.3005"],
      ["12.4967", "97.7641"],
      ["13.2767", "98.3375"],
      ["14.0567", "100.028"],
      ["14.8367", "99.9891"],
      ["15.6167", "100.265"],
      ["16.3967", "100.103"],
      ["17.1767", "102.486"],
      ["17.9567", "101.276"],
      ["18.7367", "100.538"],
      ["19.5167", "102.245"],
      ["20.2967", "102.67"],
      ["21.0767", "103.911"],
      ["21.8567", "102.945"],
      ["22.6367", "101.761"],
      ["23.4167", "102.161"],
      ["24.1967", "103.04"],
      ["24.9767", "104.719"],
      ["25.7567", "104.308"],
      ["26.5367", "104.159"],
      ["27.3167", "103.228"],
      ["28.0967", "102.694"],
      ["28.8767", "103.136"],
      ["29.6567", "103.645"],
      ["30.4367", "104.432"],
      ["31.2167", "103.682"],
      ["31.9967", "102.91"],
      ["32.7767", "103.914"],
      ["33.5567", "102.119"],
      ["34.3367", "103.386"],
      ["35.8967", "104.362"],
      ["37.4567", "103.26"],
      ["39.0167", "104.826"],
      ["40.5767", "105.202"],
      ["42.1367", "102.951"],
      ["43.6967", "105.304"],
      ["45.2567", "104.978"],
      ["46.8167", "104.926"],
      ["48.3767", "103.953"],
      ["49.9367", "103.591"],
      ["51.4967", "104.537"],
      ["53.0567", "104.634"],
      ["54.6167", "104.58"],
      ["56.1767", "104.82"],
      ["57.7367", "103.907"],
      ["59.2967", "104.33"],
      ["60.8567", "106.191"],
      ["62.4167", "105.391"],
      ["63.9767", "105.222"],
      ["65.5367", "106.155"],
      ["67.0967", "105.563"],
      ["68.6567", "102.839"],
      ["70.9967", "106.966"]
    ]
  }
];

const pressureGaugeOptions = ref([{ label: "HD4-63", value: "HD4-63" }]);
const productionDataOptions = ref([
  { label: "Production", value: "Production" }
]);
const productionEventOptions = ref([
  { label: "Injection #1", value: "Injection #1" },
  { label: "Fall-Off #1", value: "Fall-Off #1" },
  { label: "Injection #2", value: "Injection #2" }
]);
const durationOptions = [
  { label: "ms", value: "ms" },
  { label: "sec", value: "sec" },
  { label: "min", value: "min" },
  { label: "hr", value: "hr" },
  { label: "day", value: "213" },
  { label: "Week", value: "Week" },
  { label: "Month", value: "Month" },
  { label: "Year", value: "Year" }
];

const gridOptions = reactive<VxeGridProps<any>>({
  border: true,
  height: "auto",
  columns: [
    {
      title: t("menu.name"),
      field: "name",
      children: [
        {
          field: "name"
        }
      ]
    },
    {
      title: t("menu.pDt"),
      field: "pdt",
      children: [
        {
          field: "pdt",
          slots: {
            header() {
              return h(NSelect, {
                modelValue: pdtUnit.value,
                placeholder: "",
                defaultValue: "hr",
                options: [
                  { label: "hr", value: "hr" },
                  { label: "ms", value: "ms" },
                  { label: "MPa", value: "MPa" }
                ]
              });
            }
          }
        }
      ]
    }
  ],
  data: [
    {
      id: 10001,
      name: "Fall-Off #1",
      pdt: "64.3047"
    }
  ]
});
const pdtUnit = ref("hr");

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
      right: 0,
      top: 0
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
      data: doubleData[0].points
    },
    {
      name: "Fall Difference",
      type: "scatter",
      id: "doubleTwo",
      symbolSize: 3,
      large: true,
      data: doubleData[1].points
    }
  ]
});
</script>
<style scoped lang="scss">
.extract {
  display: flex;
  height: 100%;
  overflow: hidden;
  &-collapse {
    width: 400px;
  }
  &-preview {
    flex: 1;
    margin-left: 2px;
    .n-card {
      height: 100%;
      > :deep(.n-card__content) {
        display: flex;
        flex-direction: column;
        padding: 0;
        .tool {
          padding: 6px;
        }
        .chart {
          flex: 1;
        }
      }
    }
  }
}
</style>
