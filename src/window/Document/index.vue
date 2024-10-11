<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.createNew')"
    width="760"
    :loading="loading"
    height="780"
  >
    <template #default>
      <div class="document">
        <div class="document-header">
          {{ tabList[stepKey]?.title }}
        </div>
        <div class="document-content">
          <component
            :is="tabList[stepKey]?.component"
            :ref="setComponentRef"
            v-model="formData"
          ></component>
        </div>
        <n-space class="document-footer" justify="end">
          <n-button @click="back"> {{ $t("step.back") }} </n-button>
          <n-button @click="next" v-if="stepKey !== 5"
            >{{ $t("step.next") }}
          </n-button>
          <n-button @click="onSubmit" v-else>{{ $t("step.create") }} </n-button>
          <n-button @click="showModal = false">
            {{ $t("step.cancel") }}
          </n-button>
        </n-space>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import StepOne from "./components/StepOne.vue";
import StepTwo from "../components/Info.vue";
import StepThree from "../components/PvtAndDiffusion.vue";
import StepFour from "../components/Analytical.vue";
import StepFive from "../components/Numerical.vue";
import StepSix from "../components/Tools.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { projectApi } from "@/api/modules/workStation";
import { useProjectStore } from "@/stores/modules/project";

const showModal = defineModel({ type: Boolean, default: false });
const projectStore = useProjectStore();
const router = useRouter();
const formRef = ref<any>(null);
const { t } = useI18n();
const stepKey = ref(0);
const loading = ref(false);

const formData = reactive({
  reference: new Date(),
  timeZone: "UTC+08:00",
  longitude: "N/A",
  latitude: "N/A",
  information: [
    {
      type: t("step.company"),
      content: ""
    },
    {
      type: t("step.field"),
      content: ""
    },
    {
      type: t("step.well"),
      content: ""
    },
    {
      type: t("step.referenceWell"),
      content: ""
    },
    {
      type: t("step.wellbore"),
      content: ""
    },
    {
      type: t("step.wellboreId"),
      content: ""
    },
    {
      type: t("step.Completion"),
      content: ""
    },
    {
      type: t("step.completionId"),
      content: ""
    },
    {
      type: t("step.completiondate"),
      content: ""
    },
    {
      type: t("step.completionStatus"),
      content: ""
    },
    {
      type: t("step.primaryFluid"),
      content: ""
    },
    {
      type: t("step.database"),
      content: ""
    },
    {
      type: t("step.testName"),
      content: ""
    },
    {
      type: t("step.testDate"),
      content: ""
    },
    {
      type: t("step.formationInterval"),
      content: ""
    },
    {
      type: t("step.perforation"),
      content: ""
    },
    {
      type: t("step.typeGauge"),
      content: ""
    },
    {
      type: t("step.depthGauge"),
      content: ""
    },
    {
      type: t("step.depthAnalyzed"),
      content: ""
    },
    {
      type: t("step.dateAnalyzed"),
      content: ""
    },
    {
      type: t("step.byAnalyzed"),
      content: ""
    }
  ],
  units: {},
  currentUnitSystem: "Oil Field",
  comments: "",
  name: "Analysis 1",
  type: "standard",
  multiLayer: false,
  referenceWell: "Tested Well",
  activeWell: "Active Well",
  observationWell: "Observation well",
  wellRadius: "3.60000",
  wellRadiusUnit: "in",
  payZone: "30.0000",
  payZoneUnit: "ft",
  rockCompressibility: "3.0000E-6",
  rockCompressibiltyUnit: "psi",
  porosity: "0.1",
  topReservoirDepth: "6000.00",
  topReservoirDepthUnit: "ft",
  wellDistance: "2000.00",
  wellDistanceUnit: "ft",
  pvt: "singlePhase",
  referenceFluid: "Oil",
  defineAdvancedPVT: false,
  relativePermeability: false,
  unconsolidation: false,
  desorption: false,
  usePseudos: false,
  formationVolumeFactorB: "1.00000",
  formationVolumeFactorBUnit: "B/STB",
  viscosity: "1.0000",
  viscosityUnit: "cp",
  totalCompressibilityCt: "3.00000E-6",
  totalCompressibilityCtUnit: "psi",
  sw: "0.00000",
  swUnit: "Fraction",
  usePerrine: false,
  useKr: false,
  numericalChecked: [],
  wellboreStorage: "Constant",
  wellModel: "Finite radius",
  reservoirModel: "Homogeneous",
  boundaryModel: "Infinite"
});

const tabList = computed(() => [
  {
    key: 0,
    component: StepOne,
    title: t("step.stepOne")
  },
  {
    key: 1,
    component: StepTwo,
    title: t("step.stepTwo")
  },
  {
    key: 2,
    component: StepThree,
    title: t("step.stepThree")
  },
  {
    key: 3,
    component: StepFour,
    title: t("step.stepFour")
  },
  {
    key: 4,
    component: StepFive,
    title: t("step.stepFive")
  },
  {
    key: 5,
    component: StepSix,
    title: t("step.stepSix")
  }
]);
const setComponentRef = (el: any) => {
  el && (formRef.value = el);
};

const next = async () => {
  // 判断当前页是否需要进行表单校验
  if (formRef.value?.formRef) {
    // 表单校验
    formRef.value?.formRef?.validate(errors => {
      if (!errors) {
        stepKey.value += 1;
      } else {
        console.log(errors);
      }
    });
  } else {
    stepKey.value += 1;
  }
};

const back = () => {
  if (stepKey.value === 0) return;
  stepKey.value -= 1;
};

/**
 * 新建项目
 */
const onSubmit = async () => {
  const param = {
    nodeId: "1",
    projectName: formData.name,
    settingsInfo: JSON.stringify(formData)
  };
  try {
    loading.value = true;
    const res = await projectApi.getNewProject(param);
    projectStore.$reset();
    projectStore.setProjectState("projectId", res.data.id);
    await router.push({ path: "/workSpace" });
  } catch (error) {}
  loading.value = false;
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
