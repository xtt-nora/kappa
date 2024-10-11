import http from "@/api";

export const analysisApi = {
  /**
   * @description 新建分析
   * @param data
   * @returns
   */
  getNewAnalysis: (param: any) => {
    return http.post<any>("/v1/analysisProcess/insert", param);
  }
};
