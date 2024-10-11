<template>
  <Dialog v-model="showModal" width="25%" max-height="510" height="510">
    <div class="browser">
      <div class="browser-tree">
        <n-scrollbar>
          <n-tree
            block-line
            :data="projectStore.treeData"
            key-field="id"
            :render-prefix="renderPrefix"
            :render-label="renderLabel"
            label-field="name"
            :default-expand-all="expandAll"
            expand-on-click
            :node-props="nodeProps"
          />
        </n-scrollbar>
        <n-dropdown
          trigger="manual"
          placement="bottom-start"
          :show="showDropdown"
          :options="options"
          :x="x"
          :y="y"
          @select="handleSelect"
          @clickoutside="handleClickoutside"
        />
      </div>

      <n-space class="browser-footer" justify="space-between">
        <n-button @click="expandAll = true">{{ $t("menu.expand") }}</n-button>
        <n-button @click="expandAll = false">{{
          $t("menu.collapse")
        }}</n-button>
        <n-button @click="showModal = false">{{ $t("menu.cancel") }}</n-button>
      </n-space>
    </div>
  </Dialog>
  <DeleteData v-model="showDelete" v-model:select="selectedNode" />
</template>

<script lang="ts" setup>
import { ref, onMounted, h } from "vue";
import {
  NTree,
  NScrollbar,
  NSpace,
  TreeOption,
  DropdownOption
} from "naive-ui"; // Adjust imports as necessary
import SvgIcon from "@/components/SvgIcon/index.vue";
// import { v4 as uuidv4 } from "uuid";
import { commonApi } from "@/api/modules/workSpace";
import { useI18n } from "vue-i18n";
import DeleteData from "./deleteData.vue";
import { useProjectStore } from "@/stores/modules/project";
import { watch } from "vue";

const projectStore = useProjectStore();
const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });
const expandAll = ref(true);
const options = ref<DropdownOption[]>([]);
const optionType = ref<DropdownOption[]>([
  {
    label: t("menu.rename"),
    key: "rename",
    type: ["project", "section", "file"]
  },
  {
    label: t("menu.delete"),
    key: "delete",
    type: ["section", "file"]
  },
  {
    label: t("menu.duplicate"),
    key: "duplicate",
    type: ["file"]
  },
  {
    label: t("menu.clearAll"),
    key: "clear",
    type: ["dir"]
  }
]);
// const optionFiles = ref<DropdownOption[]>([
//   {
//     label: t("menu.clearAll"),
//     key: "clear"
//   }
// ]);
// const optionWell = ref<DropdownOption[]>([
//   {
//     label: t("menu.rename"),
//     key: "rename"
//   },
//   {
//     label: t("menu.delete"),
//     key: "delete"
//   }
// ]);
// const optionPro = ref<DropdownOption[]>([
//   {
//     label: t("menu.rename"),
//     key: "rename"
//   }
// ]);
const showDelete = ref(false);
const x = ref(0);
const y = ref(0);
const showDropdown = ref(false);
const renamingNodeId = ref<string | null>(null);
const newName = ref("");
const selectedNode = ref<any>(null);
const handleSelect = (key: string | number) => {
  showDropdown.value = false;
  if (key === "rename" && selectedNode.value) {
    startRenaming(selectedNode.value);
    return;
  }
  if (key === "delete" && selectedNode.value) {
    showDelete.value = true;
    return;
  }
  if (key === "duplicate" && selectedNode.value) {
    duplicateNode(selectedNode.value);
  }
};
const handleClickoutside = () => {
  showDropdown.value = false;
};
const startRenaming = (option: any) => {
  renamingNodeId.value = option.id;
  newName.value = option.name;
};
const duplicateNode = async (option: any) => {
  try {
    const res = commonApi.copyFile(option.id);
    projectStore.getBrowser();
  } catch (error) {
    console.log(error);
  }
};

// // 复制节点的逻辑
// const duplicateNode = (node: TreeOption) => {
//   // 创建节点副本，生成新的唯一id
//   const newNode = {
//     ...node,
//     // id: uuidv4(), // 新的id，避免冲突
//     name: node.name + "- Copy" // 名字可以加上"Copy"后缀区分
//   };

//   // 查找父节点，将新节点插入到相应位置
//   const parentNode = findParentNode(treeData.value, node.id);

//   if (parentNode) {
//     // 插入到父节点的 children 中
//     parentNode.children.push(newNode);
//   } else {
//     // 如果没有父节点，说明是顶层节点，直接插入到 treeData 中
//     treeData.value.push(newNode);
//   }
// };

// // 查找节点的父节点
// const findParentNode = (
//   nodes: TreeOption[],
//   nodeId: string
// ): TreeOption | null => {
//   for (const node of nodes) {
//     if (node.children && node.children.some(child => child.id === nodeId)) {
//       return node;
//     }
//     if (node.children) {
//       const parent = findParentNode(node.children, nodeId);
//       if (parent) {
//         return parent;
//       }
//     }
//   }
//   return null;
// };

const renderPrefix = ({ option }: { option: TreeOption }) => {
  return h(SvgIcon, { name: option.iconName as string, size: "16" });
};
const renderLabel = ({ option }: { option: TreeOption }) => {
  if (option.id === renamingNodeId.value) {
    return h("input", {
      value: newName.value,
      onInput: (e: Event) => {
        newName.value = (e.target as HTMLInputElement).value;
      },
      onBlur: () => {
        option.name = newName.value;
        renamingNodeId.value = null;
        try {
          const res = commonApi.reName(option.id, newName.value);
          // console.log(res, "res");
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  return option.name; // 正常情况下显示节点名称
};

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onContextmenu(e: MouseEvent): void {
      options.value = optionType.value.filter((item: any) =>
        item.type.includes(option.type)
      );
      showDropdown.value = true;
      selectedNode.value = option;
      x.value = e.clientX;
      y.value = e.clientY;
      e.preventDefault();
    },
    ondblclick(): void {
      startRenaming(option);
    }
  };
};
onMounted(() => {
  projectStore.getBrowserTmp();
});

watch(showModal, val => {
  val && projectStore.getBrowser();
});
</script>

<style lang="scss" scoped>
.browser {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-tree {
    width: 100%;
    flex: 1;
    background-color: #fff;
    overflow: hidden;
    .n-tree {
      height: 100%;
    }
  }
  &-footer {
    padding: 12px;
  }
}
</style>
