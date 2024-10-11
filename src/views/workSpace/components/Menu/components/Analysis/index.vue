<template>
  <div class="analysis">
    <RibbonMenu :options="options" @update:value="updateMenuValue" />

    <!-- 弹窗组件 -->
    <Dashboard v-model="showDashboard" />
    <Info v-model="showInfo" />
    <PvtAndDiffusion v-model="showPvtAndDiffusion" />
    <Results v-model="showResults" />
    <Tools v-model="showTools" />
    <Delete v-model="showDelete" />
    <Compare v-model="showCompare" />
    <PlotFlexible v-model="showPlotflexible" />
  </div>
</template>
<script lang="ts" setup>
import RibbonMenu from "@/components/Ribbon/RibbonMenu.vue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAnalysisStore } from "@/stores/modules/analysis";
const analysisStore = useAnalysisStore();
import {
  Dashboard,
  Info,
  PvtAndDiffusion,
  Results,
  Tools,
  Compare,
  Delete,
  PlotFlexible
} from "@/window";

const { t } = useI18n();

const showDashboard = ref(false);
const showInfo = ref(false);
const showPvtAndDiffusion = ref(false);
const showResults = ref(false);
const showTools = ref(false);
const showCompare = ref(false);
const showDelete = ref(false);
const showPlotflexible = ref(false);
const options = computed<MenuType[]>(() => [
  {
    label: t("menu.layout"),
    type: "group",
    children: [
      {
        label: t("menu.auto"),
        id: t("menu.auto"),
        type: "largeButton",
        disabled: true,
        icon: "KURC_DefaultLayoutL"
      },
      {
        label: t("menu.scales"),
        id: t("menu.scales"),
        type: "largeButton",
        icon: "ScalesOnL"
      }
    ]
  },
  {
    label: t("menu.analysisControl"),
    type: "group",
    children: [
      {
        label: t("menu.info"),
        id: "analysis_info",
        type: "largeButton",
        icon: "tsInfoL"
      },
      {
        label: t("menu.pvtAndDiffusion"),
        id: "analysis_pvtAndDiffusion",
        type: "largeButton",
        icon: "PVTL"
      },
      {
        label: t("menu.tools"),
        id: "analysis_tools",
        type: "largeButton",
        icon: "ToolsOptionsL"
      },
      {
        label: t("menu.dashboard"),
        id: "analysis_dashboard",
        type: "largeButton",
        icon: "DashboardL"
      },
      {
        label: t("menu.results"),
        id: "analysis_results",
        type: "largeButton",
        icon: "tsDisplayModeTableL"
      },
      {
        label: t("menu.valid"),
        id: t("menu.valid"),
        type: "largeButton",
        icon: "IMG_SUCCESS"
      },
      {
        label: t("menu.new"),
        id: "analysis_newAnalysis",
        type: "largeButton",
        icon: "PtaNewAnalysisL"
      },
      {
        label: t("menu.delete"),
        id: "analysis_delete",
        type: "largeButton",
        icon: "tsDeleteL"
      }
    ]
  },
  {
    label: t("menu.extraction"),
    type: "group",
    children: [
      {
        type: "smallButtonGroup",
        children: [
          {
            label: t("menu.pressure"),
            id: t("menu.pressure"),
            type: "select",
            options: [
              {
                label: "Drive My Car",
                value: "song1"
              },
              {
                label: "Norwegian Wood",
                value: "song2"
              }
            ],
            handleUpdateValue: (value: string) => updateWellValue(value)
          },
          {
            label: t("menu.production"),
            id: t("menu.production"),
            type: "select",
            options: [
              {
                label: "Drive My Car",
                value: "song1"
              },
              {
                label: "Norwegian Wood",
                value: "song2"
              }
            ],
            handleUpdateValue: (value: string) => updateWellValue(value)
          },
          {
            label: t("menu.event"),
            id: t("menu.event"),
            type: "select",
            options: [
              {
                label: "Drive My Car",
                value: "song1"
              },
              {
                label: "Norwegian Wood",
                value: "song2"
              }
            ],
            handleUpdateValue: (value: string) => updateWellValue(value)
          }
        ]
      },
      { type: "divider" },
      {
        type: "smallButtonGroup",
        children: [
          {
            type: "iconButton",
            id: "1"
          },
          {
            type: "iconButton",
            id: "2"
          },
          {
            type: "iconButton",
            id: "3"
          }
        ]
      }
    ]
  },
  {
    label: t("menu.miscellaneous"),
    type: "group",
    children: [
      {
        label: t("menu.undo"),
        id: t("menu.undo"),
        type: "largeButton",
        icon: "tsundol"
      },
      {
        label: t("menu.redo"),
        id: t("menu.redo"),
        type: "largeButton",
        icon: "tsRedoL"
      },
      {
        label: t("menu.compare"),
        id: "analysis_compare",
        type: "largeButton",
        icon: "CompareL"
      },
      {
        label: t("menu.newPlot"),
        id: t("menu.newPlot"),
        type: "largeDropdownButton",
        icon: "NewDocumentPtaL",
        options: [
          { label: t("menu.d3"), key: "3d", disabled: true },
          { label: t("menu.flexible"), key: "plot_flexible" },
          { label: t("menu.horner"), key: "horner" },
          { label: t("menu.mdh"), key: "mdh" },
          {
            label: t("menu.resultsGlobal"),
            key: "resultsGlobal",
            disabled: true
          },
          { label: t("menu.wellOther"), key: "wellOther", disabled: true },
          {
            label: t("menu.logsProduction"),
            key: "logsProduction",
            disabled: true
          }
        ]
      },
      {
        label: t("menu.timeIntervalSelection"),
        id: t("menu.timeIntervalSelection"),
        type: "largeButton",
        icon: "SelectLassoOffL"
      },
      {
        label: t("menu.printPreviewLarge"),
        id: t("menu.printPreviewLarge"),
        type: "largeButton",
        icon: "tsPrintPreviewL"
      },
      {
        label: t("menu.print"),
        id: t("menu.print"),
        type: "largeButton",
        icon: "tsPrintL"
      }
    ]
  }
]);

const updateMenuValue = (value: string) => {
  console.log(101, value);
  const actions = new Map([
    ["analysis_info", () => (showInfo.value = true)],
    ["analysis_pvtAndDiffusion", () => (showPvtAndDiffusion.value = true)],
    ["analysis_tools", () => (showTools.value = true)],
    ["analysis_dashboard", () => (showDashboard.value = true)],
    ["analysis_results", () => (showResults.value = true)],
    [
      "analysis_newAnalysis",
      () => analysisStore.$patch({ showNewAnalysis: true })
    ],
    ["analysis_compare", () => (showCompare.value = true)],
    ["analysis_delete", () => (showDelete.value = true)],
    ["plot_flexible", () => (showPlotflexible.value = true)]
  ]);
  const handler = actions.get(value) || (() => {});
  handler();
};

const updateWellValue = (value: string) => {
  console.log(value);
};
</script>

<style lang="scss" scoped>
.analysis {
  :deep(.ribbonSelect) {
    margin: 1px 4px;
  }
  :deep(.icon-btn) {
    margin: 0 4px;
  }
}
</style>
