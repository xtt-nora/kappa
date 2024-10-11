import { defineStore } from "pinia";
import { listWell } from "@/api/modules/home";
import { commonApi } from "@/api/modules/workSpace";
import { WellInfo } from "@/api/interface/home.ts";
import piniaPersisConfig from "@/stores/helper/persist";
import { getFlatTreeData } from "@/utils";

type OptionType =
  | {
      label: string;
      value: string;
    }[]
  | null;

export interface projectState {
  /**
   * 项目id
   */
  projectId: string | null;
  /**
   * 井列表
   */
  wellList: WellInfo[] | null;
  /**
   * 当前操作井id
   */
  activeWell: string | null;
  /**
   * 当前操作井信息
   */
  activeWellOption: WellInfo | null;
  /**
   * 当前文件列表(Browser)
   */
  treeData: any;
  /**
   * 当前操作文件id
   */
  activeGuage: string | null;
  /**
   * 当前操作文件信息
   */
  activeGuageOption: OptionType;
  /**
   * 当前所选压力文件组
   */
  activePressure: string[];
  /**
   * 当前所选压力文件
   */
  radioPressure: string | null;
  /**
   * 当前所选产量文件组
   */
  activeProduction: string[];
  /**
   * 当前所选产量文件
   */
  radioProduction: string | null;
}

export const useProjectStore = defineStore({
  id: "project",
  state: (): projectState => ({
    projectId: null,
    wellList: [],
    activeWell: null,
    activeWellOption: null,
    treeData: [],
    activeGuage: null,
    activeGuageOption: [],
    activePressure: [],
    activeProduction: [],
    radioPressure: null,
    radioProduction: null
  }),
  getters: {
    preOption() {
      if (!this.treeData.length) return [];
      const treeList = getFlatTreeData(this.treeData);
      const pressureList = treeList.find(
        item =>
          item.type === "dir" && item.name.toLowerCase().includes("pressure")
      );
      const preList = pressureList.children.map(item => {
        return {
          label: item.name,
          value: item.id
        };
      });
      return preList ? preList : [];
    },
    prodOption() {
      if (!this.treeData.length) return [];
      const treeList = getFlatTreeData(this.treeData);
      const pressureList = treeList.find(
        item =>
          item.type === "dir" && item.name.toLowerCase().includes("production")
      );
      const prodList = pressureList.children.map(item => {
        return {
          label: item.name,
          value: item.id
        };
      });
      return prodList ? prodList : [];
    }
  },
  actions: {
    // Set projectState
    setProjectState(...args: ObjToKeyValArray<projectState>) {
      this.$patch({ [args[0]]: args[1] });
    },
    // 给产量压力文件赋默认值
    getProdAndPreValue() {
      if (this.preOption.length) {
        this.activePressure = this.preOption.map(item => item.value);
        this.radioPressure = this.preOption[0].value;
      }
      if (this.prodOption.length) {
        this.activeProduction = this.prodOption.map(item => item.value);
        this.radioProduction = this.prodOption[0].value;
      }
    },
    // 给活动数据列表赋值
    getGuageList() {
      const treeList = getFlatTreeData(this.treeData);
      const firstDirOption = treeList.find(
        item => item.type === "dir" && item.children.length
      );
      if (firstDirOption) {
        this.$patch({
          activeGuage: firstDirOption.children[0].id,
          activeGuageOption: firstDirOption.children.map(item => {
            return {
              label: item.name,
              value: item.id
            };
          })
        });
      }
      this.getProdAndPreValue();
    },
    // 查询当前项目的所有井
    async getWellList() {
      const wellList = await listWell({
        pid: this.projectId as string
      });
      this.$patch({
        activeWell: wellList.data[0].id,
        activeWellOption: wellList.data[0],
        wellList: wellList.data
      });
      // 更新井列表后更新activeGauge列表
      this.getGuageList();
    },
    /**
     * 获取文件列表(实时)
     */
    async getBrowser() {
      try {
        const res = await commonApi.loadTree(this.projectId);
        this.treeData = res.data;
        // 初次加载或更新文件列表后，自动获取井列表
        this.getWellList();
      } catch (error) {}
    },
    /**
     * 获取文件列表(首次获取)
     */
    async getBrowserTmp() {
      try {
        const res = await commonApi.loadTreeTmp(this.projectId);
        this.treeData = res.data;
        // 初次加载或更新文件列表后，自动获取井列表
        this.getWellList();
      } catch (error) {}
    }
  },
  persist: piniaPersisConfig("project", ["projectId"])
});
