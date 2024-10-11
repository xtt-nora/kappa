
export const FeatureRoutes = [{
        path: "/detail/validation",
        name: "validation",
        component: () => import("@/views/detail/views/p-validation/index.vue"),
        meta: {
          title: "数据校验"
        }
      },{
        path: "/detail/unit",
        name: "unit",
        component: () => import("@/views/detail/views/p-unit/index.vue"),
        meta: {
          title: "单位转换"
        }
      },{
        path: "/detail/userManage",
        name: "userManage",
        component: () => import("@/views/detail/views/p-manage-user/index.vue"),
        meta: {
          title: "用户管理"
        }
      },{
        path: "/detail/licenseManage",
        name: "licenseManage",
        component: () => import("@/views/detail/views/p-manage-license/index.vue"),
        meta: {
          title: "许可管理"
        }
      },{
        path: "/detail/menuManage",
        name: "menuManage",
        component: () => import("@/views/detail/views/p-manage-menu/index.vue"),
        meta: {
          title: "菜单管理"
        }
      },{
        path: "/detail/import",
        name: "import",
        component: () => import("@/views/detail/views/p-import/index.vue"),
        meta: {
          title: "数据导入"
        }
      },{
        path: "/detail/licenseDistribution",
        name: "licenseDistribution",
        component: () =>
          import("@/views/detail/views/p-license-distribution/index.vue"),
        meta: {
          title: "许可分发"
        }
      }, {
        path: "/detail/buildManage",
        name: "buildManage",
        component: () => import("@/views/detail/views/p-manage-build/index.vue"),
        meta: {
          title: "打包构建"
        }
      }, {
          path: "/detail/pvt",
          name: "pvt",
          component: () => import("@/views/detail/views/p-pvt/index.vue"),
          meta: {
            title: "PVT"
          }
        },  {
          path: "/detail/projectManage",
          name: "projectManage",
          component: () => import("@/feature/p-suffer-home/index.vue"),
          meta: {
            title: "工程管理"
          }
        },]