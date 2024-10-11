<template>
  <RibbonMenu
    v-bind="$attrs"
    :options="options"
    @update:value="updateMenuValue"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  controlKey: string;
}>();

const options = computed<MenuType[]>(() => {
  return [
    {
      label: t("menu.shutIns"),
      show: props.controlKey === "Production" ? true : false,
      type: "group",
      children: [
        {
          type: "smallButtonGroup",
          children: [
            {
              type: "smallButton",
              label: t("menu.prev"),
              id: t("menu.prev"),
              icon: "Playback_PreviousL"
            },
            {
              type: "smallButton",
              label: t("menu.next"),
              id: t("menu.next"),
              icon: "Playback_NextL"
            }
          ]
        },
        { type: "divider" },
        {
          label: t("menu.search"),
          id: t("menu.search"),
          type: "largeDropdownButton",
          icon: "FocusOnObject32x32"
        }
      ]
    }
  ];
});

const updateMenuValue = (value: string) => {
  console.log(value);
};
</script>

<style scoped></style>
