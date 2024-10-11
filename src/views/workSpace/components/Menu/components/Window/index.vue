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
    label: t("menu.window"),
    type: "group",
    children: [
      {
        label: t("menu.cascade"),
        id: t("menu.cascade"),
        type: "largeButton",
        disabled: true,
        icon: "tsWindowCascadeL"
      },
      {
        label: t("menu.tileeHorizontally"),
        id: t("menu.tileeHorizontally"),
        type: "largeButton",
        icon: "tsWindowTileHorizL"
      },
      {
        label: t("menu.tileVertically"),
        id: t("menu.tileVertically"),
        type: "largeButton",
        icon: "tsWindowTileVertL"
      },
      {
        label: t("menu.maximizeAll"),
        id: t("menu.maximizeAll"),
        type: "largeButton",
        icon: "tsWindowMaximizeL"
      },
      {
        label: t("menu.minimizeAll"),
        id: t("menu.minimizeAll"),
        type: "largeButton",
        icon: "tsWindowMinimizeL"
      },
      { type: "divider" },
      {
        label: t("menu.closeALl"),
        id: t("menu.closeALl"),
        type: "largeButton",
        icon: "tsCloseAllL"
      }
    ]
  }
]);

const updateMenuValue = (value: string) => {
  console.log(101, value);
};
</script>
