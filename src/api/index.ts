import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from "axios";
import { ResultEnum } from "@/enums/httpEnum";
import { useUserStore } from "@/stores/modules/user";
import { ResultData } from "./interface";
import naiveui from "@/utils/naiveui";
import { checkStatus } from "./helper/checkStatus";
import router from "@/router";
import { useGlobalStore } from "@/stores/modules/global";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
}

const config = {
  // 默认地址请求地址，可在.env进行动态配置
  baseURL: import.meta.env.VITE_API_URL,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时允许携带凭证
  withCredentials: true
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT): 接受服务器返回的token,存储到vuex/pinia/本地存储当中
     */
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const userStore = useUserStore();
        const globalStore = useGlobalStore();

        naiveui.loading.start();
        // 当前请求不需要显示loading, 在api服务中通过指定的第三个参数: { loading: false } 来控制
        // config.loading ?? (config.loading = true)
        // config.loading && showFullScreenLoading();

        // 添加token
        if (config.headers) {
          config.headers.Authorization = userStore.token;
          config.headers["petro-token"] = userStore.token;
          config.headers["language"] = `${globalStore.language}_US`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     * 服务器返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        // 如果响应类型为blob数据流，则直接返回响应体
        if (response.request.responseType === "blob") {
          naiveui.loading.finish();
          return response;
        }

        const { data } = response;

        const userStore = useUserStore();

        // 如果响应状态码不为0，则进行错误处理
        if (data.code !== 0) {
          naiveui.message.warning(data.msg);
          naiveui.loading.error();

          // 判断是否登录
          if (data.code == 401) {
            // 清空token
            userStore.setToken("");
            window.localStorage.clear();
            // 路由重定向
            router.replace("/login");
          }

          return Promise.reject(data);
        }

        // 全局错误信息拦截(防止下载文件的时候返回数据流，没有code直接报错)
        // if (data.code && data.code !== ResultEnum.SUCCESS) {
        //   message.error(data.msg)
        //   return Promise.reject(data)
        // }
        naiveui.loading.finish();
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        // 请求超时 && 网络错误单独判断，没有response
        if (error.message.indexOf("timeout") !== -1)
          naiveui.message.error("请求超时！请您稍后重试");
        if (error.message.indexOf("Network Error") !== -1)
          naiveui.message.error("网络错误！请您稍后重试");

        // 根据服务器响应的错误状态码，做不同处理
        if (response) checkStatus(response.status);
        // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理：可以跳转到断网页面
        // if (!window.navigator.onLine) router.replace("/500")
        naiveui.loading.error();
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(
    url: string,
    params?: object | string,
    _object = {}
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, { responseType: "blob", ..._object });
  }
}

export default new RequestHttp(config);
