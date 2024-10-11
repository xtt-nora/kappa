<template>
  <Dialog
    v-model="showModal"
    :title="$t('menu.delete')"
    width="310"
    height="auto"
  >
    <div class="delete">
      <div class="delete-card">
        <vxe-card>
          <div class="delete-ccc">
            <SvgIcon name="PTA_LoadQ" size="24"></SvgIcon>
            <span>{{ $t("menu.delectDoc") }}</span>
          </div>
        </vxe-card>
      </div>
      <div class="delete-button">
        <n-button size="tiny">{{ $t("menu.yes") }}</n-button>
        <n-button size="tiny" @click="showModal = false">{{
          $t("menu.no")
        }}</n-button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const showModal = defineModel({ type: Boolean, default: false });
</script>

<style lang="scss" scoped>
.delete {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $dialogBg;
  &-card {
    .vxe-card {
      margin-bottom: 12px;
    }
  }
  &-button {
    display: flex;
    margin: 0 0 12px 0;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    .n-button {
      margin-left: 12px;
      width: 80px;
      float: right;
    }
  }
  .delete-ccc {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-evenly;
  }
}
::v-deep .n-select {
  margin-left: 5px;
}
</style>
