<template>
  <n-form
    label-placement="left"
    label-width="auto"
    label-align="right"
    ref="formRef"
  >
    <n-card :title="$t('step.linearizedPvtProperties')">
      <n-form-item>
        <n-checkbox v-model:checked="formData.usePseudos" disabled>
          {{ $t("step.usePseudos") }}
        </n-checkbox>
      </n-form-item>

      <n-form-item
        :label="$t('step.formationVolumeFactorB')"
        path="formationVolumeFactorB"
      >
        <n-input-group>
          <n-input v-model:value="formData.formationVolumeFactorB" />
          <n-popselect
            v-model:value="formData.formationVolumeFactorBUnit"
            :options="unitOptions"
            trigger="click"
          >
            <n-button>{{ formData.formationVolumeFactorBUnit }}</n-button>
          </n-popselect>
        </n-input-group>
      </n-form-item>
      <n-form-item :label="$t('step.viscosity')" path="viscosity">
        <n-input-group>
          <n-input v-model:value="formData.viscosity" />
          <n-popselect
            v-model:value="formData.viscosityUnit"
            :options="unitOptions"
            trigger="click"
          >
            <n-button>{{ formData.viscosityUnit }}</n-button>
          </n-popselect>
        </n-input-group>
      </n-form-item>
    </n-card>
    <n-card :title="$t('step.totalCompressibility')">
      <n-form-item
        :label="$t('step.totalCompressibilityCt')"
        path="totalCompressibilityCt"
      >
        <n-input-group>
          <n-input v-model:value="formData.totalCompressibilityCt" />
          <n-popselect
            v-model:value="formData.totalCompressibilityCtUnit"
            :options="unitOptions"
            trigger="click"
          >
            <n-button>{{ formData.totalCompressibilityCtUnit }}</n-button>
          </n-popselect>
        </n-input-group>
        <IconButton name="AddL" size="32"></IconButton>
      </n-form-item>
      <n-form-item :label="$t('step.sw')" path="sw">
        <n-input-group>
          <n-input v-model:value="formData.sw" />
          <n-popselect
            v-model:value="formData.swUnit"
            :options="unitOptions"
            trigger="click"
          >
            <n-button>{{ formData.swUnit }}</n-button>
          </n-popselect>
        </n-input-group>
      </n-form-item>
    </n-card>
    <n-card :title="$t('step.multiphaseFlow')">
      <n-form-item>
        <n-checkbox v-model:checked="formData.usePerrine" disabled>
          {{ $t("step.usePerrine") }}
        </n-checkbox>
      </n-form-item>
      <n-form-item>
        <n-checkbox v-model:checked="formData.useKr" disabled>
          {{ $t("step.useKr") }}
        </n-checkbox>
        <IconButton name="AddL" size="32" disabled></IconButton>
      </n-form-item>
    </n-card>
  </n-form>
</template>

<script setup lang="ts">
const formData = defineModel({
  type: Object,
  default: {
    usePseudos: false,
    formationVolumeFactorB: "1.00000",
    formationVolumeFactorBUnit: "B/STB",
    viscosity: "1.0000",
    viscosityUnit: "cp",
    totalCompressibilityCt: "3.00000E-6",
    totalCompressibilityCtUnit: "psi",
    sw: "0.00000",
    swUnit: "Fraction",
    usePerrine: false,
    useKr: false
  }
});

const unitOptions = [
  { label: "m", value: "m" },
  { label: "cm", value: "cm" },
  { label: "mm", value: "mm" },
  { label: "in", value: "in" },
  { label: "0.1in", value: "0.1in" },
  { label: "ft", value: "ft" },
  { label: "mile", value: "mile" },
  { label: "km", value: "km" }
];
</script>

<style scoped lang="scss">
.n-form {
  .n-card {
    margin-bottom: 12px;
    :deep(.n-card__content) {
      @include flex-column;
    }
  }
  .n-form-item {
    width: 60%;
  }
}
</style>
