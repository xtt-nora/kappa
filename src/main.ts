import { createApp } from "vue";
import App from "./App.vue";
// 状态管理工具
import pinia from "@/stores";
import router from "@/router";

// vxe-table
import VxeTable from "vxe-table";
import "vxe-table/lib/style.css";
import VxeUI from "vxe-pc-ui";
import "vxe-pc-ui/lib/style.css";

// // 阿里iconfont
import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js";
import "@/styles/index.scss";

import Directives from "@/directives";
import FontIcon from "@/components/FontIcon.vue";

// 全局注册本地svg图标组件
// 全局svg图标注册
import "virtual:svg-icons-register";
import svgIcon from "@/components/SvgIcon/index.vue";

// vue i18n
import I18n from "@/languages/index";

const app = createApp(App);
app.component(FontIcon.name, FontIcon);
app.component("SvgIcon", svgIcon);
app
  .use(pinia)
  .use(router)
  .use(VxeUI)
  .use(I18n)
  .use(VxeTable)
  .use(Directives)
  .mount("#app");
