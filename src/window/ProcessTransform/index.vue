<template>
  <Dialog
    v-model="showEditProcessTransform"
    :title="$t('menu.transform')"
    width="420"
    height="510"
  >
    <div class="processTransform">
      <div class="processTransform-card">
        <vxe-card :title="$t('menu.formula')">
          <n-radio-group
            v-model:value="formulaValue"
            name="radiogroup"
            size="small"
          >
            <n-space vertical :size="4">
              <n-radio
                v-for="item in formulaGroup"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </vxe-card>
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
            <n-form-item label="a" path="a">
              <n-input v-model:value="formData.a" />
            </n-form-item>
            <n-form-item label="b" path="b">
              <n-input-group>
                <n-input v-model:value="formData.b" placeholder=" " />
                <n-popselect
                  v-model:value="formData.bUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.bUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item></n-form
          >
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
        <n-button size="tiny" @click="showEditProcessTransform = false">{{
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

const showEditProcessTransform = defineModel({ type: Boolean, default: false });

const formulaValue = ref("");
const formulaGroup = ref([
  {
    label: "t -> a.t + b",
    value: "1"
  },
  {
    label: "t -> t/a + b",
    value: "2"
  },
  {
    label: "y -> a.y + b",
    value: "3"
  },
  {
    label: "y -> y/a + b",
    value: "4"
  }
]);

const strategyValue = ref("");
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
  a: "1.00000",
  b: "0.00000",
  bUnit: "hr"
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
