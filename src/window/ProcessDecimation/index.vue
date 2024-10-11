<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.decimation')"
    width="440"
    height="auto"
  >
    <div class="processDecimation">
      <div class="processDecimation-card">
        <vxe-card :title="$t('menu.type')">
          <n-radio-group v-model:value="formData.typeValue">
            <n-space vertical :size="4">
              <n-radio
                v-for="item in typeGroup"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
          <n-radio-group
            v-model:value="formData.keepValue"
            :disabled="formData.typeValue !== '4'"
          >
            <n-space vertical :size="4">
              <n-radio
                v-for="item in scoendGroup"
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
      <div class="processDecimation-button">
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

const typeGroup = ref([
  {
    label: t("menu.everyNPoints"),
    value: "1"
  },
  {
    label: t("menu.logarithmic"),
    value: "2"
  },
  {
    label: t("menu.linear"),
    value: "3"
  },
  {
    label: t("menu.removeRedundantPoints"),
    value: "4"
  }
]);

const scoendGroup = ref([
  {
    label: t("menu.keepFirst"),
    value: "1"
  },
  {
    label: t("menu.keepLast"),
    value: "2"
  }
]);

const formData = reactive({
  original: "107656",
  result: "0.00000",
  typeValue: "1",
  strategyValue: "1",
  keepValue: "1"
});
</script>

<style lang="scss" scoped>
.processDecimation {
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
    .n-input-group {
      flex: 1;
    }
  }
}
</style>
