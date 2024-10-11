<template>
  <RibbonMenu
    v-bind="$attrs"
    :options="options"
    @update:value="updateMenuValue"
  />

  <!-- 弹窗组件 -->
  <Split v-model="showSplit" />
  <ProcessTransform v-model="showEditProcessTransform" />
  <ProcessAverage v-model="showEditProcessAverage" />
  <ProcessFilter v-model="showEditProcessFilter" />
  <ProcessDecimation v-model="showEditProcessDecimation" />
  <ProcessLeastSquareDenoising v-model="showEditProcessLeastSquareDenoising" />
  <ShiftManual v-model="showEditShiftManual" />
  <PQ v-model="showPQ" />
  <Set0 v-model="showSet0" />
</template>
<script lang="ts" setup>
import RibbonMenu from "@/components/Ribbon/RibbonMenu.vue";
import { ref, computed, h } from "vue";
import { useI18n } from "vue-i18n";
import {
  Split,
  ProcessTransform,
  ProcessAverage,
  ProcessFilter,
  ProcessDecimation,
  ProcessLeastSquareDenoising,
  PQ,
  Set0,
  ShiftManual
} from "@/window";
import SvgIcon from "@/components/SvgIcon/index.vue";

const { t } = useI18n();
const props = defineProps<{
  controlKey: string;
}>();

const showSplit = ref(false);
const showEditProcessTransform = ref(false);
const showEditProcessAverage = ref(false);
const showEditProcessFilter = ref(false);
const showEditProcessDecimation = ref(false);
const showEditProcessLeastSquareDenoising = ref(false);
const showEditShiftManual = ref(false);
const showPQ = ref(false);
const showSet0 = ref(false);

const options = computed<MenuType[]>(() => {
  return [
    {
      label: t("menu.edit"),
      type: "group",
      children: [
        {
          type: "smallButtonGroup",
          children: [
            {
              type: "smallButton",
              disabled: true,
              label: t("menu.undo"),
              id: t("menu.undo"),
              icon: "tsUndoS"
            },
            {
              type: "smallButton",
              disabled: true,
              label: t("menu.redo"),
              id: t("menu.redo"),
              icon: "tsRedoS"
            }
          ]
        },
        { type: "divider" },
        {
          label: t("menu.delete"),
          id: t("menu.delete"),
          type: "largeButton",
          disabled: true,
          icon: "tsDeleteL"
        },
        {
          label: t("menu.process"),
          id: t("menu.process"),
          type: "largeDropdownButton",
          icon: "tsProcessSelectionL",
          options: [
            {
              label: t("menu.transform"),
              key: "edit_process_transform",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "TransformS", size: "16" },
                  { default: () => {} }
                )
            },
            {
              label: t("menu.average"),
              key: "edit_process_average",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "AverageS", size: "16" },
                  { default: () => {} }
                )
            },
            {
              label: t("menu.filter"),
              key: "edit_process_filter",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "FilterS", size: "16" },
                  { default: () => {} }
                )
            },
            {
              label: t("menu.decimation"),
              key: "edit_process_decimation",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "FilterS", size: "16" },
                  { default: () => {} }
                )
            },
            {
              label: t("menu.leastSquareDenoising"),
              key: "edit_process_leastSquareDenoising",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "MovingAverageSimplificationS", size: "16" },
                  { default: () => {} }
                )
            }
          ]
        },
        {
          label: t("menu.shift"),
          id: t("menu.shift"),
          type: "largeDropdownButton",
          icon: "tsShiftTimeValueL",
          options: [
            {
              label: t("menu.time"),
              key: "edit_shift_time",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "tsShiftTimeS", size: "16" },
                  { default: () => {} }
                )
            },
            {
              label: t("menu.value"),
              key: "edit_shift_value",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "ShifValueS", size: "16" },
                  { default: () => {} }
                )
            },
            {
              label: t("menu.timeAndValue"),
              key: "edit_shift_timeAndValue",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "tsShiftTimeValueS", size: "16" },
                  { default: () => {} }
                )
            },
            {
              label: t("menu.manual"),
              key: "edit_shift_manual",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "tsShiftManualS", size: "16" },
                  { default: () => {} }
                )
            },
            {
              label: t("menu.resetX"),
              key: "edit_shift_resetX",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "ResetXS", size: "16" },
                  { default: () => {} }
                )
            },
            {
              label: t("menu.resetY"),
              key: "edit_shift_resetY",
              icon: () =>
                h(
                  SvgIcon,
                  { name: "ResetYS", size: "16" },
                  { default: () => {} }
                )
            }
          ]
        },
        { type: "divider" },
        {
          type: "smallButtonGroup",
          children: [
            {
              type: "smallButton",
              label: t("menu.split"),
              id: "edit_split",
              icon: "tsSplitStepL"
            },
            {
              type: "smallButton",
              label: t("menu.move"),
              id: t("menu.move"),
              icon: "tsMoveStepL"
            }
          ]
        },
        { type: "divider" },
        {
          label: t("menu.sync"),
          id: t("menu.sync"),
          show: props.controlKey === "Production" ? true : false,
          type: "largeButton",
          icon: "stSyncho"
        },
        {
          label: t("menu.linex"),
          id: t("menu.linex"),
          show: props.controlKey === "Production" ? true : false,
          type: "largeButton",
          icon: "stIntersect"
        },
        {
          type: "smallButtonGroup",
          show: props.controlKey === "Production" ? true : false,
          children: [
            {
              type: "smallButton",
              label: t("menu.pq"),
              id: "edit_pq",
              icon: "stShutin"
            },
            {
              type: "smallButton",
              label: t("menu.set0"),
              id: "edit_set0",
              icon: "stSlug"
            },
            {
              type: "smallButton",
              label: t("menu.merge"),
              id: t("menu.merge"),
              icon: "tsMergeL"
            }
          ]
        }
      ]
    }
  ];
});

const updateMenuValue = (value: string) => {
  const actions = new Map([
    ["edit_split", () => (showSplit.value = true)],
    ["edit_process_transform", () => (showEditProcessTransform.value = true)],
    ["edit_process_average", () => (showEditProcessAverage.value = true)],
    ["edit_process_filter", () => (showEditProcessFilter.value = true)],
    ["edit_process_decimation", () => (showEditProcessDecimation.value = true)],
    [
      "edit_process_leastSquareDenoising",
      () => (showEditProcessLeastSquareDenoising.value = true)
    ],
    ["edit_shift_manual", () => (showEditShiftManual.value = true)],
    ["edit_pq", () => (showPQ.value = true)],
    ["edit_set0", () => (showSet0.value = true)]
  ]);

  const handler = actions.get(value) || (() => {});
  handler();
};
</script>
