<template>
  <RibbonGroup
    v-for="(item, index) in options"
    :key="index"
    :title="item.label"
    :show="item.show"
  >
    <template v-for="itemGroup in item.children" :key="itemGroup">
      <LargeButton
        @click.prevent="handleClick(itemGroup.id as string, itemGroup)"
        v-if="itemGroup.type === 'largeButton'"
        :title="itemGroup.label"
        :disabled="itemGroup.disabled"
        :show="itemGroup.show"
        :icon="itemGroup.icon"
        :active="itemGroup.id === value"
      />
      <Divider v-if="itemGroup.type === 'divider'" />
      <LargeDropDownButton
        v-if="itemGroup.type === 'largeDropdownButton'"
        :title="itemGroup.label"
        :options="itemGroup.options"
        :disabled="itemGroup.disabled"
        :show="itemGroup.show"
        :icon="itemGroup.icon"
        :active="itemGroup.id === value"
        @update-value="handleClick"
      />
      <SmallButtonGroup
        v-if="itemGroup.type === 'smallButtonGroup'"
        :show="itemGroup.show"
      >
        <template v-for="itemSBG in itemGroup.children" :key="itemSBG.label">
          <SmallButton
            @click.prevent="handleClick(itemSBG.id as string, itemSBG)"
            v-if="itemSBG.type === 'smallButton'"
            :title="itemSBG.label"
            :disabled="itemSBG.disabled"
            :show="itemSBG.show"
            :icon="itemSBG.icon"
            :active="itemSBG.id === value"
          />

          <Select
            v-if="itemSBG.type === 'select'"
            :value="itemSBG.value"
            :title="itemSBG.label"
            :options="itemSBG.options"
            :show="itemSBG.show"
            :on-update:value="itemSBG.handleUpdateValue"
          />
          <IconButton
            @click.prevent="handleClick(itemSBG.id as string, itemSBG)"
            v-if="itemSBG.type === 'iconButton'"
            :title="itemSBG.label"
            :icon="itemSBG.icon"
            :disabled="itemSBG.disabled"
            :show="itemSBG.show"
            :active="itemSBG.id === value"
          />
          <slot v-if="itemSBG.type === 'slot'"></slot>
        </template>
      </SmallButtonGroup>
    </template>
  </RibbonGroup>
</template>
<script lang="ts" setup>
import {
  LargeButton,
  SmallButton,
  RibbonGroup,
  SmallButtonGroup,
  LargeDropDownButton,
  IconButton,
  Divider,
  Select
} from "./index.ts";

defineProps<{
  options: MenuType[];
}>();

const value = defineModel("value", { type: String, default: "" });

const emits = defineEmits<{
  (e: "update:value", value: string, option: MenuType): void;
}>();

const handleClick = (value: string, option?: MenuType) => {
  emits("update:value", value, option ?? []);
};
</script>
