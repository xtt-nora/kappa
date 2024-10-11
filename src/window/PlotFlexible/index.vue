<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.flexibleParams')"
    width="460"
    height="auto"
  >
    <div class="result">
      <div class="result-card">
        <div class="content">
          <div class="table">
            <div class="dataTable">
              <vxe-card>
                <CollapseForm
                  :default-expanded-names="['plotType']"
                  :form="collapseForm"
                  class="form"
                />
              </vxe-card>
            </div>
          </div>
        </div>
      </div>
      <div class="result-button">
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import CollapseForm from "@/components/CollapseForm/index.vue";
const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });
const collapseForm = computed(() => [
  {
    title: t("menu.plotType"),
    name: "plotType",
    children: [
      {
        type: "select",
        label: t("menu.plotType"),
        options: [
          { label: t("menu.horner"), value: "horner" },
          { label: t("menu.mdh"), value: "mdh" },
          { label: t("menu.square"), value: "square" },
          { label: t("menu.tandem"), value: "tandem" },
          { label: t("menu.fas"), value: "fas" },
          { label: t("menu.powerLaws"), value: "powerLaws" }
        ],
        value: "horner"
      }
    ]
  },
  {
    title: t("menu.parameters"),
    name: "parameters",
    children: [
      {
        type: "select",
        label: t("menu.timeFun"),
        options: [
          { label: "△t", value: "△t" },
          { label: "Log(△t)", value: "Log(△t)" },
          { label: "✓△t", value: "✓△t" },
          { label: "∛△t", value: "∛△t" },
          { label: "1/✓△t", value: "1/✓△t" }
        ],
        value: "Log(△t)"
      },
      {
        type: "select",
        label: t("menu.superFun"),
        options: [
          { label: t("menu.drawDown"), value: "drawDown" },
          { label: t("menu.bulidUp"), value: "bulidUp" },
          { label: t("menu.multirate"), value: "multirate" },
          { label: t("menu.noScale"), value: "noScale" },
          { label: t("menu.agarwal"), value: "agarwal" }
        ],
        value: "bulidUp"
      },
      {
        type: "group",
        label: t("menu.productionTime"),
        value: "2317.41",
        options: [
          { label: "day", value: "day" },
          { label: "hr", value: "hr" },
          { label: "min", value: "min" },
          { label: "Month", value: "Month" },
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "Week", value: "Week" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "hr"
      },
      {
        type: "select",
        label: t("menu.normalFun"),
        options: [
          { label: "p", value: "p" },
          { label: "△p", value: "△p" }
        ],
        value: "p"
      }
    ]
  }
]);
</script>

<style lang="scss" scoped>
.result {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dialogBg;
  &-card {
    .content {
      min-height: 200px;
      height: 100%;
      border: 1px solid $dialogBorder;
      display: flex;
      .collapse {
        width: 440px;
        padding: 0 4px;
      }
      :deep(.table) {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: start;
        .n-form-item {
          display: flex;
          justify-content: start;
          flex-wrap: nowrap;
          .n-select {
            max-width: 100px;
          }
          .n-button {
            margin-left: 12px;
          }
          .n-input {
            max-width: 100px;
            margin-left: 12px;
          }
          .n-checkbox {
            margin-left: 12px;
            .n-checkbox__label {
              white-space: nowrap;
            }
          }
          .n-form-item-feedback-wrapper {
            display: none;
          }
        }
        .CollapseForm {
          flex: 1;
        }
      }
      .control {
        height: 60px;
      }
      .dataTable {
        flex: 1;
        overflow: auto;
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
::v-deep .vxe-card {
  height: 100%;
}
</style>
