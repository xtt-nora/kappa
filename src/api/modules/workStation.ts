import http from "@/api";

export const projectApi = {
  /**
   * @description 新建项目
   * @param data
   * @returns
   */
  getNewProject: (param: any) => {
    return http.post<any>("/v1/project/save", param);
  },
  /**
   *
   * @returns 获取系统所有的的单位
   */
  getSystemUnitList: () => {
    return http.get<Recordable>("/v1/unit/getSystemUnitList");
  },
  /**
   *
   * @returns 获取默认的标准单位
   */
  getStandardUnit: () => {
    return http.get<Recordable<number>>("/v1/unit/getStandardUnit");
  },
  /**
   * 获取项目列表
   */
  getAllProject: () => {
    return http.get<any>("/v1/project/getAllList");
  },
  /**
   * 单位导入接口
   */
  importUnit: (file: any) => {
    return http.post<any>("/v1/unit/insertStandardUnit", file);
  }
};
