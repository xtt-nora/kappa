import { ReqForm, Res } from "@/api/interface/login";
import http from "@/api";

/**
 * @name 登录模块
 */
//
export const loginApi = (params: ReqForm) => {
  return http.post<Res>(`/v1/auth/login`, params);
};

/**
 * @name 登出模块
 */
//
export const logoutApi = () => {
  return http.get(`/v1/auth/logout`);
};
