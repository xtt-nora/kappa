<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.filter')"
    width="440"
    height="430"
  >
    <div class="processTransform">
      <div class="processTransform-card">
        <vxe-card :title="$t('menu.windowType')">
          <n-radio-group
            v-model:value="formData.typeValue"
            name="radiogroup"
            size="small"
          >
            <n-space vertical :size="4">
              <div class="radioInput">
                <n-radio value="1"> {{ t("menu.byTime") }}: </n-radio>
                <n-input-group>
                  <n-input
                    v-model:value="formData.byTime"
                    placeholder=" "
                    :disabled="formData.typeValue === '1' ? false : true"
                  />
                  <n-popselect
                    v-model:value="formData.byTimeUnit"
                    :options="xUnitOptions"
                    :disabled="formData.typeValue === '1' ? false : true"
                    trigger="click"
                  >
                    <n-button>{{ formData.byTimeUnit }}</n-button>
                  </n-popselect>
                </n-input-group>
              </div>
              <div class="radioInput">
                <n-radio value="2"> {{ t("menu.byPoints") }}: </n-radio>
                <n-input
                  v-model:value="formData.byPoints"
                  placeholder=" "
                  :disabled="formData.typeValue === '2' ? false : true"
                />
              </div>
            </n-space>
          </n-radio-group>
        </vxe-card>
        <vxe-card :title="$t('menu.filteringType')">
          <n-radio-group
            v-model:value="formData.filteringType"
            name="radiogroup"
          >
            <n-space vertical :size="4">
              <n-radio
                v-for="item in filterGroup"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
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

const filterGroup = ref([
  {
    label: t("menu.mean"),
    value: "1"
  },
  {
    label: t("menu.median"),
    value: "2"
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
  strategyValue: "1",
  typeValue: "1",
  byTime: "",
  byTimeUnit: "hr",
  byPoints: "",
  filteringType: "1"
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
  :deep(.radioInput) {
    display: flex;
    justify-content: space-between;

    .n-input-group,
    .n-input {
      flex: 1;
    }
    .n-radio {
      min-width: 80px;
    }
  }
}
</style>
