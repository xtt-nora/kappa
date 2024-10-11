<template>
  <n-form
    class="loglogTools"
    label-width="auto"
    :model="formData"
    require-mark-placement="right-hanging"
    label-placement="left"
  >
    <n-grid :x-gap="12" :y-gap="12" :cols="2">
      <n-grid-item>
        <n-card :title="$t('step.storageWellbore')">
          <n-radio-group
            v-model:value="formData.wellboreStorage"
            class="radioGroup"
          >
            <n-space vertical justify="start">
              <n-radio-button
                v-for="item in wellboreStorageOptions"
                :key="item.value"
                :label="item.label"
                :disabled="
                  item.label === 'Changing' &&
                  (formData.wellModel === 'Fractured horizontal + SRVB' ||
                    formData.wellModel === 'Fractured horizontal + Trilinear')
                "
                :value="item.value"
              />
            </n-space>
          </n-radio-group>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card :title="$t('step.modelWell')">
          <n-radio-group
            v-model:value="formData.wellModel"
            class="radioGroup"
            :on-update:value="
              (value: string) => {
                formData.wellModel = value;
                if (
                  value === 'Fractured horizontal + SRVB' ||
                  value === 'Fractured horizontal + Trilinear'
                ) {
                  formData.wellboreStorage = null;
                  formData.reservoirModel = null;
                  formData.boundaryModel = null;
                }
              }
            "
          >
            <n-space vertical justify="start">
              <n-radio-button
                v-for="item in wellModelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </n-space>
          </n-radio-group> </n-card
      ></n-grid-item>
      <n-grid-item>
        <n-card :title="$t('step.modelReservoir')">
          <n-radio-group
            v-model:value="formData.reservoirModel"
            class="radioGroup"
            :disabled="
              formData.wellModel === 'Fractured horizontal + SRVB' ||
              formData.wellModel === 'Fractured horizontal + Trilinear'
            "
          >
            <n-space vertical justify="start">
              <n-radio-button
                v-for="item in reservoirModelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </n-space>
          </n-radio-group> </n-card
      ></n-grid-item>
      <n-grid-item>
        <n-card :title="$t('step.modelBoundary')">
          <n-radio-group
            v-model:value="formData.boundaryModel"
            class="radioGroup"
            :disabled="
              formData.wellModel === 'Fractured horizontal + SRVB' ||
              formData.wellModel === 'Fractured horizontal + Trilinear'
            "
          >
            <n-space vertical justify="start">
              <n-radio-button
                v-for="item in boundaryModelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </n-space>
          </n-radio-group> </n-card
      ></n-grid-item>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const formData = defineModel({
  type: Object,
  default: {
    wellboreStorage: "Constant",
    wellModel: "Finite radius",
    reservoirModel: "Homogeneous",
    boundaryModel: "Infinite"
  }
});

// 初始模型-Wellbore storage-单选按钮组列表
const wellboreStorageOptions = computed(() => [
  {
    label: t("step.none"),
    value: "None"
  },
  {
    label: t("step.constant"),
    value: "Constant"
  },
  {
    label: t("step.changing"),
    value: "Changing"
  }
]);
// 初始模型-Well model-单选按钮组列表
const wellModelOptions = computed(() => [
  {
    label: t("step.radiusFinite"),
    value: "Finite radius"
  },
  {
    label: t("step.conductivityInfinite"),
    value: "Infinite conductivity fracture"
  },
  {
    label: t("step.conductivityFinit"),
    value: "Finite conductivity fracture"
  },
  {
    label: t("step.entryLimited"),
    value: "Limited entry"
  },
  {
    label: t("step.horizontal"),
    value: "Horizontal"
  },
  {
    label: t("step.horizontalFractured"),
    value: "Fractured horizontal"
  },
  {
    label: t("step.horizontalSRVB"),
    value: "Fractured horizontal + SRVB"
  },
  {
    label: t("step.horizontalTrilinear"),
    value: "Fractured horizontal + Trilinear"
  }
]);
// 初始模型-Reservoir model-单选按钮组列表
const reservoirModelOptions = computed(() => [
  {
    label: t("step.Homogeneous"),
    value: "Homogeneous"
  },
  {
    label: t("step.porosityPSS"),
    value: "Double-porosity PSS"
  },
  {
    label: t("step.porositytransient"),
    value: "Double-porosity transient"
  },
  {
    label: t("step.none"),
    value: "Double permeability"
  },
  {
    label: t("step.compositeRadial"),
    value: "Radial composite"
  }
]);
const boundaryModelOptions = computed(() => [
  {
    label: t("step.infinite"),
    value: "Infinite"
  },
  {
    label: t("step.faultSingle"),
    value: "Single fault"
  },
  {
    label: t("step.faultLeaky"),
    value: "Leaky fault"
  },
  {
    label: t("step.faultsIntersecting"),
    value: "Intersecting faults"
  },
  {
    label: t("step.channel"),
    value: "Channel"
  },
  {
    label: t("step.closed"),
    value: "Closed(circle)"
  },
  {
    label: t("step.rectanglecentered"),
    value: "Rectangle(centered)"
  },
  {
    label: t("step.rectangle"),
    value: "Rectangle"
  },
  {
    label: t("step.constantWeak"),
    value: "Weak constant pressure"
  },
  {
    label: t("step.constantStrong"),
    value: "Strong constant pressure"
  }
]);
</script>

<style scoped lang="scss">
.loglogTools {
  height: 100%;
  display: flex;
  .n-card {
    height: 100%;
    .n-radio-group {
      width: 100%;
      height: 100%;
      .n-space {
        height: 100%;
        background: #fff;
        overflow: hidden;
        overflow-y: auto;
        gap: 0 !important;
        .n-radio-button {
          width: 100%;
          border: none;
          height: 22px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
