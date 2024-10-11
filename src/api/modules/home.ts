import {
  NewData,
  NewProject,
  ReqForm,
  Res,
  WellInfo,
  WellListReq
} from "@/api/interface/home";
import http from "@/api";

/**
 * @name 首页模块
 */
//
export const DemoApi = (params: ReqForm) => {
  return http.post<Res>(`/V1/user/test`, params);
};

/**
 * 项目列表
 */
export const projectList = () => {
  return http.get(`/api/v1/project/list`);
};
/**
 * 最近列表
 * @param params
 * @returns
 */
export const projectListrecent = () => {
  return http.get(`/api/v1/project/list-recent`);
};
/**
 * 新建项目接口
 */
export const createProject = (params: NewProject) => {
  return http.post(`/api/v1/project/create`, params);
};

/**
 * 单位转换
 */
export const unitConvert = (params: any) => {
  return http.get(`/v1/unit/unitConvert`, params);
};

// 新增数据

export const saveProject = (params: NewData) => {
  return http.post(`/v1/project/save`, params);
};

//browser导航接口
export const loadTree = (params: any) => {
  return http.get(`/v1/browser/loadTree`, params);
};

/**
 * 获取WellList
 * @param params
 */
export const listWell = (params: WellListReq) => {
  return http.get<WellInfo[]>(`/v1/well/list`, params);
};
