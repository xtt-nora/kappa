<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.shift')"
    width="420"
    height="auto"
  >
    <div class="processTransform">
      <div class="processTransform-card">
        <vxe-card :title="$t('menu.values')">
          <n-form
            ref="formRef"
            label-width="auto"
            style="width: 50%"
            size="small"
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item :label="t('menu.xFactor')" path="xFactor">
              <n-input v-model:value="formData.xFactor" />
            </n-form-item>
            <n-form-item :label="t('menu.xShift')" path="xShift">
              <n-input-group>
                <n-input v-model:value="formData.xShift" placeholder=" " />
                <n-popselect
                  v-model:value="formData.xShiftUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.xShiftUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item :label="t('menu.yFactor')" path="yFactor">
              <n-input v-model:value="formData.yFactor" />
            </n-form-item>
            <n-form-item :label="t('menu.yShift')" path="yShift">
              <n-input-group>
                <n-input v-model:value="formData.yShift" placeholder=" " />
                <n-popselect
                  v-model:value="formData.yShiftUnit"
                  :options="yUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.yShiftUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
          </n-form>
        </vxe-card>
        <vxe-card :title="$t('menu.backupStrategy')">
          <n-radio-group
            v-model:value="formData.strategyValue"
            name="radiogroup"
          >
            <n-space vertical :size="4">
              <n-radio
                v-for="item in strategyGroup"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </vxe-card>
      </div>
      <div class="processTransform-button">
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const showModal = defineModel({ type: Boolean, default: false });
const strategyGroup = ref([
  {
    label: t("menu.noNewGauge"),
    value: "1"
  },
  {
    label: t("menu.backupTheOldData"),
    value: "2"
  },
  {
    label: t("menu.createANewGaugeForTheNewData"),
    value: "3"
  }
]);

const formData = reactive({
  xFactor: "1.00000",
  xShift: "0.00000",
  xShiftUnit: "hr",
  yFactor: "1.00000",
  yShift: "0.00000",
  yShiftUnit: "MPa",
  strategyValue: "1"
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

const yUnitOptions = [
  { label: "Pa", value: "Pa" },
  { label: "kPa", value: "kPa" },
  { label: "psia", value: "psia" },
  { label: "atm", value: "atm" },
  { label: "bara", value: "bara" },
  { label: "kg/cm²", value: "kg/cm²" },
  { label: "m", value: "m" },
  { label: "psig", value: "psig" },
  { label: "barg", value: "barg" },
  { label: "MPa", value: "MPa" },
  { label: "kPag", value: "kPag" }
];
</script>

<style lang="scss" scoped>
.processTransform {
  padding: 12px;
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
    display: inline-block;
    margin-top: 12px;
    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
}
</style>
