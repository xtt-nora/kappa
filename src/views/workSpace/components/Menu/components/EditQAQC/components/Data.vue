<template>
  <RibbonMenu
    v-bind="$attrs"
    :options="options"
    @update:value="updateMenuValue"
  >
    <SelectPane
      v-show="controlKey !== 'QAQC'"
      :options="preOption"
      :title="$t('menu.pressure')"
      v-model:value="activePressure"
      v-model:radio="radioPressure"
    />
    <SelectPane
      v-show="controlKey !== 'QAQC'"
      :options="prodOption"
      :title="$t('menu.production')"
      v-model:value="activeProduction"
      v-model:radio="radioProduction"
    />
  </RibbonMenu>

  <!-- 弹窗组件 -->
  <Load v-model="showLoad" :title="t('menu.load')" :control-key="controlKey" />
  <GaugeEvent v-model="showGaugeEvent" :type="sample" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { GaugeEvent, Load } from "@/window";
import { useProjectStore } from "@/stores/modules/project.ts";
import { WellInfo } from "@/api/interface/home.ts";
import { storeToRefs } from "pinia";
import { SelectPane } from "@/components/Ribbon";

const projectStore = useProjectStore();
const {
  activePressure,
  activeProduction,
  radioPressure,
  radioProduction,
  preOption,
  prodOption
} = storeToRefs(projectStore);

//后期改成数据
const sample = ref<EditType>("QAQC");
const { t } = useI18n();

const props = defineProps<{
  controlKey: string;
}>();

const showLoad = ref(false);
const showGaugeEvent = ref(false);

const options = computed(() => {
  return [
    {
      label: t("menu.data"),
      type: "group",
      children: [
        {
          label: t("menu.updateFromKs"),
          id: t("menu.updateFromKs"),
          type: "largeButton",
          icon: "tsSynchronizeL"
        },
        {
          label: t("menu.load"),
          id: "data_load",
          type: "largeButton",
          icon: "LoadQL"
        },
        {
          label: t("menu.multiphase"),
          id: t("menu.multiphase"),
          show: props.controlKey === "QAQC" ? false : true,
          type: "largeButton",
          icon: "Multiphase"
        },
        { type: "divider" },
        {
          type: "smallButtonGroup",
          children: [
            {
              label: t("menu.well"),
              id: "data_well",
              value: projectStore.activeWell,
              type: "select",
              options: wellOptions(),
              handleUpdateValue: updateActiveWell
            },
            {
              label: t("menu.activeGauge"),
              id: t("menu.activeGauge"),
              show: props.controlKey === "QAQC" ? true : false,
              value: projectStore.activeGuage,
              type: "select",
              options: projectStore.activeGuageOption,
              handleUpdateValue: updateActiveGauge
            }
          ]
        },
        { type: "divider" },
        {
          type: "smallButtonGroup",
          children: [{ type: "slot" }]
        },
        {
          type: "smallButtonGroup",
          children: [
            {
              type: "iconButton",
              id: "data_gaugeEvent",
              icon: "tsInfoL",
              show: props.controlKey === "QAQC"
            },
            {
              type: "iconButton",
              id: "data_pressureProperties",
              icon: "tsInfoL",
              show: props.controlKey !== "QAQC"
            },
            {
              type: "iconButton",
              id: "data_productionProperties",
              show: props.controlKey !== "QAQC",
              icon: "tsInfoM"
            }
          ]
        }
      ]
    }
  ];
});

const updateMenuValue = (value: string) => {
  const actions = new Map([
    ["data_load", () => (showLoad.value = true)],
    [
      "data_gaugeEvent",
      () => ((showGaugeEvent.value = true), (sample.value = "QAQC"))
    ],
    [
      "data_productionProperties",
      () => ((showGaugeEvent.value = true), (sample.value = "Production"))
    ],
    [
      "data_pressureProperties",
      () => ((showGaugeEvent.value = true), (sample.value = "Pressure"))
    ],
    ["data_well", () => {}]
  ]);

  const handler = actions.get(value) || (() => {});
  handler();
};

/**
 * activeGauge下拉框选项
 */
const updateActiveGauge = (value: string) => {
  projectStore.setProjectState("activeGuage", value);
};
/**
 * 井下拉框选项
 */
const wellOptions = () => {
  return projectStore.wellList?.map((item: WellInfo) => {
    return {
      label: item.wellName,
      value: item.id
    };
  });
};

/**
 * 更新选中的井
 */
const updateActiveWell = (value: string) => {
  projectStore.$patch({
    activeWell: value,
    activeWellOption: projectStore.wellList?.find(item => item.id === value)
  });
};
</script>

<style scoped></style>
