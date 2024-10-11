<template>
  <Dialog
    v-model="obj.showModal"
    :title="$t('step.pvt')"
    width="950"
    height="700"
    resize
  >
    <div class="secon">
      <div class="secon_header">
        <div class="sub_title">
          <Menu></Menu>
        </div>
      </div>
      <div class="secon_main">
        <div class="main_left">
          <n-collapse
            accordion
            :default-expanded-names="$t('menu.main')"
            @item-header-click="handleColl"
          >
            <n-collapse-item :name="$t('menu.main')">
              <template #header>
                <div class="collapse_header">
                  {{ $t("menu.main") }}
                </div>
              </template>
              <div class="param_panel" @click="controlB(0)">
                <n-space vertical size="small">
                  <div class="input_label">
                    {{ $t("step.fluidSys") }}
                  </div>
                </n-space>
              </div>
            </n-collapse-item>
            <n-collapse-item
              :name="collSingle[obj.referenceFluid]"
              v-if="obj.pvt === 'singlePhase'"
            >
              <template #header>
                <div class="collapse_header">
                  {{ collSingle[obj.referenceFluid] }}
                  {{ $t("menu.properties") }}
                </div>
              </template>
              <div class="param_panel" @click="controlB(1)">
                {{ $t("step.general") }}
              </div>
            </n-collapse-item>

            <div v-else v-for="item in collMutil[obj.referenceFluid]">
              <n-collapse-item :name="item">
                <template #header>
                  <div class="collapse_header">
                    {{ item }}
                    {{ $t("menu.properties") }}
                  </div>
                </template>
                <div class="param_panel" @click="controlB(1)">
                  {{ $t("step.general") }}
                </div>
              </n-collapse-item>
            </div>
          </n-collapse>
        </div>
        <div class="main_right">
          <vxe-card> {{ $t("menu.main") }} </vxe-card>
          <component
            :is="foldCom[foldRight]?.component"
            v-model="objGeaeral"
          ></component>
        </div>
      </div>
      <div class="secon_footer"></div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import Menu from "./components/Menu.vue";
import FluidSys from "./components/fluidSys.vue";
import General from "./components/general.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const foldRight = ref(0);
const foldCom = computed(() => [
  {
    key: 0,
    component: FluidSys
  },
  {
    key: 1,
    component: General
  }
]);
const obj = defineModel({
  type: Object,
  default: {
    showModal: false,
    pvt: "singlePhase",
    referenceFluid: "oil"
  }
});
const objGeaeral = ref({
  showModal: false,
  pvt: "singlePhase",
  referenceFluid: "oil",
  type: "oil"
});
const collSingle = ref({
  Oil: t("step.oil"),
  Gas: t("step.gas"),
  Water: t("step.water")
});
const collMutil = ref({
  Oil: [t("step.oil"), t("step.gas")],
  Gas: [t("step.oilGas")]
});
const controlB = (value: number) => {
  foldRight.value = value;
};
const handleColl = ({ name, expanded }) => {
  console.log(name, expanded);
  if (name !== "Main") objGeaeral.value.type = name;
};
watch(
  () => obj.value.referenceFluid,
  newVal => {
    console.log(newVal);
    controlB(0);
  },
  {
    deep: true
  }
);
</script>

<style src="./index.scss" lang="scss" scoped></style>
