<template>
  <IconButton
    v-for="(item, index) in options"
    :key="index"
    :icon="item.icon"
    :disabled="item.disabled"
    :size="size"
    @click.stop="handleUpdateValue(item.key)"
    :active="item.key === activeKey"
  />
</template>
<script lang="ts" setup>
const activeKey = defineModel("value", {
  type: String,
  default: ""
});

withDefaults(
  defineProps<{
    options: any;
    size: string;
  }>(),
  {
    size: "16"
  }
);

const emits = defineEmits<{
  (e: "updateValue", key: string): void;
}>();

const handleUpdateValue = (value: string) => {
  activeKey.value = value;
  emits("updateValue", value);
};
</script>
