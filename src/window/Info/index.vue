<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.analysisInform')"
    width="700"
    height="auto"
  >
    <div class="analysisInform">
      <div class="analysisInform-card">
        <n-tabs type="card" v-model:value="tabValue">
          <n-tab key="info" :name="$t('menu.info')"></n-tab>
          <n-tab key="comments" :name="$t('step.comments')"></n-tab>
        </n-tabs>
        <div class="content">
          <div v-if="tabValue === $t('menu.info')" class="info">
            <n-form
              label-placement="left"
              size="small"
              style="width: 80%"
              label-width="auto"
              label-align="right"
            >
              <n-form-item :label="t('menu.name')">
                <n-input v-model:value="form.name" type="text" />
              </n-form-item>
              <n-form-item :label="t('menu.type')">
                <n-radio-group
                  v-model:value="form.TypeRadioValue"
                  name="radiogroup"
                >
                  <n-radio value="standard">
                    {{ $t("menu.producer") }}
                  </n-radio>
                  <n-radio value="injector">
                    {{ $t("menu.injector") }}
                  </n-radio>
                  <n-radio value="minifrac">
                    {{ $t("step.minifrac") }}
                  </n-radio>
                </n-radio-group>
              </n-form-item>
              <n-form-item
                :label="t('step.refer')"
                v-show="
                  form.TypeRadioValue === 'standard' ||
                  form.TypeRadioValue === 'minifrac'
                "
              >
                <n-select
                  v-model:value="form.refer"
                  :options="referOptions"
                ></n-select>
              </n-form-item>
              <n-form-item
                :label="t('step.active')"
                v-show="form.TypeRadioValue === 'injector'"
              >
                <n-select
                  v-model:value="form.active"
                  :options="activeOptions"
                ></n-select>
              </n-form-item>
              <n-form-item
                :label="t('step.obser')"
                v-show="form.TypeRadioValue === 'injector'"
              >
                <n-select
                  v-model:value="form.obser"
                  :options="obserOptions"
                ></n-select>
              </n-form-item>
              <n-form-item label=" ">
                <n-space justify="space-around">
                  <n-checkbox v-model:checked="form.multi">
                    {{ $t("step.multi") }}
                  </n-checkbox>
                  <div>
                    <SvgIcon name="Frac_DiffSpacingOnL" size="24"></SvgIcon>
                    <SvgIcon name="Frac_DiffSpacingOnL" size="24"></SvgIcon>
                  </div>
                </n-space>
              </n-form-item>
            </n-form>

            <vxe-card :title="$t('step.testParameter')">
              <n-form
                label-placement="left"
                size="small"
                style="width: 80%"
                label-width="auto"
                label-align="right"
              >
                <n-form-item :label="t('menu.wellRadius')">
                  <n-input-group>
                    <n-input v-model:value="form.wellRadius" placeholder=" " />
                    <n-popselect
                      v-model:value="form.wellRadiusUnit"
                      :options="wellRadiusOptions"
                      trigger="click"
                    >
                      <n-button>{{ form.wellRadiusUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-form-item>
                <n-form-item :label="t('step.pay')">
                  <n-input-group>
                    <n-input v-model:value="form.pay" placeholder=" " />
                    <n-popselect
                      v-model:value="form.payUnit"
                      :options="wellRadiusOptions"
                      trigger="click"
                    >
                      <n-button>{{ form.payUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-form-item>
                <n-form-item :label="t('step.rock')">
                  <n-input-group>
                    <n-input v-model:value="form.rock" placeholder=" " />
                    <n-popselect
                      v-model:value="form.rockUnit"
                      :options="rockOptions"
                      trigger="click"
                    >
                      <n-button>{{ form.rockUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-form-item>
                <n-form-item :label="t('menu.porosity')">
                  <n-input v-model:value="form.porosity" placeholder=" " />
                </n-form-item>
                <n-form-item :label="t('step.top')">
                  <n-input-group>
                    <n-input v-model:value="form.top" placeholder=" " />
                    <n-popselect
                      v-model:value="form.topUnit"
                      :options="topOptions"
                      trigger="click"
                    >
                      <n-button>{{ form.topUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-form-item>
              </n-form>
            </vxe-card>
          </div>
          <div v-else class="info">
            <n-input v-model:value="value" type="textarea" placeholder="" />
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
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });

const tabValue = ref(t("menu.info"));
const value = ref("");
const referOptions = [
  {
    label: t("step.refer"),
    value: "referWell"
  }
];
const activeOptions = [
  {
    label: t("step.active"),
    value: "activeWell"
  }
];
const obserOptions = [
  {
    label: t("step.obser"),
    value: "obserWell"
  }
];
const rockOptions = [
  { label: "atmˉ¹", value: "atmˉ¹" },
  { label: "barˉ¹", value: "barˉ¹" },
  { label: "cm²/kg", value: "cm²/kg" },
  { label: "kPaˉ¹", value: "kPaˉ¹" },
  { label: "mˉ¹", value: "mˉ¹" },
  { label: "Mpaˉ¹", value: "Mpaˉ¹" },
  { label: "Paˉ¹", value: "Paˉ¹" },
  { label: "psiˉ¹", value: "psiˉ¹" }
];
const wellRadiusOptions = [
  { label: "0.1 in", value: "0.1 in" },
  { label: "cm", value: "cm" },
  { label: "ft", value: "ft" },
  { label: "in", value: "in" },
  { label: "km", value: "km" },
  { label: "m", value: "m" },
  { label: "mile", value: "mile" },
  { label: "mm", value: "mm" }
];
const topOptions = [
  { label: "0.1 in", value: "0.1 in" },
  { label: "cm", value: "cm" },
  { label: "ft", value: "ft" },
  { label: "in", value: "in" },
  { label: "m", value: "m" }
];
const form = reactive({
  name: "原始",
  TypeRadioValue: "standard",
  refer: "referWell",
  active: "activeWell",
  obser: "obserWell",
  multi: false,
  wellRadius: "0.0889",
  wellRadiusUnit: "m",
  pay: "5.50000",
  payUnit: "m",
  rock: "4.35113E-4",
  rockUnit: "Mpaˉ¹",
  porosity: "0.168",
  top: "5082.00",
  topUnit: "m",
  comments: ""
});
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
