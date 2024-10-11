<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";
import NaiveuiApi from "@/components/NaiveuiApi/index.vue";
import { computed, onMounted } from "vue";
import { getBrowserLang } from "@/utils";
import { useI18n } from "vue-i18n";
import { LanguageType } from "./stores/interface/global";
import { zhCN, dateZhCN, enUS, dateEnUS } from "naive-ui";
import { NConfigProvider, GlobalThemeOverrides } from "naive-ui";

const globalStore = useGlobalStore();

const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontSize: "12px",
    fontSizeMini: "12px",
    fontSizeTiny: "12px",
    fontSizeSmall: "12px",
    fontSizeMedium: "12px",
    fontSizeLarge: "12px",
    fontSizeHuge: "12px",
    lineHeight: "1.5",
    heightMini: "22px",
    heightTiny: "22px",
    heightSmall: "22px",
    heightMedium: "22px",
    heightLarge: "22px",
    heightHuge: "22px"
  }
};

const locale = computed(() => {
  if (globalStore.language == "zh") return zhCN;
  if (globalStore.language == "en") return enUS;
  return getBrowserLang() == "zh" ? zhCN : enUS;
});

const dateLocale = computed(() => {
  if (globalStore.language == "zh") return dateZhCN;
  if (globalStore.language == "en") return dateEnUS;
  return getBrowserLang() == "zh" ? dateZhCN : dateEnUS;
});

// init language
const i18n = useI18n();

onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  i18n.locale.value = language;
  globalStore.setGlobalState("language", language as LanguageType);
});
</script>

<template>
  <n-config-provider
    :locale="locale"
    :date-locale="dateLocale"
    abstract
    :theme-overrides="themeOverrides"
    inline-theme-disabled
  >
    <n-message-provider>
      <n-loading-bar-provider>
        <NaiveuiApi />
        <router-view></router-view>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>
