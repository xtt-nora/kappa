<template>
  <Dialog
    v-model="showModal"
    width="940"
    height="680"
    resize
    @show="handleShowModal"
  >
    <div class="setting">
      <div class="setting-content">
        <div class="setting-content__tree">
          <n-scrollbar>
            <n-tree
              block-line
              :data="data"
              default-expand-all
              :cancelable="false"
              :on-update:selected-keys="handleUpdateSelectedKeys"
            />
          </n-scrollbar>
        </div>
        <div class="setting-content__tab">
          <component :is="selectOption?.component" v-model="selectedKey" />
        </div>
      </div>
      <div class="setting-footer">
        <n-space class="browser-footer" justify="end">
          <n-button>{{ $t("menu.default") }}</n-button>
          <n-button @click="showModal = false">{{ $t("menu.apply") }}</n-button>
          <n-button @click="showModal = false">{{ $t("menu.ok") }}</n-button>
          <n-button @click="showModal = false">{{
            $t("menu.cancel")
          }}</n-button>
        </n-space>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from "@/components/Dialog/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import {
  Language,
  Interface,
  Aspects,
  Load,
  Technical,
  DefineResult
} from "./components";
import { computed, h, ref } from "vue";
import { useI18n } from "vue-i18n";
import { TreeOption } from "naive-ui";

const { t } = useI18n();

const showModal = defineModel({ type: Boolean, default: false });
const selectedKey = ref();

const data = computed(() => [
  {
    key: "defaultUnits",
    label: t("menu.defaultUnits"),
    component: DefineResult,
    prefix: () => h(SvgIcon, { size: "16", name: "Units" })
  },
  {
    key: "language",
    label: t("menu.language"),
    component: Language,
    prefix: () => h(SvgIcon, { size: "16", name: "LanguageS" })
  },
  {
    key: "interface",
    label: t("menu.interface"),
    prefix: () => h(SvgIcon, { size: "16", name: "GridS" }),
    component: Interface,
    children: [
      {
        key: "interface_significantFigures",
        label: t("menu.significantFigures"),
        component: Interface,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "interface_fileStorage",
        label: t("menu.fileStorage"),
        component: Interface,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "interface_modelUndoRedo",
        label: t("menu.modelUndoRedo"),
        component: Interface,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      }
    ]
  },
  {
    key: "aspects",
    label: t("menu.aspects"),
    component: Aspects,
    prefix: () => h(SvgIcon, { size: "16", name: "settingsS" }),
    children: [
      {
        key: "aspects_plot",
        label: t("menu.plot"),
        component: Aspects,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "aspects_slideMode",
        label: t("menu.slideMode"),
        component: Aspects,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "aspects_colorScale",
        label: t("menu.colorScale"),
        component: Aspects,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "aspects_analysisPlots",
        label: t("menu.analysisPlots"),
        component: Aspects,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      }
    ]
  },
  {
    key: "load",
    label: t("menu.load"),
    component: Load,
    prefix: () => h(SvgIcon, { size: "16", name: "MnemonicSystemS" }),
    children: [
      {
        key: "load_versusDepth",
        label: t("menu.versusDepth"),
        component: Load,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "load_versusTime",
        label: t("menu.versusTime"),
        component: Load,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      }
    ]
  },
  {
    key: "technical",
    label: t("menu.technical"),
    component: Technical,
    prefix: () => h(SvgIcon, { size: "16", name: "GridS" }),
    children: [
      {
        key: "technical_skin",
        label: t("menu.skin"),
        component: Technical,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "technical_criticalParameters",
        label: t("menu.criticalParameters"),
        component: Technical,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "technical_externalModels",
        label: t("menu.externalModels"),
        component: Technical,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "technical_externalPressureDropCorrelations",
        label: t("menu.externalPressureDropCorrelations"),
        component: Technical,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },

      {
        key: "technical_results",
        label: t("menu.results"),
        component: Technical,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      },
      {
        key: "technical_extraction",
        label: t("menu.extraction"),
        component: Technical,
        prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
      }
    ]
  }
  // {
  //   key: "defaultPrintSetup",
  //   label: t("menu.defaultPrintSetup"),
  //   prefix: () => h(SvgIcon, { size: "16", name: "MnemonicSystemS" }),
  //   children: [
  //     {
  //       key: "defaultPrintSetup_headerFooter",
  //       label: t("menu.headerFooter"),
  //       prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
  //     },
  //     {
  //       key: "defaultPrintSetup_page",
  //       label: t("menu.page"),
  //       prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
  //     },
  //     {
  //       key: "defaultPrintSetup_fonts",
  //       label: t("menu.fonts"),
  //       prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
  //     },
  //     {
  //       key: "defaultPrintSetup_contents",
  //       label: t("menu.contents"),
  //       prefix: () => h(SvgIcon, { size: "16", name: "settingsS" })
  //     }
  //   ]
  // },
  // {
  //   key: "plot3D",
  //   label: t("menu.plot3D"),
  //   prefix: () => h(SvgIcon, { size: "16", name: "MnemonicSystemS" })
  // }
]);

const selectOption = ref<TreeOption | null>(null);

const handleUpdateSelectedKeys = (
  _keys: Array<string | number>,
  option: Array<TreeOption | null>
) => {
  selectedKey.value = _keys[0];
  selectOption.value = option[0];
  if (option[0] && option[0].children) {
    selectedKey.value = option[0].children[0].key;
  }
};

const handleShowModal = () => {
  handleUpdateSelectedKeys([data.value[1].key], [data.value[1]]);
};
</script>
<style lang="scss" scoped>
.setting {
  padding: 12px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    &__tree {
      background: $dialogStepContentBg;
      width: 260px;
      border: 1px solid $dialogContentBorder;
    }
    &__tab {
      background: $dialogStepContentBg;
      width: calc(100% - 272px);
      overflow: hidden;
      margin-left: 12px;
      padding: 12px;
      box-sizing: border-box;
      border: 1px solid $dialogContentBorder;
    }
  }
  &-footer {
    margin-top: 12px;
  }
}
</style>
