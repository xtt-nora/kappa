<template>
  <RibbonMenu v-model:value="editMode" :options="controlOption" />
  <Display />
  <Data v-model:value="activeKey" :control-key="editMode" />
  <Select v-model:value="activeKey" />
  <Edit v-model:value="activeKey" :control-key="editMode" />
  <Qaqc v-model:value="activeKey" :control-key="editMode" />
  <Snap v-model:value="activeKey" :control-key="editMode" />
  <ShutIns v-model:value="activeKey" :control-key="editMode" />
</template>
<script lang="ts" setup>
import RibbonMenu from "@/components/Ribbon/RibbonMenu.vue";
import { ref, computed } from "vue";
import Edit from "./components/Edit.vue";
import Display from "./components/Display.vue";
import Data from "./components/Data.vue";
import Select from "./components/Select.vue";
import Qaqc from "./components/Qaqc.vue";
import Snap from "./components/Snap.vue";
import ShutIns from "./components/ShutIns.vue";
import { useI18n } from "vue-i18n";
import { useEditStore } from "@/stores/modules/edit";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const editStore = useEditStore();
const { editMode } = storeToRefs(editStore);

const controlOption = computed<MenuType[]>(() => [
  {
    label: t("menu.editMode"),
    type: "group",
    children: [
      {
        label: t("menu.qaqcL"),
        id: "QAQC",
        type: "largeButton",
        icon: "tsQAQC"
      },
      {
        label: t("menu.editp"),
        id: "Pressure",
        type: "largeButton",
        icon: "tsPressure"
      },
      {
        label: t("menu.editq"),
        id: "Production",
        type: "largeButton",
        icon: "tsRate"
      }
    ]
  }
]);

const activeKey = ref("");
</script>
