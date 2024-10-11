<template>
  <div class="units">
    <div class="units-header">
      <n-form-item :label="$t('step.currentUnitSystem')" label-placement="left">
        <n-input v-model:value="formData.currentUnitSystem" readonly></n-input>

        <n-upload
          abstract
          :default-upload="false"
          :show-file-list="false"
          :on-before-upload="onBerforeUpload"
        >
          <n-button-group>
            <n-upload-trigger #="{ handleClick }" abstract>
              <n-button @click="handleClick"> {{ $t("step.load") }} </n-button>
            </n-upload-trigger>
            <n-dropdown
              :value="formData.currentUnitSystem"
              @select="handleSelected"
              :options="unitGroup"
            >
              <n-button style="padding: 0 2px">▼</n-button>
            </n-dropdown>
          </n-button-group>
        </n-upload>
        <n-button size="tiny" @click="onExportUnit" :loading="isLoading">{{
          $t("step.saveAs")
        }}</n-button>
      </n-form-item>
    </div>
    <div class="units-form">
      <CollapseForm
        v-model="formData.units"
        :default-expanded-names="['measure']"
        :form="units"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CollapseForm from "@/components/CollapseForm/index.vue";
import { onMounted, ref } from "vue";
import { projectApi } from "@/api/modules/workStation";
import { DropdownOption, UploadFileInfo } from "naive-ui";
import { useI18n } from "vue-i18n";
import useLoading from "@/hooks/useLoading";
import { downLoadBlobFile } from "@/utils";

const { isLoading, loadingWrapper } = useLoading();

const { t } = useI18n();

const formData = defineModel({
  type: Object,
  default: {
    units: {},
    currentUnitSystem: ""
  }
});

/**
 * 单位列表
 */
const units = ref<any>([
  {
    title: t("step.measure"),
    name: "measure",
    children: []
  }
]);

/**
 * 默认单位列表
 */
const unitGroup = ref<any>([]);

/**
 * 选择默认单位列表回调
 */
const handleSelected = (value: string, option: DropdownOption) => {
  formData.value.units = option.units;
  formData.value.currentUnitSystem = value;
};

/**
 * 获取单位列表及默认单位
 * 注： 默认单位指的是在单位列表中默认选中的单位，单位列表指的是下拉框中所有的单位
 */
const getUnitsList = async () => {
  try {
    // 获取单位列表
    const res = await projectApi.getSystemUnitList();
    units.value[0].children = Object.values(res.data).map(item => {
      return {
        type: "select",
        label: item.label,
        value: item.name,
        options: item.unit
      };
    });
    // 获取默认单位列表
    const params = await projectApi.getStandardUnit();
    unitGroup.value = Object.keys(params.data).map(item => {
      return {
        label: item,
        key: item,
        units: params.data[item]
      };
    });
    formData.value.units = params.data[Object.keys(params.data)[0]];
    formData.value.currentUnitSystem = Object.keys(params.data)[0];
  } catch (error) {}
};

/**
 * 文件上传之前的回调
 */
const onBerforeUpload = async (options: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}) => {
  try {
    const file = options.file.file as File;
    const formData = new FormData();
    formData.append("file", file);

    await projectApi.importUnit(formData);
    getUnitsList();
  } catch (error) {}
};

/**
 * 导出单位
 */
const onExportUnit = () => {
  const params = {
    fileName: formData.value.currentUnitSystem,
    map: {
      [formData.value.currentUnitSystem]: formData.value.units
    }
  };

  loadingWrapper(downLoadBlobFile("/v1/unit/downloadStandardUnit", params));
};

onMounted(() => {
  getUnitsList();
});
</script>

<style scoped lang="scss">
.units {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-header {
    .n-form-item {
      .n-button {
        margin-left: 12px;
      }
    }
  }
  &-form {
    overflow: hidden;
  }
}
</style>
