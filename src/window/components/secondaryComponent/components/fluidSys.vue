<template>
  <!-- <vxe-card> {{ $t("menu.main") }} </vxe-card> -->
  <div class="main_card">
    <div class="main_top">
      <vxe-card :title="$t('step.fluidType')">
        <n-form
          ref="formRef"
          label-width="auto"
          size="small"
          style="width: 90%; margin: 10px"
          :model="formData"
          require-mark-placement="right-hanging"
          label-placement="left"
        >
          <n-form-item>
            <n-checkbox v-model:checked="formData.iscumulative">
              {{ $t("step.og") }}:
            </n-checkbox>
          </n-form-item>
          <n-radio-group v-model:value="formData.isPositive" name="radiogroup">
            <n-form-item>
              <n-space>
                <n-radio value="trans">
                  {{ $t("step.dry") }}
                </n-radio>
                <n-select
                  v-model:value="formData.wellboreModelValue"
                  size="tiny"
                  :options="wellboreModelOptions"
                ></n-select>
              </n-space>
            </n-form-item>
            <n-form-item>
              <n-radio value="wet">
                {{ $t("step.wet") }}
              </n-radio>
            </n-form-item>
            <n-form-item>
              <n-radio value="dead">
                {{ $t("step.dead") }}
              </n-radio>
            </n-form-item>
            <n-form-item>
              <n-radio value="saturated">
                {{ $t("step.saturated") }}
              </n-radio>
            </n-form-item>
            <n-form-item>
              <n-radio value="volatileOil">
                {{ $t("step.volatileOil") }}
              </n-radio>
            </n-form-item>
            <n-form-item>
              <n-radio value="condensate">
                {{ $t("step.condensate") }}
              </n-radio>
            </n-form-item>
            <n-form-item>
              <n-checkbox v-model:checked="formData.iscumulative">
                {{ $t("step.defineLab") }}:
              </n-checkbox>
            </n-form-item>
            <n-form-item>
              <n-radio value="equationOS">
                {{ $t("step.equationOS") }}
              </n-radio>
            </n-form-item>
          </n-radio-group>
        </n-form>
      </vxe-card>
      <vxe-card :title="$t('step.referenceParam')">
        <n-form
          ref="formRef"
          label-width="auto"
          size="small"
          style="width: 80%; margin: 10px"
          :model="formData"
          require-mark-placement="right-hanging"
          label-placement="left"
        >
          <n-form-item :label="$t('menu.pressure')" path="pressure">
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
          <n-form-item :label="$t('step.temperature')" path="temperature">
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
        </n-form>
      </vxe-card>
    </div>
    <div>
      <vxe-card :title="$t('step.variableRanges')">
        <n-form
          ref="formRef"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="small"
          style="width: 80%; margin: 10px"
          :model="formData"
        >
          <n-form-item label="  " path="viscosity">
            <n-input-group>
              <n-input placeholder="Minimum" disabled />
              <n-input placeholder="Maximum" disabled />
              <n-input placeholder="Increment" disabled />
            </n-input-group>
          </n-form-item>
          <n-form-item :label="$t('menu.pressure')" path="viscosity">
            <n-input-group>
              <n-input v-model:value="formData.viscosity" />
              <n-input v-model:value="formData.viscosity" />
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
          <n-form-item :label="$t('step.temperature')" path="viscosity">
            <n-input-group>
              <n-input v-model:value="formData.viscosity" />
              <n-input v-model:value="formData.viscosity" />
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
          <n-form-item :label="$t('step.increment')" path="viscosity">
            <n-form-item>
              <n-radio-group
                v-model:value="formData.viscosity"
                name="radiogroup"
              >
                <n-space>
                  <n-radio value="trans"> {{ $t("step.point") }}: </n-radio>
                  <n-input v-model:value="formData.viscosity" />
                  <n-radio value="sf"> {{ $t("menu.value") }}: </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
          </n-form-item>
        </n-form>
      </vxe-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const wellboreModelOptions = [
  { label: t("menu.none"), value: "none" },
  { label: t("menu.constant"), value: "constant" },
  { label: t("menu.changingHegeman"), value: "changingHegeman" },
  { label: t("menu.changingFair"), value: "changingFair" },
  { label: t("menu.changingSpiveyPacker"), value: "changingSpiveyPacker" },
  { label: t("menu.changingSpiveyFissures"), value: "changingSpiveyFissures" },
  { label: t("menu.timeDependentModel"), value: "timeDependentModel" },
  { label: t("menu.none"), value: "none" }
];
const formData = reactive({
  C: "0.2",
  wellboreModelValue: "changingHegeman",
  iscumulative: true,
  isnumberOfRates: false,
  isPositive: false,
  cumulative: "-1.80864E+5",
  numberOfRates: "10",
  timePickedUnit: "bbl/psi",
  cumUnit: "STB",
  original: "102",
  result: "N/A",
  strategyValue: "1",
  viscosity: "1.0000",
  viscosityUnit: "cp"
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
<style lang="scss" scoped>
.main_top {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
