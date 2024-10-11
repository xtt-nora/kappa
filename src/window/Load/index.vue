<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.load')"
    width="830"
    :loading="isLoading"
    height="660"
    resize
  >
    <div class="load">
      <div class="load_header">
        <div class="main_title">
          <n-ellipsis>{{ stepOptions[stepValue].mainTitle }}</n-ellipsis>
        </div>
        <div class="sub_title">
          <n-ellipsis :line-clamp="2"
            >{{ stepOptions[stepValue].subTitle }}
          </n-ellipsis>
        </div>
      </div>
      <div class="load_main">
        <DataSourceType
          v-show="stepValue === 0"
          ref="dataSourceTypeRef"
          @update-next-disabled="updateNextDisabled"
          :multi-visable="props.controlKey === 'qaqc'"
        ></DataSourceType>
        <LoadParamConfiguration
          v-show="stepValue === 1"
          ref="loadParamConfigurationRef"
          :preview-data="data"
          :file-name="fileName"
        >
        </LoadParamConfiguration>
      </div>
      <div class="load_footer">
        <div>
          <n-button
            size="tiny"
            class="button step_button"
            :disabled="stepValue === 0"
            @click="stepBackCb"
            >{{ $t("load.back") }}
          </n-button>
          <n-button
            size="tiny"
            class="button step_button"
            @click="stepNextCb"
            :disabled="nextDisabled"
            v-show="stepValue === 0"
            >{{ $t("load.next") }}
          </n-button>
          <n-button
            size="tiny"
            class="button step_button"
            @click="loadingWrapper(loadCb())"
            v-show="stepValue === 1"
            >{{ $t("load.load") }}
          </n-button>
          <n-button size="tiny" class="button cancel_button" @click="cancelCb"
            >{{ $t("load.cancel") }}
          </n-button>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import DataSourceType from "./commpoents/DataSourceType/index.vue";
import LoadParamConfiguration from "./commpoents/LoadParamConfiguration/index.vue";
import { useI18n } from "vue-i18n";
import { commonApi } from "@/api/modules/workSpace";
import { useProjectStore } from "@/stores/modules/project.ts";
import { useMessage } from "naive-ui";
import useLoading from "@/hooks/useLoading";

const message = useMessage();
const projectStore = useProjectStore();
const { t } = useI18n();
const { isLoading, loadingWrapper } = useLoading();

const props = withDefaults(defineProps<{ controlKey: string }>(), {
  controlKey: "loadq"
});

const showModal = defineModel({ type: Boolean, default: false });
const stepValue = ref(0);
const stepOptions = computed<
  {
    mainTitle: string;
    subTitle: string;
  }[]
>(() => [
  {
    mainTitle: t("load.stepOneTitle"),
    subTitle: t("load.stepOneSubTitle")
  },
  {
    mainTitle: t("load.stepTwoTitle"),
    subTitle: t("load.stepTwoSubTitle")
  }
]);

/**
 * 数据选择子组件
 */
const dataSourceTypeRef = ref();
const loadParamConfigurationRef = ref();

/**
 * 上一步
 */
const stepBackCb = () => {
  if (stepValue.value !== 0) {
    stepValue.value -= 1;
  }
};

/**
 * 下一步
 */
const stepNextCb = () => {
  stepValue.value += 1;
  data.value = dataSourceTypeRef.value.getPreviewData();
  fileName.value = dataSourceTypeRef.value.getFileName();
};

/**
 * 取消
 */
const cancelCb = () => {
  stepValue.value = 0;
  showModal.value = false;
};

/**
 * 数据导入
 */
const loadCb = async () => {
  const formData = loadParamConfigurationRef.value.getUploadData();
  if (formData) {
    formData.append(
      "file",
      new File([dataSourceTypeRef.value.getBlobData()], fileName.value, {
        type: "text/plain"
      })
    );
    formData.append("projectId", projectStore.projectId);
    formData.append("wellId", projectStore.activeWell as string);
    try {
      await commonApi.importData(formData);
      message.success(t("load.message.dataImportSuccessded"));
      projectStore.getBrowser();
      cancelCb();
    } catch (error) {}
  }
};

const nextDisabled = ref(true);

const data = ref<any>();

const updateNextDisabled = (value: boolean) => {
  nextDisabled.value = value;
};

const fileName = ref("");
</script>

<style src="./index.scss" lang="scss" scoped></style>
