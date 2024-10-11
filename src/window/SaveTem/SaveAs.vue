<template>
  <Dialog
    v-model="showModal"
    width="25%"
    max-height="120"
    height="120"
    :title="$t('menu.saveAs')"
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
        <n-button @click="sumbit">{{ $t("menu.ok") }}</n-button>
        <n-button @click="showModal = false">{{ $t("menu.cancel") }}</n-button>
      </n-space>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { commonApi } from "@/api/modules/workSpace";
const showModal = defineModel({ type: Boolean, default: false });
const model = ref({
  name: null
});
const formRef = ref<FormInst | null>(null);
const rules = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入新模板名称"
  }
};
const sumbit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        const res = await commonApi.saveas(model.value.name);
        const blob = new Blob([res.data], {
          type: res.headers["content-type"]
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${res.config.params.fileName}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showModal.value = false;
      } catch (error) {
        console.log(errors);
      }
    } else {
      console.log(errors);
    }
  });
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
