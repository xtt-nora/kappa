<template>
  <div class="main_card">
    <div>
      <vxe-card :title="$t('step.mainPara')">
        <div>
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item path="temperature">
              <n-checkbox v-model:checked="formData.iscumulative">
                {{ $t("step.useVasquez") }}:
              </n-checkbox>
              <div>
                <SvgIcon name="settingsL" size="16" />
              </div>
            </n-form-item>
            <n-space>
              {{ $t("step.speificGra") }}
              <n-select
                v-model:value="formData.wellboreModelValue"
                size="tiny"
                :options="wellboreModelOptions"
              ></n-select>
              <n-input v-model:value="formData.cumulative" />
              <div>air=1</div>
            </n-space>
            <div class="inlineForm">
              <n-form
                ref="formRef"
                label-width="auto"
                size="small"
                :model="formData"
                require-mark-placement="right-hanging"
                label-placement="left"
              >
                <n-form-item
                  :label="$t('step.pseudoCritical')"
                  path="pseudoCritical"
                >
                  <n-select
                    v-model:value="formData.wellboreModelValue"
                    size="tiny"
                    :options="wellboreModelOptions"
                  ></n-select>
                </n-form-item>
                <n-form-item :label="$t('step.pc')" path="oilGravity">
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
                <n-form-item :label="$t('step.tc')" path="oilGravity">
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
              <n-form
                ref="formRef"
                label-width="auto"
                size="small"
                :model="formData"
                require-mark-placement="right-hanging"
                label-placement="left"
              >
                <n-form-item :label="$t('step.hs')" path="hs">
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
                <n-form-item :label="$t('step.co2')" path="co2">
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
                <n-form-item :label="$t('step.n2')" path="n2">
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
                <n-form-item :label="$t('step.composition')" path="n2">
                  <div>
                    <SvgIcon name="settingsL" size="16" />
                  </div>
                </n-form-item>
              </n-form>
            </div>
          </n-form>
        </div>
      </vxe-card>
    </div>
    <div>
      <vxe-card :title="$t('step.fluidProp')">
        <n-form
          ref="formRef"
          label-width="auto"
          size="small"
          style="width: 83%; margin: 10px"
          :model="formData"
          require-mark-placement="right-hanging"
          label-placement="left"
        >
          <div>
            <n-form-item :label="$t('step.waterComCw')" path="compressZ">
              <n-select
                v-model:value="formData.wellboreModelValue"
                size="tiny"
                :options="wellboreModelOptions"
              ></n-select>
            </n-form-item>
            <n-form-item :label="$t('step.waterVolumeBw')" path="formationBg">
              <n-space>
                <n-select
                  v-model:value="formData.wellboreModelValue"
                  size="tiny"
                  :options="wellboreModelOptions"
                ></n-select>
              </n-space>
            </n-form-item>
            <n-form-item :label="$t('step.waterVisW')" path="viscosiG">
              <n-select
                v-model:value="formData.wellboreModelValue"
                size="tiny"
                :options="wellboreModelOptions"
              ></n-select>
            </n-form-item>
          </div>
        </n-form>
      </vxe-card>
    </div>
    <div>
      <vxe-card :title="$t('step.themProp')">
        <n-form
          ref="formRef"
          label-width="auto"
          size="small"
          inline
          :model="formData"
          require-mark-placement="right-hanging"
          label-placement="left"
        >
          <n-space>
            <n-form-item :label="$t('step.waterHeat')" path="oilGravity">
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
            <n-form-item :label="$t('step.waterThermal')" path="oilGravity">
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
          </n-space>
        </n-form>
      </vxe-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const obj = defineModel({
  type: Object,
  default: {
    showModal: false,
    pvt: "singlePhase",
    referenceFluid: "oil"
  }
});
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
</script>
<style lang="scss" scoped>
.inlineForm {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
