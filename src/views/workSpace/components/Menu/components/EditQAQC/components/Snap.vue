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
      label: t("menu.snapRef"),
      type: "group",
      show: props.controlKey === "Production" ? true : false,
      children: [
        {
          type: "smallButtonGroup",
          children: [
            { type: "iconButton", id: t("menu.snapRef"), icon: "tsSettingsL" }
          ]
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
