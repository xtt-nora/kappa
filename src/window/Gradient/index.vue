<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.gradient')"
    width="700"
    height="auto"
    min-width="700"
    min-height="480"
    v-bind="config"
  >
    <div class="gradient">
      <div class="gradient-card">
        <n-tabs type="card">
          <n-tab-pane :name="$t('menu.grid')">
            <Grid />
          </n-tab-pane>
          <n-tab-pane :name="$t('menu.plot')">
            <Plot />
          </n-tab-pane>
        </n-tabs>
      </div>
      <div class="gradient-button">
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.ok") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import Grid from "./components/grid/index.vue";
import Plot from "./components/plot/index.vue";
const showModal = defineModel({ type: Boolean, default: false });
const config = reactive({
  resize: false,
  mask: false,
  lockView: false,
  showClose: true,
  showMinimize: false,
  showFooter: false,
  transfer: false
});
</script>

<style lang="scss" scoped>
.gradient {
  padding: 2px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-card {
    > .n-tabs {
      > :deep(.n-tab-pane) {
        padding: 12px;
        box-sizing: border-box;
      }
    }
  }

  &-button {
    display: inline-block;
    margin: 12px 0;
    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
}
</style>
