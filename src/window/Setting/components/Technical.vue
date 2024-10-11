<template>
  <n-form
    label-placement="left"
    :model="formValue"
    label-width="auto"
    label-align="left"
  >
    <n-tabs type="card" size="small" v-model:value="selectedKey">
      <n-tab-pane :tab="$t('menu.skin')" name="technical_skin">
        <n-form-item>
          <n-radio-group v-model:value="formValue.skin" name="radiogroup">
            <n-space>
              <n-radio value="alwaysSkin">
                {{ $t("menu.alwaysSkin") }}
              </n-radio>
              <n-text class="tip" tag="div">{{
                $t("menu.alwaysSkinTip")
              }}</n-text>
              <n-radio value="changeGeometry">
                {{ $t("menu.changeGeometry") }}
              </n-radio>
              <n-text
                class="tip"
                tag="div"
                :depth="formValue.skin === 'alwaysSkin' ? 3 : 1"
                >{{ $t("menu.alwaysSkinTip") }}</n-text
              >
              <n-checkbox
                class="tip"
                :disabled="formValue.skin === 'alwaysSkin'"
                v-model:checked="formValue.alwaysFractures"
                >{{ $t("menu.alwaysFractures") }}</n-checkbox
              >
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item>
          <n-checkbox v-model:checked="formValue.geometricalSkinComponents">
            {{ $t("menu.changeGeometryTip") }}
          </n-checkbox>
        </n-form-item>
      </n-tab-pane>
      <n-tab-pane
        :tab="$t('menu.criticalParameters')"
        name="technical_criticalParameters"
      >
        <n-form-item>
          <n-radio-group
            v-model:value="formValue.criticalParameters"
            name="radiogroup"
          >
            <n-space vertical>
              <n-radio value="doNotHighlightDefaultValues">
                {{ $t("menu.doNotHighlightDefaultValues") }}
              </n-radio>
              <n-radio value="highlightDefaultValues">
                {{ $t("menu.highlightDefaultValues") }}
              </n-radio>
              <n-radio value="forceInput">
                {{ $t("menu.forceInput") }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
      </n-tab-pane>
      <n-tab-pane
        :tab="$t('menu.externalModels')"
        name="technical_externalModels"
      >
        <n-form-item
          class="uploadForm"
          label-placement="top"
          :label="$t('menu.externalModelsDirectory')"
        >
          <n-input v-model:value="formValue.externalModelsDirectory"></n-input>
          <n-upload action="" :show-file-list="false">
            <n-button size="small">
              <template #icon>
                <SvgIcon name="folderS" size="16"></SvgIcon>
              </template>
            </n-button>
          </n-upload>
        </n-form-item>
      </n-tab-pane>
      <n-tab-pane
        :tab="$t('menu.externalPressureDropCorrelations')"
        name="technical_externalPressureDropCorrelations"
      >
        <n-form-item
          class="uploadForm"
          label-placement="top"
          :label="$t('menu.externalPressureDropCorrelationsDirectory')"
        >
          <n-input
            v-model:value="formValue.externalPressureDropCorrelationsDirectory"
          ></n-input>
          <n-upload action="" :show-file-list="false">
            <n-button size="small">
              <template #icon>
                <SvgIcon name="folderS" size="16"></SvgIcon>
              </template>
            </n-button>
          </n-upload>
        </n-form-item>
      </n-tab-pane>
      <n-tab-pane
        :tab="$t('menu.results')"
        name="technical_results"
        class="doubleCard"
      >
        <n-card :title="$t('menu.productivityIndexAndRelated')">
          <n-checkbox-group
            v-model:value="formValue.productivityIndexAndRelated"
          >
            <n-space vertical>
              <n-checkbox
                value="realProductivityIndexPiReal"
                :label="$t('menu.realProductivityIndexPiReal')"
              />
              <n-checkbox
                value="idealProductivityIndexPiIdeal"
                :label="$t('menu.idealProductivityIndexPiIdeal')"
              />
              <n-checkbox
                value="flowEfficiencyFe"
                :label="$t('menu.flowEfficiencyFe')"
              />
              <n-checkbox
                value="damageRatioDr"
                :label="$t('menu.damageRatioDr')"
              />
            </n-space>
          </n-checkbox-group>
        </n-card>
        <n-card :title="$t('menu.calculatedAt')">
          <n-checkbox-group
            v-model:value="formValue.productivityIndexAndRelated"
          >
            <n-space vertical>
              <n-checkbox value="pi" :label="$t('menu.pi')" />
              <n-checkbox value="pAll" :label="$t('menu.pAll')" />
              <n-checkbox value="pAt72Hours" :label="$t('menu.pAt72Hours')" />
              <n-checkbox value="pAverage" :label="$t('menu.pAverage')" />
              <n-checkbox
                value="pAt1HourData"
                :label="$t('menu.pAt1HourData')"
              />
              <n-checkbox
                value="pEndOfRadial"
                :label="$t('menu.pEndOfRadial')"
              />
            </n-space>
          </n-checkbox-group>
        </n-card>
      </n-tab-pane>
      <n-tab-pane
        :tab="$t('menu.extraction')"
        name="technical_extraction"
        class="singleCard"
      >
        <n-card title="p@dt = 0">
          <n-form-item>
            <n-checkbox value="showWarning" :label="$t('menu.showWarning')" />
          </n-form-item>
          <n-form-item
            :label="$t('menu.warningTolerance')"
            label-width="auto"
            class="result"
          >
            <n-input-group>
              <n-input
                v-model:value="formValue.warningTolerance"
                placeholder=" "
              />
              <n-popselect
                v-model:value="formValue.warningToleranceUnit"
                :options="xUnitOptions"
                trigger="click"
              >
                <n-button>{{ formValue.warningToleranceUnit }}</n-button>
              </n-popselect>
            </n-input-group>
          </n-form-item>
          <n-form-item :label="$t('menu.maximumTimeIntervalRadio')">
            <n-input
              v-model:value="formValue.maximumTimeIntervalRadio"
              :label="$t('menu.maximumTimeIntervalRadio')"
            />
          </n-form-item>
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </n-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const selectedKey = defineModel({
  type: String,
  default: ""
});

const formValue = reactive({
  skin: "alwaysSkin",
  geometricalSkinComponents: false,
  alwaysFractures: false,
  criticalParameters: "forceInput",
  externalModelsDirectory: "",
  externalPressureDropCorrelationsDirectory: "",
  productivityIndexAndRelated: "",
  showWarning: false,
  warningTolerance: "30.0000",
  warningToleranceUnit: "sec",
  maximumTimeIntervalRadio: "10"
});

const xUnitOptions = [
  { label: "ms", value: "ms" },
  { label: "sec", value: "sec" },
  { label: "min", value: "min" },
  { label: "hr", value: "hr" },
  { label: "day", value: "213" },
  { label: "Week", value: "Week" },
  { label: "Month", value: "Month" },
  { label: "Year", value: "Year" }
];
</script>

<style scoped lang="scss">
.n-form {
  height: 100%;
  .n-tabs {
    height: 100%;
    .n-tab-pane {
      padding: 12px;
    }
    .n-form-item {
      .tip {
        margin-top: 6px;
        font-size: 12px;
        margin-left: 24px;
      }
    }
    .uploadForm {
      width: 50%;
      .n-upload {
        width: auto;
        height: 22px;
        margin-left: 6px;
      }
    }
    .doubleCard {
      display: flex;
      box-sizing: border-box;
      .n-card {
        max-height: 300px;
      }
      > :first-child {
        margin-right: 12px;
      }
    }
    .singleCard {
      .n-form-item {
        width: 80%;
      }
    }
  }
}
</style>
