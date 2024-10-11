<template>
  <div class="workStation">
    <div class="workStation-sideBar">
      <div class="return" @click="returnBack(projectStore.projectId)">
        <SvgIcon name="left" size="32" />
      </div>
      <div class="list">
        <!-- <ul v-for="(item, index) in list" :key="index">
          <li
            @click="
              item.label === 'save' ? openModal(item) : handleUpload(item)
            "
            :class="isChoose && item.disable && 'disabled'"
            :aria-disabled="item.disable"
          >
            {{ item.label }}
          </li>
          <n-upload
            v-if="item.label !== 'save'"
            ref="upload"
            abstract
            :default-upload="false"
            :show-file-list="false"
            @change="handleChange"
          >
            <n-upload-trigger #="{ handleClick }" abstract>
              <li
                @click="handleClick"
                :class="isChoose && item.disable && 'disabled'"
                :aria-disabled="isChoose"
              >
                {{ item.label }}
              </li>
            </n-upload-trigger>
          </n-upload>
        </ul> -->
        <ul v-for="(item, index) in list" :key="index" @click="operation(item)">
          <template v-if="item.value === 'save as'">
            <li @click.prevent="openModal()" class="modal-trigger">
              {{ item.label }}
            </li>
          </template>
          <template v-else>
            <n-upload
              ref="upload"
              abstract
              :default-upload="false"
              :show-file-list="false"
              @change="handleChange"
            >
              <n-upload-trigger #="{ handleClick }" abstract>
                <li
                  @click="handleClick"
                  :class="isChoose && item.disable && 'disabled'"
                  :aria-disabled="isChoose"
                >
                  {{ item.label }}
                </li>
              </n-upload-trigger>
            </n-upload>
          </template>
        </ul>
      </div>
      <div
        :class="isSelected ? 'initSelect' : 'noSelect'"
        @click="toggleSelect"
      >
        {{ t("menu.newAnd") }}
      </div>
      <div class="list">
        <ul
          v-for="(item, index) in list2"
          :key="index"
          @click="operation(item)"
        >
          <li
            :class="[
              isChoose && item.disable ? 'disabled' : '', // 判断是否禁用
              item.value === 'options'
                ? isOption
                  ? 'initSelect'
                  : 'noSelect'
                : '' // 判断是否选中
            ]"
            :aria-disabled="isChoose"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
    <div class="workStation-content" v-if="newAnd || isChoose">
      <div class="temp">
        <div class="fileTitle">
          {{ $t("menu.kappa") }}
        </div>
        <div class="fileTem" @click="showModal = true">
          <SvgIcon name="blank" size="60" />
          <div>{{ $t("menu.blank") }}</div>
        </div>
        <div class="initText">{{ $t("menu.useInit") }}</div>
      </div>
      <div class="borderBg"></div>
      <div class="blackArea"></div>
      <div class="footer">
        <div class="recentDoc">
          <div class="recentDoc-header">
            <div class="initText">{{ $t("menu.recentDoc") }}</div>
            <div class="borderBg"></div>
          </div>
          <div class="recentDoc-content">
            <div
              class="fileContent"
              v-for="item in projectList"
              @click="returnBack(item.id)"
              :key="item.id"
            >
              <div class="fileContent-left">
                <div class="fileIcon">
                  <SvgIcon name="blank" size="32" />
                </div>
                <div class="fileData">
                  <div class="fileData-title">{{ item.projectName }}</div>
                  <div class="fileData-source">
                    {{ $t("menu.createdTime") }}: {{ item.createdTime }}
                  </div>
                </div>
              </div>
              <div class="fileContent-right">
                <SvgIcon name="tuding" size="16" />
              </div>
            </div>
          </div>
          <div class="recentDoc-footer">
            <div class="borderBg"></div>
            <div class="docNum">
              <vxe-checkbox v-model="isRecent" size="small"
                >Number of recent document:</vxe-checkbox
              >
              <div class="inputNum">
                <vxe-input
                  v-model="num"
                  type="number"
                  :disabled="isRecent ? false : true"
                  min="1"
                  max="10"
                ></vxe-input>
              </div>
            </div>
          </div>
        </div>
        <div class="borderCol"></div>
        <div class="recentPla">
          <div class="recentPla-header">
            <div class="initText">{{ $t("menu.recentPlc") }}</div>
            <div class="borderBg"></div>
          </div>
          <div class="recentPla-content">
            <div class="fileContent">
              <div class="fileContent-left">
                <div class="fileIcon">
                  <SvgIcon name="blank" size="32" />
                </div>
                <div class="fileData">
                  <div class="fileData-title">Untitled1.ks5</div>
                  <div class="fileData-source">
                    C:\User\xtt\Desktop\Untitled1.ks5
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="recentPla-footer"></div>
        </div>
      </div>
    </div>
    <div class="workStation-content" v-else>
      <StepOne :is-showimg="false" />
    </div>
  </div>

  <!-- 弹窗组件 -->
  <Document v-model="showModal" />
  <Version v-model="showVersion" />
  <Close
    v-model="showClose"
    v-model:close="isExit"
    @update-chioce="updateChioce"
  />
  <SaveTem v-model="showSaveTem" />
  <Setting v-model="showSetting" :title="$t('menu.setting')" />
  <SaveAs v-model="showSaveAs"></SaveAs>
</template>
<script lang="ts" setup>
import StepOne from "@/window/Document/components/StepOne.vue";
import Setting from "@/window/Setting/index.vue";
import Version from "@/window/Version/index.vue";
import { ref, computed, onMounted } from "vue";
import Document from "@/window/Document/index.vue";
import Close from "@/window/Close/index.vue";
import SaveTem from "@/window/SaveTem/index.vue";
import SaveAs from "@/window/SaveTem/SaveAs.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { projectApi } from "@/api/modules/workStation";
import { useProjectStore } from "@/stores/modules/project";
import { UploadFileInfo } from "naive-ui";
import { commonApi } from "@/api/modules/workSpace";

const projectStore = useProjectStore();
const { t } = useI18n();
const isSelected = ref(true);
const isOption = ref(false);
const isExit = ref(null);
const router = useRouter();
const newAnd = ref(true);
const isChoose = ref(false);
const choosOp = ref("");
const list = computed(() => [
  {
    label: t("menu.save"),
    value: "save",
    disable: true
  },
  {
    label: t("menu.saveAs"),
    value: "save as",
    disable: true
  },
  {
    label: t("menu.open"),
    value: "open"
  }
]);
const list2 = computed(() => [
  {
    label: t("menu.previous"),
    value: "version",
    disable: true
  },
  {
    label: t("menu.close"),
    value: "close",
    disable: true
  },
  {
    label: t("menu.mainDoc"),
    value: "options",
    disable: true
  },
  {
    label: t("menu.saveTem"),
    value: "template",
    disable: true
  },
  {
    label: t("menu.setting"),
    value: "setting"
  },
  {
    label: t("menu.exit"),
    value: "exit"
  }
]);
const showClose = ref(false);
const showSaveTem = ref(false);
const showSetting = ref(false);
const showVersion = ref(false);
const showSaveAs = ref(false);
const setValues = (
  selected: boolean,
  option: boolean,
  newAndValue: boolean
) => {
  isSelected.value = selected;
  isOption.value = option;
  newAnd.value = newAndValue;
};

const toggleSelect = () => setValues(true, false, true);
const toggleOptions = () => setValues(false, true, false);
const showModal = ref(false);
const operation = (item: any) => {
  choosOp.value = item.value;
  if (item.value === "options") {
    toggleOptions();
  }
  isExit.value = item.value;
  const actions = new Map([
    [
      "version",
      () =>
        isChoose.value === true
          ? (showVersion.value = false)
          : (showVersion.value = true)
    ],
    [
      "close",
      () =>
        isChoose.value === true
          ? (showClose.value = false)
          : (showClose.value = true)
    ],
    [
      "template",
      () =>
        isChoose.value === true
          ? (showSaveTem.value = false)
          : (showSaveTem.value = true)
    ],
    ["setting", () => (showSetting.value = true)],
    ["exit", () => (showClose.value = true)]
  ]);
  const handler = actions.get(item.value) || (() => {});
  handler();
};
const isRecent = ref(false);
const num = ref("1");

const returnBack = async (projectId: any) => {
  projectStore.$reset();
  projectStore.setProjectState("projectId", projectId);
  await router.push({
    path: "/workSpace",
    query: {
      projectId: projectId
    }
  });
};

const projectList = ref<any>([]);

const getAllProject = async () => {
  try {
    const res = await projectApi.getAllProject();
    projectList.value = res.data;
  } catch (error) {}
};

onMounted(() => {
  getAllProject();
});

const updateChioce = value => {
  isChoose.value = value;
  if (isChoose.value) {
    document.querySelectorAll("li").forEach(li => {
      li.addEventListener("click", function () {
        if (li.getAttribute("aria-disabled") === "true") {
          return;
        }
      });
    });
  }
};

const handleChange = async (options: {
  file: any;
  fileList: UploadFileInfo[];
}) => {
  try {
    if (choosOp.value === "open") {
      const file = options.file.file as File;
      const formData = new FormData();
      formData.append("file", file);
      const res = await commonApi.open(formData);
      if (res.code === 0) {
        projectStore.setProjectState("projectId", res.data);
        await router.push({
          path: "/workSpace",
          query: {
            projectId: res.data
          }
        });
      }
    }
  } catch (error) {}
};
const openModal = () => {
  showSaveAs.value = true;
};
</script>
<style scoped lang="scss">
@import "./index.scss";
.disabled {
  pointer-events: none; /* 禁用点击等交互 */
  color: gray; /* 显示为灰色 */
  cursor: not-allowed; /* 鼠标变为禁用状态 */
}
</style>
