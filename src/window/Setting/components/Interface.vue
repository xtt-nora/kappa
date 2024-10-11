<template>
  <n-form label-placement="left">
    <n-tabs type="card" size="small" v-model:value="selectedKey">
      <n-tab-pane
        :tab="$t('menu.significantFigures')"
        name="interface_significantFigures"
      >
        <CollapseForm
          :default-expanded-names="['dataType']"
          :form="aspectCollapse"
        />
      </n-tab-pane>
      <n-tab-pane :tab="$t('menu.fileStorage')" name="interface_fileStorage">
        <n-form-item>
          <n-checkbox v-model:checked="formData.createBackupBakFiles">
            {{ $t("menu.createBackupBakFiles") }}
          </n-checkbox>
        </n-form-item>
      </n-tab-pane>
      <n-tab-pane
        :tab="$t('menu.modelUndoRedo')"
        name="interface_modelUndoRedo"
      >
        <n-form-item>
          <n-checkbox v-model:checked="formData.enableModelUndoRedo">
            {{ $t("menu.enableModelUndoRedo") }}
          </n-checkbox>
        </n-form-item>
        <n-form-item :label="$t('menu.undoRedoDepth')">
          <n-input v-model:value="formData.undoRedoDepth"></n-input>
        </n-form-item>
      </n-tab-pane>
    </n-tabs>
  </n-form>
</template>

<script setup lang="ts">
import CollapseForm from "@/components/CollapseForm/index.vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const selectedKey = defineModel({
  type: String,
  default: ""
});

const aspectCollapse = [
  {
    title: t("menu.dataType"),
    name: "dataType",
    children: [
      {
        type: "input",
        label: t("menu.decimalTime"),
        value: "6"
      },
      {
        type: "input",
        label: t("menu.rates"),
        value: "6"
      },
      {
        type: "input",
        label: t("menu.pressures"),
        value: "6"
      },
      {
        type: "input",
        label: t("menu.depth"),
        value: "6"
      },
      {
        type: "input",
        label: t("menu.temperatures"),
        value: "6"
      },
      {
        type: "input",
        label: t("menu.distances"),
        value: "6"
      },
      {
        type: "input",
        label: t("menu.ratios"),
        value: "3"
      },
      {
        type: "input",
        label: t("menu.volumes"),
        value: "6"
      },
      {
        type: "input",
        label: t("menu.other"),
        value: "6"
      }
    ]
  }
];

const formData = reactive({
  createBackupBakFiles: true,
  enableModelUndoRedo: true,
  undoRedoDepth: "3"
});
</script>

<style scoped lang="scss">
.n-form {
  height: 100%;
  .n-tabs {
    height: 100%;
    .n-form-item {
      width: 50%;
      padding: 0 12px;
    }
  }
}
</style>
