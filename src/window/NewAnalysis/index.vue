<template>
  <Dialog
    v-model="analysisStore.showNewAnalysis"
    :title="$t('menu.newAnalysis')"
    width="420"
    height="auto"
  >
    <div class="newAnalysis">
      <div class="newAnalysis-card">
        <vxe-card>
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            :model="form"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item :label="$t('menu.name')" path="name">
              <n-input v-model:value="form.name" />
            </n-form-item>
            <n-form-item
              :label="$t('menu.initializeFrom')"
              path="initializeFrom"
            >
              <n-radio
                :checked="form.checkedValue === 'nothing'"
                value="nothing"
                @change="handleChange"
              >
                {{ $t("menu.nothing") }}
              </n-radio>
            </n-form-item>
            <n-form-item label=" " path="initializeFrom">
              <n-radio
                :checked="form.checkedValue === 'select'"
                value="select"
                @change="handleChange"
              >
              </n-radio>
              <n-select
                v-model:value="form.select"
                :options="props.tabList"
                label-field="title"
                value-field="name"
                :disabled="form.checkedValue === 'nothing'"
              />
            </n-form-item>
            <n-form-item label=" ">
              <n-checkbox-group
                v-model:value="form.flag"
                :disabled="form.checkedValue === 'nothing'"
              >
                <n-space vertical>
                  <n-checkbox :value="1" :label="$t('menu.allPara')" />
                  <n-checkbox :value="2" :label="$t('menu.extractionKeep')" />
                  <n-checkbox :value="3" :label="$t('menu.modelKeep')" />
                </n-space>
              </n-checkbox-group>
            </n-form-item>
            <!-- <n-form-item label=" ">
              <n-checkbox
                :checked="form.allPara"
                :disabled="form.checkedValue === 'nothing'"
                :on-update:checked="handleCheck"
              >
                {{ $t("menu.allPara") }}
              </n-checkbox>
            </n-form-item>
            <n-form-item label=" ">
              <n-checkbox
                :checked="form.extraction"
                :disabled="form.checkedValue === 'nothing'"
                :on-update:checked="handleextraction"
              >
                {{ $t("menu.extractionKeep") }}
              </n-checkbox>
            </n-form-item>
            <n-form-item label=" ">
              <n-checkbox
                :checked="form.model"
                :disabled="form.checkedValue === 'nothing'"
                :on-update:checked="handlemodelKeep"
              >
                {{ $t("menu.modelKeep") }}
              </n-checkbox>
            </n-form-item> -->
          </n-form>
        </vxe-card>
      </div>
      <div class="newAnalysis-button">
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny" @click="submit">{{ $t("menu.ok") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { watch } from "vue";
import { getNewAnalysis } from "@/api/modules/analysis.ts";
import { useAnalysisStore } from "@/stores/modules/analysis";
const analysisStore = useAnalysisStore();
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
export interface Props {
  tabList: object[];
}
const props = withDefaults(defineProps<Props>(), {
  tabList: () => [
    { name: "origin", title: "原始" },
    {
      name: "big",
      title: "定井储+经向复合+无限大"
    },
    {
      name: "small",
      title: "变井储+经向复合+无限大"
    }
  ]
});

const emit = defineEmits(["submit"]);
const { t } = useI18n();
let showModal = defineModel({ type: Boolean, default: false });
const form = reactive({
  name: "Analysis 1",
  checkedValue: "select",
  select: "origin",
  allPara: true,
  extraction: true,
  model: true,
  number: 0,
  flag: [1, 2, 3]
});
// const tabOption = ref([]);
watch(
  () => props.tabList,
  newVal => {
    // tabOption.value = newVal?.map(item => {
    //   return {
    //     label: item.title,
    //     value: item.name
    //   };
    // });
    form.number++;
    form.name = `Analysis${form.number}`;
    // console.log(newVal, "hjkl");
  },
  {
    immediate: true,
    deep: true
  }
);
const handleChange = (e: Event) => {
  form.checkedValue = (e.target as HTMLInputElement).value;
};
// const handleCheck = (checked: boolean) => {
//   form.allPara = checked;
//   if (!form.allPara) {
//     form.extraction = checked;
//     form.model = checked;
//   }
// };
// const handlemodelKeep = (checked: boolean) => {
//   form.model = checked;
//   if (form.model) {
//     form.extraction = checked;
//     form.allPara = checked;
//   }
// };
// const handleextraction = (checked: boolean) => {
//   form.extraction = checked;
//   if (form.extraction) {
//     form.allPara = checked;
//   }
// };
const submit = () => {
  emit("submit", form);
  // console.log(form, "form");
  analysisStore.$patch({ showNewAnalysis: false });
  form.name === `Analysis${form.number}` ? form.number : form.number--;
};
</script>

<style lang="scss" scoped>
.newAnalysis {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dialogBg;
  &-card {
    .vxe-card {
      margin-bottom: 12px;
    }
  }
  &-button {
    display: inline-block;
    margin: 12px;
    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
}
::v-deep .n-select {
  margin-left: 5px;
}
</style>
