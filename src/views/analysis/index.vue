<template>
  <div class="analysis">
    <!-- 侧边栏 -->
    <Dialog
      v-model="showBar"
      v-bind="config"
      title=" "
      :show-zoom="false"
      height="100%"
      width="5.9%"
      :position="{
        top: '0',
        left: '0'
      }"
    >
      <Tools />
    </Dialog>
    <!-- 可视区域 -->
    <Dialog
      v-bind="config"
      v-model="showModal"
      class-name="modalConent"
      :show-close="true"
      title=" "
      height="100%"
      width="94%"
      :position="{
        top: '0',
        left: '6%'
      }"
    >
      <vxe-tabs v-model="selectTab" type="round-card">
        <template #extra>
          <vxe-button mode="text" icon="vxe-icon-add" @click="newTabs"
            >New</vxe-button
          >
          <vxe-pulldown
            :options="tabOptions"
            trigger="click"
            show-popup-shadow
            transfer
            @option-click="tabOptionClickEvent"
          >
            <template #default>
              <vxe-button mode="text" icon="vxe-icon-ellipsis-v"></vxe-button>
            </template>
          </vxe-pulldown>
        </template>
        <vxe-tab-pane
          v-for="tab in tabList"
          :key="tab.name"
          :title="tab.title"
          :name="tab.name"
        >
          <component :is="tab.component" />
        </vxe-tab-pane>
      </vxe-tabs>
    </Dialog>

    <NewAnalysis
      v-model="analysisStore.showNewAnalysis"
      :tabList="tabList"
      @submit="submit"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import Tools from "./components/Tools.vue";
import Default from "./components/default/index.vue";
import Test from "./components/test/index.vue";
import { NewAnalysis } from "@/window";
import { watch } from "vue";
import { useAnalysisStore } from "@/stores/modules/analysis";
const analysisStore = useAnalysisStore();
const showModal = ref(true);
const showBar = ref(true);
const showNewAnalysis = analysisStore.showNewAnalysis;
const selectTab = ref("origin");
const tabList = ref([
  { name: "origin", title: "原始", component: Default },
  {
    name: "big",
    title: "定井储+经向复合+无限大",
    component: Default
  },
  {
    name: "small",
    title: "变井储+经向复合+无限大",
    component: Test
  }
]);

const tabOptions = computed(() => {
  return tabList.value.map(item => {
    return {
      label: item.title,
      value: item.name
    };
  });
});
let count = 0;
const tabOptionClickEvent = ({ option }) => {
  selectTab.value = option.value;
};
const config = reactive({
  resize: true,
  mask: false,
  lockView: false,
  showClose: false,
  showMinimize: false,
  showFooter: false,
  transfer: false
});
const newTabs = () => {
  analysisStore.$patch({ showNewAnalysis: true });
};
const submit = data => {
  console.log(data);
  const name = "id-" + count++;
  const newTab = {
    name: name,
    title: data.name,
    component: data.select === "origin" ? Default : Test
  };

  tabList.value.push(newTab);
  selectTab.value = name;
};
</script>

<style scoped lang="scss">
.analysis {
  height: 100%;
  position: relative;
  :deep(.vxe-modal--wrapper) {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    .vxe-modal--box {
      position: absolute;
    }
    .vxe-modal--body {
      background-color: rgb(240, 240, 240);
    }
    .vxe-modal--content {
      overflow: hidden;
    }
  }
  :deep(.vxe-tabs) {
    height: 100%;
    .vxe-tabs-pane {
      position: relative;
    }
  }
}
</style>
