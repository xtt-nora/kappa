<template>
  <div>
    <n-empty v-if="type === 'empty'" size="large" :description="description">
      <template #icon>
        <font-icon
          icon-name="emo"
          :type="'symbol'"
          :size="128"
          class="icon"
        ></font-icon> </template
    ></n-empty>
    <n-result
      v-else-if="type === 'error'"
      title="无法加载此页 😭 "
      description="出现了一些异常，尝试刷新或重试一下吧 ~"
    >
      <template #icon> </template>
      <template #footer>
        <n-button text @click="handleRetry" color="#3574F0">
          点击重试
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

// 定义组件接收的 props
// defineProps<{
//   type: "empty" | "error";
// }>();
withDefaults(
  defineProps<{
    type: "empty" | "error";
    description: string;
  }>(),
  {
    description: " " //对于复杂数据类型以函数式声明
  }
);
// 处理点击重试按钮
const handleRetry = () => {
  window.location.reload();
};
</script>

<style lang="scss" scoped>
:deep(.n-result .n-result-header .n-result-header__title) {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
}
:deep(.n-empty .n-empty__icon) {
  width: auto;
  height: auto;
}
</style>
