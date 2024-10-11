<template>
  <Dialog v-model="showManual" height="auto" width="470">
    <div class="forecast">
      <div class="forecast-card">
        <n-form
          :model="formData"
          label-placement="left"
          label-width="200"
          label-align="right"
        >
          <n-card :title="$t('menu.forecastOptions')">
            <n-form-item>
              <n-radio-group v-model:value="formData.forecastValue">
                <n-space vertical>
                  <n-radio value="constantPressure">
                    {{ $t("menu.constantPressure") }}
                  </n-radio>
                  <n-radio value="decliningPressureRamp">
                    {{ $t("menu.decliningPressureRamp") }}
                  </n-radio>
                  <n-radio value="multiplePressures">
                    {{ $t("menu.multiplePressures") }}
                  </n-radio>
                  <n-radio value="multipleRates">
                    {{ $t("menu.multipleRates") }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item>
              <n-checkbox disabled v-model:checked="formData.usePastHistory">{{
                $t("menu.usePastHistory")
              }}</n-checkbox>
              <n-checkbox
                disabled
                v-show="formData.forecastValue !== 'multipleRates'"
                v-model:checked="formData.surfacePressures"
                >{{ $t("menu.surfacePressures") }}</n-checkbox
              >
            </n-form-item>
          </n-card>
          <n-card :title="$t('menu.parameters')">
            <n-form-item :label="$t('menu.initialPressure')">
              <n-input-group>
                <n-input
                  v-model:value="formData.initialPressure"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="formData.initialPressureUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.initialPressureUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item
              v-if="
                formData.forecastValue === 'constantPressure' ||
                formData.forecastValue === 'decliningPressureRamp' ||
                formData.forecastValue === 'multiplePressures'
              "
              label-align="left"
            >
              <template #label>
                <n-checkbox v-model:checked="formData.usePastHistory">{{
                  $t("menu.usePastHistory")
                }}</n-checkbox>
              </template>
              <n-input-group>
                <n-input
                  :disabled="!formData.usePastHistory"
                  v-model:value="formData.usePastHistoryValue"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="formData.usePastHistoryUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button :disabled="!formData.usePastHistory">{{
                    formData.usePastHistoryUnit
                  }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item
              v-if="
                formData.forecastValue === 'constantPressure' ||
                formData.forecastValue === 'decliningPressureRamp' ||
                formData.forecastValue === 'multiplePressures'
              "
              label-align="left"
            >
              <template #label>
                <n-checkbox v-model:checked="formData.maximumRate">{{
                  $t("menu.maximumRate")
                }}</n-checkbox>
              </template>
              <n-input-group>
                <n-input
                  :disabled="!formData.maximumRate"
                  v-model:value="formData.maximumRateValue"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="formData.maximumRateUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button :disabled="!formData.maximumRate">{{
                    formData.maximumRateUnit
                  }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item
              v-if="
                formData.forecastValue === 'constantPressure' ||
                formData.forecastValue === 'decliningPressureRamp'
              "
              :label="$t('menu.forecastDuration')"
            >
              <n-input-group>
                <n-input
                  v-model:value="formData.forecastDuration"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="formData.forecastDurationUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.forecastDurationUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item
              v-if="formData.forecastValue === 'constantPressure'"
              :label="$t('menu.producingPressure')"
            >
              <n-input-group>
                <n-input
                  v-model:value="formData.producingPressure"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="formData.producingPressureUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.producingPressureUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item
              v-if="formData.forecastValue === 'decliningPressureRamp'"
              :label="$t('menu.producingPressureAtStart')"
            >
              <n-input-group>
                <n-input
                  v-model:value="formData.producingPressureAtStart"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="formData.producingPressureAtStartUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{
                    formData.producingPressureAtStartUnit
                  }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item
              v-if="formData.forecastValue === 'decliningPressureRamp'"
              :label="$t('menu.producingPressureAtEnd')"
            >
              <n-input-group>
                <n-input
                  v-model:value="formData.producingPressureAtEnd"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="formData.producingPressureAtEndUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.producingPressureAtEndUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item
              v-if="formData.forecastValue === 'decliningPressureRamp'"
              :label="$t('menu.pressureChangePeriod')"
            >
              <n-input-group>
                <n-input
                  v-model:value="formData.pressureChangePeriod"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="formData.pressureChangePeriodUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.pressureChangePeriodUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <vxe-grid
              v-if="
                formData.forecastValue === 'multiplePressures' ||
                formData.forecastValue === 'multipleRates'
              "
              ref="gridRef"
              v-bind="gridOptions"
            >
              <template #edit_duration="{ row }">
                <n-input v-model:value="row.duration"></n-input>
              </template>
            </vxe-grid>
          </n-card>
        </n-form>
      </div>
      <div class="forecast-button">
        <n-button size="tiny" @click="showManual = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.generate") }}</n-button>
        <n-button size="tiny" style="float: left">{{
          $t("menu.loadData")
        }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { reactive, h, ref, computed } from "vue";
import { VxeGridProps } from "vxe-table";
import { NSelect } from "naive-ui";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const showManual = defineModel({ type: Boolean, default: false });

const formData = reactive({
  forecastValue: "constantPressure",
  usePastHistory: false,
  surfacePressures: false,
  initialPressure: "41.9532",
  initialPressureUnit: "MPa",
  usePastHistoryValue: "0.00000",
  usePastHistoryUnit: "m³/D",
  maximumRate: false,
  maximumRateValue: "7949.36",
  maximumRateUnit: "m³/D",
  forecastDuration: "365.000",
  forecastDurationUnit: "day",
  producingPressure: "0.101325",
  producingPressureUnit: "MPa",
  producingPressureAtStart: "0.101325",
  producingPressureAtStartUnit: "MPa",
  producingPressureAtEnd: "3.44738",
  producingPressureAtEndUnit: "MPa",
  pressureChangePeriod: "100.000",
  pressureChangePeriodUnit: "hr"
});
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

const gridOptions = computed<VxeGridProps<any>>(() => {
  return {
    border: true,
    height: "200",
    editConfig: {
      trigger: "click",
      showIcon: false,
      mode: "cell"
    },
    columns: [
      {
        title: t("menu.duration"),
        field: "duration",
        children: [
          {
            field: "duration",
            slots: {
              header() {
                return h(NSelect, {
                  modelValue: durationUnit.value,
                  placeholder: "",
                  defaultValue: "hr",
                  options: [
                    { label: "hr", value: "hr" },
                    { label: "ms", value: "ms" },
                    { label: "MPa", value: "MPa" }
                  ]
                });
              }
            },
            editRender: { name: "input" }
          }
        ]
      },
      {
        title: t("menu.pressure"),
        field: "pressure",
        children: [
          {
            field: "pressure",
            visible:
              formData.forecastValue === "multiplePressures" ? true : false,
            slots: {
              header() {
                return h(NSelect, {
                  modelValue: pressureUnit.value,
                  placeholder: "",
                  defaultValue: "MPa",
                  options: [
                    { label: "hr", value: "hr" },
                    { label: "ms", value: "ms" },
                    { label: "MPa", value: "MPa" }
                  ]
                });
              }
            },
            editRender: { name: "input" }
          }
        ]
      },
      {
        title: t("menu.qw"),
        field: "qw",
        children: [
          {
            visible: formData.forecastValue === "multipleRates",
            field: "qw",
            slots: {
              header() {
                return h(NSelect, {
                  modelValue: qwUnit.value,
                  placeholder: "",
                  defaultValue: "ms",
                  options: [
                    { label: "hr", value: "hr" },
                    { label: "ms", value: "ms" },
                    { label: "MPa", value: "MPa" }
                  ]
                });
              }
            },
            editRender: { name: "input" }
          }
        ]
      }
    ],
    data: [
      {
        id: 10001,
        duration: "8760.00",
        pressure: "0.101325",
        qw: "0.0000"
      },
      {
        id: 10002,
        duration: "",
        pressure: "",
        qw: ""
      }
    ]
  };
});

const durationUnit = ref("");
const pressureUnit = ref("");
const qwUnit = ref("");
</script>
<style lang="scss" scoped>
.forecast {
  padding: 12px;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  &-card {
    .n-input {
      max-width: 100px;
    }
    .n-form {
      > :first-child {
        margin-bottom: 12px;
      }
    }
  }
  &-button {
    display: inline-block;
    margin-top: 12px;
    .n-button {
      margin-left: 12px;
      min-width: 80px;
      float: right;
    }
  }
}
</style>
