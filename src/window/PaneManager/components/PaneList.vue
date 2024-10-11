<template>
  <n-scrollbar class="paneList">
    <div
      v-for="(item, index) in options"
      :key="index"
      class="paneList-item"
      :class="{
        active: selected === item.value
      }"
      @click.prevent="handleClick(item.value)"
      @dblclick.prevent="handleDoubleClick"
      @contextmenu="e => handleContextMenu(e, item.value)"
    >
      <div class="paneList-item__icon">
        <SvgIcon name="paneS" size="16"></SvgIcon>
      </div>
      <label class="paneList-item__label"> {{ item.label }} </label>
    </div>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="x"
      :y="y"
      :options="dropdownOptions"
      :show="showDropdown"
      :on-clickoutside="onClickoutside"
      @select="handleSelect"
    />
  </n-scrollbar>
  <Rename v-model="showRename" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import useContextMenu from "@/hooks/useContextMenu";
import Rename from "./Rename.vue";

const props = defineProps<{
  options: any;
  id: string;
}>();

const emits = defineEmits<{
  (e: "handleDropdown", key: string, value: string);
  (e: "handleDblclick", value: string);
}>();

const { t } = useI18n();

/**
 * 下拉菜单钩子
 */
const { showDropdown, x, y, onClickoutside, handleContextMenu, selectedKey } =
  useContextMenu();

/**
 * 下拉菜单列表
 */
const dropdownOptions = computed(() => [
  {
    label: t("menu.rename"),
    key: "rename"
  },
  {
    label: t("menu.delete"),
    key: "delete",
    disabled: true
  }
]);

/**
 * 控制显示重命名弹窗
 */
const showRename = ref(false);

/**
 * @description 下拉框选择回调
 * @param key rename | delete
 */
const handleSelect = (key: string) => {
  emits("handleDropdown", key, selectedKey.value);
  if (key === "rename") {
    showRename.value = true;
  }
  showDropdown.value = false;
};

/**
 * 单选
 */
const selected = defineModel("value", { type: String, default: "" });

/**
 * 单选回调
 */
const handleClick = (value: string) => {
  selected.value = value;
};

/**
 * 双击选项回调
 */
const handleDoubleClick = () => {
  emits("handleDblclick", props.id);
};
</script>

<style scoped lang="scss">
.paneList {
  .paneList-item {
    height: 18px;
    border-bottom: 1px solid $inputBorder;
    display: flex;
    .paneList-item__icon {
      border-right: 1px solid $inputBorder;
      padding: 0 12px;
      @include flex-center;
    }
    .paneList-item__label {
      padding: 0 12px;
      user-select: none;
      @include ellipsis;
      flex: 1;
    }
  }
  .active {
    background-color: $paneActive;
  }
}
</style>
