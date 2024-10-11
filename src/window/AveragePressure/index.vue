<template>
  <Dialog
    width="730"
    height="auto"
    :min-height="500"
    v-model="showModal"
    :title="$t('menu.averagePressure')"
  >
    <div class="averagePressure">
      <div class="averagePressure-form">
        <n-form-item
          :label="t('menu.calculationMethod')"
          label-placement="left"
        >
          <n-select
            v-model:value="form.calculationMethod"
            :options="calculationMethodOptions"
          ></n-select>
          <n-button>{{ t("menu.plot") }}</n-button>
        </n-form-item>
        <n-form-item :label="t('menu.wellType')" label-placement="left">
          <n-select
            v-model:value="form.wellType"
            :options="wellTypeOptions"
          ></n-select>
          <n-radio-group
            v-model:value="form.wellTypeRadioValue"
            name="radiogroup"
          >
            <n-radio value="producer">
              {{ $t("menu.producer") }}
            </n-radio>
            <n-radio value="injector">
              {{ $t("menu.injector") }}
            </n-radio>
          </n-radio-group>
        </n-form-item>
      </div>
      <vxe-card :title="t('menu.parameters')" class="averagePressure-card">
        <div class="collapse">
          <CollapseForm
            :default-expanded-names="['well', 'reservoir', 'modelSpecific']"
            :form="collapseForm"
          />
        </div>
        <div class="form">
          <n-form-item
            :label="t('menu.parametersFromAnalysis')"
            label-placement="left"
          >
            <n-button>icon</n-button>
          </n-form-item>
          <n-form-item
            :label="t('menu.shapeFactorFromCatalog')"
            label-placement="left"
          >
            <n-button>icon</n-button>
          </n-form-item>
          <n-form-item
            :label="t('menu.computeDrainageArea')"
            label-placement="left"
          >
            <n-button>icon</n-button>
          </n-form-item>
          <n-form-item :label="t('menu.computeCumul')" label-placement="left">
            <n-button>icon</n-button>
          </n-form-item>
          <n-form-item
            :label="t('menu.averagePressure')"
            label-width="auto"
            class="result"
          >
            <n-input-group>
              <n-input
                v-model:value="form.averagePressure"
                placeholder=" "
                readonly
              />
              <n-popselect
                v-model:value="form.averagePressureUnit"
                :options="xUnitOptions"
                trigger="click"
              >
                <n-button>{{ form.averagePressureUnit }}</n-button>
              </n-popselect>
            </n-input-group>
          </n-form-item>
        </div>
      </vxe-card>
      <div class="averagePressure-button">
        <n-button @click="showModal = false" size="tiny">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.ok")
        }}</n-button>
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.compute")
        }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

const showModal = defineModel({ type: Boolean, default: false });
const { t } = useI18n();

const form = reactive({
  calculationMethod: "pseudoSteadyState",
  wellType: "vertical",
  wellTypeRadioValue: "producer",
  averagePressure: "64.3408",
  averagePressureUnit: "hr"
});

const calculationMethodOptions = [
  {
    label: t("menu.pseudoSteadyState"),
    value: "pseudoSteadyState"
  },
  {
    label: t("menu.matericalBalance"),
    value: "matericalBalance"
  }
];
const wellTypeOptions = [
  {
    label: t("menu.vertical"),
    value: "vertical"
  },
  {
    label: t("menu.horizontal"),
    value: "horizontal"
  },
  {
    label: t("menu.fractured"),
    value: "fractured"
  }
];

const collapseForm = ref([
  {
    title: t("menu.well"),
    name: "well",
    children: [
      {
        type: "group",
        label: t("menu.wellFlowingPressure"),
        value: "-0.207832",
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
        label: t("menu.rate"),
        value: "-100.00",
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" }
        ],
        unitValue: "min"
      },
      {
        type: "group",
        label: t("menu.wellRadius"),
        value: "0.05252",
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
        type: "select",
        label: t("menu.skin"),
        value: "total",
        options: [
          { label: t("menu.total"), value: "total" },
          { label: t("menu.byComponents"), value: "byComponents" }
        ]
      },
      {
        type: "group",
        label: t("menu.totalSkinAtQ"),
        value: "0.00000",
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
    title: t("menu.reservoir"),
    name: "reservoir",
    children: [
      {
        type: "group",
        label: t("menu.reservoirLengthX"),
        value: "311.9532",
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
        label: t("menu.reservoirLengthY"),
        value: "321.9532",
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
        label: t("menu.permeability"),
        value: "31.9532",
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
        label: t("menu.reservoirThickness"),
        value: "9.869",
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
        label: t("menu.aOFPressure"),
        value: "0.101325",
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
  },
  {
    title: t("menu.modelSpecific"),
    name: "modelSpecific",
    children: [
      {
        type: "select",
        label: t("menu.turbulence"),
        value: "none",
        options: [
          { label: t("menu.none"), value: "none" },
          { label: t("menu.nonDarcy"), value: "nonDarcy" },
          { label: t("menu.forchheimer"), value: "forchheimer" }
        ]
      },
      {
        type: "group",
        label: t("menu.nonDarcyFlowCoefficient"),
        value: "0.00000",
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
        label: t("menu.forchheimerCoefficient"),
        value: "0.00000",
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
        unitValue: "Week"
      }
    ]
  }
]);

const xUnitOptions = [
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
.averagePressure {
  background-color: $dialogBg;
  padding: 12px;
  &-form {
    .n-form-item {
      .n-select {
        max-width: 200px;
      }
      .n-button,
      .n-radio-group {
        margin-left: 12px;
      }
    }
  }
  .averagePressure-card {
    :deep(.vxe-card--body-content) {
      display: flex;
      .collapse {
        width: 60%;
      }
      .form {
        min-height: 200px;
        position: relative;
        margin-left: 12px;
        flex: 1;
        .result {
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
  &-button {
    width: 100%;
    display: inline-block;
    padding-top: 12px;
    box-sizing: border-box;

    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
}
</style>
