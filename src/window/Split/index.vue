<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.split')"
    width="420"
    height="auto"
    id="Split"
  >
    <div class="split">
      <div class="split-card">
        <vxe-card :title="$t('menu.formula')">
          <n-form
            ref="formRef"
            label-width="auto"
            style="width: 50%"
            size="small"
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item :label="t('menu.stepStart')" path="stepStart">
              <n-input v-model:value="formData.stepStart" />
            </n-form-item>
            <n-form-item :label="t('menu.timePicked')" path="timePicked">
              <n-input-group>
                <n-input v-model:value="formData.timePicked" placeholder=" " />
                <n-popselect
                  v-model:value="formData.timePickedUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.timePickedUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item :label="t('menu.stepEnd')" path="stepEnd">
              <n-input
                v-model:value="formData.stepEnd"
              /> </n-form-item></n-form
        ></vxe-card>
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
            <n-form-item :label="t('menu.before')" path="before">
              <n-input-group>
                <n-input v-model:value="formData.before" placeholder=" " />
                <n-popselect
                  v-model:value="formData.beforeUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.beforeUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item :label="t('menu.after')" path="after">
              <n-input-group>
                <n-input v-model:value="formData.after" placeholder=" " />
                <n-popselect
                  v-model:value="formData.afterUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.afterUnit }}</n-button>
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
      <div class="split-button">
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
  stepStart: "1.00000",
  timePicked: "0.00000",
  timePickedUnit: "hr",
  stepEnd: "",
  before: "",
  beforeUnit: "hr",
  after: "",
  afterUnit: "hr",
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
</script>

<style lang="scss" scoped>
.split {
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
