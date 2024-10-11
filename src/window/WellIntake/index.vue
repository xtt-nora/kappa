<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.wellIntake')"
    width="auto"
    height="auto"
  >
    <div class="wellIntake">
      <div class="wellIntake-content">
        <div class="wellIntake-content__left">
          <div class="tool">
            <SmallButton
              name="PTA_LoadP"
              size="30"
              :title="$t('menu.loadFromAmethyste')"
            />
            <SmallButton
              name="PTA_LoadP"
              size="30"
              :title="$t('menu.pickTubingIdOd')"
            />
            <n-button @click="() => (showTable = !showTable)" size="tiny">{{
              $t("menu.timeDependent")
            }}</n-button>
          </div>
          <div class="content">
            <CollapseForm
              :default-expanded-names="[
                'modelDefinition',
                'liftCurvesCharacterization'
              ]"
              :form="collapseForm"
              class="form"
            />
          </div>
        </div>
        <div class="wellIntake-content__right" v-if="showTable">
          <div class="head">
            <n-checkbox size="small">{{ t("menu.showDate") }}</n-checkbox>
          </div>
          <div class="box">
            <div class="table">
              <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
            </div>
            <div class="bar">
              <n-button>{{ $t("menu.add") }}</n-button>
              <n-button>{{ $t("menu.insert") }}</n-button>
              <n-button>{{ $t("menu.delete") }}</n-button>
            </div>
          </div>
        </div>
      </div>
      <div class="wellIntake-button">
        <n-button @click="showModal = false" size="tiny">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
        <n-button size="tiny">{{ $t("menu.display") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { SmallButton } from "@/components/Ribbon";
import { useI18n } from "vue-i18n";
import CollapseForm from "@/components/CollapseForm/index.vue";
import { h, reactive, ref } from "vue";
import { VxeGridProps } from "vxe-table";
import { NSelect } from "naive-ui";

const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });
const collapseForm = ref([
  {
    title: t("menu.modelDefinition"),
    name: "modelDefinition",
    children: [
      {
        type: "select",
        label: t("menu.model"),
        value: "builtIn",
        options: [
          { label: t("menu.liftCurves"), value: "liftCurves" },
          { label: t("menu.builtIn"), value: "builtIn" }
        ]
      }
    ]
  },
  {
    title: t("menu.liftCurvesCharacterization"),
    name: "liftCurvesCharacterization",
    children: [
      {
        type: "select",
        label: t("menu.mode"),
        value: "production",
        options: [{ label: t("menu.production"), value: "ms" }]
      },
      {
        type: "group",
        label: t("menu.referenceMD"),
        value: "0.00000",
        options: [
          { label: "m", value: "m" },
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
        type: "group",
        label: t("menu.bottomholeMD"),
        value: "0.00000",
        options: [
          { label: "m", value: "m" },
          { label: "sec", value: "sec" },
          { label: "min", value: "min" },
          { label: "hr", value: "hr" },
          { label: "day", value: "213" },
          { label: "Week", value: "Week" },
          { label: "Month", value: "Month" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "m"
      }
    ]
  }
]);

const showTable = ref(false);

const gridOptions = reactive<VxeGridProps<any>>({
  border: true,
  height: "auto",
  columns: [
    {
      title: t("menu.name"),
      field: "name",
      children: [
        {
          field: "name"
        }
      ]
    },
    {
      title: t("menu.timeAtStart"),
      field: "timeAtStart",
      children: [
        {
          field: "timeAtStart",
          slots: {
            header() {
              return h(NSelect, {
                modelValue: bHPFlowing.value,
                placeholder: "",
                defaultValue: "hr",
                options: [
                  { label: "hr", value: "hr" },
                  { label: "ms", value: "ms" },
                  { label: "MPa", value: "MPa" }
                ]
              });
            }
          }
        }
      ]
    },
    {
      title: t("menu.model"),
      field: "model",
      children: [
        {
          field: "model"
        }
      ]
    },
    {
      title: "mode",
      field: "mode",
      children: [
        {
          field: "mode"
        }
      ]
    }
  ],
  data: [
    {
      id: 10001,
      model: 1.0,
      name: 28
    }
  ]
});

const bHPFlowing = ref("hr");
</script>
<style lang="scss" scoped>
.wellIntake {
  padding: 6px;
  box-sizing: border-box;
  background-color: $dialogBg;
  &-content {
    height: 50vh;
    display: flex;
    overflow: hidden;
    &__left {
      width: 25vw;
      .tool {
        .n-button {
          float: right;
        }
      }
    }
    &__right {
      width: 25vw;
      margin-left: 12px;
      .box {
        height: 100%;
        display: flex;
        .table {
          flex: 1;
        }
        .bar {
          padding: 0 12px;
          @include flex-column;
          > .n-button {
            width: 100%;
            margin-bottom: 6px;
          }
        }
      }
    }
  }
  &-button {
    width: 100%;
    display: inline-block;
    margin-top: 12px;
    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
}
</style>
