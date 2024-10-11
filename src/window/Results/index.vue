<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.results')"
    width="600"
    height="auto"
  >
    <div class="result">
      <div class="result-card">
        <div class="content">
          <div class="table">
            <div class="dataTable">
              <vxe-card :title="analysis">
                <CollapseForm
                  :default-expanded-names="[
                    'analysisSum',
                    'mainResults',
                    'diagnostic',
                    'descriptionModel',
                    'wellAndWellbore',
                    'reservoirAndBoundary',
                    'modelResults',
                    'loglogSpecialized'
                  ]"
                  :form="selectData"
                  class="form"
                />
              </vxe-card>
            </div>
            <div class="control">
              <vxe-card>
                <n-form-item :label="$t('menu.show')" label-placement="left">
                  <n-select
                    :consistent-menu-width="false"
                    :value="form.showValue"
                    size="tiny"
                    :options="showOptions"
                    @update:value="handleUpdateValue"
                  />
                  <!-- <n-input disabled placeholder=" "></n-input> -->
                  <n-checkbox v-model:checked="form.showShortnames">
                    {{ $t("menu.showShortnames") }}
                  </n-checkbox>
                </n-form-item>
              </vxe-card>
            </div>
          </div>
        </div>
      </div>
      <div class="result-button">
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import CollapseForm from "@/components/CollapseForm/index.vue";
import { onMounted } from "vue";

const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });
const analysis = ref("Analysis 1");
const collapseForm = computed(() => [
  {
    title: t("menu.analysisSum"),
    name: "analysisSum",
    children: [
      {
        type: "input",
        label: t("menu.analysisName"),
        value: "Analysis"
      },
      {
        type: "input",
        label: t("menu.wellReference"),
        value: "Tested Well"
      },
      {
        type: "input",
        label: t("menu.phaseReference"),
        value: "Water"
      },
      {
        type: "input",
        label: t("menu.PhasesPVT"),
        value: "Water"
      },
      {
        type: "input",
        label: t("menu.productionActive"),
        value: "Production"
      },
      {
        type: "input",
        label: t("menu.gaugeActive"),
        value:
          "HD4-63井流梯+注水井压降+静梯测试电压数据-Enduro-NG-3093（2023.12.03-2023.12.10大港广茂）"
      },
      {
        type: "input",
        label: t("menu.typeAnalysis"),
        value: "Standard"
      },
      {
        type: "input",
        label: t("menu.modelActive"),
        value: "Analytical"
      }
    ]
  },
  {
    title: t("menu.mainResults"),
    name: "mainResults",
    children: [
      {
        type: "input",
        label: t("menu.source"),
        value: "Analusis tools"
      },
      {
        type: "group",
        label: t("menu.transmissibility"),
        value: "52.8814",
        options: [
          { label: "m³", value: "m³" },
          { label: "md.ft", value: "md.ft" },
          { label: "md.m", value: "md.m" }
        ],
        unitValue: "md.m"
      },
      {
        type: "group",
        label: t("menu.permeability"),
        value: "9.61480",
        options: [
          { label: "μd", value: "μd" },
          { label: "μm²", value: "μm²" },
          { label: "cm²", value: "cm²" },
          { label: "Darcy", value: "Darcy" },
          { label: "m²", value: "m²" },
          { label: "md", value: "md" },
          { label: "nd", value: "nd" }
        ],
        unitValue: "md"
      },
      {
        type: "group",
        label: t("menu.mobility"),
        value: "21.3714",
        options: [
          { label: "μm²/cp", value: "μm²/cp" },
          { label: "μm²/Pa.s", value: "μm²/Pa.s" },
          { label: "cm²/cp", value: "cm²/cp" },
          { label: "cm²/Pa.s", value: "cm²/Pa.s" },
          { label: "Darcy/cp", value: "Darcy/cp" },
          { label: "Darcy/Pa.s", value: "Darcy/Pa.s" },
          { label: "m²/cp", value: "m²/cp" },
          { label: "m²/Pa.s", value: "m²/Pa.s" },
          { label: "md/cp", value: "md/cp" },
          { label: "md/Pa.s", value: "md/Pa.s" }
        ],
        unitValue: "md"
      },
      {
        type: "group",
        label: t("menu.skin"),
        value: "-5.11849",
        options: []
      },
      {
        type: "input",
        label: t("menu.initialPressure"),
        value: "---"
      },
      {
        type: "group",
        label: t("menu.wellBoreStorage"),
        value: "0.130858",
        options: [
          { label: "bbl/psi", value: "bbl/psi" },
          { label: "m²", value: "m²" },
          { label: "m³/bar", value: "m³/bar" },
          { label: "m³/kPa", value: "m³/kPa" },
          { label: "m³/MPa", value: "m³/MPa" },
          { label: "m³/Pa", value: "m³/Pa" },
          { label: "m³cm²/kg", value: "m³cm²/kg" }
        ],
        unitValue: "m³/MPa"
      },
      {
        type: "input",
        label: t("menu.volumePore"),
        value: "---"
      }
    ]
  },
  {
    title: t("menu.diagnostic"),
    name: "diagnostic",
    children: [
      {
        type: "input",
        label: t("step.storageWellbore"),
        value: t("menu.constant")
      },
      {
        type: "input",
        label: t("menu.well"),
        value: t("menu.finiteRadius")
      },
      {
        type: "input",
        label: t("menu.reservoir"),
        value: t("menu.homogeneous")
      },
      {
        type: "input",
        label: t("menu.boundary"),
        value: t("menu.infinite")
      },
      {
        type: "group",
        label: t("menu.rateReference"),
        value: "297.000",
        options: [
          { label: "B/D", value: "B/D" },
          { label: "cf/D", value: "cf/D" },
          { label: "cf/s", value: "cf/s" },
          { label: "cm³/sec", value: "cm³/sec" },
          { label: "l/min", value: "l/min" },
          { label: "m³/D", value: "m³/D" },
          { label: "m³/hr", value: "m³/hr" },
          { label: "m³/min", value: "m³/min" },
          { label: "m³/sec", value: "m³/sec" },
          { label: "MB/D", value: "MB/D" },
          { label: "Mcf/D", value: "Mcf/D" },
          { label: "Mm³/D", value: "Mm³/D" },
          { label: "Mm³/hr", value: "Mm³/hr" },
          { label: "MMB/D", value: "MMB/D" },
          { label: "MMm³/D", value: "MMm³/D" },
          { label: "U.K. gal/hr", value: "U.K. gal/hr" },
          { label: "U.k. gal/min", value: "U.k. gal/min" },
          { label: "U.S. gal/hr", value: "U.S. gal/hr" },
          { label: "U.S. gal/min", value: "U.S. gal/min" }
        ],
        unitValue: "m³/D"
      },
      {
        type: "group",
        label: t("menu.startExtraction"),
        value: "0.00000",
        options: [
          { label: "day", value: "day" },
          { label: "hr", value: "hr" },
          { label: "min", value: "min" },
          { label: "Month", value: "Month" },
          { label: "sec", value: "sec" },
          { label: "Week", value: "Week" },
          { label: "Year", value: "Year" }
        ],
        unitValue: "hr"
      },
      {
        type: "group",
        label: t("menu.pDt"),
        value: "64.3047",
        options: [
          { label: "atm", value: "atm" },
          { label: "bara", value: "bara" },
          { label: "barg", value: "barg" },
          { label: "kg/cm²", value: "kg/cm²" },
          { label: "kPa", value: "kPa" },
          { label: "kPag", value: "kPag" },
          { label: "m", value: "m" },
          { label: "MPa", value: "MPa" },
          { label: "Pa", value: "Pa" },
          { label: "psia", value: "psia" },
          { label: "psig", value: "psig" }
        ],
        unitValue: "MPa"
      },
      {
        type: "group",
        label: t("menu.indexProductivity"),
        value: "8207.37",
        options: [
          { label: "[m³/D]/MPa", value: "[m³/D]/MPa" },
          { label: "[m³/sec]/MPa", value: "[m³/sec]/MPa" }
        ],
        unitValue: "[m³/D]/MPa"
      },
      {
        type: "group",
        label: t("menu.lastProductivity"),
        value: "18.2069",
        options: [
          { label: "[m³/D]/MPa", value: "[m³/D]/MPa" },
          { label: "[m³/sec]/MPa", value: "[m³/sec]/MPa" }
        ],
        unitValue: "[m³/D]/MPa"
      },
      {
        type: "group",
        label: t("menu.matchTime"),
        value: "20.0521",
        options: [
          { label: "1/sec", value: "1/sec" },
          { label: "1/min", value: "1/min" },
          { label: "1/hr", value: "1/hr" },
          { label: "1/day", value: "1/day" },
          { label: "1/week", value: "1/week" },
          { label: "1/month", value: "1/month" },
          { label: "1/year", value: "1/year" }
        ],
        unitValue: "1/hr"
      },
      {
        type: "group",
        label: t("menu.matchPressure"),
        value: "0.207628",
        options: [
          { label: "1/(kg/cm²)", value: "1/(kg/cm²)" },
          { label: "1/atm", value: "1/atm" },
          { label: "1/bara", value: "1/bara" },
          { label: "1/kPa", value: "1/kPa" },
          { label: "1/m", value: "1/m" },
          { label: "1/MPa", value: "1/MPa" },
          { label: "1/Pa", value: "1/Pa" },
          { label: "1/psia", value: "1/psia" }
        ],
        unitValue: "1/MPa"
      },
      {
        type: "group",
        label: t("menu.storageWellbore"),
        value: "2.23778",
        options: [
          { label: "bbl/psi", value: "bbl/psi" },
          { label: "m²", value: "m²" },
          { label: "m³/bar", value: "m³/bar" },
          { label: "m³/kPa", value: "m³/kPa" },
          { label: "m³/MPa", value: "m³/MPa" },
          { label: "m³/Pa", value: "m³/Pa" },
          { label: "m³cm²/kg", value: "m³cm²/kg" }
        ],
        unitValue: "m³/MPa"
      },
      {
        type: "group",
        label: t("menu.transmissibility"),
        value: "52.8814",
        options: [
          { label: "m³", value: "m³" },
          { label: "md.ft", value: "md.ft" },
          { label: "md.m", value: "md.m" }
        ],
        unitValue: "md.m"
      },
      {
        type: "group",
        label: t("menu.permeability"),
        value: "9.61680",
        options: [
          { label: "μd", value: "μd" },
          { label: "μm²", value: "μm²" },
          { label: "cm²", value: "cm²" },
          { label: "Darcy", value: "Darcy" },
          { label: "m²", value: "m²" },
          { label: "md", value: "md" },
          { label: "nd", value: "nd" }
        ],
        unitValue: "md"
      },

      {
        type: "group",
        label: t("menu.mobility"),
        value: "117.543",
        options: [
          { label: "μm²/cp", value: "μm²/cp" },
          { label: "μm²/Pa.s", value: "μm²/Pa.s" },
          { label: "cm²/cp", value: "cm²/cp" },
          { label: "cm²/Pa.s", value: "cm²/Pa.s" },
          { label: "Darcy/cp", value: "Darcy/cp" },
          { label: "Darcy/Pa.s", value: "Darcy/Pa.s" },
          { label: "m²/cp", value: "m²/cp" },
          { label: "m²/Pa.s", value: "m²/Pa.s" },
          { label: "md/cp", value: "md/cp" },
          { label: "md/Pa.s", value: "md/Pa.s" }
        ],
        unitValue: "md/cp"
      },
      {
        type: "group",
        label: t("menu.khµ"),
        value: "117.543",
        options: [
          { label: "[md.m]/cp", value: "[md.m]/cp" },
          { label: "m³/[Pa.sec]", value: "m³/[Pa.sec]" }
        ],
        unitValue: "m³/[Pa.sec]"
      },
      {
        type: "input",
        label: t("menu.skin"),
        value: "-5.11849"
      },
      {
        type: "group",
        label: t("menu.pSkin"),
        value: "-24.6522",
        options: [
          { label: "atm", value: "atm" },
          { label: "bara", value: "bara" },
          { label: "barg", value: "barg" },
          { label: "kg/cm²", value: "kg/cm²" },
          { label: "kPa", value: "kPa" },
          { label: "kPag", value: "kPag" },
          { label: "m", value: "m" },
          { label: "MPa", value: "MPa" },
          { label: "Pa", value: "Pa" },
          { label: "psia", value: "psia" },
          { label: "psig", value: "psig" }
        ],
        unitValue: "MPa"
      },
      {
        type: "group",
        label: t("menu.radiusInvestigation"),
        value: "518.557",
        options: [
          { label: "0.1 in", value: "0.1 in" },
          { label: "cm", value: "cm" },
          { label: "ft", value: "ft" },
          { label: "in", value: "in" },
          { label: "m", value: "m" }
        ],
        unitValue: "m"
      },
      {
        type: "group",
        label: t("menu.volumeTested"),
        value: "7.80577E+5",
        options: [
          { label: "barrels", value: "barrels" },
          { label: "cl", value: "cl" },
          { label: "cm³", value: "cm³" },
          { label: "foot³", value: "foot³" },
          { label: "liters", value: "liters" },
          { label: "m³", value: "m³" },
          { label: "Mcf", value: "Mcf" },
          { label: "ml", value: "ml" },
          { label: "Mm³", value: "Mm³" },
          { label: "MMB", value: "MMB" },
          { label: "MMcf", value: "MMcf" },
          { label: "MMm³", value: "MMm³" },
          { label: "U.S. gal", value: "U.S. gal" }
        ],
        unitValue: "m³"
      }
    ]
  },
  {
    title: t("menu.descriptionModel"),
    name: "descriptionModel",
    children: [
      {
        type: "input",
        label: t("menu.modelActive"),
        value: "Analytical"
      },
      {
        type: "input",
        label: t("menu.wellbore"),
        value: "Constant"
      },
      {
        type: "input",
        label: t("menu.well"),
        value: "Vertical"
      },
      {
        type: "input",
        label: t("menu.reservoir"),
        value: "Homogeneous"
      },
      {
        type: "input",
        label: t("menu.boundary"),
        value: "Infinite"
      },
      {
        type: "input",
        label: t("menu.wellsOther"),
        value: "No"
      },
      {
        type: "input",
        label: t("menu.dependentRate"),
        value: "No"
      },
      {
        type: "input",
        label: t("menu.dependentTime"),
        value: "No"
      }
    ]
  },
  {
    title: t("menu.modelWell"),
    name: "wellAndWellbore",
    children: [
      {
        type: "input",
        label: t("menu.wellboreModel"),
        value: t("menu.constant")
      },
      {
        type: "group",
        label: t("menu.wellBoreStorage"),
        value: "0.130858",
        options: [
          { label: "bbl/psi", value: "bbl/psi" },
          { label: "m²", value: "m²" },
          { label: "m³/bar", value: "m³/bar" },
          { label: "m³/kPa", value: "m³/kPa" },
          { label: "m³/MPa", value: "m³/MPa" },
          { label: "m³/Pa", value: "m³/Pa" },
          { label: "m³cm²/kg", value: "m³cm²/kg" }
        ],
        unitValue: "m³/MPa"
      },
      {
        type: "input",
        label: t("menu.wellType"),
        value: t("menu.vertical")
      },
      {
        type: "input",
        label: t("menu.skin"),
        value: "-5.11849"
      },
      {
        type: "input",
        label: t("menu.totalSkin"),
        value: "-5.11849"
      },
      {
        type: "group",
        label: t("menu.totalSkinPress"),
        value: "0.130858",
        options: [
          { label: "atm", value: "atm" },
          { label: "bara", value: "bara" },
          { label: "barg", value: "barg" },
          { label: "kg/cm²", value: "kg/cm²" },
          { label: "kPa", value: "kPa" },
          { label: "kPag", value: "kPag" },
          { label: "m", value: "m" },
          { label: "MPa", value: "MPa" },
          { label: "Pa", value: "Pa" },
          { label: "psia", value: "psia" },
          { label: "psig", value: "psig" }
        ],
        unitValue: "MPa"
      }
    ]
  },
  {
    title: t("menu.modelReservoir"),
    name: "reservoirAndBoundary",
    children: [
      {
        type: "input",
        label: t("menu.typeReservoir"),
        value: t("menu.homogeneous")
      },
      {
        type: "input",
        label: t("menu.typeBoundary"),
        value: t("menu.infinite")
      },
      {
        type: "group",
        label: t("menu.initialPressure"),
        value: "41.9532",
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
        type: "group",
        label: t("menu.transmissibility"),
        value: "320.869",
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
        unitValue: "sec"
      },
      {
        type: "group",
        label: t("menu.permeability"),
        value: "58.3398",
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
        unitValue: "ms"
      },
      {
        type: "group",
        label: t("menu.thickness"),
        value: "5.50000",
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
        unitValue: "day"
      },
      {
        type: "group",
        label: t("menu.porosity"),
        value: "0.168",
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
        unitValue: ""
      }
      // {
      //   type: "group",
      //   label: t("menu.totalCompressibility"),
      //   value: "7.41712",
      //   options: [
      //     { label: "ms", value: "ms" },
      //     { label: "sec", value: "sec" },
      //     { label: "min", value: "min" },
      //     { label: "hr", value: "hr" },
      //     { label: "day", value: "213" },
      //     { label: "Week", value: "Week" },
      //     { label: "Month", value: "Month" },
      //     { label: "Year", value: "Year" }
      //   ],
      //   unitValue: "ms"
      // }
    ]
  },
  {
    title: t("menu.modelResults"),
    name: "modelResults",
    children: [
      {
        type: "group",
        label: t("menu.tmax"),
        value: "2424.00",
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
      }
    ]
  },
  {
    title: t("menu.loglogSpecialized"),
    name: "loglogSpecialized",
    children: [
      {
        type: "group",
        label: t("menu.matchPressure"),
        value: "2.07628E-4",
        options: [
          { label: "1/(kg/cm²)", value: "1/(kg/cm²)" },
          { label: "1/atm", value: "1/atm" },
          { label: "1/bara", value: "1/bara" },
          { label: "1/kPa", value: "1/kPa" },
          { label: "1/m", value: "1/m" },
          { label: "1/MPa", value: "1/MPa" },
          { label: "1/Pa", value: "1/Pa" },
          { label: "1/psia", value: "1/psia" }
        ],
        unitValue: "1/MPa"
      },
      {
        type: "group",
        label: t("menu.matchTime"),
        value: "77102.9",
        options: [
          { label: "1/sec", value: "1/sec" },
          { label: "1/min", value: "1/min" },
          { label: "1/hr", value: "1/hr" },
          { label: "1/day", value: "1/day" },
          { label: "1/week", value: "1/week" },
          { label: "1/month", value: "1/month" },
          { label: "1/year", value: "1/year" }
        ],
        unitValue: "1/hr"
      },
      {
        type: "group",
        label: t("menu.permeability"),
        value: "9.61480",
        options: [
          { label: "μd", value: "μd" },
          { label: "μm²", value: "μm²" },
          { label: "cm²", value: "cm²" },
          { label: "Darcy", value: "Darcy" },
          { label: "m²", value: "m²" },
          { label: "md", value: "md" },
          { label: "nd", value: "nd" }
        ],
        unitValue: "md"
      }
    ]
  }
]);
let selectData = ref([]);
const form = reactive({
  includeOtherWells: false,
  imposePi: false,
  externalModels: false,
  wellboreModelValue: "changingHegeman",
  useWellIntake: false,
  proxyModelValue: "fracturedHorizontalWithAnomalousDiffusion",
  proxyRateDependentSkin: false,
  proxyTimeDependentSkin: false,
  wellModelValue: "horizontal",
  wellRateDependentSkin: false,
  wellTimeDependentSkin: false,
  reservoirModelValue: "homogeneous",
  horizontalAnisotropy: false,
  useMDDefinition: false,
  boundaryModelValue: "infinite",
  timeSteppingValue: "absolute",
  from: " ",
  simulateUntil: " ",
  tMin: " ",
  tMax: " ",
  ignore: false,
  showValue: "all",
  showShortnames: false
});
const showOptions = [
  { label: t("menu.all"), value: "all" },
  { label: t("menu.analysisSum"), value: "analysisSum" },
  { label: t("menu.mainResults"), value: "mainResults" },
  { label: t("menu.diagnostic"), value: "diagnostic" },
  { label: t("menu.descriptionModel"), value: "descriptionModel" },
  { label: t("menu.wellAndWellbore"), value: "wellAndWellbore" },
  { label: t("menu.reservoirAndBoundary"), value: "reservoirAndBoundary" },
  { label: t("menu.modelResults"), value: "modelResults" },
  { label: t("menu.loglogSpecialized"), value: "loglogSpecialized" }
];
onMounted(() => {
  selectData.value = collapseForm.value;
});
const handleUpdateValue = (value: string) => {
  form.showValue = value;
  if (value === "all") {
    selectData.value = collapseForm.value;
    return;
  }
  // const change = collapseForm.value.find(item => item.name === value)
  selectData.value = [collapseForm.value.find(item => item.name === value)];
  // console.log(value, selectData.value);
};
</script>

<style lang="scss" scoped>
.result {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dialogBg;
  &-card {
    .content {
      min-height: 520px;
      height: 100%;
      border: 1px solid $dialogBorder;
      display: flex;
      .collapse {
        width: 440px;
        padding: 0 4px;

        :deep(.n-collapse) {
          .n-form-item {
            width: 70%;
            .n-form-item-feedback-wrapper {
              display: none;
            }
          }
          .ignoreItem {
            display: flex;
            justify-content: space-between;
            .n-checkbox {
              align-items: center;
            }
          }
        }
      }
      :deep(.table) {
        flex: 1;
        display: flex;
        height: 520px;
        flex-direction: column;
        justify-content: start;
        .n-form-item {
          display: flex;
          justify-content: start;
          flex-wrap: nowrap;
          .n-select {
            max-width: 100px;
          }
          .n-button {
            margin-left: 12px;
          }
          .n-input {
            max-width: 100px;
            margin-left: 12px;
          }
          .n-checkbox {
            margin-left: 12px;
            .n-checkbox__label {
              white-space: nowrap;
            }
          }
          .n-form-item-feedback-wrapper {
            display: none;
          }
        }
        .CollapseForm {
          flex: 1;
        }
      }
      .control {
        height: 60px;
      }
      .dataTable {
        flex: 1;
        overflow: auto;
      }
    }
  }
  &-button {
    display: inline-block;
    padding: 12px;
    box-sizing: border-box;

    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
}
::v-deep .vxe-card {
  height: 100%;
}
</style>
