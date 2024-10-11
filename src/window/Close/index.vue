<template>
  <Dialog
    v-model="showModal"
    width="325"
    max-height="150"
    :height="isExit === 'exit' ? 150 : 120"
    :title="$t('menu.save')"
    @close="cancel"
  >
    <div class="close">
      <div class="close-content">
        <n-space>
          <SvgIcon name="helpS" size="32" v-show="isExit === 'exit'"></SvgIcon>
          <span>{{ $t("menu.isSave") }}</span>
        </n-space>
      </div>
      <n-space class="close-footer" justify="center">
        <n-button size="large" @click="yes">{{ $t("menu.yes") }} </n-button>
        <n-button size="large" @click="no">{{ $t("menu.no") }} </n-button>
        <n-button size="large" @click="cancel">{{
          $t("menu.cancel")
        }}</n-button>
      </n-space>
      <n-space class="close-tips" v-show="isExit === 'exit'">
        <n-checkbox v-model:checked="tips">
          {{ $t("menu.ataod") }}
        </n-checkbox>
      </n-space>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isChioce = ref(true);
type TFn = {
  (e: "update-chioce", value: boolean): void;
};
const emit = defineEmits<TFn>();
const showModal = defineModel({ type: Boolean, default: false });
const isExit = defineModel("close");
const tips = ref(false);
const cancel = () => {
  showModal.value = false;
  isExit.value !== "close" && router.push({ path: "/workSpace" });
};
const yes = () => {
  isExit.value === "close" && emit("update-chioce", isChioce.value);
  showModal.value = false;
};
const no = () => {
  isExit.value === "close" && emit("update-chioce", isChioce.value);
  showModal.value = false;
};
</script>

<style lang="scss" scoped>
.close {
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: calc(100% - 30px);
  flex-wrap: nowrap;
  justify-content: space-between;

  &-tips {
    margin-top: 10px;
    margin-left: 15px;
  }
}
</style>
