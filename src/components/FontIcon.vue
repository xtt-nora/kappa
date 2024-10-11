<template>
  <div
    class="template-icon-box"
    :style="styleObj"
    :class="{ readonly: readonly, 'symbol-icon': type === 'symbol' }"
  >
    <svg v-if="type === 'symbol'" class="icon" aria-hidden="true">
      <use :xlink:href="`#${iconClass}`"></use>
    </svg>
    <i :style="styleObj" v-else class="iconfont" :class="[iconClass]"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, StyleValue } from "vue";

export default defineComponent({
  name: "FontIcon",
  props: {
    type: {
      type: String,
      default: () => "class" // 默认class单色，symbol多色
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    iconName: {
      type: String
    },
    size: {
      type: Number,
      default: 16
    }
  },
  setup(props) {
    const iconClass = computed(() => {
      return `icon-petro-${props.iconName}`;
    });

    const styleObj = computed(() => {
      return <StyleValue>{ "font-size": `${props.size}px` };
    });

    return {
      iconClass,
      styleObj
    };
  }
});
</script>
<style lang="scss">
.symbol-icon {
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
<style lang="scss" scoped>
.template-icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &.readonly {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
