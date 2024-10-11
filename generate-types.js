import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// process.argv 是一个数组，其中前两个元素分别是 Node.js 可执行文件路径和当前脚本路径
// 所以实际的参数从第三个元素开始
const args = process.argv.slice(2);
// 解析参数（这里简单地假设参数格式为 --key=value）
const params = {};
args.forEach(arg => {
  const [key, value] = arg.split("=");
  params[key.replace("--", "")] = value;
});

// 现在你可以使用 params 对象来获取传递的参数值
const configValue = params["configfile"];

console.log("Config value:", configValue);

// 获取当前模块的文件路径和目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 定义 JSON 文件的路径和输出 JS 文件的路径
const jsonFilePath = path.resolve(
  __dirname,
  configValue || "./test-router-all.json"
); // 修改为你的 JSON 文件路径

console.log(jsonFilePath, "----jsonFilePath");
const outputFilePath = path.resolve(
  __dirname,
  "./src/router/configFeatureRoutes.js"
); // 修改为你的输出文件路径

// 读取 JSON 文件
fs.readFile(jsonFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file:", err);
    return;
  }

  // 解析 JSON 数据
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (err) {
    console.error("Error parsing JSON data:", err);
    return;
  }

  // 根据 JSON 数据生成 JS 文件内容
  //   TODO:功能模块id要跟后端对齐

  const routesMap = {
    1: `{
        path: "/detail/validation",
        name: "validation",
        component: () => import("@/views/detail/views/p-validation/index.vue"),
        meta: {
          title: "数据校验"
        }
      }`,
    2: `{
        path: "/detail/unit",
        name: "unit",
        component: () => import("@/views/detail/views/p-unit/index.vue"),
        meta: {
          title: "单位转换"
        }
      }`,
    3: `{
        path: "/detail/userManage",
        name: "userManage",
        component: () => import("@/views/detail/views/p-manage-user/index.vue"),
        meta: {
          title: "用户管理"
        }
      }`,
    4: `{
        path: "/detail/licenseManage",
        name: "licenseManage",
        component: () => import("@/views/detail/views/p-manage-license/index.vue"),
        meta: {
          title: "许可管理"
        }
      }`,
    5: `{
        path: "/detail/menuManage",
        name: "menuManage",
        component: () => import("@/views/detail/views/p-manage-menu/index.vue"),
        meta: {
          title: "菜单管理"
        }
      }`,
    6: `{
        path: "/detail/import",
        name: "import",
        component: () => import("@/views/detail/views/p-import/index.vue"),
        meta: {
          title: "数据导入"
        }
      }`,
    7: `{
        path: "/detail/licenseDistribution",
        name: "licenseDistribution",
        component: () =>
          import("@/views/detail/views/p-license-distribution/index.vue"),
        meta: {
          title: "许可分发"
        }
      }`,
    8: ` {
        path: "/detail/buildManage",
        name: "buildManage",
        component: () => import("@/views/detail/views/p-manage-build/index.vue"),
        meta: {
          title: "打包构建"
        }
      }`,
    9: ` {
          path: "/detail/pvt",
          name: "pvt",
          component: () => import("@/views/detail/views/p-pvt/index.vue"),
          meta: {
            title: "PVT"
          }
        }`,
    10: `  {
          path: "/detail/projectManage",
          name: "projectManage",
          component: () => import("@/feature/p-suffer-home/index.vue"),
          meta: {
            title: "工程管理"
          }
        }`
  };

  // 生成的 JavaScript 文件内容
  let jsContent = `
export const FeatureRoutes = [`;

  jsonData.list.forEach((item, index) => {
    const str = routesMap[item];
    if (str) {
      jsContent += str + `,`;
    }
  });

  jsContent += `]`;

  // 写入 JS 文件
  fs.writeFile(outputFilePath, jsContent, "utf8", err => {
    if (err) {
      console.error("Error writing JS file:", err);
      return;
    }
    console.log(`JavaScript file generated successfully at ${outputFilePath}`);
  });
});
