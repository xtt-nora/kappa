<template>
  <Dialog
    v-model="showModal"
    width="25%"
    max-height="120"
    height="120"
    :title="$t('menu.saveTem')"
  >
    <div class="save">
      <n-space>
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <n-form-item :label="$t('menu.name')" path="name">
            <n-input v-model:value="model.name" />
          </n-form-item>
        </n-form>
      </n-space>
      <n-space class="save-footer" justify="end">
        <n-button>{{ $t("menu.ok") }}</n-button>
        <n-button @click="showModal = false">{{ $t("menu.cancel") }}</n-button>
      </n-space>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showModal = defineModel({ type: Boolean, default: false });
const model = ref({
  name: null
});
const rules = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入新模板名称"
  }
};
</script>

<style lang="scss" scoped>
.save {
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: calc(100% - 30px);
  flex-wrap: nowrap;
  justify-content: space-between;
}
.n-form-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
::v-deep .n-form-item .n-form-item-feedback-wrapper {
  display: inline-block;
  height: 10px;
  padding-left: 10px;
  font-size: 11px;
}
</style>
