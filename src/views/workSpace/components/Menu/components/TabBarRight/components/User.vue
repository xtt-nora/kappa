<template>
  <n-dropdown :options="options" trigger="click" :on-select="handleSelect">
    <n-button text>
      <template #icon>
        <SvgIcon name="userS" size="16"></SvgIcon>
      </template>
    </n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { useI18n } from "vue-i18n";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { logoutApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useRouter } from "vue-router";
import { LOGIN_URL } from "@/config";

const { t } = useI18n();
const uesrStore = useUserStore();
const router = useRouter();

const options = computed(() => [
  {
    label: t("menu.logout"),
    key: "logout",
    icon: () => {
      return h(SvgIcon, { name: "logout", size: "16" }, {});
    }
  }
]);

const handleSelect = async (value: string) => {
  switch (value) {
    case "logout":
      // 1.执行退出登录接口
      await logoutApi();

      // 2. 清除token
      uesrStore.setToken("");

      // 跳转登录
      router.replace(LOGIN_URL);

      break;
  }
};
</script>

<style scoped></style>
