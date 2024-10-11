<template>
  <Dialog
    v-model="showManual"
    :title="$t('menu.manual')"
    height="380"
    width="470"
    id="Manual"
  >
    <div class="manual">
      <div class="manual-card">
        <vxe-card :title="$t('menu.xProperty')">
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item :label="$t('menu.measure')" path="xMeasure">
              <n-select v-model:value="formData.xMeasure" disabled />
            </n-form-item>
            <n-form-item :label="$t('menu.min')" path="xMin">
              <n-input-group>
                <n-input v-model:value="formData.xMin" placeholder=" " />
                <n-popselect
                  v-model:value="formData.xMinUnit"
                  :options="xUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.xMinUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item :label="$t('menu.max')" path="xMax">
              <n-input-group>
                <n-input v-model:value="formData.xMax" placeholder=" " />
                <n-popselect
                  v-model:value="formData.xMaxUnit"
                  :options="xUnitOptions"
                  size="small"
                  trigger="click"
                >
                  <n-button>{{ formData.xMaxUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
          </n-form>
          <n-button class="defaultBtn" size="tiny">{{
            $t("menu.default")
          }}</n-button>
        </vxe-card>
        <vxe-card :title="$t('menu.yProperty')">
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            :model="formData"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item :label="$t('menu.measure')" path="yMeasure">
              <n-select v-model:value="formData.yMeasure" disabled />
            </n-form-item>
            <n-form-item :label="$t('menu.min')" path="yMin">
              <n-input-group>
                <n-input v-model:value="formData.yMin" placeholder=" " />
                <n-popselect
                  v-model:value="formData.yMinUnit"
                  :options="yUnitOptions"
                  trigger="click"
                >
                  <n-button>{{ formData.yMinUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
            <n-form-item :label="$t('menu.max')" path="yMax">
              <n-input-group>
                <n-input v-model:value="formData.yMax" placeholder=" " />
                <n-popselect
                  v-model:value="formData.yMaxUnit"
                  :options="yUnitOptions"
                  size="small"
                  trigger="click"
                >
                  <n-button>{{ formData.yMaxUnit }}</n-button>
                </n-popselect>
              </n-input-group>
            </n-form-item>
          </n-form>
          <n-button class="defaultBtn" size="tiny">{{
            $t("menu.default")
          }}</n-button>
        </vxe-card>
      </div>
      <div class="manual-button">
        <n-button size="tiny" @click="showManual = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
        <n-button size="tiny">{{ $t("menu.apply") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";

const showManual = defineModel({ type: Boolean, default: false });

const formData = reactive({
  xMeasure: "Time",
  yMeasure: "Pressure",
  xMin: "",
  xMax: "",
  yMin: "",
  yMax: "",
  xMinUnit: "hr",
  xMaxUnit: "hr",
  yMinUnit: "MPa",
  yMaxUnit: "MPa"
});

const xUnitOptions = [
  { label: "ms", value: "ms" },
  { label: "sec", value: "sec" },
  { label: "min", value: "min" },
  { label: "hr", value: "hr" },
  { label: "day", value: "213" },
  { label: "Week", value: "Week" },
  { label: "Month", value: "Month" },
  { label: "Year", value: "Year" }
];

const yUnitOptions = [
  { label: "Pa", value: "Pa" },
  { label: "kPa", value: "kPa" },
  { label: "psia", value: "psia" },
  { label: "atm", value: "atm" },
  { label: "bara", value: "bara" },
  { label: "kg/cm²", value: "kg/cm²" },
  { label: "m", value: "m" },
  { label: "psig", value: "psig" },
  { label: "barg", value: "barg" },
  { label: "MPa", value: "MPa" },
  { label: "kPag", value: "kPag" }
];

onMounted(() => {
  console.log("manual");
});
</script>
<style lang="scss" scoped>
.manual {
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  background-color: $dialogBg;
  flex-direction: column;
  &-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    :deep(.vxe-card) {
      height: calc(50% - 6px);
      .vxe-card--body-content {
        position: relative;
        overflow: hidden;
      }
    }
    :deep(.n-form) {
      width: 70%;
    }
  }
  &-button {
    display: inline-block;
    margin-top: 12px;
    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
  .defaultBtn {
    position: absolute;
    bottom: 20%;
    right: 20px;
  }
}
</style>
