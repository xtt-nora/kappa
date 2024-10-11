import { computed } from "vue";
import { useI18n } from "vue-i18n";

export default () => {
  const { t } = useI18n();

  const aspectCollapse = computed(() => [
    {
      title: t("menu.symbol"),
      name: "symbol",
      children: [
        {
          type: "color",
          label: t("menu.color"),
          value: "color"
        },
        {
          type: "checkbox",
          label: t("menu.filled"),
          value: "filled"
        },
        {
          type: "numInput",
          label: t("menu.size"),
          value: "size",
          min: 1,
          max: 20
        },
        {
          type: "select",
          label: t("menu.type"),
          value: "type",
          options: [
            {
              label: t("menu.none"),
              value: "none"
            },
            {
              label: t("menu.squareO"),
              value: "rect"
            },
            {
              label: t("menu.circle"),
              value: "circle"
            },
            {
              label: t("menu.triangle"),
              value: "triangle"
            },
            {
              label: t("menu.diamond"),
              value: "diamond"
            }

            // },
            // {
            //   label: t("menu.plus"),
            //   value: "plus"
            // },
            // {
            //   label: t("menu.cross"),
            //   value: "cross"
            // },
            // {
            //   label: t("menu.star"),
            //   value: "star"
            // }
          ]
        }
      ]
    }
  ]);
  const aspectCollapseLine = computed(() => [
    {
      title: t("menu.line"),
      name: "line",
      children: [
        {
          type: "color",
          label: t("menu.color"),
          value: "colorLine"
        },
        {
          type: "select",
          label: t("menu.style"),
          value: "style",
          options: [
            {
              label: t("menu.solid"),
              value: "solid"
            },
            {
              label: t("menu.dashed"),
              value: "dashed"
            },
            {
              label: t("menu.dotted"),
              value: "dotted"
            },
            {
              label: t("menu.dashot"),
              value: "dashot"
            },
            {
              label: t("menu.ashdot"),
              value: "ashdot"
            }
          ]
        },
        {
          type: "select",
          label: t("menu.width"),
          value: "width",
          options: [
            {
              label: "1",
              value: "1"
            },
            {
              label: "2",
              value: "2"
            },
            {
              label: "3",
              value: "3"
            },
            {
              label: "4",
              value: "4"
            },
            {
              label: "5",
              value: "5"
            },
            {
              label: "6",
              value: "6"
            },
            {
              label: "7",
              value: "7"
            },
            {
              label: "8",
              value: "8"
            },
            {
              label: "9",
              value: "9"
            },
            {
              label: "10",
              value: "10"
            }
          ]
        }
      ]
    }
  ]);

  const infoCollapse = computed(() => [
    {
      title: t("menu.information"),
      name: "information",
      children: [
        {
          type: "input",
          label: t("menu.name"),
          value: "压力与流量数据"
        }
      ]
    },
    {
      title: t("menu.shift"),
      name: "shift",
      children: [
        {
          type: "group",
          label: t("menu.xFactor"),
          value: "1.00000",
          options: xUnitOptions,
          unitValue: ""
        },
        {
          type: "group",
          label: t("menu.xShift"),
          value: "0.00000",
          options: xUnitOptions,
          unitValue: "HR"
        }
      ]
    },
    {
      title: t("menu.statistics"),
      name: "statistics",
      children: [
        {
          type: "input",
          label: t("menu.numberOfPoints"),
          value: "5"
        },
        {
          type: "group",
          label: t("menu.minimumTime"),
          value: "0.00000",
          options: xUnitOptions,
          unitValue: "hr"
        },
        {
          type: "group",
          label: t("menu.maximumTime"),
          value: "156.00",
          options: xUnitOptions,
          unitValue: "hr"
        },
        {
          type: "group",
          label: t("menu.minimumValue"),
          value: "0.0000",
          options: xUnitOptions,
          unitValue: "sec"
        },
        {
          type: "group",
          label: t("menu.maximumValue"),
          value: "1500.00",
          options: xUnitOptions,
          unitValue: "sec"
        },
        {
          type: "group",
          label: t("menu.average"),
          value: "1020.00",
          options: xUnitOptions,
          unitValue: "sec"
        },
        {
          type: "group",
          label: t("menu.estimatedResolution"),
          value: "100.00",
          options: yUnitOptions,
          unitValue: "sec"
        },
        {
          type: "group",
          label: t("menu.standardDeviation"),
          value: "538.145",
          options: yUnitOptions,
          unitValue: "sec"
        },
        {
          type: "group",
          label: t("menu.cumulative"),
          value: "4800.00",
          options: yUnitOptions,
          unitValue: "m"
        }
      ]
    }
  ]);

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

  return {
    aspectCollapse,
    aspectCollapseLine,
    infoCollapse
  };
};
