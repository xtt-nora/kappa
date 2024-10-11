<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.derivative')"
    width="270"
    height="auto"
  >
    <div class="derivative">
      <div class="derivative-card">
        <vxe-card :title="$t('menu.selectGauges')">
          <n-radio-group
            v-model:value="formData.selectGauges"
            name="radiogroup"
            size="small"
          >
            <n-space vertical :size="4">
              <n-radio
                v-for="item in selectGaugesGroup"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </vxe-card>
        <n-form
          ref="formRef"
          label-width="auto"
          size="small"
          :model="formData"
          require-mark-placement="right-hanging"
          label-placement="left"
        >
          <n-form-item :label="t('menu.smoothing')" path="smoothing">
            <n-input-group>
              <n-input v-model:value="formData.smoothing" placeholder=" " />
              <n-popselect
                v-model:value="formData.smoothingUnit"
                :options="xUnitOptions"
                trigger="click"
              >
                <n-button>{{ formData.smoothingUnit }}</n-button>
              </n-popselect>
            </n-input-group>
          </n-form-item></n-form
        >
      </div>
      <div class="derivative-button">
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

const selectGaugesGroup = ref([
  {
    label: t("menu.allGauges"),
    value: "1"
  },
  {
    label: t("menu.activeGaugeOnly"),
    value: "2"
  }
]);

const formData = reactive({
  selectGauges: "1",
  smoothing: "0.00000",
  smoothingUnit: "hr"
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
</script>

<style lang="scss" scoped>
.derivative {
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
