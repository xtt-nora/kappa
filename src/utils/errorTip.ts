import naiveui from "@/utils/naiveui";
import { checkStatus } from "@/api/helper/checkStatus";
// 错误提示
export function queryErrorTip(error: {
  data?: any;
  message: string;
  response?: any;
}) {
  const { response, message, data } = error || {};
  // 请求超时 && 网络错误单独判断，没有response
  if (message.indexOf("timeout") !== -1) {
    naiveui.message.error("请求超时！请您稍后重试");
  } else if (message.indexOf("Network Error") !== -1) {
    naiveui.message.error("网络错误！请您稍后重试");
  } else if (response) {
    // 根据服务器响应的错误状态码，做不同处理
    checkStatus(response.status);
  } else if (data) {
    naiveui.message.error(data.message || "接口错误");
  }
  // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理：可以跳转到断网页面
  // if (!window.navigator.onLine) router.replace("/500")
  // naiveui.loading.error();
}
