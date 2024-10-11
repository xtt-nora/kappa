<template>
  <div class="ribbonGroup" v-show="show">
    <div class="ribbonGroup-content">
      <slot></slot>
    </div>
    <span>{{ title }}</span>
  </div>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string;
    show: boolean;
  }>(),
  {
    title: "",
    show: true
  }
);
</script>
<style lang="scss" scoped>
.ribbonGroup {
  display: inline-block;
  border-right: 1px solid;
  border-image: linear-gradient(
      0deg,
      $fristMenuBorder,
      $fristMenuBorder,
      rgba(0, 0, 0, 0.1)
    )
    1;
  .ribbonGroup-content {
    height: 74px;
    display: flex;
  }
  span {
    border-top: 1px solid;
    border-image: linear-gradient(
        0.25turn,
        rgba(0, 0, 0, 0),
        $secondMenuBorder,
        rgba(0, 0, 0, 0)
      )
      1;
    text-align: center;
    display: block;
    font-size: 12px;
    line-height: 23px;
  }
}
</style>
