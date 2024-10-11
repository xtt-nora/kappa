import { defineStore } from "pinia";
import { GlobalState } from "../interface/global";
import piniaPersisConfig from "@/stores/helper/persist";

export const useGlobalStore = defineStore({
  id: "global",
  state: (): GlobalState => ({
    language: "en",
    isExpand: false
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  persist: piniaPersisConfig("global")
});
