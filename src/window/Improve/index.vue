<template>
  <Dialog v-model="showModal" width="900" height="690">
    <div class="improve">
      <div class="improve-card">
        <n-tabs type="card">
          <n-tab-pane key="parameters" :name="$t('menu.parameters')">
            <Parameters
          /></n-tab-pane>
          <n-tab-pane key="targets" :name="$t('menu.targets')"
            ><Targets
          /></n-tab-pane>
        </n-tabs>
      </div>
      <div class="improve-button">
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.cancel")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.run") }}</n-button>
        <n-button style="float: left" size="tiny">
          <template #icon>
            <SvgIcon name="settingsS" size="16"></SvgIcon>
          </template>
          {{ $t("menu.advancedSettings") }}</n-button
        >
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Parameters from "./components/Parameters.vue";
import Targets from "./components/Targets.vue";

const showModal = defineModel({ type: Boolean, default: false });
</script>

<style lang="scss" scoped>
.improve {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-card {
    flex: 1;
    margin: 2px;
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
  &-button {
    display: inline-block;
    padding: 12px;
    box-sizing: border-box;

    .n-button {
      margin-left: 12px;
      min-width: 80px;
      float: right;
    }
  }
}
</style>
