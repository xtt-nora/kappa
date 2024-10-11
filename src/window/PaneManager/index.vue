<template>
  <n-card content-class="paneManager" :title="$t('menu.paneManager')">
    <n-split direction="vertical" :default-size="0.3" :max="0.7" :min="0.3">
      <template #1>
        <n-card
          content-class="Displayed pane"
          :title="$t('menu.displayedPanes')"
        >
          <PaneList
            id="displayed"
            v-model:value="selected"
            :options="displayedPanes"
            @handle-dropdown="handleDropdown"
            @handle-dblclick="handleUpdateSelected" /></n-card
      ></template>
      <template #2>
        <n-card
          content-class="Displayed pane"
          :title="$t('menu.availabelPanes')"
          ><PaneList
            id="available"
            v-model:value="selected"
            :options="availabledPanes"
            @handle-dropdown="handleDropdown"
            @handle-dblclick="handleUpdateSelected"
          />
        </n-card>
      </template>
    </n-split>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, toRaw } from "vue";
import PaneList from "./components/PaneList.vue";

type OptionType = {
  label: string;
  value: string;
};

const selected = ref("");

const displayedPanes = ref<OptionType[]>([
  { label: "Pressure", value: "Pressure" },
  { label: "Produciton", value: "Produciton" }
]);
const availabledPanes = ref<OptionType[]>([]);

const handleUpdateSelected = (value: string) => {
  let selectedOption: any = null;
  if (value === "displayed") {
    const options = toRaw(displayedPanes.value);
    selectedOption = options.find(item => item.value === selected.value);
    availabledPanes.value.push(selectedOption);
    displayedPanes.value = options.filter(
      item => item.value !== selected.value
    );
  } else {
    const options = toRaw(availabledPanes.value);
    selectedOption = options.find(item => item.value === selected.value);
    displayedPanes.value.push(selectedOption);
    availabledPanes.value = options.filter(
      item => item.value !== selected.value
    );
  }
  selected.value = "";
};

const handleDropdown = (type: string, value: string) => {
  console.log(type, value);
};
</script>
<style scoped lang="scss">
.n-card {
  height: 100%;
  :deep(.paneManager) {
    .n-card {
      .n-card__content {
        background-color: white;
        overflow: hidden;
        padding: 0;
      }
    }
  }
}
</style>
