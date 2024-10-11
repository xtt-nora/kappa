<template>
  <vxe-card class="plot-card">
    <div class="draw-icon">
      <div class="drop">
        <Drop
          v-for="(item, index) in iconOptions"
          :key="index"
          :icon="item.icon"
          :dropOption="item.dropOption"
          size="24"
        />
      </div>
    </div>
    <div class="echart-area">
      <div class="chart" id="chart" ref="chartRef"></div>
      <Panel :chart-instance="chartInstance" />
    </div>
    <div>{{ $t("menu.depthvsbhp") }}</div>
    <vxe-card :title="$t('menu.result')">
      <div class="result-top">
        <div class="line">
          <div>{{ $t("menu.lines") }}</div>
          <div class="box">
            <div class="licon">
              <SvgIcon name="PTA_LoadQ" size="24"></SvgIcon>
              <SvgIcon name="PTA_LoadQ" size="24"></SvgIcon>
              <SvgIcon name="PTA_LoadQ" size="24"></SvgIcon>
            </div>
            <n-form
              ref="formRef"
              label-width="auto"
              size="small"
              :model="formData"
              require-mark-placement="right-hanging"
              label-placement="left"
            >
              <n-form-item :label="t('menu.slope')">
                <n-space :size="5">
                  <n-input-group>
                    <n-input v-model:value="formData.slope" placeholder=" " />
                    <n-popselect
                      v-model:value="formData.slopeUnit"
                      :options="cumOptions"
                      trigger="click"
                    >
                      <n-button>{{ formData.slopeUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-space>
              </n-form-item>
              <n-form-item :label="t('menu.intercept')">
                <n-space :size="5">
                  <n-input-group>
                    <n-input
                      v-model:value="formData.intercept"
                      placeholder=" "
                    />
                    <n-popselect
                      v-model:value="formData.interceptUnit"
                      :options="cumOptions"
                      trigger="click"
                    >
                      <n-button>{{ formData.interceptUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-space>
              </n-form-item>
            </n-form>
          </div>
        </div>
      </div>
      <div class="result-bottom">
        <div class="intersections">
          <div>{{ $t("menu.intersections") }}</div>
          <div class="box">
            <div class="licon">
              <SvgIcon name="PTA_LoadQ" size="24"></SvgIcon>
              <SvgIcon name="PTA_LoadQ" size="24"></SvgIcon>
              <SvgIcon name="PTA_LoadQ" size="24"></SvgIcon>
            </div>
            <n-form
              ref="formRef"
              label-width="auto"
              size="small"
              :model="formData"
              require-mark-placement="right-hanging"
              label-placement="left"
            >
              <n-form-item :label="t('menu.depth')">
                <n-space :size="5">
                  <n-input-group>
                    <n-input v-model:value="formData.depth" placeholder=" " />
                    <n-popselect
                      v-model:value="formData.depthUnit"
                      :options="cumOptions"
                      trigger="click"
                    >
                      <n-button>{{ formData.depthUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-space>
              </n-form-item>
              <n-form-item :label="t('menu.pressure')">
                <n-space :size="5">
                  <n-input-group>
                    <n-input
                      v-model:value="formData.pressure"
                      placeholder=" "
                    />
                    <n-popselect
                      v-model:value="formData.pressureUnit"
                      :options="cumOptions"
                      trigger="click"
                    >
                      <n-button>{{ formData.pressureUnit }}</n-button>
                    </n-popselect>
                  </n-input-group>
                </n-space>
              </n-form-item>
            </n-form>
          </div>
        </div>
      </div>
    </vxe-card>
  </vxe-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import echarts from "@/components/Echarts/config";
import Drop from "./Drop.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const chartRef = ref<HTMLElement | null>(null);
const iconOptions = ref([
  {
    icon: "PTA_LoadQ",
    key: "PTA_LoadQ",
    dropOption: [
      {
        label: t("regression"),
        key: "marina bay sands"
      },
      {
        label: t("draw"),
        key: "brown's hotel, london"
      },
      {
        label: t("modify"),
        key: "atlantis nahamas, nassau",
        disabled: true
      },
      {
        label: t("delete"),
        key: "the beverly hills hotel, los angeles",
        disabled: true
      }
    ]
  },
  {
    icon: "PTA_LoadP",
    key: "PTA_LoadP",
    dropOption: [
      {
        label: t("regression"),
        key: "marina bay sands",
        disabled: true
      },
      {
        label: t("draw"),
        key: "brown's hotel, london"
      },
      {
        label: t("modify"),
        key: "atlantis nahamas, nassau"
      },
      {
        label: t("delete"),
        key: "the beverly hills hotel, los angeles"
      }
    ]
  },
  {
    icon: "PTA_ExtractDP",
    key: "PTA_ExtractDP",
    dropOption: [
      {
        label: t("regression"),
        key: "marina bay sands",
        disabled: true
      },
      {
        label: t("draw"),
        key: "brown's hotel, london"
      },
      {
        label: t("modify"),
        key: "atlantis nahamas, nassau"
      },
      {
        label: t("delete"),
        key: "the beverly hills hotel, los angeles"
      }
    ]
  }
]);

const options = reactive({
  grid: {
    right: "10%",
    show: true
  },
  xAxis: [
    {
      show: false,
      type: "category",
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      position: "left",
      axisTick: {
        show: true,
        inside: false
      },
      axisLabel: {
        inside: false,
        margin: 20
      },
      axisLine: {
        show: true
      },
      min: 0,
      max: 1,
      minorTick: {
        show: true
      },
      inverse: true,
      splitLine: {
        show: false
      }
    },
    {
      type: "value",
      position: "left",
      alignTicks: true,
      offset: 55,
      axisLine: {
        show: true
      },
      axisTick: {
        show: true,
        inside: true
      },
      axisLabel: {
        show: false,
        formatter: "{value}"
      },
      min: 0,
      max: 1,
      minorTick: {
        show: true
      },
      inverse: true,
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: "Evaporation",
      type: "bar"
    },
    {
      name: "Precipitation",
      type: "bar",
      yAxisIndex: 1
    }
  ]
});
const formData = reactive({
  slope: "∞",
  slopeUnit: "MPa/m",
  intercept: "-∞",
  interceptUnit: "MPa",
  depth: "0.00000",
  depthUnit: "m",
  pressure: "0.00000",
  pressureUnit: "MPa"
});
const cumOptions = [
  { label: "bscf", value: "bscf" },
  { label: "cl", value: "cl" },
  { label: "cm³", value: "cm³" },
  { label: "liters", value: "liters" },
  { label: "m³", value: "m³" },
  { label: "ml", value: "ml" },
  { label: "Mm³", value: "Mm³" },
  { label: "MMm³", value: "MMm³" },
  { label: "MScf", value: "MScf" },
  { label: "MMScf", value: "MMScf" },
  { label: "MSTB", value: "MSTB" },
  { label: "MMSTB", value: "MMSTB" },
  { label: "scf", value: "scf" },
  { label: "STB", value: "STB" },
  { label: "U.S. gal", value: "U.S. gal" }
];
onMounted(() => {
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value);
    chart.setOption(options);
  }
});
function handleSelect(key: string | number) {}
</script>

<style lang="scss" scoped>
.echart-area {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.draw-icon {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  .drop {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }
}
.chart {
  width: 100%;
  height: 300px;
}
.box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .licon {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.line,
.intersections {
  margin: 0 10px;
}
::v-deep .panel {
  height: 285px;
  overflow: hidden;
}
::v-deep .vxe-card.is--padding .vxe-card--body-content,
.vxe-card.is--padding .vxe-card--body-left,
.vxe-card.is--padding .vxe-card--body-right,
.vxe-card.is--padding .vxe-card--footer,
.vxe-card.is--padding .vxe-card--header {
  padding: 0;
}
</style>
