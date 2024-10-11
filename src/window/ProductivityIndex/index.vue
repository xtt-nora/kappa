<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.productivityIndex')"
    width="1000"
    height="auto"
    resize
  >
    <div class="productivityIndex">
      <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
      <div class="productivityIndex-button">
        <n-form-item label-placement="left" :label="t('menu.display')">
          <n-select
            size="small"
            v-model:value="displayValue"
            max-tag-count="responsive"
            multiple
            :options="displayOptions"
          />
        </n-form-item>
        <n-space>
          <n-button size="tiny">{{ $t("menu.display") }}</n-button>
          <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
          <n-button @click="showModal = false" size="tiny">{{
            $t("menu.cancel")
          }}</n-button>
        </n-space>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { NSelect } from "naive-ui";
import { reactive, h, ref } from "vue";
import { useI18n } from "vue-i18n";
import { VxeGridProps } from "vxe-table";

const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });

const gridOptions = reactive<VxeGridProps<any>>({
  border: true,
  height: "300",
  maxHeight: "500",
  columns: [
    {
      title: t("menu.eventName"),
      field: "eventName",
      children: [
        {
          field: "eventName"
        }
      ]
    },
    {
      title: t("menu.startDateTimeLocal"),
      field: "startDateTimeLocal",
      children: [
        {
          field: "startDateTimeLocal"
        }
      ]
    },
    {
      title: t("menu.elapsedTime"),
      field: "elapsedTime",
      children: [
        {
          field: "elapsedTime",
          slots: {
            header() {
              return h(NSelect, {
                modelValue: elapsedTime.value,
                placeholder: "",
                defaultValue: "ms",
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
      title: t("menu.pi"),
      field: "pi",
      children: [
        {
          field: "pi",
          slots: {
            header() {
              return h(NSelect, {
                modelValue: pi.value,
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
    }
  ],
  data: [
    {
      id: 10001,
      eventName: "Fall-Off #1 (原始)",
      startDateTimeLocal: "2023/12/4 17:36:41",
      elapsedTime: "2265.61",
      pi: "18.2069"
    },
    {
      id: 10002,
      eventName: "Fall-Off #1 (定井储+径向复合+无限大)",
      startDateTimeLocal: "2023/12/4 17:36:41",
      elapsedTime: "2265.61",
      pi: "18.1105"
    },
    {
      id: 10003,
      eventName: "Fall-Off #1 (变井储+径向复合+无限大)",
      startDateTimeLocal: "2023/12/4 17:36:41",
      elapsedTime: "2265.61",
      pi: "18.1277"
    }
  ]
});

const elapsedTime = ref("hr");
const pi = ref("ms");

const displayValue = ref(["startDateTimeLocal"]);
const displayOptions = ref([
  { label: t("menu.startDateTimeLocal"), value: "startDateTimeLocal" },
  { label: t("menu.elapsedTime"), value: "elapsedTime" },
  { label: "PI(pi)", value: "pi" },
  { label: "PI(p*)", value: "p*" },
  { label: "PI(last p)", value: "lastp" },
  { label: "PI(p@72 hr)", value: "phr" },
  { label: "PI(p average)", value: "paverage" },
  { label: "PI(p@1 hr raw)", value: "phrraw" },
  { label: "PI(p end of radial)", value: "pendofradial" }
]);
</script>
<style lang="scss" scoped>
.productivityIndex {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: $dialogBg;
  &-button {
    width: 100%;
    display: flex;
    padding: 12px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .n-form-item {
      min-width: 250px;
    }
    .n-space {
      .n-button {
        margin-left: 12px !important;
        width: 80px;
      }
    }
  }
}
</style>
