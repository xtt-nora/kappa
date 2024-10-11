<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.dashboard')"
    width="760"
    height="auto"
  >
    <div class="analyticalDesign">
      <div class="analyticalDesign-card">
        <div class="content">
          <div class="collapse">
            <div class="four">
              <div
                class="four-item"
                v-for="item in leftIcon"
                @click="clickIcon(item.title)"
              >
                <SvgIcon :name="item.name" size="32" />
                <div class="title">{{ item.title }}</div>
              </div>
            </div>
            <div class="two">
              <div class="four-item" v-for="item in leftIcon2">
                <SvgIcon :name="item.name" size="32" />
                <div class="title">{{ item.title }}</div>
              </div>
            </div>
          </div>
          <div class="table">
            <n-form-item label=" " label-placement="left">
              <n-radio-group
                :value="form.results"
                name="radiogroup"
                :on-update:value="radioChoose"
              >
                <n-radio value="trans">
                  {{ $t("menu.trans") }}
                </n-radio>
                <n-radio value="allRes">
                  {{ $t("menu.allRes") }}
                </n-radio>
              </n-radio-group>
              <n-checkbox v-model:checked="form.mainResult">
                {{ $t("menu.mainResult") }}
              </n-checkbox>
            </n-form-item>
            <CollapseForm
              :default-expanded-names="['diagnostic']"
              :form="tormData"
              class="form"
            />
          </div>
        </div>
      </div>
      <div class="analyticalDesign-button">
        <span v-show="form.mainResult">{{ $t("menu.mainFrom") }}</span>
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.close")
        }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import CollapseForm from "@/components/CollapseForm/index.vue";
import { onMounted } from "vue";

const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });
const form = reactive({
  results: "trans",

  mainResult: false
});
const selectTitle = ref("Analysis tools");
const tormData = ref([
  {
    title: t("menu.diagnostic"),
    name: "diagnostic",
    children: [
      {
        type: "group",
        label: t("menu.cType"),
        value: t("menu.constant"),
        options: []
      },
      {
        type: "group",
        label: t("menu.well"),
        value: t("menu.finiteRadius"),
        options: []
      },
      {
        type: "group",
        label: t("menu.reservoir"),
        value: t("menu.homogeneous"),
        options: []
      },
      {
        type: "group",
        label: t("menu.boundary"),
        value: t("menu.infinite"),
        options: []
      },
      {
        type: "group",
        label: t("menu.C"),
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
        label: t("menu.kh"),
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
        label: t("menu.k"),
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
        label: t("menu.skin"),
        value: "-5.11849",
        options: [],
        unitValue: ""
      }
    ]
  }
]);
const leftIcon = [
  {
    name: "WellSketch",
    title: "Analysis tools",
    collapseForm: [
      {
        title: t("menu.diagnostic"),
        name: "diagnostic",
        children: [
          {
            type: "input",
            label: t("menu.cType"),
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
            label: t("menu.C"),
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
            label: t("menu.kh"),
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
            label: t("menu.k"),
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
            type: "input",
            label: t("menu.skin"),
            value: "-5.11849"
          }
        ]
      }
    ],
    collapseFormAll: [
      {
        title: t("menu.diagnostic"),
        name: "diagnostic",
        children: [
          {
            type: "input",
            label: t("menu.cType"),
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
            label: t("menu.qref"),
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
            label: t("menu.extract"),
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
            label: t("menu.PI"),
            value: "8207.37",
            options: [
              { label: "[m³/D]/MPa", value: "[m³/D]/MPa" },
              { label: "[m³/sec]/MPa", value: "[m³/sec]/MPa" }
            ],
            unitValue: "[m³/D]/MPa"
          },
          {
            type: "group",
            label: t("menu.lastP"),
            value: "18.2069",
            options: [
              { label: "[m³/D]/MPa", value: "[m³/D]/MPa" },
              { label: "[m³/sec]/MPa", value: "[m³/sec]/MPa" }
            ],
            unitValue: "[m³/D]/MPa"
          },
          {
            type: "group",
            label: t("menu.tm"),
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
            label: t("menu.pm"),
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
            label: t("menu.C"),
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
            label: t("menu.kh"),
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
            label: t("menu.k"),
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
            label: t("menu.kµ"),
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
          }
        ]
      }
    ]
  },
  {
    name: "WellSketch",
    title: "Analytical",
    collapseForm: [
      {
        title: t("menu.wellAndWellbore"),
        name: "wellAndWellbore",
        children: [
          {
            type: "input",
            label: t("menu.wellboreModel"),
            value: t("menu.constant")
          },
          {
            type: "group",
            label: t("menu.C"),
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
            label: t("menu.well"),
            value: t("menu.vertical")
          },
          {
            type: "input",
            label: t("menu.skin"),
            value: "-5.11849"
          }
        ]
      },
      {
        title: t("menu.reservoirAndBoundary"),
        name: "reservoirAndBoundary",
        children: [
          {
            type: "input",
            label: t("menu.reservoir"),
            value: t("menu.homogeneous")
          },
          {
            type: "group",
            label: t("menu.Pi"),
            value: "40.9822",
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
            label: t("menu.kh"),
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
            label: t("menu.k"),
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
            label: t("menu.h"),
            value: "5.50000",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "km", value: "km" },
              { label: "m", value: "m" },
              { label: "mile", value: "mile" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "input",
            label: t("menu.y"),
            value: "0.168"
          }
        ]
      }
    ],
    collapseFormAll: [
      {
        title: t("menu.wellAndWellbore"),
        name: "wellAndWellbore",
        children: [
          {
            type: "input",
            label: t("menu.wellboreModel"),
            value: t("menu.constant")
          },
          {
            type: "group",
            label: t("menu.C"),
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
            label: t("menu.well"),
            value: t("menu.vertical")
          },
          {
            type: "input",
            label: t("menu.skin"),
            value: "-5.11849"
          }
        ]
      },
      {
        title: t("menu.reservoirAndBoundary"),
        name: "reservoirAndBoundary",
        children: [
          {
            type: "input",
            label: t("menu.reservoir"),
            value: t("menu.homogeneous")
          },
          {
            type: "group",
            label: t("menu.Pi"),
            value: "40.9822",
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
            label: t("menu.kh"),
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
            label: t("menu.k"),
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
            label: t("menu.h"),
            value: "5.50000",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "km", value: "km" },
              { label: "m", value: "m" },
              { label: "mile", value: "mile" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "input",
            label: t("menu.y"),
            value: "0.168"
          }
        ]
      }
    ]
  },
  {
    name: "WellSketch",
    title: "Numerical",
    collapseForm: [],
    collapseFormAll: [
      {
        title: t("menu.testedWell"),
        name: "testedWell",
        children: [
          {
            type: "group",
            label: t("menu.elev"),
            value: "0.00000",
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
            label: t("menu.rw"),
            value: "0.0889",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "64th in", value: "64th in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "m", value: "m" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "group",
            label: t("menu.zw"),
            value: "2.75000",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "64th in", value: "64th in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "m", value: "m" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "group",
            label: t("menu.hw"),
            value: "5.50000",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "64th in", value: "64th in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "m", value: "m" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "group",
            label: t("menu.lw"),
            value: "5.50000",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "64th in", value: "64th in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "m", value: "m" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "input",
            label: t("menu.name"),
            value: t("menu.perforation")
          },
          {
            type: "group",
            label: t("menu.mdStart"),
            value: "5082.00",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "64th in", value: "64th in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "m", value: "m" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "group",
            label: t("menu.mdEnd"),
            value: "5087.50",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "64th in", value: "64th in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "m", value: "m" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "group",
            label: t("menu.perfLength"),
            value: "5.50000",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "64th in", value: "64th in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "m", value: "m" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "input",
            label: t("menu.skin"),
            value: "-5.11849"
          },
          {
            type: "input",
            label: t("menu.wellboreModel"),
            value: t("menu.constant")
          },
          {
            type: "group",
            label: t("menu.C"),
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
            label: t("menu.bottomholeMd"),
            value: "5082.00",
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
            label: t("menu.constraints"),
            value: "",
            options: []
          }
        ]
      },
      {
        title: t("menu.reservoir"),
        name: "reservoir",
        children: [
          {
            type: "group",
            label: t("menu.Pi"),
            value: "40.9822",
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
            type: "input",
            label: t("menu.reservoir"),
            value: t("menu.homogeneous")
          },
          {
            type: "group",
            label: t("menu.kh"),
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
            label: t("menu.k"),
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
            label: t("menu.h"),
            value: "5.50000",
            options: [
              { label: "0.1 in", value: "0.1 in" },
              { label: "cm", value: "cm" },
              { label: "ft", value: "ft" },
              { label: "in", value: "in" },
              { label: "km", value: "km" },
              { label: "m", value: "m" },
              { label: "mile", value: "mile" },
              { label: "mm", value: "mm" }
            ],
            unitValue: "m"
          },
          {
            type: "input",
            label: t("menu.y"),
            value: "0.168"
          },
          {
            type: "input",
            label: t("menu.ntg"),
            value: "1.00000"
          },
          {
            type: "input",
            label: t("menu.kzkr"),
            value: "1.00000"
          },
          {
            type: "group",
            label: t("menu.ks"),
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
      },
      {
        title: t("menu.contourFaults"),
        name: "contourFaults",
        children: [
          {
            type: "input",
            label: t("menu.topBound"),
            value: t("menu.noFlow")
          },
          {
            type: "input",
            label: t("menu.bottomBound"),
            value: t("menu.noFlow")
          }
        ]
      },
      {
        title: t("menu.resultsField"),
        name: "resultsField",
        children: [
          {
            type: "group",
            label: t("menu.stwiip"),
            value: "8.40521E+6",
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
          },
          {
            type: "group",
            label: t("menu.stwip"),
            value: "8.43397E+6",
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
          },
          {
            type: "group",
            label: t("menu.tmax"),
            value: "2424.00",
            options: [
              { label: "day", value: "day" },
              { label: "hr", value: "hr" },
              { label: "min", value: "min" },
              { label: "Month", value: "Month" },
              { label: "ms", value: "ms" },
              { label: "sec", value: "sec" },
              { label: "Week", value: "Week" },
              { label: "Year", value: "Year" }
            ],
            unitValue: "hr"
          },
          {
            type: "group",
            label: t("menu.pbar"),
            value: "2424.00",
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
            label: t("menu.area"),
            value: "2295.68",
            options: [
              { label: "acre", value: "acre" },
              { label: "ft²", value: "ft²" },
              { label: "hectare", value: "hectare" },
              { label: "km²", value: "km²" },
              { label: "m²", value: "m²" }
            ],
            unitValue: "acre"
          },
          {
            type: "group",
            label: t("menu.bulkVol"),
            value: "5.10967E+7",
            options: [
              { label: "barrels", value: "barrels" },
              { label: "bm³", value: "bm³" },
              { label: "m³", value: "m³" },
              { label: "Mm³", value: "Mm³" },
              { label: "MMB", value: "MMB" },
              { label: "MMm³", value: "MMm³" }
            ],
            unitValue: "m³"
          },
          {
            type: "group",
            label: t("menu.pv"),
            value: "8.58378E+6",
            options: [
              { label: "barrels", value: "barrels" },
              { label: "bm³", value: "bm³" },
              { label: "m³", value: "m³" },
              { label: "Mm³", value: "Mm³" },
              { label: "MMB", value: "MMB" },
              { label: "MMm³", value: "MMm³" }
            ],
            unitValue: "m³"
          }
        ]
      }
    ]
  },
  {
    name: "WellSketch",
    title: "Specialized analysis"
  }
];
const leftIcon2 = [
  {
    name: "ToolsOffL",
    title: "To analytical"
  },
  {
    name: "WellSketchHorizontalOffL",
    title: "To numerical"
  }
];
// const collapseForm = ref([
//   {
//     title: t("menu.diagnostic"),
//     name: "diagnostic",
//     children: [
//       {
//         type: "group",
//         label: t("menu.cType"),
//         value: t("menu.constant"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.well"),
//         value: t("menu.finiteRadius"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.reservoir"),
//         value: t("menu.homogeneous"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.boundary"),
//         value: t("menu.infinite"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.C"),
//         value: "2.23778",
//         options: [
//           { label: "bbl/psi", value: "bbl/psi" },
//           { label: "m²", value: "m²" },
//           { label: "m³/bar", value: "m³/bar" },
//           { label: "m³/kPa", value: "m³/kPa" },
//           { label: "m³/MPa", value: "m³/MPa" },
//           { label: "m³/Pa", value: "m³/Pa" },
//           { label: "m³cm²/kg", value: "m³cm²/kg" }
//         ],
//         unitValue: "m³/MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.kh"),
//         value: "52.8814",
//         options: [
//           { label: "m³", value: "m³" },
//           { label: "md.ft", value: "md.ft" },
//           { label: "md.m", value: "md.m" }
//         ],
//         unitValue: "md.m"
//       },
//       {
//         type: "group",
//         label: t("menu.k"),
//         value: "9.61680",
//         options: [
//           { label: "μd", value: "μd" },
//           { label: "μm²", value: "μm²" },
//           { label: "cm²", value: "cm²" },
//           { label: "Darcy", value: "Darcy" },
//           { label: "m²", value: "m²" },
//           { label: "md", value: "md" },
//           { label: "nd", value: "nd" }
//         ],
//         unitValue: "md"
//       },
//       {
//         type: "group",
//         label: t("menu.skin"),
//         value: "-5.11849",
//         options: [],
//         unitValue: ""
//       }
//     ]
//   },
//   {
//     title: t("menu.wellAndWellbore"),
//     name: "wellAndWellbore",
//     children: [
//       {
//         type: "group",
//         label: t("menu.wellboreModel"),
//         value: t("menu.constant"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.C"),
//         value: "0.130858",
//         options: [
//           { label: "bbl/psi", value: "bbl/psi" },
//           { label: "m²", value: "m²" },
//           { label: "m³/bar", value: "m³/bar" },
//           { label: "m³/kPa", value: "m³/kPa" },
//           { label: "m³/MPa", value: "m³/MPa" },
//           { label: "m³/Pa", value: "m³/Pa" },
//           { label: "m³cm²/kg", value: "m³cm²/kg" }
//         ],
//         unitValue: "m³/MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.well"),
//         value: t("menu.vertical"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.skin"),
//         value: "-5.11849",
//         options: [],
//         unitValue: ""
//       }
//     ]
//   },
//   {
//     title: t("menu.reservoirAndBoundary"),
//     name: "reservoirAndBoundary",
//     children: [
//       {
//         type: "group",
//         label: t("menu.reservoir"),
//         value: t("menu.homogeneous"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.Pi"),
//         value: "40.9822",
//         options: [
//           { label: "atm", value: "atm" },
//           { label: "bara", value: "bara" },
//           { label: "barg", value: "barg" },
//           { label: "kg/cm²", value: "kg/cm²" },
//           { label: "kPa", value: "kPa" },
//           { label: "kPag", value: "kPag" },
//           { label: "m", value: "m" },
//           { label: "MPa", value: "MPa" },
//           { label: "Pa", value: "Pa" },
//           { label: "psia", value: "psia" },
//           { label: "psig", value: "psig" }
//         ],
//         unitValue: "MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.kh"),
//         value: "52.8814",
//         options: [
//           { label: "m³", value: "m³" },
//           { label: "md.ft", value: "md.ft" },
//           { label: "md.m", value: "md.m" }
//         ],
//         unitValue: "md.m"
//       },
//       {
//         type: "group",
//         label: t("menu.k"),
//         value: "9.61680",
//         options: [
//           { label: "μd", value: "μd" },
//           { label: "μm²", value: "μm²" },
//           { label: "cm²", value: "cm²" },
//           { label: "Darcy", value: "Darcy" },
//           { label: "m²", value: "m²" },
//           { label: "md", value: "md" },
//           { label: "nd", value: "nd" }
//         ],
//         unitValue: "md"
//       },
//       {
//         type: "group",
//         label: t("menu.h"),
//         value: "5.50000",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "km", value: "km" },
//           { label: "m", value: "m" },
//           { label: "mile", value: "mile" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.y"),
//         value: "0.168",
//         options: []
//       }
//     ]
//   }
// ]);
// const collapseFormAll = ref([
//   {
//     title: t("menu.diagnostic"),
//     name: "diagnostic",
//     children: [
//       {
//         type: "group",
//         label: t("menu.cType"),
//         value: t("menu.constant"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.well"),
//         value: t("menu.finiteRadius"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.reservoir"),
//         value: t("menu.homogeneous"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.boundary"),
//         value: t("menu.infinite"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.qref"),
//         value: "297.000",
//         options: [
//           { label: "B/D", value: "B/D" },
//           { label: "cf/D", value: "cf/D" },
//           { label: "cf/s", value: "cf/s" },
//           { label: "cm³/sec", value: "cm³/sec" },
//           { label: "l/min", value: "l/min" },
//           { label: "m³/D", value: "m³/D" },
//           { label: "m³/hr", value: "m³/hr" },
//           { label: "m³/min", value: "m³/min" },
//           { label: "m³/sec", value: "m³/sec" },
//           { label: "MB/D", value: "MB/D" },
//           { label: "Mcf/D", value: "Mcf/D" },
//           { label: "Mm³/D", value: "Mm³/D" },
//           { label: "Mm³/hr", value: "Mm³/hr" },
//           { label: "MMB/D", value: "MMB/D" },
//           { label: "MMm³/D", value: "MMm³/D" },
//           { label: "U.K. gal/hr", value: "U.K. gal/hr" },
//           { label: "U.k. gal/min", value: "U.k. gal/min" },
//           { label: "U.S. gal/hr", value: "U.S. gal/hr" },
//           { label: "U.S. gal/min", value: "U.S. gal/min" }
//         ],
//         unitValue: "m³/D"
//       },
//       {
//         type: "group",
//         label: t("menu.extract"),
//         value: "0.00000",
//         options: [
//           { label: "day", value: "day" },
//           { label: "hr", value: "hr" },
//           { label: "min", value: "min" },
//           { label: "Month", value: "Month" },
//           { label: "sec", value: "sec" },
//           { label: "Week", value: "Week" },
//           { label: "Year", value: "Year" }
//         ],
//         unitValue: "hr"
//       },
//       {
//         type: "group",
//         label: t("menu.pDt"),
//         value: "64.3047",
//         options: [
//           { label: "atm", value: "atm" },
//           { label: "bara", value: "bara" },
//           { label: "barg", value: "barg" },
//           { label: "kg/cm²", value: "kg/cm²" },
//           { label: "kPa", value: "kPa" },
//           { label: "kPag", value: "kPag" },
//           { label: "m", value: "m" },
//           { label: "MPa", value: "MPa" },
//           { label: "Pa", value: "Pa" },
//           { label: "psia", value: "psia" },
//           { label: "psig", value: "psig" }
//         ],
//         unitValue: "MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.PI"),
//         value: "8207.37",
//         options: [
//           { label: "[m³/D]/MPa", value: "[m³/D]/MPa" },
//           { label: "[m³/sec]/MPa", value: "[m³/sec]/MPa" }
//         ],
//         unitValue: "[m³/D]/MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.lastP"),
//         value: "18.2069",
//         options: [
//           { label: "[m³/D]/MPa", value: "[m³/D]/MPa" },
//           { label: "[m³/sec]/MPa", value: "[m³/sec]/MPa" }
//         ],
//         unitValue: "[m³/D]/MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.tm"),
//         value: "20.0521",
//         options: [
//           { label: "1/sec", value: "1/sec" },
//           { label: "1/min", value: "1/min" },
//           { label: "1/hr", value: "1/hr" },
//           { label: "1/day", value: "1/day" },
//           { label: "1/week", value: "1/week" },
//           { label: "1/month", value: "1/month" },
//           { label: "1/year", value: "1/year" }
//         ],
//         unitValue: "1/hr"
//       },
//       {
//         type: "group",
//         label: t("menu.pm"),
//         value: "0.207628",
//         options: [
//           { label: "1/(kg/cm²)", value: "1/(kg/cm²)" },
//           { label: "1/atm", value: "1/atm" },
//           { label: "1/bara", value: "1/bara" },
//           { label: "1/kPa", value: "1/kPa" },
//           { label: "1/m", value: "1/m" },
//           { label: "1/MPa", value: "1/MPa" },
//           { label: "1/Pa", value: "1/Pa" },
//           { label: "1/psia", value: "1/psia" }
//         ],
//         unitValue: "1/MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.C"),
//         value: "2.23778",
//         options: [
//           { label: "bbl/psi", value: "bbl/psi" },
//           { label: "m²", value: "m²" },
//           { label: "m³/bar", value: "m³/bar" },
//           { label: "m³/kPa", value: "m³/kPa" },
//           { label: "m³/MPa", value: "m³/MPa" },
//           { label: "m³/Pa", value: "m³/Pa" },
//           { label: "m³cm²/kg", value: "m³cm²/kg" }
//         ],
//         unitValue: "m³/MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.kh"),
//         value: "52.8814",
//         options: [
//           { label: "m³", value: "m³" },
//           { label: "md.ft", value: "md.ft" },
//           { label: "md.m", value: "md.m" }
//         ],
//         unitValue: "md.m"
//       },
//       {
//         type: "group",
//         label: t("menu.k"),
//         value: "9.61680",
//         options: [
//           { label: "μd", value: "μd" },
//           { label: "μm²", value: "μm²" },
//           { label: "cm²", value: "cm²" },
//           { label: "Darcy", value: "Darcy" },
//           { label: "m²", value: "m²" },
//           { label: "md", value: "md" },
//           { label: "nd", value: "nd" }
//         ],
//         unitValue: "md"
//       },

//       {
//         type: "group",
//         label: t("menu.kµ"),
//         value: "117.543",
//         options: [
//           { label: "μm²/cp", value: "μm²/cp" },
//           { label: "μm²/Pa.s", value: "μm²/Pa.s" },
//           { label: "cm²/cp", value: "cm²/cp" },
//           { label: "cm²/Pa.s", value: "cm²/Pa.s" },
//           { label: "Darcy/cp", value: "Darcy/cp" },
//           { label: "Darcy/Pa.s", value: "Darcy/Pa.s" },
//           { label: "m²/cp", value: "m²/cp" },
//           { label: "m²/Pa.s", value: "m²/Pa.s" },
//           { label: "md/cp", value: "md/cp" },
//           { label: "md/Pa.s", value: "md/Pa.s" }
//         ],
//         unitValue: "md/cp"
//       },
//       {
//         type: "group",
//         label: t("menu.khµ"),
//         value: "117.543",
//         options: [
//           { label: "[md.m]/cp", value: "[md.m]/cp" },
//           { label: "m³/[Pa.sec]", value: "m³/[Pa.sec]" }
//         ],
//         unitValue: "m³/[Pa.sec]"
//       },
//       {
//         type: "group",
//         label: t("menu.skin"),
//         value: "-5.11849",
//         options: [],
//         unitValue: ""
//       },
//       {
//         type: "group",
//         label: t("menu.pSkin"),
//         value: "-24.6522",
//         options: [
//           { label: "atm", value: "atm" },
//           { label: "bara", value: "bara" },
//           { label: "barg", value: "barg" },
//           { label: "kg/cm²", value: "kg/cm²" },
//           { label: "kPa", value: "kPa" },
//           { label: "kPag", value: "kPag" },
//           { label: "m", value: "m" },
//           { label: "MPa", value: "MPa" },
//           { label: "Pa", value: "Pa" },
//           { label: "psia", value: "psia" },
//           { label: "psig", value: "psig" }
//         ],
//         unitValue: "MPa"
//       }
//     ]
//   },
//   {
//     title: t("menu.wellAndWellbore"),
//     name: "wellAndWellbore",
//     children: [
//       {
//         type: "group",
//         label: t("menu.wellboreModel"),
//         value: t("menu.constant"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.C"),
//         value: "0.130858",
//         options: [
//           { label: "bbl/psi", value: "bbl/psi" },
//           { label: "m²", value: "m²" },
//           { label: "m³/bar", value: "m³/bar" },
//           { label: "m³/kPa", value: "m³/kPa" },
//           { label: "m³/MPa", value: "m³/MPa" },
//           { label: "m³/Pa", value: "m³/Pa" },
//           { label: "m³cm²/kg", value: "m³cm²/kg" }
//         ],
//         unitValue: "m³/MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.well"),
//         value: t("menu.vertical"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.skin"),
//         value: "-5.11849",
//         options: [],
//         unitValue: ""
//       }
//     ]
//   },
//   {
//     title: t("menu.reservoirAndBoundary"),
//     name: "reservoirAndBoundary",
//     children: [
//       {
//         type: "group",
//         label: t("menu.reservoir"),
//         value: t("menu.homogeneous"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.Pi"),
//         value: "40.9822",
//         options: [
//           { label: "atm", value: "atm" },
//           { label: "bara", value: "bara" },
//           { label: "barg", value: "barg" },
//           { label: "kg/cm²", value: "kg/cm²" },
//           { label: "kPa", value: "kPa" },
//           { label: "kPag", value: "kPag" },
//           { label: "m", value: "m" },
//           { label: "MPa", value: "MPa" },
//           { label: "Pa", value: "Pa" },
//           { label: "psia", value: "psia" },
//           { label: "psig", value: "psig" }
//         ],
//         unitValue: "MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.kh"),
//         value: "52.8814",
//         options: [
//           { label: "m³", value: "m³" },
//           { label: "md.ft", value: "md.ft" },
//           { label: "md.m", value: "md.m" }
//         ],
//         unitValue: "md.m"
//       },
//       {
//         type: "group",
//         label: t("menu.k"),
//         value: "9.61680",
//         options: [
//           { label: "μd", value: "μd" },
//           { label: "μm²", value: "μm²" },
//           { label: "cm²", value: "cm²" },
//           { label: "Darcy", value: "Darcy" },
//           { label: "m²", value: "m²" },
//           { label: "md", value: "md" },
//           { label: "nd", value: "nd" }
//         ],
//         unitValue: "md"
//       },
//       {
//         type: "group",
//         label: t("menu.h"),
//         value: "5.50000",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "km", value: "km" },
//           { label: "m", value: "m" },
//           { label: "mile", value: "mile" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.y"),
//         value: "0.168",
//         options: []
//       }
//     ]
//   },
//   {
//     title: t("menu.testedWell"),
//     name: "testedWell",
//     children: [
//       {
//         type: "group",
//         label: t("menu.elev"),
//         value: "0.00000",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "m", value: "m" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.rw"),
//         value: "0.0889",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "64th in", value: "64th in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "m", value: "m" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.zw"),
//         value: "2.75000",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "64th in", value: "64th in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "m", value: "m" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.hw"),
//         value: "5.50000",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "64th in", value: "64th in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "m", value: "m" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.lw"),
//         value: "5.50000",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "64th in", value: "64th in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "m", value: "m" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.name"),
//         value: t("menu.perforation"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.mdStart"),
//         value: "5082.00",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "64th in", value: "64th in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "m", value: "m" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.mdEnd"),
//         value: "5087.50",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "64th in", value: "64th in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "m", value: "m" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.perfLength"),
//         value: "5.50000",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "64th in", value: "64th in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "m", value: "m" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.skin"),
//         value: "-5.11849",
//         options: [],
//         unitValue: ""
//       },
//       {
//         type: "group",
//         label: t("menu.wellboreModel"),
//         value: t("menu.constant"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.C"),
//         value: "2.23778",
//         options: [
//           { label: "bbl/psi", value: "bbl/psi" },
//           { label: "m²", value: "m²" },
//           { label: "m³/bar", value: "m³/bar" },
//           { label: "m³/kPa", value: "m³/kPa" },
//           { label: "m³/MPa", value: "m³/MPa" },
//           { label: "m³/Pa", value: "m³/Pa" },
//           { label: "m³cm²/kg", value: "m³cm²/kg" }
//         ],
//         unitValue: "m³/MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.bottomholeMd"),
//         value: "5082.00",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "m", value: "m" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.constraints"),
//         value: "",
//         options: []
//       }
//     ]
//   },
//   {
//     title: t("menu.reservoir"),
//     name: "reservoir",
//     children: [
//       {
//         type: "group",
//         label: t("menu.Pi"),
//         value: "40.9822",
//         options: [
//           { label: "atm", value: "atm" },
//           { label: "bara", value: "bara" },
//           { label: "barg", value: "barg" },
//           { label: "kg/cm²", value: "kg/cm²" },
//           { label: "kPa", value: "kPa" },
//           { label: "kPag", value: "kPag" },
//           { label: "m", value: "m" },
//           { label: "MPa", value: "MPa" },
//           { label: "Pa", value: "Pa" },
//           { label: "psia", value: "psia" },
//           { label: "psig", value: "psig" }
//         ],
//         unitValue: "MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.reservoir"),
//         value: t("menu.homogeneous"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.kh"),
//         value: "52.8814",
//         options: [
//           { label: "m³", value: "m³" },
//           { label: "md.ft", value: "md.ft" },
//           { label: "md.m", value: "md.m" }
//         ],
//         unitValue: "md.m"
//       },
//       {
//         type: "group",
//         label: t("menu.k"),
//         value: "9.61680",
//         options: [
//           { label: "μd", value: "μd" },
//           { label: "μm²", value: "μm²" },
//           { label: "cm²", value: "cm²" },
//           { label: "Darcy", value: "Darcy" },
//           { label: "m²", value: "m²" },
//           { label: "md", value: "md" },
//           { label: "nd", value: "nd" }
//         ],
//         unitValue: "md"
//       },
//       {
//         type: "group",
//         label: t("menu.h"),
//         value: "5.50000",
//         options: [
//           { label: "0.1 in", value: "0.1 in" },
//           { label: "cm", value: "cm" },
//           { label: "ft", value: "ft" },
//           { label: "in", value: "in" },
//           { label: "km", value: "km" },
//           { label: "m", value: "m" },
//           { label: "mile", value: "mile" },
//           { label: "mm", value: "mm" }
//         ],
//         unitValue: "m"
//       },
//       {
//         type: "group",
//         label: t("menu.y"),
//         value: "0.168",
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.ntg"),
//         value: "1.00000",
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.kzkr"),
//         value: "1.00000",
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.ks"),
//         value: "9.61480",
//         options: [
//           { label: "μd", value: "μd" },
//           { label: "μm²", value: "μm²" },
//           { label: "cm²", value: "cm²" },
//           { label: "Darcy", value: "Darcy" },
//           { label: "m²", value: "m²" },
//           { label: "md", value: "md" },
//           { label: "nd", value: "nd" }
//         ],
//         unitValue: "md"
//       }
//     ]
//   },
//   {
//     title: t("menu.contourFaults"),
//     name: "contourFaults",
//     children: [
//       {
//         type: "group",
//         label: t("menu.topBound"),
//         value: t("menu.noFlow"),
//         options: []
//       },
//       {
//         type: "group",
//         label: t("menu.bottomBound"),
//         value: t("menu.noFlow"),
//         options: []
//       }
//     ]
//   },
//   {
//     title: t("menu.resultsField"),
//     name: "resultsField",
//     children: [
//       {
//         type: "group",
//         label: t("menu.stwiip"),
//         value: "8.40521E+6",
//         options: [
//           { label: "barrels", value: "barrels" },
//           { label: "cl", value: "cl" },
//           { label: "cm³", value: "cm³" },
//           { label: "foot³", value: "foot³" },
//           { label: "liters", value: "liters" },
//           { label: "m³", value: "m³" },
//           { label: "Mcf", value: "Mcf" },
//           { label: "ml", value: "ml" },
//           { label: "Mm³", value: "Mm³" },
//           { label: "MMB", value: "MMB" },
//           { label: "MMcf", value: "MMcf" },
//           { label: "MMm³", value: "MMm³" },
//           { label: "U.S. gal", value: "U.S. gal" }
//         ],
//         unitValue: "m³"
//       },
//       {
//         type: "group",
//         label: t("menu.stwip"),
//         value: "8.43397E+6",
//         options: [
//           { label: "barrels", value: "barrels" },
//           { label: "cl", value: "cl" },
//           { label: "cm³", value: "cm³" },
//           { label: "foot³", value: "foot³" },
//           { label: "liters", value: "liters" },
//           { label: "m³", value: "m³" },
//           { label: "Mcf", value: "Mcf" },
//           { label: "ml", value: "ml" },
//           { label: "Mm³", value: "Mm³" },
//           { label: "MMB", value: "MMB" },
//           { label: "MMcf", value: "MMcf" },
//           { label: "MMm³", value: "MMm³" },
//           { label: "U.S. gal", value: "U.S. gal" }
//         ],
//         unitValue: "m³"
//       },
//       {
//         type: "group",
//         label: t("menu.tmax"),
//         value: "2424.00",
//         options: [
//           { label: "day", value: "day" },
//           { label: "hr", value: "hr" },
//           { label: "min", value: "min" },
//           { label: "Month", value: "Month" },
//           { label: "ms", value: "ms" },
//           { label: "sec", value: "sec" },
//           { label: "Week", value: "Week" },
//           { label: "Year", value: "Year" }
//         ],
//         unitValue: "hr"
//       },
//       {
//         type: "group",
//         label: t("menu.pbar"),
//         value: "2424.00",
//         options: [
//           { label: "atm", value: "atm" },
//           { label: "bara", value: "bara" },
//           { label: "barg", value: "barg" },
//           { label: "kg/cm²", value: "kg/cm²" },
//           { label: "kPa", value: "kPa" },
//           { label: "kPag", value: "kPag" },
//           { label: "m", value: "m" },
//           { label: "MPa", value: "MPa" },
//           { label: "Pa", value: "Pa" },
//           { label: "psia", value: "psia" },
//           { label: "psig", value: "psig" }
//         ],
//         unitValue: "MPa"
//       },
//       {
//         type: "group",
//         label: t("menu.area"),
//         value: "2295.68",
//         options: [
//           { label: "acre", value: "acre" },
//           { label: "ft²", value: "ft²" },
//           { label: "hectare", value: "hectare" },
//           { label: "km²", value: "km²" },
//           { label: "m²", value: "m²" }
//         ],
//         unitValue: "acre"
//       },
//       {
//         type: "group",
//         label: t("menu.bulkVol"),
//         value: "5.10967E+7",
//         options: [
//           { label: "barrels", value: "barrels" },
//           { label: "bm³", value: "bm³" },
//           { label: "m³", value: "m³" },
//           { label: "Mm³", value: "Mm³" },
//           { label: "MMB", value: "MMB" },
//           { label: "MMm³", value: "MMm³" }
//         ],
//         unitValue: "m³"
//       },
//       {
//         type: "group",
//         label: t("menu.pv"),
//         value: "8.58378E+6",
//         options: [
//           { label: "barrels", value: "barrels" },
//           { label: "bm³", value: "bm³" },
//           { label: "m³", value: "m³" },
//           { label: "Mm³", value: "Mm³" },
//           { label: "MMB", value: "MMB" },
//           { label: "MMm³", value: "MMm³" }
//         ],
//         unitValue: "m³"
//       }
//     ]
//   }
// ]);
const clickIcon = (item: string) => {
  selectTitle.value = item;
  if (form.results === "trans") {
    tormData.value = leftIcon.find(it => {
      return it.title === selectTitle.value;
    })?.collapseForm;
  } else {
    tormData.value = leftIcon.find(it => {
      return it.title === selectTitle.value;
    })?.collapseFormAll;
  }
};
const radioChoose = (value: string) => {
  form.results = value;
  clickIcon(selectTitle.value);
};
onMounted(() => {
  clickIcon(selectTitle.value);
});
</script>

<style lang="scss" scoped>
.analyticalDesign {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dialogBg;
  &-card {
    .content {
      min-height: 520px;
      border: 1px solid $dialogBorder;
      display: flex;
      .collapse {
        width: 180px;
        padding: 0 4px;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-around;
        .four {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: space-around;
          align-content: center;
          align-items: center;
        }
        .four-item {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-content: center;
          justify-content: center;
          align-items: center;
        }
      }
      :deep(.table) {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: start;
        height: 520px;
        .n-form-item {
          display: flex;
          justify-content: start;
          flex-wrap: nowrap;
          height: 35px;
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
          height: calc(100% - 35px);
          overflow: auto;
        }
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
::v-deep .n-form-item .n-form-item-blank {
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
</style>
