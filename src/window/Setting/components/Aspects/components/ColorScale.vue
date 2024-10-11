<template>
  <div class="colorScales">
    <n-card class="colorScales-tool">
      <n-grid :x-gap="18" :y-gap="18" :cols="5">
        <n-grid-item span="2" class="firstTool">
          <n-select :options="selectOption"></n-select>
          <n-checkbox> {{ $t("menu.default") }} </n-checkbox>
        </n-grid-item>
        <n-grid-item
          ><n-button>{{ $t("menu.rename") }}</n-button></n-grid-item
        >
        <n-grid-item
          ><n-button>{{ $t("menu.import") }}</n-button></n-grid-item
        >
        <n-grid-item
          ><n-button>{{ $t("menu.add") }}</n-button></n-grid-item
        >
        <n-grid-item span="3"
          ><n-button>{{ $t("menu.retrieve") }}</n-button>
        </n-grid-item>
        <n-grid-item
          ><n-button>{{ $t("menu.export") }}</n-button></n-grid-item
        >
        <n-grid-item
          ><n-button>{{ $t("menu.remove") }}</n-button></n-grid-item
        >
      </n-grid>
    </n-card>
    <div class="colorScales-table">
      <div class="table">
        <div class="table-left">
          <vxe-grid ref="gridRef" v-bind="gridOptions">
            <template #edit_value="{ row }">
              <n-input v-model:value="row.value"></n-input>
            </template>
            <template #default_color="{ row }">
              <n-color-picker
                v-model:value="row.color"
                :show-alpha="false"
              ></n-color-picker>
            </template>
          </vxe-grid>
        </div>
        <div class="table-right">
          <n-button>{{ $t("menu.insert") }}</n-button>
          <n-button>{{ $t("menu.remove") }}</n-button>
          <n-button>{{ $t("menu.uniform") }}</n-button>
          <n-checkbox>
            {{ $t("menu.interpolate") }}
          </n-checkbox>
          <n-form-item :label="$t('menu.naValueColor')">
            <n-color-picker :show-alpha="false"></n-color-picker>
          </n-form-item>
        </div>
      </div>
      <div class="colorbar"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NSelect } from "naive-ui";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { VxeGridProps } from "vxe-table";

const { t } = useI18n();

const selectOption = computed(() => [
  { label: t("menu.rainbowDefault"), value: "rainbowDefault" },
  { label: t("menu.oilSaturation"), value: "oilSaturation" },
  { label: t("menu.gasSaturation"), value: "gasSaturation" },
  { label: t("menu.waterSaturation"), value: "waterSaturation" }
]);

const gridOptions = reactive<VxeGridProps<any>>({
  height: "auto",
  keepSource: true,
  editConfig: {
    trigger: "click",
    mode: "row"
  },
  columns: [
    {
      field: "value",
      title: t("menu.value"),
      editRender: {},
      slots: { edit: "edit_value" }
    },
    {
      field: "color",
      title: t("menu.color"),
      width: 120,
      slots: { default: "default_color" }
    }
  ],
  data: [
    {
      id: 10001,
      value: 1.0,
      color: "#E43F3F"
    },
    {
      id: 10002,
      value: 2.24553,
      color: "#4D79D9"
    },
    {
      id: 10003,
      value: 3.2452,
      color: "#CF20C0"
    },
    {
      id: 10004,
      value: 0.24532,
      color: "#D9E82D"
    },
    {
      id: 10005,
      value: 1.24532,
      color: "#3AE061"
    },
    {
      id: 10006,
      value: 0.0,
      color: "#3EF4F4"
    }
  ]
});
</script>

<style scoped lang="scss">
.colorScales {
  height: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  &-tool {
    height: 75px;
    :deep(.n-card__content) {
      padding: 6px;
      .n-grid {
        height: 100%;
        .firstTool {
          display: flex;
          align-items: center;
          .n-select {
            flex: 1;
            margin-right: 6px;
          }
        }
      }
    }
  }
  &-table {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    margin-top: 12px;
    .table {
      flex: 1;
      overflow: hidden;
      width: 100%;
      display: flex;
      .table-left {
        flex: 1;
        overflow: hidden;
      }
      .table-right {
        padding: 0 12px;
        @include flex-column;
        > .n-button {
          width: 100%;
          margin-bottom: 6px;
        }
        .n-color-picker {
          width: 100%;
        }
      }
    }
    .colorbar {
      height: 24px;
      margin: 24px 0;
      border: 1px solid rgba(0, 0, 0, 0.15);
      background: linear-gradient(
        90deg,
        #e43f3f 0%,
        #4d79d9 30%,
        #cf20c0 45%,
        #d9e82d 60%,
        #3ae061 75%,
        #3ef4f4 100%
      );
    }
  }
}
</style>
