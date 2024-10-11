<template>
  <Dialog
    width="750"
    height="auto"
    :min-height="500"
    v-model="showModal"
    :title="$t('menu.ipr')"
  >
    <div class="ipr">
      <div class="ipr-form">
        <n-form
          label-placement="left"
          size="small"
          label-width="auto"
          label-align="right"
        >
          <n-form-item :label="t('menu.wellType')">
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
          <n-form-item :label="t('menu.iprType')">
            <n-select
              v-model:value="form.iprType"
              :options="iprTypeOptions"
            ></n-select>
          </n-form-item>
          <n-form-item :label="t('menu.testType')">
            <n-select
              v-model:value="form.testType"
              :options="testTypeOptions"
            ></n-select>
          </n-form-item>
        </n-form>
      </div>
      <n-tabs type="card" size="small" v-model:value="tabValue">
        <n-tab key="1" :tab="$t('menu.parameters')" name="1"> </n-tab>
        <n-tab key="2" :tab="$t('menu.data')" name="2"> </n-tab>
      </n-tabs>
      <vxe-card class="ipr-card">
        <div class="collapse" v-if="tabValue === '1'">
          <CollapseForm
            :default-expanded-names="['well', 'reservoir', 'modelSpecific']"
            :form="collapseForm"
          />
        </div>
        <div class="form" v-if="tabValue === '1'">
          <n-form label-placement="left" label-width="auto" label-align="right">
            <n-form-item :label="t('menu.parametersFromAnalysis')">
              <n-button>icon</n-button>
            </n-form-item>
            <n-form-item :label="t('menu.computePAverage')">
              <n-button>icon</n-button>
            </n-form-item>
            <n-form-item :label="t('menu.shapeFactorFromCatalog')">
              <n-button>icon</n-button>
            </n-form-item>
            <n-form-item :label="t('menu.computeDrainageArea')">
              <n-button>icon</n-button>
            </n-form-item>
            <n-form-item :label="t('menu.computeForchheimerCoef')">
              <n-button>icon</n-button>
            </n-form-item>
            <n-form-item :label="t('menu.pseudoSteadyStatePar')">
              <n-button>icon</n-button>
            </n-form-item>
            <n-form-item :label="t('menu.pickData')">
              <n-button>icon</n-button>
            </n-form-item>
            <n-form-item :label="t('menu.pickExtendedqp')">
              <n-button>icon</n-button>
            </n-form-item>
          </n-form>
        </div>
        <div class="table" v-else>
          <div class="table-left">
            <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
          </div>
          <div class="table-right">
            <n-button>{{ $t("menu.add") }}</n-button>
            <n-button>{{ $t("menu.insert") }}</n-button>
            <n-button>{{ $t("menu.delete") }}</n-button>
            <n-button>{{ $t("menu.loadData") }}</n-button>
            <n-form-item :label="t('menu.pickData')" label-placement="left">
              <n-button>icon</n-button>
            </n-form-item>
            <n-form-item
              :label="t('menu.pickExtendedqp')"
              label-placement="left"
            >
              <n-button>icon</n-button>
            </n-form-item>
          </div>
        </div>
      </vxe-card>
      <div class="ipr-button">
        <n-button @click="showModal = false" size="tiny">{{
          $t("menu.ok")
        }}</n-button>
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.apply")
        }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { NSelect } from "naive-ui";
import { reactive, ref, h } from "vue";
import { useI18n } from "vue-i18n";
import { VxeGridProps } from "vxe-table";
const showModal = defineModel({ type: Boolean, default: false });
const { t } = useI18n();
const tabValue = ref("1");

const form = reactive({
  wellType: "horizontal",
  wellTypeRadioValue: "producer",
  iprType: "fetkovich",
  testType: "flowAfterFlow"
});

const iprTypeOptions = [
  {
    label: t("menu.userDefined"),
    value: "userDefined"
  },
  {
    label: t("menu.vogel"),
    value: "vogel"
  },
  {
    label: t("menu.transient"),
    value: "transient"
  },
  {
    label: t("menu.pseudoSteadyState"),
    value: "pseudoSteadyState"
  },
  {
    label: t("menu.fetkovich"),
    value: "fetkovich"
  },
  {
    label: t("menu.jones"),
    value: "jones"
  },
  {
    label: t("menu.compositeVogel"),
    value: "compositeVogel"
  }
];

const testTypeOptions = [
  {
    label: t("menu.singlePoint"),
    value: "singlePoint"
  },
  {
    label: t("menu.flowAfterFlow"),
    value: "flowAfterFlow"
  },
  {
    label: t("menu.isochronal"),
    value: "isochronal"
  },
  {
    label: t("menu.modifiedIsochronal"),
    value: "modifiedIsochronal"
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

const gridOptions = reactive<VxeGridProps<any>>({
  border: true,
  height: "300",
  maxHeight: "400",
  columns: [
    {
      title: t("menu.q"),
      field: "role",
      children: [
        {
          field: "role",
          slots: {
            header() {
              return h(NSelect, {
                modelValue: q.value,
                placeholder: "",
                defaultValue: "ms",
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
    },
    {
      title: t("menu.bHPFlowing"),
      field: "age",
      children: [
        {
          field: "age",
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
          }
        }
      ]
    }
  ],
  data: [
    {
      id: 10001,
      role: 1.0,
      age: 28
    },
    {
      id: 10002,
      role: 2.24553,
      age: 22
    },
    {
      id: 10003,
      role: 3.2452,
      age: 32
    },
    {
      id: 10004,
      role: 0.24532,
      age: 23
    },
    {
      id: 10005,
      role: 1.24532,
      age: 30
    },
    {
      id: 10006,
      role: 0.0,
      age: 21
    }
  ]
});

const q = ref("hr");
const bHPFlowing = ref("hr");
</script>

<style lang="scss" scoped>
.ipr {
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
  .ipr-card {
    min-height: 200px;
    max-height: 500px;
    :deep(.vxe-card--body-content) {
      display: flex;
      .collapse {
        width: 60%;
      }
      .form {
        position: relative;
        margin-left: 12px;
        flex: 1;
        .result {
          position: absolute;
          bottom: 0;
        }
      }
      .table {
        width: 100%;
        display: flex;
        .table-left {
          flex: 1;
        }
        .table-right {
          padding: 0 12px;
          @include flex-column;
          > .n-button {
            width: 100%;
            margin-bottom: 6px;
          }
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
