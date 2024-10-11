<template>
  <div class="parameters">
    <div class="parameters-tree">
      <n-card :title="$t('menu.constantParameters')">
        <n-scrollbar>
          <n-tree
            v-model:checked-keys="checkedKeys"
            :default-expand-all="true"
            block-line
            cascade
            checkable
            :selectable="false"
            :data="treeData"
          />
        </n-scrollbar>
      </n-card>
      <div class="buttons">
        <n-button
          @click="
            checkedKeys = [
              'finalWellboreStorage',
              'cInitialAndCFinal',
              'dtChangingStorage',
              'skin',
              'permeability',
              'thickness',
              'porosity',
              'compositeRadius',
              'mobilityRatio',
              'diffusivityRatio',
              'totalTransmissiblity'
            ]
          "
          >{{ $t("menu.selectAll") }}</n-button
        >
        <n-button @click="checkedKeys = []">{{
          $t("menu.selectNone")
        }}</n-button>
      </div>
    </div>
    <n-split direction="vertical" :default-size="0.7">
      <template #1
        ><n-card :title="$t('menu.regressionParameters')">
          <CollapseForm
            :default-expanded-names="[
              'wellAndWellbore',
              'reservoirAndBoundary'
            ]"
            :form="parametersForm"
            class="form"
          /> </n-card
      ></template>
      <template #2>
        <n-card :title="$t('menu.regressionConstraints')">
          <CollapseForm
            :default-expanded-names="['totalTransmissiblity']"
            :form="constraintsForm"
            class="form"
          /> </n-card
      ></template>
    </n-split>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { NTree, NButton } from "naive-ui"; // Adjust imports as necessary
import CollapseForm from "@/components/CollapseForm/index.vue";

const { t } = useI18n();

const treeData = computed(() => [
  {
    key: "wellAndWellbore",
    label: `${t("menu.wellAndWellbore")}`,
    children: [
      {
        label: "C[Final]",
        key: "finalWellboreStorage"
      },
      {
        label: "Ci/Cf",
        key: "cInitialAndCFinal"
      },
      {
        label: "Delta_t",
        key: "dtChangingStorage"
      },
      {
        label: "Skin",
        key: "skin"
      }
    ]
  },
  {
    key: "reservoirAndBoundary",
    label: t("menu.reservoirAndBoundary"),
    children: [
      {
        label: "k",
        key: "permeability"
      },
      {
        label: "h",
        key: "thickness"
      },
      {
        label: "🖊",
        key: "porosity"
      },
      {
        label: "Ri",
        key: "compositeRadius"
      },
      {
        label: "M",
        key: "mobilityRatio"
      },
      {
        label: "D",
        key: "diffusivityRatio"
      }
    ]
  },
  {
    key: "compositeConstraints",
    label: t("menu.compositeConstraints"),
    children: [
      {
        label: t("menu.totalTransmissiblity"),
        key: "totalTransmissiblity"
      }
    ]
  }
]);
const checkedKeys = ref([""]);

const parametersForm = computed(() => [
  {
    title: t("menu.wellAndWellbore"),
    name: "wellAndWellbore",
    children: [
      {
        type: "inputGroup",
        label: t("menu.finalWellboreStorage"),
        value: {
          first: "0.0207832",
          second: "0.207832",
          third: "2.07832"
        },
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" }
        ],
        show: checkedKeys.value.includes("finalWellboreStorage"),
        unitValue: "hr"
      },
      {
        type: "inputGroup",
        label: t("menu.cInitialAndCFinal"),
        show: checkedKeys.value.includes("cInitialAndCFinal"),
        value: {
          first: "0.223778",
          second: "2.23778",
          third: "22.3778"
        },
        options: [],
        unitValue: ""
      },
      {
        type: "inputGroup",
        label: t("menu.dtChangingStorage"),
        show: checkedKeys.value.includes("dtChangingStorage"),
        value: {
          first: "0.205252",
          second: "2.05252",
          third: "20.5252"
        },
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "hr"
      },
      {
        type: "inputGroup",
        label: t("menu.skin"),
        show: checkedKeys.value.includes("skin"),
        value: {
          first: "-5.12310",
          second: "4.87690",
          third: "14.8769"
        },
        options: [],
        unitValue: ""
      }
    ]
  },
  {
    title: t("menu.reservoirAndBoundary"),
    name: "reservoirAndBoundary",
    children: [
      {
        type: "inputGroup",
        label: t("menu.permeability"),
        show: checkedKeys.value.includes("permeability"),
        value: {
          first: "5.83398",
          second: "58.3398",
          third: "583.398"
        },
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "md"
      },
      {
        type: "inputGroup",
        label: t("menu.thickness"),
        show: checkedKeys.value.includes("thickness"),
        value: {
          first: "0.55",
          second: "5.50000",
          third: "55.000"
        },
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "m"
      },
      {
        type: "inputGroup",
        label: t("menu.porosity"),
        show: checkedKeys.value.includes("porosity"),
        value: {
          first: "0.0168",
          second: "0.168",
          third: "1.68"
        },
        options: [],
        unitValue: ""
      },
      {
        type: "inputGroup",
        label: t("menu.compositeRadius"),
        show: checkedKeys.value.includes("compositeRadius"),
        value: {
          first: "17.0295",
          second: "170.295",
          third: "1702.95"
        },
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "m"
      },
      {
        type: "inputGroup",
        label: t("menu.mobilityRatio"),
        show: checkedKeys.value.includes("mobilityRatio"),
        value: {
          first: "0.44458",
          second: "4.44580",
          third: "44.4580"
        },
        options: [],
        unitValue: ""
      },
      {
        type: "inputGroup",
        label: t("menu.diffusivityRatio"),
        show: checkedKeys.value.includes("diffusivityRatio"),
        value: {
          first: "0.0607414",
          second: "0.607414",
          third: "6.07414"
        },
        options: [],
        unitValue: ""
      }
    ]
  }
]);

const constraintsForm = computed(() => [
  {
    title: " ",
    name: "totalTransmissiblity",
    children: [
      {
        type: "inputSelectGroup",
        label: t("menu.totalTransmissiblity"),
        show: checkedKeys.value.includes("totalTransmissiblity"),
        value: "320.869",
        selectValue: "=",
        selectOptions: [
          { label: "=", value: "=" },
          { label: ">", value: ">" },
          { label: "<", value: "<" }
        ],
        options: [
          { label: "ms", value: "ms" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" }
        ],
        unitValue: "hr"
      }
    ]
  }
]);
</script>

<style scoped lang="scss">
.parameters {
  height: 100%;
  display: flex;
  &-tree {
    width: 250px;
    margin-right: 12px;
    display: flex;
    flex-direction: column;

    .buttons {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
    }
  }
  > .n-split {
    flex: 1;
  }

  .n-card {
    height: 100%;
    overflow: hidden;
    > :deep(.n-card__content) {
      overflow: hidden;
    }
  }
}
</style>
