<template>
  <div class="menu">
    <n-tabs
      type="card"
      size="small"
      class="menuTabs"
      default-value="editQAQC"
      :on-update:value="updateTabValue"
    >
      <n-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :tab="item.title"
        :name="item.name"
      >
        <RibbonGroup title="">
          <LargeButton
            :title="$t('menu.browser')"
            icon="BrowserL"
            @click="showBrowser = true"
          />
        </RibbonGroup>
        <n-scrollbar x-scrollable content-style="width: max-content;">
          <component :is="item.component" />
        </n-scrollbar>
      </n-tab-pane>
      <template #prefix>
        <n-button
          size="tiny"
          type="info"
          style="padding: 0 12px"
          @click="router.push('/workStation')"
        >
          {{ $t("menu.file") }}
        </n-button>
      </template>
      <template #suffix>
        <TabBarRight />
      </template>
    </n-tabs>

    <!-- 挂载弹窗 -->
    <Browser v-model="showBrowser" :title="$t('menu.browser')" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import { RibbonGroup, LargeButton } from "@/components/Ribbon";
import AdditionalTools from "./components/AdditionalTools/index.vue";
import Analysis from "./components/Analysis/index.vue";
import EditQAQC from "./components/EditQAQC/index.vue";
import Map from "./components/Map/index.vue";
import ReferenceLogs from "./components/ReferenceLogs/index.vue";
import Window from "./components/Window/index.vue";
import TabBarRight from "./components/TabBarRight/index.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { Browser } from "@/window";

const { t } = useI18n();
const router = useRouter();

const showBrowser = ref(false);
// 如果要在对象里使用多语言，最好用computed计算属性去动态生成，ref无法监听到i18n的变化
const tabList = computed(() => [
  {
    title: t("menu.editQAQC"),
    name: "editQAQC",
    slots: { default: "default1" },
    component: EditQAQC
  },
  {
    title: t("menu.referenceLogs"),
    name: "referenceLogs",
    component: ReferenceLogs
  },
  {
    title: t("menu.map"),
    name: "map",
    component: Map
  },
  {
    title: t("menu.additionalTools"),
    name: "additionalTools",
    component: AdditionalTools
  },
  {
    title: t("menu.analysis"),
    name: "analysis",
    component: Analysis
  },
  { title: t("menu.window"), name: "window", component: Window }
]);

const updateTabValue = (value: string) => router.push(value);

onMounted(() => {
  updateTabValue(tabList.value[0].name);
});
</script>

<style src="./index.scss" lang="scss" scoped></style>
