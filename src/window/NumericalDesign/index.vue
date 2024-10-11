<template>
  <Dialog v-model="showModal" width="1060" height="auto">
    <div class="numericalDesign">
      <div class="numericalDesign-card">
        <n-tabs type="card" v-model:value="tabValue">
          <n-tab key="full3d" :name="$t('menu.full3d')"></n-tab>
          <n-tab key="proxy1d" :name="$t('menu.proxy1d')"></n-tab>
        </n-tabs>
        <div class="content">
          <div class="collapse">
            <n-collapse
              :default-expanded-names="[
                'mainOptions',
                'advanced',
                'timeStepping'
              ]"
            >
              <n-collapse-item
                :title="$t('menu.mainOptions')"
                name="mainOptions"
              >
                <n-grid :x-gap="12" :cols="2">
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.includeOtherWells">
                      {{ $t("menu.includeOtherWells") }}
                    </n-checkbox>
                  </n-grid-item>
                  <n-grid-item>
                    <SvgIcon name="tsZoomInS" size="16"
                  /></n-grid-item>
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.imposePi">
                      {{ $t("menu.imposePi") }}
                    </n-checkbox>
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item
                v-if="tabValue !== $t('menu.proxy1d')"
                :title="$t('menu.output')"
                name="output"
              >
              </n-collapse-item>
              <n-collapse-item
                v-if="tabValue === $t('menu.proxy1d')"
                :title="$t('menu.proxyModel')"
                name="proxyModel"
              >
                <n-grid :x-gap="12" :cols="2">
                  <n-grid-item :span="2">
                    <n-select
                      v-model:value="form.proxyModelValue"
                      size="tiny"
                      :options="proxyModelOptions"
                    />
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item :title="$t('menu.advanced')" name="advanced">
                <n-grid :x-gap="12" :cols="1">
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.timeDependent">
                      {{ $t("menu.timeDependent") }}
                    </n-checkbox>
                    <SvgIcon name="tsZoomInS" size="16" />
                  </n-grid-item>
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.useWellIntake">
                      {{ $t("menu.useWellIntake") }}
                    </n-checkbox>
                  </n-grid-item>
                  <n-grid-item>
                    <n-checkbox
                      v-model:checked="form.redefineKrPcInHydraulicFractures"
                    >
                      {{ $t("menu.redefineKrPcInHydraulicFractures") }}
                    </n-checkbox>
                  </n-grid-item>
                  <n-grid-item>
                    <n-checkbox
                      v-model:checked="
                        form.applyUnconsolidationInHydraulicFractures
                      "
                    >
                      {{ $t("menu.applyUnconsolidationInHydraulicFractures") }}
                    </n-checkbox>
                  </n-grid-item>
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.useDFN">
                      {{ $t("menu.useDFN") }}
                    </n-checkbox>
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item
                :title="$t('menu.timeStepping')"
                name="timeStepping"
              >
                <n-grid :x-gap="12" :cols="2">
                  <n-grid-item span="2">
                    <n-checkbox
                      v-model:checked="
                        form.useCoarseSteppingAwayFromExtractions
                      "
                    >
                      {{ $t("menu.useCoarseSteppingAwayFromExtractions") }}
                    </n-checkbox>
                  </n-grid-item>
                  <n-grid-item>
                    <n-radio-group
                      v-model:value="form.timeSteppingValue"
                      name="radiogroup"
                    >
                      <n-radio value="absolute">
                        {{ $t("menu.absolute") }}
                      </n-radio>
                      <n-radio value="elapsed">
                        {{ $t("menu.elapsed") }}
                      </n-radio>
                    </n-radio-group>
                  </n-grid-item>
                  <n-grid-item>
                    <label>{{ $t("menu.timeUnit") }}: hr</label>
                  </n-grid-item>
                  <n-grid-item span="2">
                    <n-form-item
                      label-placement="left"
                      :label="$t('menu.from')"
                    >
                      <n-input v-model:value="form.from"></n-input>
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="2">
                    <n-form-item
                      label-placement="left"
                      :label="$t('menu.simulateUntil')"
                    >
                      <n-input v-model:value="form.simulateUntil"></n-input>
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="2">
                    <n-form-item
                      label-placement="left"
                      :label="$t('menu.tMin')"
                    >
                      <n-input v-model:value="form.tMin"></n-input>
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="2" class="ignoreItem">
                    <n-form-item
                      label-placement="left"
                      :label="$t('menu.tMax')"
                    >
                      <n-input v-model:value="form.tMax"></n-input>
                    </n-form-item>
                    <n-checkbox v-model:checked="form.ignore">
                      {{ $t("menu.ignore") }}
                    </n-checkbox>
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item
                :title="$t('menu.numericalSettings')"
                name="numericalSettings"
              >
                <n-radio-group
                  v-model:value="form.numericalSettingsValue"
                  name="radiogroup"
                >
                  <n-grid :x-gap="12" :cols="2">
                    <n-grid-item span="2">
                      <n-radio value="useAutomaticSettings">
                        {{ $t("menu.useAutomaticSettings") }}
                      </n-radio>
                    </n-grid-item>
                    <n-grid-item>
                      <n-radio value="useCustomSettings">
                        {{ $t("menu.useCustomSettings") }}
                      </n-radio>
                    </n-grid-item>
                    <n-grid-item>
                      <SvgIcon name="tsZoomInS" size="16" />
                    </n-grid-item>
                  </n-grid>
                </n-radio-group>
              </n-collapse-item>
            </n-collapse>
          </div>
          <div class="table">
            <n-tabs type="card">
              <n-tab key="1" :name="$t('menu.parameters')"> </n-tab>
            </n-tabs>
            <n-space justify="space-between" style="padding-right: 6px">
              <n-checkbox v-model:checked="form.useDimensionlessParameters">
                {{ t("menu.useDimensionlessParameters") }}
              </n-checkbox>
              <n-space align="center">
                <label for="">{{ t("menu.wellboreStorageCalculator") }}</label>
                <SvgIcon name="tsZoomInS" size="16" />
              </n-space>
            </n-space>
            <n-form-item :label="$t('menu.show')" label-placement="left">
              <n-select
                :consistent-menu-width="false"
                v-model:value="form.showValue"
                size="tiny"
                :options="showOptions"
              />
              <n-button>icon</n-button>
              <n-input disabled placeholder=" "></n-input>
              <n-checkbox v-model:checked="form.showShortnames">
                {{ $t("menu.showShortnames") }}
              </n-checkbox>
              <n-button>icon</n-button>
            </n-form-item>
            <CollapseForm
              :default-expanded-names="[
                'testedWell',
                'reservoir',
                'radialComposite'
              ]"
              :form="collapseForm"
              class="form"
            />
          </div>
        </div>
      </div>
      <div class="numericalDesign-button">
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import CollapseForm from "@/components/CollapseForm/index.vue";

const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });

const tabValue = ref(t("menu.full3d"));

const form = reactive({
  includeOtherWells: false,
  imposePi: false,
  useWellIntake: false,
  timeDependent: false,
  redefineKrPcInHydraulicFractures: false,
  proxyModelValue: "fracturedHorizontalAsSRVB",
  applyUnconsolidationInHydraulicFractures: false,
  useDFN: false,
  useCoarseSteppingAwayFromExtractions: false,
  numericalSettingsValue: "useAutomaticSettings",
  timeSteppingValue: "absolute",
  from: " ",
  simulateUntil: " ",
  tMin: " ",
  tMax: " ",
  ignore: false,
  showValue: "all",
  showShortnames: false,
  useDimensionlessParameters: false
});

const showOptions = [
  { label: t("menu.all"), value: "all" },
  { label: t("menu.wellAndWellbore"), value: "wellAndWellbore" },
  { label: t("menu.reservoirAndBoundary"), value: "reservoirAndBoundary" }
];

const proxyModelOptions = [
  {
    label: t("menu.fracturedHorizontalWithAnomalousDiffusion"),
    value: "fracturedHorizontalWithAnomalousDiffusion"
  },
  {
    label: t("menu.multiZoneFractionalDimension"),
    value: "multiZoneFractionalDimension"
  },
  { label: t("menu.butterfly"), value: "butterfly" }
];

const collapseForm = ref([
  {
    title: t("menu.testedWell"),
    name: "testedWell",
    children: [
      {
        type: "group",
        label: t("menu.zw"),
        value: "2.85832",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" }
        ],
        unitValue: "ms"
      },
      {
        type: "group",
        label: t("menu.perforationLength"),
        value: "5.85832",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" }
        ],
        unitValue: "ms"
      },
      {
        type: "group",
        label: t("menu.wellLength"),
        value: "5.85832",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" }
        ],
        unitValue: "ms"
      },
      {
        type: "checkbox",
        label: t("menu.rateDependentSkin"),
        value: false
      },
      {
        type: "group",
        label: t("menu.skin"),
        value: "4.87690",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" }
        ],
        unitValue: ""
      },
      {
        type: "select",
        label: t("menu.wellboreModel"),
        value: "changingHegeman",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" }
        ]
      },
      {
        type: "group",
        label: t("menu.finalWellboreStorage"),
        value: "0.207832",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" }
        ],
        unitValue: "hr"
      },
      {
        type: "group",
        label: t("menu.cInitialAndCFinal"),
        value: "2.23778",
        options: [],
        unitValue: ""
      },
      {
        type: "group",
        label: t("menu.dtChangingStorage"),
        value: "2.05252",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "hr"
      },
      {
        type: "group",
        label: t("menu.dtChangingStorage"),
        value: "4.87690",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "hr"
      },
      {
        type: "group",
        label: t("menu.bottomholeMD"),
        value: "5082.00",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "hr"
      },
      {
        type: "checkbox",
        label: t("menu.includeConstraints"),
        value: false
      }
    ]
  },
  {
    title: t("menu.reservoir"),
    name: "reservoir",
    children: [
      {
        type: "group",
        label: t("menu.initialPressure"),
        value: "41.9532",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "hr"
      },
      {
        type: "select",
        label: t("menu.reservoirType"),
        value: "41.9532",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ]
      },
      {
        type: "group",
        label: t("menu.transmissibility"),
        value: "320.869",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "sec"
      },
      {
        type: "group",
        label: t("menu.permeability"),
        value: "58.3398",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "ms"
      },
      {
        type: "group",
        label: t("menu.thickness"),
        value: "5.50000",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "day"
      },
      {
        type: "group",
        label: t("menu.porosity"),
        value: "0.168",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: ""
      },
      {
        type: "group",
        label: t("menu.netToGross"),
        value: "0.168",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: ""
      },
      {
        type: "group",
        label: t("menu.kzKr"),
        value: "0.168",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: ""
      }
    ]
  },
  {
    title: t("menu.radialComposite"),
    name: "radialComposite",
    children: [
      {
        type: "select",
        label: t("menu.reservoirType"),
        value: "homogeneous",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ]
      },
      {
        type: "group",
        label: t("menu.m"),
        value: "4.19532",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: ""
      },
      {
        type: "group",
        label: t("menu.d"),
        value: "0.60753",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: ""
      },
      {
        type: "group",
        label: t("menu.netToGross"),
        value: "1.0000",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: ""
      }
    ]
  },
  {
    title: t("menu.contourAndFaults"),
    name: "contourAndFaults",
    children: [
      {
        type: "group",
        label: t("menu.compositeDistance"),
        value: "170.295",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "ms"
      }
    ]
  }
]);
</script>

<style lang="scss" scoped>
.numericalDesign {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-card {
    .content {
      min-height: 520px;
      border: 1px solid $dialogBorder;
      padding: 2px;
      border-top: none;
      display: flex;
      .collapse {
        width: 440px;
        padding-right: 4px;
        :deep(.n-collapse) {
          .n-form-item {
            width: 70%;
          }
          .ignoreItem {
            display: flex;
            justify-content: space-between;
            .n-checkbox {
              align-items: center;
            }
          }
        }
      }
      :deep(.table) {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: start;
        .n-form-item {
          display: flex;
          justify-content: start;
          flex-wrap: nowrap;
          .n-select {
            max-width: 100px;
          }
          .n-button {
            margin-left: 12px;
          }
          .n-input {
            max-width: 100px;
            margin-left: 12px;
          }
          .n-checkbox {
            margin-left: 12px;
            .n-checkbox__label {
              white-space: nowrap;
            }
          }
          .n-form-item-feedback-wrapper {
            display: none;
          }
        }
        .CollapseForm {
          flex: 1;
        }
      }
    }
  }
  &-button {
    display: inline-block;
    padding: 12px;
    box-sizing: border-box;

    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
}
</style>
