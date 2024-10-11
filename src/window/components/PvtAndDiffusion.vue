<template>
  <n-form
    class="PvtAndDiffusion"
    label-placement="left"
    label-width="auto"
    label-align="right"
    ref="formRef"
  >
    <n-card :title="$t('step.pvt')">
      <n-form-item>
        <n-radio-group v-model:value="formData.pvt">
          <n-space vertical>
            <n-radio value="singlePhase">
              {{ $t("step.single") }}
            </n-radio>
            <n-radio value="multiphase">
              {{ $t("step.multiphase") }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item :label="$t('step.referenceFluid')">
        <n-select
          v-model:value="formData.referenceFluid"
          :options="referenceFluidOptions"
        ></n-select>
      </n-form-item>
      <n-form-item>
        <n-checkbox
          v-model:checked="formData.defineAdvancedPVT"
          :disabled="disabled"
        >
          {{ $t("step.defineAdvancedPVT") }}:
        </n-checkbox>
        <IconButton
          name="AddL"
          size="32"
          :disabled="isIcon"
          @click="isOpen"
        ></IconButton>
      </n-form-item>
    </n-card>
    <n-card :title="$t('step.diffusion')">
      <n-form-item>
        <n-checkbox v-model:checked="formData.relativePermeability" disabled>
          {{ $t("step.relativePermeability") }}:
        </n-checkbox>
        <IconButton name="AddL" size="32" disabled></IconButton>
      </n-form-item>
      <n-form-item>
        <n-checkbox v-model:checked="formData.unconsolidation" disabled>
          {{ $t("step.unconsolidation") }}:
        </n-checkbox>
        <IconButton name="AddL" size="32" disabled></IconButton>
      </n-form-item>
      <n-form-item>
        <n-checkbox v-model:checked="formData.desorption" disabled>
          {{ $t("step.desorption") }}:
        </n-checkbox>
        <IconButton name="AddL" size="32" disabled></IconButton>
      </n-form-item>
    </n-card>
  </n-form>
  <PvtSetting v-model="obj"></PvtSetting>
</template>

<script setup lang="ts">
import PvtSetting from "./secondaryComponent/pvtSetting.vue";
import { ref, watch } from "vue";
import { computed } from "vue";
const disabled = ref(false);
// const isIcon = ref(false);
const obj = ref({
  showModal: false,
  pvt: "singlePhase",
  referenceFluid: "oil"
});
const formData = defineModel({
  type: Object,
  default: {
    pvt: "singlePhase",
    referenceFluid: "Oil",
    defineAdvancedPVT: false,
    relativePermeability: false,
    unconsolidation: false,
    desorption: false
  }
});

const referenceFluidOptions = computed(() => {
  return formData.value.pvt === "singlePhase"
    ? [
        { label: "Oil", value: "Oil" },
        { label: "Gas", value: "Gas" },
        { label: "Water", value: "Water" }
      ]
    : [
        { label: "Oil", value: "Oil" },
        { label: "Gas", value: "Gas" }
      ];
});
const isIcon = computed(() => {
  return !formData.value.defineAdvancedPVT;
});
const isOpen = () => {
  obj.value.showModal = true;
  obj.value.referenceFluid = formData.value.referenceFluid;
  obj.value.pvt = formData.value.pvt;
};
watch(
  () => formData.value.pvt,
  newVal => {
    if (newVal === "multiphase") {
      formData.value.defineAdvancedPVT = true;
      disabled.value = true;
    } else {
      formData.value.defineAdvancedPVT = false;
      disabled.value = false;
    }
  }
);
</script>

<style scoped lang="scss">
.PvtAndDiffusion {
  height: 100%;
  > :nth-child(2) {
    margin-top: 12px;
  }
  .n-card {
    :deep(.n-card__content) {
      @include flex-column;
      .n-form-item {
        width: 50%;
        .n-checkbox {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
