<template>
  <vxe-modal
    v-model="model"
    :width="600"
    :height="400"
    :lock-view="true"
    :mask="false"
    size="mini"
    :padding="false"
    v-bind="$attrs"
    destroy-on-close
    :resize="false"
  >
    <template v-for="(_, key) in $slots" #[key]="slotProps" :key="key">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>
  </vxe-modal>
</template>

<script lang="ts" setup>
const model = defineModel<boolean>({ required: true, default: false });
</script>
