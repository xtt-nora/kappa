<template>
  <n-form-item :label="$t('menu.language')">
    <n-select
      :options="languageList"
      :default-value="globalStore.language"
      :on-update:value="changeLanguage"
    ></n-select>
  </n-form-item>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useGlobalStore } from "@/stores/modules/global";
import { LanguageType } from "@/stores/interface/global";

const i18n = useI18n();
const globalStore = useGlobalStore();

const languageList = [
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" }
];

const changeLanguage = (lang: string) => {
  i18n.locale.value = lang;
  globalStore.setGlobalState("language", lang as LanguageType);
};
</script>
