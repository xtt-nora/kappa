<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.compare')"
    width="350"
    height="auto"
  >
    <div class="compare">
      <div class="compare-card">
        <div class="content">
          <n-form
            ref="formRef"
            label-width="auto"
            size="small"
            :model="form"
            require-mark-placement="right-hanging"
            label-placement="left"
          >
            <n-form-item path="opened">
              <n-checkbox v-model:checked="form.opened">
                {{ $t("menu.opened") }}
              </n-checkbox>
            </n-form-item>
            <n-form-item>
              <n-checkbox v-model:checked="form.models">
                {{ $t("menu.models") }}
              </n-checkbox>
              <n-checkbox v-model:checked="form.data">
                {{ $t("menu.data") }}
              </n-checkbox>
            </n-form-item>
            <n-form-item path="normalize">
              <n-checkbox v-model:checked="form.normalize">
                {{ $t("menu.normalize") }}
              </n-checkbox>
            </n-form-item>
          </n-form>
          <vxe-card>
            <n-tree
              block-line
              :data="createData"
              :default-checked-keys="defaultCheckedKeys"
              expand-on-click
              checkable
              default-expand-all
            />
          </vxe-card>
        </div>
      </div>
      <div class="compare-button">
        <n-button size="tiny" @click="allSelect">{{ $t("menu.all") }}</n-button>
        <n-button size="tiny" @click="noneSelect">{{
          $t("menu.none")
        }}</n-button>
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.apply")
        }}</n-button>
        <n-button size="tiny">{{ $t("menu.cancel") }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const showModal = defineModel({ type: Boolean, default: false });
const defaultCheckedKeys = ref(["1"]);
const form = reactive({
  opened: false,
  models: false,
  data: false,
  normalize: false
});
const createData = ref([
  {
    label: "Untitled1",
    key: "5",
    children: [
      {
        label: "原始",
        key: "4"
      },
      {
        label: "定井储+径向复合+无限大",
        key: "3"
      },
      {
        label: "变井储+径向复合+无限大",
        key: "2"
      },
      {
        label: "Analysis1",
        key: "1",
        checkboxDisabled: true
      }
    ]
  }
]);
const allSelect = () => {
  // defaultCheckedKeys.value = ["5", "4", "3", "2", "1"];
};
const noneSelect = () => {
  // defaultCheckedKeys.value = [];
};
</script>

<style lang="scss" scoped>
.compare {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dialogBg;
  &-card {
    .content {
      min-height: 400px;
      border: 1px solid $dialogBorder;
      border: 1px solid #a6a9b2;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    }
  }
  &-button {
    display: flex;
    padding: 10px 0;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    .n-button {
      margin-right: 3px;
      width: 62px;
      float: right;
    }
  }
}
::v-deep .vxe-card {
  flex: 1;
  background: #fff;
}
::v-deep .n-form {
  margin: 0 10px;
}
</style>
