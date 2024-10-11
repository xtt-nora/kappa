import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";
import { UserState } from "@/stores/interface/user";
import router from "@/router";
export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: "",
    tokenName: "",
    userInfo: {
      name: ""
    }
  }),
  getters: {},
  actions: {
    setHeaderToken(token: string) {
      this.token = token;
    },
    // 设置token
    setToken(token: string) {
      this.token = token;
    },
    // 设置用户信息
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    },
    // 退出登录
    logout() {
      this.setToken("");
      router.replace("/login");
    }
  },
  persist: piniaPersistConfig("user")
});
