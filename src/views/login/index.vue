<template>
  <div class="login">
    <div class="login-logo">
      <SvgIcon name="zuanshi" size="64" />
    </div>
    <div class="font-moreBold mt-6 mb-20">{{ $t("login.login") }}</div>
    <div class="login-form color-16">
      <n-form ref="formRef" :model="model">
        <n-form-item path="username" :label="$t('login.username') + ':'">
          <n-input
            v-model:value="model.username"
            maxlength="32"
            :placeholder="$t('login.usernamePlaceholder')"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>
        <n-form-item path="password" :label="$t('login.password') + ':'">
          <n-input
            v-model:value="model.password"
            type="password"
            :placeholder="$t('login.passwordPlaceholder')"
            maxlength="32"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>
        <n-button
          type="primary"
          class="button"
          :loading="loading"
          @click="throttleLogin"
        >
          {{ $t("login.login") }}
        </n-button>
      </n-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { FormInst } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { WORKSTATION_URL } from "@/config";
import { loginApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useDebounceFn } from "@vueuse/core";

interface ModelType {
  username: string | null;
  password: string | null;
}

const router = useRouter();
const userStore = useUserStore();

const formRef = ref<FormInst | null>(null);
const loading = ref(false);
const model = ref<ModelType>({
  username: null,
  password: null
});

const login = (e: MouseEvent) => {
  loading.value = true;
  e.preventDefault();
  formRef.value?.validate(async errors => {
    if (!errors) {
      try {
        const res = await loginApi(model.value);
        userStore.setHeaderToken(res.data.tokenName);
        userStore.setToken("Bearer " + res.data.token);
        userStore.setUserInfo({ name: model.value.username });
        router.push(WORKSTATION_URL);
      } catch (errors) {
        console.error(errors);
      }
    } else {
      console.log(errors);
    }
  });
  loading.value = false;
};

const throttleLogin = useDebounceFn(login, 500);
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
