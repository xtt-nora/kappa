<template>
  <div class="stepFive">
    <n-checkbox-group v-model:value="formData.numericalChecked">
      <n-card :title="$t('step.problem')">
        <n-card :title="$t('step.functionalities')">
          <n-space vertical>
            <n-checkbox
              value="nonUniformParameters"
              :label="$t('step.uniformNon')"
            />
            <n-checkbox
              value="verticalAnisotropy"
              :label="$t('step.anisotropyVertical')"
            />
            <n-checkbox
              value="horizontalAnisotropy"
              :label="$t('step.anisotropyHorizontal')"
            />
          </n-space>
        </n-card>
        <n-card :title="$t('step.licenseRubis')">
          <n-space vertical>
            <n-checkbox
              :disabled="
                !formData.numericalChecked.includes('nonUniformParameters') ||
                formData.numericalChecked.includes('loadFromGeomodeler')
              "
              value="loadHorzions"
              :label="$t('step.horizonsLoad')"
            /><n-checkbox
              :disabled="
                !formData.numericalChecked.includes('nonUniformParameters')
              "
              value="loadFromGeomodeler"
              :label="$t('step.fromLoad')"
            /><n-checkbox
              disabled
              value="propertySets"
              :label="$t('step.setsProperty')"
            /><n-checkbox
              value="improveOnMultipleWells"
              :label="$t('step.onImprove')"
            /><n-checkbox
              value="faultsWithThrows"
              :label="$t('step.withFaults')"
            />
          </n-space>
        </n-card>
      </n-card>
      <n-card :title="$t('step.diffusionNonlinear')">
        <n-card :title="$t('step.functionalities')">
          <n-space vertical>
            <n-checkbox
              disabled
              value="useRealPvt"
              :label="$t('step.realPVT')"
            /><n-checkbox
              disabled
              value="nonDarcyFlow"
              :label="$t('step.flowDarcy')"
            /><n-checkbox
              disabled
              value="unconsolidation"
              :label="$t('step.Unconsolidation')"
            /><n-checkbox
              disabled
              value="allowAquifers"
              :label="$t('step.aquifersAllow')"
            /><n-checkbox
              disabled
              value="desorption"
              :label="$t('step.Desorption')"
            /><n-checkbox
              disabled
              value="immobileWater"
              :label="$t('step.waterImmobile')"
            />
          </n-space>
        </n-card>
        <n-card :title="$t('step.licenseRubis')">
          <n-space vertical
            ><n-checkbox
              disabled
              value="temperatureModeling"
              :label="$t('step.modelingTemperature')" /><n-checkbox
              disabled
              value="gravity"
              :label="$t('step.Gravity')" /><n-checkbox
              disabled
              value="confinedPvt"
              :label="$t('step.Confined')"
          /></n-space>
        </n-card>
      </n-card>
    </n-checkbox-group>
  </div>
</template>

<script setup lang="ts">
const formData = defineModel({
  type: Object,
  default: {
    numericalChecked: []
  }
});
</script>

<style scoped lang="scss">
.stepFive {
  height: 100%;
  .n-checkbox-group {
    height: inherit;
    > .n-card {
      height: calc(50% - 6px);
      > :deep(.n-card__content) {
        display: flex;
        > .n-card {
          margin: 0 6px;
        }
      }
    }
    > :nth-child(1) {
      margin-bottom: 12px;
    }
  }
}
</style>
