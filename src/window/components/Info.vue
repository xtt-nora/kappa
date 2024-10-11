<template>
  <n-form
    ref="formRef"
    :model="formData"
    label-placement="left"
    label-width="auto"
    label-align="right"
    :rules="rules"
  >
    <div class="outside">
      <n-form-item :label="$t('step.name')" path="name">
        <n-input v-model:value="formData.name"></n-input>
      </n-form-item>
      <n-form-item :label="$t('step.type')">
        <n-radio-group v-model:value="formData.type">
          <n-radio value="standard">
            {{ $t("step.standard") }}
          </n-radio>
          <n-radio value="interference">
            {{ $t("step.interference") }}
          </n-radio>
          <n-radio value="minifrac">
            {{ $t("step.minifrac") }}
          </n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item
        v-show="formData.type !== 'interference'"
        :label="$t('step.refer')"
      >
        <n-select
          v-model:value="formData.referenceWell"
          :options="[]"
          disabled
        ></n-select>
      </n-form-item>
      <n-form-item
        v-show="formData.type === 'interference'"
        :label="$t('step.active')"
      >
        <n-select
          v-model:value="formData.activeWell"
          :options="[]"
          disabled
        ></n-select>
      </n-form-item>
      <n-form-item
        v-show="formData.type === 'interference'"
        :label="$t('step.obser')"
      >
        <n-select
          v-model:value="formData.observationWell"
          :options="[]"
          disabled
        ></n-select>
      </n-form-item>
      <n-form-item :label="$t('step.multiLayer')">
        <n-checkbox
          :disabled="formData.type === 'minifrac'"
          v-model:checked="formData.multiLayer"
          style="margin-right: 12px"
        >
        </n-checkbox>
        <n-button
          text
          :disabled="!formData.multiLayer"
          @click="showLayerInfomation = true"
        >
          <SvgIcon name="AddL" size="32"></SvgIcon>
        </n-button>
      </n-form-item>
    </div>
    <n-card :title="$t('step.testParameter')">
      <n-form-item :label="$t('step.radius')" path="wellRadius">
        <n-input-group>
          <n-input v-model:value="formData.wellRadius" />
          <n-popselect
            v-model:value="formData.wellRadiusUnit"
            :options="unitOptions"
            trigger="click"
          >
            <n-button>{{ formData.wellRadiusUnit }}</n-button>
          </n-popselect>
        </n-input-group>
      </n-form-item>
      <n-form-item :label="$t('step.pay')" path="payZone">
        <n-input-group>
          <n-input v-model:value="formData.payZone" />
          <n-popselect
            v-model:value="formData.payZoneUnit"
            :options="unitOptions"
            trigger="click"
          >
            <n-button>{{ formData.payZoneUnit }}</n-button>
          </n-popselect>
        </n-input-group>
      </n-form-item>
      <n-form-item :label="$t('step.rock')" path="rockCompressibility">
        <n-input-group>
          <n-input v-model:value="formData.rockCompressibility" />
          <n-popselect
            v-model:value="formData.rockCompressibiltyUnit"
            :options="unitOptions"
            trigger="click"
          >
            <n-button>{{ formData.rockCompressibiltyUnit }}</n-button>
          </n-popselect>
        </n-input-group>
      </n-form-item>
      <n-form-item
        v-show="formData.type === 'interference'"
        :label="$t('step.wellDistance')"
        path="wellDistance"
      >
        <n-input-group>
          <n-input v-model:value="formData.wellDistance" />
          <n-popselect
            v-model:value="formData.wellDistanceUnit"
            :options="unitOptions"
            trigger="click"
          >
            <n-button>{{ formData.wellDistanceUnit }}</n-button>
          </n-popselect>
        </n-input-group>
      </n-form-item>
      <n-form-item
        v-show="formData.type !== 'interference'"
        :label="$t('step.porosity')"
        path="porosity"
      >
        <n-input v-model:value="formData.porosity" placeholder="请输入孔隙度" />
      </n-form-item>
      <n-form-item :label="$t('step.top')" path="topReservoirDepth">
        <n-input-group>
          <n-input v-model:value="formData.topReservoirDepth" />
          <n-popselect
            v-model:value="formData.topReservoirDepthUnit"
            :options="unitOptions"
            trigger="click"
          >
            <n-button>{{ formData.topReservoirDepthUnit }}</n-button>
          </n-popselect>
        </n-input-group>
      </n-form-item>
    </n-card>
  </n-form>
  <LayerInfomation v-model="showLayerInfomation" />
</template>

<script setup lang="ts">
import { FormInst } from "naive-ui";
import { reactive, ref } from "vue";
import LayerInfomation from "@/window/LayerInfomation/index.vue";

const showLayerInfomation = ref(false);

const formRef = ref<FormInst | null>(null);

const rules = reactive({
  name: {
    required: true,
    message: "请输入姓名",
    trigger: "blur"
  }
});

const formData = defineModel({
  type: Object,
  default: {
    name: "Analysis 1",
    type: "standard",
    multiLayer: false,
    referenceWell: "Tested Well",
    activeWell: "Active Well",
    observationWell: "Observation well",
    wellRadius: "3.60000",
    wellRadiusUnit: "in",
    payZone: "30.0000",
    payZoneUnit: "ft",
    rockCompressibility: "3.0000E-6",
    rockCompressibiltyUnit: "psi",
    porosity: "0.1",
    topReservoirDepth: "6000.00",
    topReservoirDepthUnit: "ft",
    wellDistance: "2000.00",
    wellDistanceUnit: "ft"
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

defineExpose({
  formRef
});
</script>

<style scoped lang="scss">
.n-form {
  .outside {
    padding: 12px;
  }
  .n-form-item {
    width: 60%;
  }
}
</style>
