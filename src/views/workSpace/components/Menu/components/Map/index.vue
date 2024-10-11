<template>
  <RibbonMenu :options="options" @update:value="updateMenuValue" />
</template>
<script lang="ts" setup>
import RibbonMenu from "@/components/Ribbon/RibbonMenu.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const options = computed<MenuType[]>(() => [
  {
    label: t("menu.main"),
    type: "group",
    children: [
      {
        type: "smallButtonGroup",
        children: [
          {
            label: t("menu.well"),
            id: t("menu.well"),
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
      {
        type: "largeButton",
        label: t("menu.options"),
        id: t("menu.options"),
        icon: "MapOptionsL"
      }
    ]
  },
  {
    label: t("menu.mapObjects"),
    type: "group",
    children: [
      {
        label: t("menu.unlocked"),
        id: t("menu.unlocked"),
        type: "largeButton",
        icon: "tsUnlockedL"
      },
      {
        label: t("menu.image"),
        id: t("menu.image"),
        type: "largeButton",
        icon: "tsBasemapL"
      },
      {
        label: t("menu.contour"),
        id: t("menu.contour"),
        type: "largeButton",
        icon: "NewContourL"
      },
      {
        label: t("menu.fault"),
        id: t("menu.fault"),
        type: "largeButton",
        icon: "NewFaultsL"
      },
      {
        label: t("menu.limit"),
        id: t("menu.limit"),
        type: "largeButton",
        icon: "NewFractureL"
      },
      {
        label: t("menu.region"),
        id: t("menu.region"),
        type: "largeButton",
        icon: "NewRegion2L"
      },
      {
        label: t("menu.well"),
        id: t("menu.well"),
        type: "largeButton",
        icon: "tsAddWellL"
      },
      { type: "divider" },
      {
        label: t("menu.delete"),
        id: t("menu.delete"),
        type: "largeButton",
        icon: "Disregarded"
      }
    ]
  },
  {
    label: t("menu.reservoir"),
    type: "group",
    children: [
      {
        label: t("menu.spatialData"),
        id: t("menu.spatialData"),
        type: "largeButton",
        icon: "tsEditDataFieldsL",
        disabled: true
      },
      {
        label: t("menu.geometry"),
        id: t("menu.geometry"),
        type: "largeButton",
        icon: "tsLayerManagerL"
      },
      {
        label: t("menu.properties"),
        id: t("menu.properties"),
        type: "largeButton",
        icon: "ReservoirPropertiesL"
      },
      {
        label: t("menu.dfn"),
        id: t("menu.dfn"),
        type: "largeButton",
        icon: "KURC_DfnL",
        disabled: true
      }
    ]
  },
  {
    label: t("menu.model"),
    type: "group",
    children: [
      {
        label: t("menu.grid"),
        id: t("menu.grid"),
        type: "largeButton",
        icon: "GridL",
        disabled: true
      }
    ]
  },
  {
    label: t("menu.tools"),
    type: "group",
    children: [
      {
        type: "smallButtonGroup",
        children: [
          {
            label: t("menu.geoReference"),
            id: t("menu.geoReference"),
            type: "smallButton",
            icon: "tsSetReferencePointS"
          },
          {
            label: t("menu.pointerPosition"),
            id: t("menu.pointerPosition"),
            type: "smallButton",
            icon: "CompositionL"
          }
        ]
      },
      {
        label: t("menu.localXY"),
        id: t("menu.localXY"),
        type: "largeButton",
        icon: "tsSetScaleL"
      },
      {
        label: t("menu.measure"),
        id: t("menu.measure"),
        type: "largeButton"
      },
      {
        label: t("menu.kTensor"),
        id: t("menu.kTensor"),
        type: "largeButton",
        icon: "MultipleInterferenceAnalsyisL"
      }
    ]
  },
  {
    label: t("menu.display"),
    type: "group",
    children: [
      {
        label: t("menu.show"),
        id: t("menu.show"),
        type: "largeButton",
        icon: "DisplayShowL"
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

const updateWellValue = (value: string) => {
  console.log(value);
};

const updateMenuValue = (value: string) => {
  console.log(101, value);
};
</script>
