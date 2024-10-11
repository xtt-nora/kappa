import { RouteRecordRaw } from "vue-router";
import { LOGIN_URL, WROKSPACE_URL, WORKSTATION_URL } from "@/config";
// 备注：生产环境使用此版本 configFeatureRoutes为动态创建文件，用于按需打包，动态生成脚本见generate-types.js

/**
 * staticRouter(静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: WORKSTATION_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: WORKSTATION_URL,
    name: "workStation",
    component: () => import("@/views/workStation/index.vue"),
    meta: {
      title: "工作站"
    }
  },
  {
    path: WROKSPACE_URL,
    name: "workSpace",
    component: () => import("@/views/workSpace/index.vue"),
    redirect: WROKSPACE_URL + "/editQAQC",
    meta: {
      title: "工作台"
    },
    children: [
      {
        path: WROKSPACE_URL + "/editQAQC",
        name: "editQAQC",
        component: () => import("@/views/editQAQC/index.vue"),
        meta: {
          title: "editQAQC"
        }
      },
      {
        path: WROKSPACE_URL + "/referenceLogs",
        name: "referenceLogs",
        component: () => import("@/views/referenceLogs/index.vue"),
        meta: {
          title: "referenceLogs"
        }
      },
      {
        path: WROKSPACE_URL + "/map",
        name: "map",
        component: () => import("@/views/map/index.vue"),
        meta: {
          title: "map"
        }
      },
      {
        path: WROKSPACE_URL + "/analysis",
        name: "analysis",
        component: () => import("@/views/analysis/index.vue"),
        meta: {
          title: "analysis"
        }
      },
      {
        path: WROKSPACE_URL + "/window",
        name: "window",
        redirect: WROKSPACE_URL + "/analysis",
        meta: {
          title: "window"
        }
      },
      {
        path: WROKSPACE_URL + "/additionalTools",
        name: "additionalTools",
        redirect: WROKSPACE_URL + "/analysis",
        meta: {
          title: "additionalTools"
        }
      }
    ]
  }
];

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorPage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorPage/404.vue")
  }
];
