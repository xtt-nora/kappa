import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from "vue-router";
import { useUserStore } from "@/stores/modules/user";

import { LOGIN_URL } from "@/config";
import { staticRouter, errorRouter } from "@/router/modules/staticRouter";
// 路由模式，可通过.env动态配置
const mode = import.meta.env.VITE_ROUTER_MODE;

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
};

/**
 * @description 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name，可用作 KeepAlive 缓存标识 && 按钮筛选权限)
 * @param redirect ==> 重定向路由地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题(用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 档期啊你路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏(通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 */
const router = createRouter({
  history: routerMode[mode](),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 路由拦截器
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // 1.动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  // 2.登陆模块和注册模块，需要判断是否有token
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (userStore.token) next(from.fullPath);
    next();
    return;
  }

  // // 3.判断是否进入激活码页面，如果是直接进入，不做限制
  // if (to.path.toLocaleLowerCase() === LICENSE_URL) {
  //   next();
  //   return;
  // }

  // 4.判断普通页面是否有token,如果没有跳转登录页
  if (!userStore.token) {
    useUserStore().$reset();
    next({ path: LOGIN_URL, replace: true });
    return;
  }

  // // 5.动态获取项目列表
  // if (!detailStore.projectList.length) {
  //   detailStore.getProjectList().then(() => {
  //     detailStore.setDetailState("projectId", detailStore.projectList[0].value);
  //   });
  // }

  // // 6.动态获取菜单
  // if (!detailStore.menuList.length) detailStore.getMenuList();

  // // 7.详情页添加query参数
  // if (to.fullPath.includes(WROKSPACE_URL) && from.query.appId) {
  //   // 要添加的全局 query 参数
  //   const globalQueryParams = { appId: from.query.appId };

  //   // 检查目标路由是否已经包含全局 query 参数
  //   const hasGlobalQueryParams = Object.keys(globalQueryParams).every(
  //     key => key in to.query
  //   );

  //   // 如果没有全局 query 参数，添加它们
  //   if (!hasGlobalQueryParams) {
  //     next({
  //       path: to.path,
  //       query: { ...to.query, ...globalQueryParams },
  //       replace: true
  //     });
  //     return;
  //   }
  // }

  next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  // console.log('路由跳转结束')
});

export default router;
