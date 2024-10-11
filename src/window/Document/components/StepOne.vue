<template>
  <div class="stepOne">
    <div class="stepOne-sider" v-show="props.isShowimg">
      <img src="../../../assets/images/Vertical_Panel_Blue.png" />
    </div>
    <div class="stepOne-tab">
      <n-tabs type="card">
        <n-tab-pane :tab="$t('step.references')" name="1">
          <Reference v-bind="$attrs" />
        </n-tab-pane>
        <n-tab-pane :tab="$t('step.information')" name="2">
          <Information v-bind="$attrs" />
        </n-tab-pane>
        <n-tab-pane :tab="$t('step.units')" name="3" display-directive="show">
          <Units v-bind="$attrs" />
        </n-tab-pane>
        <n-tab-pane :tab="$t('step.comments')" name="4">
          <Comments v-bind="$attrs" />
        </n-tab-pane>
      </n-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import Reference from "@/window/components/Reference.vue";
import Information from "@/window/components/Information.vue";
import Units from "@/window/components/Units.vue";
import Comments from "@/window/components/Comments.vue";

type TData = { isShowimg: boolean };
const props = withDefaults(defineProps<TData>(), {
  isShowimg: true
});
</script>

<style scoped lang="scss">
.stepOne {
  height: 100%;
  display: flex;
  &-sider {
    margin-right: 12px;
  }
  &-tab {
    flex: 1;
    overflow: hidden;
    .n-tabs {
      height: 100%;
      .n-tab-pane {
        padding: 12px;
        box-sizing: border-box;
        overflow: hidden;
      }
    }
  }
}
</style>
