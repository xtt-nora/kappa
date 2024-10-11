<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.pqModel')"
    width="420"
    height="auto"
  >
    <div class="pqModel">
      <div class="pqModel-card">
        <vxe-card :title="$t('menu.wellBoreStorage')">
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            inline
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item :label="t('menu.C')" path="C">
              <n-input-group>
                <n-input v-model:value="formData.C" placeholder=" " />
                <n-popselect
                  v-model:value="formData.timePickedUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.timePickedUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item>
              <n-button>{{ $t("menu.Calculate") }}</n-button>
            </n-form-item></n-form
          ></vxe-card
        >
        <vxe-card :title="$t('menu.Options')">
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
                <n-checkbox v-model:checked="formData.iscumulative">
                  {{ $t("menu.cumulative") }}:
                </n-checkbox>
                <n-input-group>
                  <n-input
                    v-model:value="formData.cumulative"
                    placeholder=" "
                    :disabled="!formData.iscumulative"
                  />
                  <n-popselect
                    v-model:value="formData.cumUnit"
                    :options="cumOptions"
                    trigger="click"
                    :disabled="!formData.iscumulative"
                  >
                    <n-button>{{ formData.cumUnit }}</n-button>
                  </n-popselect>
                </n-input-group>
              </n-space>
            </n-form-item>
            <n-form-item>
              <n-space :size="5">
                <n-checkbox v-model:checked="formData.isnumberOfRates">
                  {{ $t("menu.numberOfRates") }}:
                </n-checkbox>
                <n-input
                  v-model:value="formData.numberOfRates"
                  placeholder=" "
                  :disabled="!formData.isnumberOfRates"
                />
              </n-space>
            </n-form-item>
            <n-form-item>
              <n-space :size="5">
                <n-checkbox v-model:checked="formData.isPositive">
                  {{ $t("menu.positiveRatesOnly") }}:
                </n-checkbox>
              </n-space>
            </n-form-item>
          </n-form>
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
      <div class="pqModel-button">
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
  C: "0.2",
  iscumulative: true,
  isnumberOfRates: false,
  isPositive: false,
  cumulative: "-1.80864E+5",
  numberOfRates: "10",
  timePickedUnit: "bbl/psi",
  cumUnit: "STB",
  original: "102",
  result: "N/A",
  strategyValue: "1"
});

const xUnitOptions = [
  { label: "bbl/psi", value: "bbl/psi" },
  { label: "m²", value: "m²" },
  { label: "m³/bar", value: "m³/bar" },
  { label: "m³/kPa", value: "m³/kPa" },
  { label: "m³/MPa", value: "m³/MPa" },
  { label: "m³/Pa", value: "m³/Pa" },
  { label: "m³cm²/kg", value: "m³cm²/kg" }
];
const cumOptions = [
  { label: "bscf", value: "bscf" },
  { label: "cl", value: "cl" },
  { label: "cm³", value: "cm³" },
  { label: "liters", value: "liters" },
  { label: "m³", value: "m³" },
  { label: "ml", value: "ml" },
  { label: "Mm³", value: "Mm³" },
  { label: "MMm³", value: "MMm³" },
  { label: "MScf", value: "MScf" },
  { label: "MMScf", value: "MMScf" },
  { label: "MSTB", value: "MSTB" },
  { label: "MMSTB", value: "MMSTB" },
  { label: "scf", value: "scf" },
  { label: "STB", value: "STB" },
  { label: "U.S. gal", value: "U.S. gal" }
];
</script>

<style lang="scss" scoped>
.pqModel {
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
