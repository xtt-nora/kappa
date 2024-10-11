<template>
  <n-form
    class="reference"
    label-placement="left"
    label-width="auto"
    label-align="right"
  >
    <n-card :title="$t('step.timeFerence')">
      <n-form-item :label="$t('step.reference')">
        <n-date-picker
          v-model:value="formData.reference"
          type="datetime"
          clearable
        />
      </n-form-item>
      <n-form-item :label="$t('step.timeZone')">
        <n-select v-model:value="formData.timeZone" :options="timeZoneObject" />
      </n-form-item>
    </n-card>
    <n-card :title="$t('step.spatial')">
      <n-form-item
        :label="$t('step.longitude')"
        :validation-status="inputValidationStatus"
        :feedback="inputFeedback"
      >
        <n-input-number
          v-model:value="formData.longitude"
          :show-button="false"
          placeholder="N/A"
        />
      </n-form-item>
      <n-form-item
        :label="$t('step.latitude')"
        :validation-status="inputValidationStatus2"
        :feedback="inputFeedback2"
      >
        <n-input-number
          v-model:value="formData.latitude"
          :show-button="false"
          placeholder="N/A"
        />
      </n-form-item>
    </n-card>
  </n-form>
</template>

<script setup lang="ts">
import { timeZoneObject } from "@/assets/common";
import { computed } from "vue";
function createStatus(value: number) {
  return value > 180 || value < -180 ? "error" : "success";
}

function createFeedback(value: number) {
  return value > 180 || value < -180
    ? "参数超出范围:-180<=值<=180 若超出默认N/A"
    : undefined;
}
const formData = defineModel({
  type: Object,
  default: {
    reference: new Date(),
    timeZone: "UTC+08:00",
    longitude: "N/A",
    latitude: "N/A"
  }
});

const inputValidationStatus = computed(() => {
  return createStatus(formData.value.longitude);
});
const inputFeedback = computed(() => {
  return createFeedback(formData.value.longitude);
});
const inputValidationStatus2 = computed(() => {
  return createStatus(formData.value.latitude);
});
const inputFeedback2 = computed(() => {
  return createFeedback(formData.value.latitude);
});
</script>

<style scoped lang="scss">
.reference {
  height: 100%;
  > :nth-child(2) {
    margin-top: 12px;
  }
  .n-form-item {
    width: 93%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
}
::v-deep .n-form-item .n-form-item-feedback-wrapper {
  display: inline-block;
  height: 10px;
  font-size: 11px;
}
</style>
