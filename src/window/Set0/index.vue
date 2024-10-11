<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.set0')"
    width="420"
    height="auto"
  >
    <div class="setQ">
      <div class="setQ-card">
        <vxe-card :title="$t('menu.setRatesNewValue')">
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            inline
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item
              :label="t('menu.defineNewValue')"
              path="defineNewValue"
            >
              <n-input-group>
                <n-input
                  v-model:value="formData.defineNewValue"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="formData.timePickedUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.timePickedUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
          </n-form></vxe-card
        >
        <vxe-card :title="$t('menu.setRatesConditions')">
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item>
              <n-space :size="5">
                <n-checkbox v-model:checked="formData.isLessThan">
                  {{ $t("menu.lessThan") }}:
                </n-checkbox>
                <n-input-group>
                  <n-input v-model:value="formData.less" placeholder=" " />
                  <n-popselect
                    v-model:value="formData.lessUnit"
                    :options="lessOptions"
                    trigger="click"
                  >
                    <n-button>{{ formData.lessUnit }}</n-button>
                  </n-popselect>
                </n-input-group>
              </n-space>
            </n-form-item>
            <n-form-item>
              <n-space :size="5">
                <n-checkbox v-model:checked="formData.isOnlyIf">
                  {{ $t("menu.onlyIf") }}:
                </n-checkbox>
              </n-space>
            </n-form-item>
          </n-form></vxe-card
        >
        <vxe-card :title="$t('menu.handlingCumulative')">
          <n-radio-group v-model:value="formData.handlingCum" name="radiogroup">
            <n-space vertical :size="4">
              <n-radio
                v-for="item in handlingGroup"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </vxe-card>
        <vxe-card :title="$t('menu.selectDataSize')">
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            inline
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item :label="t('menu.original')" path="before">
              <n-input
                v-model:value="formData.original"
                placeholder=" "
                disabled
              />
            </n-form-item>
            <n-form-item :label="t('menu.result')" path="after">
              <n-input
                v-model:value="formData.result"
                placeholder=" "
                disabled
              />
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
      <div class="setQ-button">
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
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const showModal = defineModel({ type: Boolean, default: false });

const handlingGroup = ref([
  {
    label: t("menu.ignoreCum"),
    value: "1"
  },
  {
    label: t("menu.allocateLeft"),
    value: "2"
  },
  {
    label: t("menu.allocateRight"),
    value: "3"
  }
]);
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
  defineNewValue: "N/A",
  timePickedUnit: "m³/D",
  isLessThan: false,
  less: "0.00000",
  lessUnit: "m³/D",
  isOnlyIf: false,
  handlingCum: "1",
  cumUnit: "STB",
  original: "102",
  result: "N/A",
  strategyValue: "1"
});

const xUnitOptions = [
  { label: "B/D", value: "B/D" },
  { label: "cf/D", value: "cf/D" },
  { label: "cf/s", value: "cf/s" },
  { label: "cm³/sec", value: "cm³/sec" },
  { label: "l/min", value: "l/min" },
  { label: "m³/D", value: "m³/D" },
  { label: "m³/hr", value: "m³/hr" },
  { label: "m³/min", value: "m³/min" },
  { label: "m³/sec", value: "m³/sec" },
  { label: "MB/D", value: "MB/D" },
  { label: "Mcf/D", value: "Mcf/D" },
  { label: "Mm³/D", value: "Mm³/D" },
  { label: "Mm³/hr", value: "Mm³/hr" },
  { label: "MMB/D", value: "MMB/D" },
  { label: "MMm³/D", value: "MMm³/D" },
  { label: "U.K. gal/hr", value: "U.K. gal/hr" },
  { label: "U.k. gal/min", value: "U.k. gal/min" },
  { label: "U.S. gal/hr", value: "U.S. gal/hr" },
  { label: "U.S. gal/min", value: "U.S. gal/min" }
];
const lessOptions = [
  { label: "cm³/sec", value: "cm³/sec" },
  { label: "l/min", value: "l/min" },
  { label: "m³/D", value: "m³/D" },
  { label: "m³/hr", value: "m³/hr" },
  { label: "m³/min", value: "m³/min" },
  { label: "m³/sec", value: "m³/sec" },
  { label: "Mm³/D", value: "Mm³/D" },
  { label: "Mm³/hr", value: "Mm³/hr" },
  { label: "MMm³/D", value: "MMm³/D" },
  { label: "MMm³/hr", value: "MMm³/hr" },
  { label: "MMscf/D", value: "MMscf/D" },
  { label: "MMSTB/D", value: "MMSTB/D" },
  { label: "Mscf/D", value: "Mscf/D" },
  { label: "MSTB/D", value: "MSTB/D" },
  { label: "scf/D", value: "scf/D" },
  { label: "STB/D", value: "STB/D" },
  { label: "STB/min", value: "STB/min" },
  { label: "U.K. gal/hr", value: "U.K. gal/hr" },
  { label: "U.K. gal/min", value: "U.K. gal/min" },
  { label: "U.S. gal/hr", value: "U.S. gal/hr" },
  { label: "U.S. gal/min", value: "U.S. gal/min" }
];
</script>

<style lang="scss" scoped>
.setQ {
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
  .room {
    margin-right: 10px;
    padding: 2px 5px;
    border: 1px solid $indexBorder;
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
}
</style>
