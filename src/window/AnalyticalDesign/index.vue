<template>
  <Dialog v-model="showModal" width="1060" height="auto">
    <div class="analyticalDesign">
      <div class="analyticalDesign-card">
        <n-tabs type="card" v-model:value="tabValue">
          <n-tab key="standardModels" :name="$t('menu.standardModels')"></n-tab>
          <n-tab key="specificModels" :name="$t('menu.specificModels')"></n-tab>
        </n-tabs>
        <div class="content">
          <div class="collapse">
            <n-collapse
              :default-expanded-names="[
                'mainOptions',
                'wellboreModel',
                'proxyModel',
                'wellModel'
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
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.externalModels">
                      {{ $t("menu.externalModels") }}
                    </n-checkbox>
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item
                :title="$t('menu.wellboreModel')"
                name="wellboreModel"
              >
                <n-grid :x-gap="12" :cols="2">
                  <n-grid-item>
                    <n-select
                      v-model:value="form.wellboreModelValue"
                      size="tiny"
                      :options="wellboreModelOptions"
                    />
                  </n-grid-item>
                  <n-grid-item>
                    <SvgIcon name="tsZoomInS" size="16"
                  /></n-grid-item>
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.useWellIntake">
                      {{ $t("menu.useWellIntake") }}
                    </n-checkbox>
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item
                v-if="tabValue === $t('menu.specificModels')"
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
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.proxyRateDependentSkin">
                      {{ $t("menu.rateDependentSkin") }}
                    </n-checkbox>
                  </n-grid-item>
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.proxyTimeDependentSkin">
                      {{ $t("menu.timeDependentSkin") }}
                    </n-checkbox>
                    <SvgIcon name="tsZoomInS" size="16" />
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item
                v-if="tabValue !== $t('menu.specificModels')"
                :title="$t('menu.wellModel')"
                name="wellModel"
              >
                <n-grid :x-gap="12" :cols="2">
                  <n-grid-item :span="2">
                    <n-select
                      v-model:value="form.wellModelValue"
                      size="tiny"
                      :options="wellModelOptions"
                    />
                  </n-grid-item>
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.wellRateDependentSkin">
                      {{ $t("menu.rateDependentSkin") }}
                    </n-checkbox>
                  </n-grid-item>
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.wellTimeDependentSkin">
                      {{ $t("menu.timeDependentSkin") }}
                    </n-checkbox>
                    <SvgIcon name="tsZoomInS" size="16" />
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item
                v-if="tabValue !== $t('menu.specificModels')"
                :title="$t('menu.reservoirModel')"
                name="reservoirModel"
              >
                <n-grid :x-gap="12" :cols="2">
                  <n-grid-item :span="2">
                    <n-select
                      v-model:value="form.reservoirModelValue"
                      size="tiny"
                      :options="reservoirModelOptions"
                    />
                  </n-grid-item>
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.horizontalAnisotropy">
                      {{ $t("menu.horizontalAnisotropy") }}
                    </n-checkbox>
                  </n-grid-item>
                  <n-grid-item>
                    <n-checkbox v-model:checked="form.useMDDefinition">
                      {{ $t("menu.useMDDefinition") }}
                    </n-checkbox>
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item
                :title="$t('menu.boundaryModel')"
                name="boundaryModel"
              >
                <n-grid :x-gap="12" :cols="2">
                  <n-grid-item :span="2">
                    <n-select
                      v-model:value="form.boundaryModelValue"
                      size="tiny"
                      :options="boundaryModelOptions"
                    />
                  </n-grid-item>
                </n-grid>
              </n-collapse-item>
              <n-collapse-item
                :title="$t('menu.timeStepping')"
                name="timeStepping"
              >
                <n-grid :x-gap="12" :cols="2">
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
            </n-collapse>
          </div>
          <div class="table">
            <n-tabs type="card">
              <n-tab key="1" :name="$t('menu.parameters')"> </n-tab>
            </n-tabs>
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
                'wellAndWellbore',
                'reservoirAndBoundary'
              ]"
              :form="collapseForm"
              class="form"
            />
          </div>
        </div>
      </div>
      <div class="analyticalDesign-button">
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

const tabValue = ref(t("menu.standardModels"));

const form = reactive({
  includeOtherWells: false,
  imposePi: false,
  externalModels: false,
  wellboreModelValue: "changingHegeman",
  useWellIntake: false,
  proxyModelValue: "fracturedHorizontalWithAnomalousDiffusion",
  proxyRateDependentSkin: false,
  proxyTimeDependentSkin: false,
  wellModelValue: "horizontal",
  wellRateDependentSkin: false,
  wellTimeDependentSkin: false,
  reservoirModelValue: "homogeneous",
  horizontalAnisotropy: false,
  useMDDefinition: false,
  boundaryModelValue: "infinite",
  timeSteppingValue: "absolute",
  from: " ",
  simulateUntil: " ",
  tMin: " ",
  tMax: " ",
  ignore: false,
  showValue: "all",
  showShortnames: false
});

const wellboreModelOptions = [
  { label: t("menu.none"), value: "none" },
  { label: t("menu.constant"), value: "constant" },
  { label: t("menu.changingHegeman"), value: "changingHegeman" },
  { label: t("menu.changingFair"), value: "changingFair" },
  { label: t("menu.changingSpiveyPacker"), value: "changingSpiveyPacker" },
  { label: t("menu.changingSpiveyFissures"), value: "changingSpiveyFissures" },
  { label: t("menu.timeDependentModel"), value: "timeDependentModel" },
  { label: t("menu.none"), value: "none" }
];
const proxyModelOptions = [
  {
    label: t("menu.fracturedHorizontalWithAnomalousDiffusion"),
    value: "fracturedHorizontalWithAnomalousDiffusion"
  },
  {
    label: t("menu.multiZoneFractionalDimension"),
    value: "multiZoneFractionalDimension"
  }
];
const reservoirModelOptions = [
  {
    label: t("menu.homogeneous"),
    value: "homogeneous"
  },
  {
    label: t("menu.dualPorosityPseudoSteadyState"),
    value: "dualPorosityPseudoSteadyState"
  },
  {
    label: t("menu.dualPorosityTransientSlab"),
    value: "dualPorosityTransientSlab"
  },
  {
    label: t("menu.dualPorosityTransientSphere"),
    value: "dualPorosityTransientSphere"
  },
  {
    label: t("menu.multiRadialComposite"),
    value: "multiRadialComposite"
  },
  {
    label: t("menu.dualPermeability"),
    value: "dualPermeability"
  },
  {
    label: t("menu.radialComposite"),
    value: "radialComposite"
  },
  {
    label: t("menu.linearComposite"),
    value: "linearComposite"
  },
  {
    label: t("menu.multilayerWithTransientCrossflow"),
    value: "multilayerWithTransientCrossflow"
  }
];
const wellModelOptions = [
  {
    label: t("menu.vertical"),
    value: "vertical"
  },
  {
    label: t("menu.verticalFracturedUniformFlux"),
    value: "verticalFracturedUniformFlux"
  },
  {
    label: t("menu.verticalFracturedInfiniteCond"),
    value: "verticalFracturedInfiniteCond"
  },
  {
    label: t("menu.verticalFracturedFiniteCond"),
    value: "verticalFracturedFiniteCond"
  },
  {
    label: t("menu.horizontal"),
    value: "horizontal"
  },
  {
    label: t("menu.verticalLimitedEntry"),
    value: "verticalLimitedEntry"
  },
  {
    label: t("menu.slanted"),
    value: "slanted"
  },
  {
    label: t("menu.horizontalFractured"),
    value: "horizontalFractured"
  },
  {
    label: t("menu.multilateral"),
    value: "multilateral"
  },
  {
    label: t("menu.timeDependentModel"),
    value: "timeDependentModel"
  }
];
const boundaryModelOptions = [
  { label: t("menu.infinite"), value: "infinite" },
  { label: t("menu.fault"), value: "fault" },
  { label: t("menu.circular"), value: "circular" },
  { label: t("menu.parallelFaults"), value: "parallelFaults" },
  {
    label: t("menu.intersectingFaultsDiscreteAngle"),
    value: "intersectingFaultsDiscreteAngle"
  },
  { label: t("menu.rectangle"), value: "rectangle" }
];
const showOptions = [
  { label: t("menu.all"), value: "all" },
  { label: t("menu.wellAndWellbore"), value: "wellAndWellbore" },
  { label: t("menu.reservoirAndBoundary"), value: "reservoirAndBoundary" }
];

const collapseForm = ref([
  {
    title: t("menu.wellAndWellbore"),
    name: "wellAndWellbore",
    children: [
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
        label: t("menu.skin"),
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
        unitValue: ""
      }
    ]
  },
  {
    title: t("menu.reservoirAndBoundary"),
    name: "reservoirAndBoundary",
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
        label: t("menu.totalCompressibility"),
        value: "7.41712",
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
.analyticalDesign {
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
            .n-form-item-feedback-wrapper {
              display: none;
            }
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
