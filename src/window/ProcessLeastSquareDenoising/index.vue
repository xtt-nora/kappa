<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.denoising')"
    width="440"
    height="430"
  >
    <div class="processTransform">
      <div class="processTransform-card">
        <vxe-card :title="$t('menu.input')">
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item label="∆t" path="t">
              <n-input-group>
                <n-input v-model:value="formData.t" placeholder=" " />
                <n-popselect
                  v-model:value="formData.tUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.tUnit }}</n-button>
                </n-popselect>
              </n-input-group> </n-form-item
            ><n-form-item label="∆Y" path="y">
              <n-input-group>
                <n-input v-model:value="formData.y" placeholder=" " />
                <n-popselect
                  v-model:value="formData.yUnit"
                  :options="yUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.yUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item></n-form
          >
        </vxe-card>
        <vxe-card :title="$t('menu.selectedDataSize')">
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            inline
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item :label="t('menu.original')" path="original">
              <n-input v-model:value="formData.original" />
            </n-form-item>
            <n-form-item :label="t('menu.result')" path="result">
              <n-input
                v-model:value="formData.result"
                placeholder=" "
              /> </n-form-item
          ></n-form>
        </vxe-card>
        <vxe-card :title="$t('menu.backupStrategy')">
          <n-radio-group v-model:value="strategyValue" name="radiogroup">
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

const typeValue = ref("1");

const strategyValue = ref("1");
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
  original: "107656",
  result: "0.00000",
  t: "",
  tUnit: "hr",
  y: "",
  yUnit: "MPa"
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
