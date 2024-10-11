<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.pvtAndDiffusion')"
    width="762"
    height="auto"
  >
    <div class="analysisInform">
      <div class="analysisInform-card">
        <n-tabs type="card" v-model:value="tabValue">
          <n-tab
            key="pvtAndDiffusion"
            :tab="$t('menu.pvtAndDiffusion')"
            name="1"
          ></n-tab>
          <n-tab
            key="analyticalModel"
            :tab="$t('menu.analyticalModel')"
            :disabled="form.define"
            name="2"
          ></n-tab>
          <n-tab
            key="numericalModel"
            :tab="$t('menu.numericalModel')"
            name="3"
          ></n-tab>
        </n-tabs>
        <div class="content">
          <div v-if="tabValue === '1'" class="info">
            <vxe-card :title="$t('step.pvt')">
              <n-form
                label-placement="left"
                size="small"
                style="width: 80%"
                label-width="auto"
                label-align="right"
                :model="form"
              >
                <n-form-item label=" ">
                  <n-radio-group
                    :value="form.phase"
                    name="radiogroup"
                    :on-update:value="handleUpdateOptions"
                  >
                    <n-radio value="single">
                      {{ $t("step.single") }}
                    </n-radio>
                    <n-radio value="multiphase">
                      {{ $t("step.multiphase") }}
                    </n-radio>
                  </n-radio-group>
                </n-form-item>
                <n-form-item :label="t('step.referencefluid')">
                  <n-select
                    v-model:value="form.referencefluid"
                    size="tiny"
                    :options="referencefluidOptions"
                  />
                </n-form-item>
                <n-form-item label=" ">
                  <n-space justify="space-around">
                    <n-checkbox v-model:checked="form.define">
                      {{ $t("step.define") }}
                    </n-checkbox>
                    <div>
                      <SvgIcon name="Frac_DiffSpacingOnL" size="24"></SvgIcon>
                    </div>
                  </n-space>
                </n-form-item>
              </n-form>
            </vxe-card>
            <vxe-card :title="$t('step.diffusion')">
              <n-form
                label-placement="left"
                size="small"
                style="width: 80%"
                label-width="auto"
                label-align="right"
              >
                <n-form-item label=" ">
                  <n-space justify="space-around">
                    <n-checkbox v-model:checked="form.permeability">
                      {{ $t("step.permeability") }}
                    </n-checkbox>
                    <div>
                      <SvgIcon name="Frac_DiffSpacingOnL" size="24"></SvgIcon>
                    </div>
                  </n-space>
                </n-form-item>
                <n-form-item label=" ">
                  <n-space justify="space-around">
                    <n-checkbox v-model:checked="form.Unconsolidation">
                      {{ $t("step.Unconsolidation") }}
                    </n-checkbox>
                    <div>
                      <SvgIcon name="Frac_DiffSpacingOnL" size="24"></SvgIcon>
                    </div>
                  </n-space>
                </n-form-item>
                <n-form-item label=" ">
                  <n-space justify="space-around">
                    <n-checkbox v-model:checked="form.Desorption">
                      {{ $t("step.Desorption") }}
                    </n-checkbox>
                    <div>
                      <SvgIcon name="Frac_DiffSpacingOnL" size="24"></SvgIcon>
                    </div>
                  </n-space>
                </n-form-item>
              </n-form>
            </vxe-card>
            <vxe-card v-if="form.define">
              <div>{{ $t("step.advanced") }}</div>
            </vxe-card>
          </div>
          <div v-else-if="tabValue === '2'" class="info">
            <vxe-card :title="$t('step.linear')">
              <n-form
                label-placement="left"
                size="small"
                style="width: 80%"
                label-width="auto"
                label-align="right"
                :model="form"
              >
                <n-form-item label=" ">
                  <n-checkbox v-model:checked="form.pseudos">
                    {{ $t("step.pseudos") }}
                  </n-checkbox>
                </n-form-item>
                <n-form-item :label="t('step.volume')">
                  <n-input-group>
                    <n-input v-model:value="form.volume" placeholder=" " />
                    <n-popselect
                      v-model:value="form.volumeUnit"
                      :options="volumeOptions"
                      trigger="click"
                    >
                      <n-button>{{ form.volumeUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-form-item>
                <n-form-item :label="t('step.viscosity')">
                  <n-input-group>
                    <n-input v-model:value="form.viscosity" placeholder=" " />
                    <n-popselect
                      v-model:value="form.viscosityUnit"
                      :options="viscosityOptions"
                      trigger="click"
                    >
                      <n-button>{{ form.viscosityUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-form-item>
              </n-form>
            </vxe-card>
            <vxe-card :title="$t('step.compressib')">
              <n-form
                label-placement="left"
                size="small"
                style="width: 80%"
                label-width="auto"
                label-align="right"
                :model="form"
              >
                <n-form-item :label="t('step.total')">
                  <n-space justify="space-around">
                    <n-input-group>
                      <n-input v-model:value="form.total" placeholder=" " />
                      <n-popselect
                        v-model:value="form.totalUnit"
                        :options="totalOptions"
                        trigger="click"
                      >
                        <n-button>{{ form.totalUnit }}</n-button>
                      </n-popselect>
                    </n-input-group>
                    <SvgIcon name="Frac_DiffSpacingOnL" size="24"></SvgIcon>
                  </n-space>
                </n-form-item>
              </n-form>
            </vxe-card>
            <vxe-card :title="$t('step.flowMultiphase')">
              <n-form
                label-placement="left"
                size="small"
                style="width: 80%"
                label-width="auto"
                label-align="right"
                :model="form"
              >
                <n-form-item label=" ">
                  <n-checkbox v-model:checked="form.Perrine">
                    {{ $t("step.Perrine") }}
                  </n-checkbox>
                </n-form-item>
                <n-form-item label=" ">
                  <n-space justify="space-around">
                    <n-checkbox v-model:checked="form.Kr">
                      {{ $t("step.Kr") }}
                    </n-checkbox>
                    <SvgIcon name="Frac_DiffSpacingOnL" size="24"></SvgIcon>
                  </n-space>
                </n-form-item>
              </n-form>
            </vxe-card>
          </div>
          <div v-else class="info">
            <vxe-card :title="$t('step.problem')">
              <div class="con">
                <div class="left">
                  <vxe-card height="100%" :title="$t('step.functionalities')">
                    <n-form
                      label-placement="left"
                      size="small"
                      style="width: 80%"
                      label-width="auto"
                      label-align="right"
                      :model="form"
                    >
                      <n-form-item label=" ">
                        <n-checkbox-group v-model:value="form.promblemCom">
                          <n-space item-style="display: flex;">
                            <n-checkbox
                              v-for="item in promblemComList"
                              :value="item.value"
                              :label="item.label"
                            />
                          </n-space>
                        </n-checkbox-group>
                      </n-form-item>
                    </n-form>
                  </vxe-card>
                </div>
                <div class="right">
                  <vxe-card height="100%" :title="$t('step.functionalities')">
                    <n-form
                      label-placement="left"
                      size="small"
                      style="width: 80%"
                      label-width="auto"
                      label-align="right"
                      :model="form"
                    >
                      <n-form-item label=" ">
                        <n-checkbox-group v-model:value="form.rubis">
                          <n-space item-style="display: flex;">
                            <n-checkbox
                              v-for="item in rubisList"
                              :value="item.value"
                              :label="item.label"
                              :disabled="item.disabled"
                            />
                          </n-space>
                        </n-checkbox-group>
                      </n-form-item>
                    </n-form>
                  </vxe-card>
                </div>
              </div>
            </vxe-card>
            <vxe-card :title="$t('step.diffusionNonlinear')">
              <div class="con">
                <div class="left">
                  <vxe-card height="100%" :title="$t('step.functionalities')">
                    <n-form
                      label-placement="left"
                      size="small"
                      style="width: 50%"
                      label-width="auto"
                      label-align="right"
                      :model="form"
                    >
                      <n-form-item label=" ">
                        <n-checkbox-group v-model:value="form.fun">
                          <n-space item-style="display: flex;">
                            <n-checkbox
                              v-for="item in funList"
                              :value="item.value"
                              :label="item.label"
                              :disabled="item.disabled"
                            />
                          </n-space>
                        </n-checkbox-group>
                      </n-form-item>
                    </n-form>
                  </vxe-card>
                </div>
                <div class="right">
                  <vxe-card height="100%" :title="$t('step.licenseRubis')">
                    <n-form
                      label-placement="left"
                      size="small"
                      style="width: 50%"
                      label-width="auto"
                      label-align="right"
                      :model="form"
                    >
                      <n-form-item label=" ">
                        <n-checkbox-group v-model:value="form.rub">
                          <n-space item-style="display: flex;">
                            <n-checkbox
                              v-for="item in rubList"
                              :value="item.value"
                              :label="item.label"
                              :disabled="item.disabled"
                            />
                          </n-space>
                        </n-checkbox-group>
                      </n-form-item>
                    </n-form>
                  </vxe-card>
                </div>
              </div>
            </vxe-card>
          </div>
        </div>
      </div>
      <div class="analysisInform-button">
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });
const tabValue = ref("1");
const form = reactive({
  phase: "single",
  referencefluid: "Water",
  define: false,
  permeability: false,
  Unconsolidation: false,
  Desorption: false,

  pseudos: false,
  volume: "1.02124",
  volumeUnit: "m³/stm³",
  viscosity: "0.449891",
  viscosityUnit: "cp",

  total: "7.417122E-4",
  totalUnit: "Mpaˉ¹",

  Perrine: false,
  Kr: false,
  promblemCom: ["vanisotropy"],
  rubis: [],
  fun: [],
  rub: []
});
const referencefluidOptions = ref([
  { label: "Oil", value: "Oil" },
  { label: "Gas", value: "Gas" },
  { label: "Water", value: "Water" }
]);
const volumeOptions = [
  { label: "B/STB", value: "B/STB" },
  { label: "cf/STB", value: "cf/STB" },
  { label: "m³/stm³", value: "m³/stm³" }
];
const viscosityOptions = [
  { label: "μPa.sec", value: "μPa.sec" },
  { label: "cp", value: "cp" },
  { label: "Pa.sec", value: "Pa.sec" }
];
const totalOptions = [
  { label: "atmˉ¹", value: "atmˉ¹" },
  { label: "barˉ¹", value: "barˉ¹" },
  { label: "cm²/kg", value: "cm²/kg" },
  { label: "kPaˉ¹", value: "kPaˉ¹" },
  { label: "mˉ¹", value: "mˉ¹" },
  { label: "Mpaˉ¹", value: "Mpaˉ¹" },
  { label: "Paˉ¹", value: "Paˉ¹" },
  { label: "psiˉ¹", value: "psiˉ¹" }
];
const handleUpdateOptions = (value: string) => {
  // console.log(value);
  form.phase = value;
  referencefluidOptions.value =
    value === "single"
      ? [
          { label: "Oil", value: "Oil" },
          { label: "Gas", value: "Gas" },
          { label: "Water", value: "Water" }
        ]
      : [
          { label: "Oil", value: "Oil" },
          { label: "Water", value: "Water" }
        ];
};
const promblemComList = [
  { label: t("step.uniformNon"), value: "parameters" },
  { label: t("step.anisotropyVertical"), value: "vanisotropy" },
  { label: t("step.anisotropyHorizontal"), value: "hanisotropy" }
];
const rubisList = ref([
  {
    label: t("step.horizonsLoad"),
    value: "horizons"
  },
  {
    label: t("step.fromLoad"),
    value: "geomodeler"
  },
  {
    label: t("step.setsProperty"),
    value: "sets",
    disabled: true
  },
  { label: t("step.onImprove"), value: "well" },
  { label: t("step.withFaults"), value: "throws" }
]);
const funList = [
  { label: t("step.realPVT"), value: "realPvt", disabled: true },
  { label: t("step.flowDarcy"), value: "flow", disabled: true },
  { label: t("step.Unconsolidation"), value: "solidation", disabled: true },
  { label: t("step.aquifersAllow"), value: "aquifers", disabled: true },
  { label: t("step.Desorption"), value: "sorption", disabled: true },
  { label: t("step.waterImmobile"), value: "water", disabled: true }
];
const rubList = [
  { label: t("step.modelingTemperature"), value: "modeling", disabled: true },
  { label: t("step.Gravity"), value: "gravity", disabled: true },
  { label: t("step.Confined"), value: "Confined", disabled: true }
];
watch(
  [() => form.promblemCom, () => form.rubis],
  ([newX, newY]) => {
    // console.log(newX);
    rubisList.value = [
      {
        label: t("step.horizonsLoad"),
        value: "horizons",
        disabled: !newX.includes("parameters") || newY.includes("geomodeler")
      },
      {
        label: t("step.fromLoad"),
        value: "geomodeler",
        disabled: !newX.includes("parameters")
      },
      {
        label: t("step.setsProperty"),
        value: "sets",
        disabled: true
      },
      { label: t("step.onImprove"), value: "well" },
      { label: t("step.withFaults"), value: "throws" }
    ];
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
.analysisInform {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dialogBg;
  &-card {
    .content {
      min-height: 520px;
      border: 1px solid $dialogBorder;
      border-top: none;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      height: 97%;
      .info {
        width: 96%;
        height: 100%;
        margin: 2%;
      }
      .con {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        .left,
        .right {
          width: calc(50% - 10px);
          height: 100%;
        }
      }
    }
  }
  &-button {
    display: inline-block;
    padding: 12px;
    box-sizing: border-box;

    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
}
::v-deep .n-input.n-input--textarea {
  width: 100%;
  height: 97%;
}
</style>
