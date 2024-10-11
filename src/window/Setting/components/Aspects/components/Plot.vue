<template>
  <CollapseForm
    :default-expanded-names="[
      'background',
      'font',
      'scale',
      'tick',
      'scaleHeader',
      'paneHeader',
      'paneSeparator',
      'grid',
      'legend',
      'toolTip',
      'settings'
    ]"
    :form="aspectCollapse"
  />
</template>

<script setup lang="ts">
import CollapseForm from "@/components/CollapseForm/index.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const aspectCollapse = ref([
  {
    title: t("menu.background"),
    name: "background",
    children: [
      {
        type: "color",
        label: t("menu.color"),
        value: "#18A058"
      },
      {
        label: t("menu.gradient")
      },
      {
        type: "checkbox",
        label: t("menu.active"),
        value: false
      },
      {
        type: "select",
        label: t("menu.type"),
        options: [
          { label: t("menu.leftToRight"), value: "leftToRight" },
          { label: t("menu.rightToLeft"), value: "rightToLeft" },
          { label: t("menu.topToBottom"), value: "topToBottom" },
          { label: t("menu.bottomToTop"), value: "bottomToTop" },
          {
            label: t("menu.diagonalFromLeftTop"),
            value: "diagonalFromLeftTop"
          },
          {
            label: t("menu.diagonalFromLeftBottom"),
            value: "diagonalFromLeftBottom"
          },
          {
            label: t("menu.diagonalFromRightTop"),
            value: "diagonalFromRightTop"
          },
          {
            label: t("menu.diagonalFromRightBottom"),
            value: "diagonalFromRightBottom"
          }
        ],
        value: ""
      },
      {
        type: "color",
        label: t("menu.secondaryColor"),
        value: "#FFFFFF"
      },
      {
        type: "checkbox",
        label: t("menu.mirror"),
        value: false
      }
    ]
  },
  {
    title: t("menu.font"),
    name: "font",
    children: [
      {
        type: "select",
        label: t("menu.family"),
        options: [],
        value: ""
      },
      {
        type: "color",
        label: t("menu.color"),
        value: "#FFFFFF"
      }
    ]
  },
  {
    title: t("menu.scale"),
    name: "scale",
    children: [
      {
        label: t("menu.active")
      },
      {
        type: "color",
        label: t("menu.color"),
        value: "#FFFFFF"
      },
      {
        type: "input",
        label: t("menu.fontSize"),
        value: ""
      },
      { label: t("menu.gradient") },
      {
        type: "checkbox",
        label: t("menu.active"),
        value: false
      },
      {
        type: "select",
        label: t("menu.type"),
        options: [
          { label: t("menu.leftToRight"), value: "leftToRight" },
          { label: t("menu.rightToLeft"), value: "rightToLeft" },
          { label: t("menu.topToBottom"), value: "topToBottom" },
          { label: t("menu.bottomToTop"), value: "bottomToTop" },
          {
            label: t("menu.diagonalFromLeftTop"),
            value: "diagonalFromLeftTop"
          },
          {
            label: t("menu.diagonalFromLeftBottom"),
            value: "diagonalFromLeftBottom"
          },
          {
            label: t("menu.diagonalFromRightTop"),
            value: "diagonalFromRightTop"
          },
          {
            label: t("menu.diagonalFromRightBottom"),
            value: "diagonalFromRightBottom"
          }
        ],
        value: ""
      },
      {
        type: "color",
        label: t("menu.secondaryColor"),
        value: "#FFFFFF"
      },
      {
        type: "checkbox",
        label: t("menu.mirror"),
        value: false
      },
      {
        type: "select",
        label: t("menu.font"),
        options: [],
        value: ""
      },
      {
        label: t("menu.inactive")
      },
      {
        type: "color",
        label: t("menu.color"),
        value: "#FFFFFF"
      },
      {
        type: "input",
        label: t("menu.fontSize"),
        value: ""
      },
      { label: t("menu.gradient") },
      {
        type: "checkbox",
        label: t("menu.active"),
        value: false
      },
      {
        type: "select",
        label: t("menu.type"),
        options: [
          { label: t("menu.leftToRight"), value: "leftToRight" },
          { label: t("menu.rightToLeft"), value: "rightToLeft" },
          { label: t("menu.topToBottom"), value: "topToBottom" },
          { label: t("menu.bottomToTop"), value: "bottomToTop" },
          {
            label: t("menu.diagonalFromLeftTop"),
            value: "diagonalFromLeftTop"
          },
          {
            label: t("menu.diagonalFromLeftBottom"),
            value: "diagonalFromLeftBottom"
          },
          {
            label: t("menu.diagonalFromRightTop"),
            value: "diagonalFromRightTop"
          },
          {
            label: t("menu.diagonalFromRightBottom"),
            value: "diagonalFromRightBottom"
          }
        ],
        value: ""
      },
      {
        type: "color",
        label: t("menu.secondaryColor"),
        value: "#FFFFFF"
      },
      {
        type: "checkbox",
        label: t("menu.mirror"),
        value: false
      },
      {
        type: "select",
        label: t("menu.font"),
        options: [],
        value: ""
      },
      {
        type: "input",
        value: "Elapsed",
        label: t("menu.timeScales")
      }
    ]
  },
  {
    title: t("menu.tick"),
    name: "tick",
    children: [
      {
        type: "color",
        label: t("menu.color"),
        value: "#FFFFFF"
      },
      {
        type: "color",
        label: t("menu.scaleFrame"),
        value: "#000000"
      },
      {
        type: "input",
        label: t("menu.width"),
        value: "1"
      }
    ]
  },
  {
    title: t("menu.scaleHeader"),
    name: "scaleHeader",
    children: [
      {
        type: "color",
        label: t("menu.color"),
        value: "#FFFFFF"
      },
      {
        type: "color",
        label: t("menu.scaleFrame"),
        value: "#000000"
      },
      {
        type: "input",
        label: t("menu.width"),
        value: "1"
      }
    ]
  },
  {
    title: t("menu.paneHeader"),
    name: "paneHeader",
    children: [
      {
        label: t("menu.active")
      },
      {
        type: "color",
        label: t("menu.color"),
        value: "#FFFFFF"
      },
      {
        type: "input",
        label: t("menu.fontSize"),
        value: ""
      },
      { label: t("menu.gradient") },
      {
        type: "checkbox",
        label: t("menu.active"),
        value: false
      },

      {
        type: "color",
        label: t("menu.secondaryColor"),
        value: "#FFFFFF"
      },
      {
        label: t("menu.inactive")
      },
      {
        type: "color",
        label: t("menu.color"),
        value: "#FFFFFF"
      },
      {
        type: "input",
        label: t("menu.fontSize"),
        value: ""
      },
      { label: t("menu.gradient") },
      {
        type: "checkbox",
        label: t("menu.active"),
        value: false
      },
      {
        type: "color",
        label: t("menu.secondaryColor"),
        value: "#FFFFFF"
      }
    ]
  },
  {
    title: t("menu.paneSeparator"),
    name: "paneSeparator",
    children: [
      {
        type: "color",
        label: t("menu.color"),
        value: "#FFFFFF"
      }
    ]
  },
  {
    title: t("menu.grid"),
    name: "grid",
    children: [
      {
        type: "color",
        label: t("menu.color"),
        value: "#FFFFFF"
      },
      {
        type: "select",
        label: t("menu.style"),
        value: ""
      },
      {
        type: "input",
        label: t("menu.width"),
        value: "1"
      }
    ]
  },
  {
    title: t("menu.legend"),
    name: "legend",
    children: [
      {
        type: "checkbox",
        label: t("menu.show"),
        value: false
      },
      {
        type: "input",
        label: t("menu.font"),
        value: "Segoe UI, 10pt"
      },
      {
        type: "color",
        label: t("menu.fontColor"),
        value: "#FFFFFF"
      },
      {
        type: "color",
        label: t("menu.backColor"),
        value: "#FFFFFF"
      },
      {
        type: "select",
        label: t("menu.style"),
        value: ""
      },
      {
        type: "input",
        label: t("menu.width"),
        value: "1"
      },
      {
        label: t("menu.gradient")
      },
      {
        type: "checkbox",
        label: t("menu.active"),
        value: false
      },
      {
        type: "select",
        label: t("menu.type"),
        options: [
          { label: t("menu.leftToRight"), value: "leftToRight" },
          { label: t("menu.rightToLeft"), value: "rightToLeft" },
          { label: t("menu.topToBottom"), value: "topToBottom" },
          { label: t("menu.bottomToTop"), value: "bottomToTop" },
          {
            label: t("menu.diagonalFromLeftTop"),
            value: "diagonalFromLeftTop"
          },
          {
            label: t("menu.diagonalFromLeftBottom"),
            value: "diagonalFromLeftBottom"
          },
          {
            label: t("menu.diagonalFromRightTop"),
            value: "diagonalFromRightTop"
          },
          {
            label: t("menu.diagonalFromRightBottom"),
            value: "diagonalFromRightBottom"
          }
        ],
        value: ""
      },
      {
        type: "color",
        label: t("menu.secondaryColor"),
        value: "#FFFFFF"
      },
      {
        type: "checkbox",
        label: t("menu.mirror"),
        value: false
      },
      {
        type: "color",
        label: t("menu.borderColor"),
        value: "#FFFFFF"
      },
      {
        type: "input",
        label: t("menu.borderWidth"),
        value: "1"
      }
    ]
  },
  {
    title: t("menu.toolTip"),
    name: "toolTip",
    children: [
      {
        type: "checkbox",
        label: t("menu.show"),
        value: false
      },
      {
        type: "input",
        label: t("menu.font"),
        value: "Segoe UI, 10pt"
      },
      {
        type: "color",
        label: t("menu.fontColor"),
        value: "#FFFFFF"
      },
      {
        type: "color",
        label: t("menu.backColor"),
        value: "#FFFFFF"
      },
      {
        label: t("menu.gradient")
      },
      {
        type: "checkbox",
        label: t("menu.active"),
        value: false
      },
      {
        type: "select",
        label: t("menu.type"),
        options: [
          { label: t("menu.leftToRight"), value: "leftToRight" },
          { label: t("menu.rightToLeft"), value: "rightToLeft" },
          { label: t("menu.topToBottom"), value: "topToBottom" },
          { label: t("menu.bottomToTop"), value: "bottomToTop" },
          {
            label: t("menu.diagonalFromLeftTop"),
            value: "diagonalFromLeftTop"
          },
          {
            label: t("menu.diagonalFromLeftBottom"),
            value: "diagonalFromLeftBottom"
          },
          {
            label: t("menu.diagonalFromRightTop"),
            value: "diagonalFromRightTop"
          },
          {
            label: t("menu.diagonalFromRightBottom"),
            value: "diagonalFromRightBottom"
          }
        ],
        value: ""
      },
      {
        type: "color",
        label: t("menu.secondaryColor"),
        value: "#FFFFFF"
      },
      {
        type: "checkbox",
        label: t("menu.mirror"),
        value: false
      }
    ]
  },
  {
    title: t("menu.settings"),
    name: "settings",
    children: [
      {
        type: "checkbox",
        label: t("menu.keepZoomIn"),
        value: false
      },
      {
        type: "checkbox",
        label: t("menu.keepPanning"),
        value: false
      }
    ]
  }
]);
</script>

<style scoped></style>
