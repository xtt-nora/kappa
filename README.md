# petro软件


## 需要掌握的基础知识

- 本项目基于 Vue3.3、Vite4、TS、Pinia、Naive UI 开发，并全部采用了的单文件组件 ＜script setup＞ 写法。
- 建议您在开发前先学习以下内容，提前了解和学习这些知识，会对项目理解非常有帮助：
  - Vscode/WebStorm - 推荐的开发工具
  - Node.js和Git开发环境
  - [Vite - 熟悉Vite特性](https://v3.vitejs.dev/)
  - [Vue3 - 基础语法](https://cn.vuejs.org/)
  - [TypeScript - 基础语法](https://www.runoob.com/typescript/ts-tutorial.html)
  - [Es6+ - 基础语法](https://www.runoob.com/w3cnote/es6-tutorial.html)
  - [Vue-Router - 熟悉vue-router](https://router.vuejs.org/)
  - [NaiveUI - 组件库](https://www.naiveui.com/zh-CN/os-theme)
  - [Echarts - 可视化图表](https://echarts.apache.org/zh/index.html)
  - [Canvas - 基础语法](https://www.runoob.com/html/html5-canvas.html)
  - [Pinia - 状态管理](https://pinia.vuejs.org/zh/)

## 快速上手

### 环境准备

本地环境需要安装 Node.js 16.x+、pnpm 7.x+、Git

```
WARNING

Node.js 版本推荐安装 16+ 以上，版本过低依赖包可能安装失败。

默认使用 pnpm 作为安装依赖包工具，使用 yarn、npm 没有 lock 可能会安装到最新版依赖。
```

### 工具配置

本项目推荐使用 VSCode 进行开发，项目里面已内置 VSCode 配置，包含推荐的插件和设置。

> 🌈 推荐安装以下插件：

- [Vue Language Features (Volar) Vue3 官方插件](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar) Vue3 官方插件（TypeScript）](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Vue 3 Snippets Vue3 代码提示](https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets)
- [ESLint 代码检查](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint CSS 代码检查 && 格式化](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Prettier - Code formatter 代码格式化](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig for VS Code 统一不同编辑器的编码风格](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Code Spell Checker 校验单词拼写错误](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Sass Sass 样式编写](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)
- [DotENV 高亮 .env 文件](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)

.vscode > extensions.json

```json
{
  "recommendations": [
    "vue.volar",
    "vue.vscode-typescript-vue-plugin",
    "hollowtree.vue-snippets",
    "dbaeumer.vscode-eslint",
    "stylelint.vscode-stylelint",
    "esbenp.prettier-vscode",
    "editorconfig.editorconfig",
    "streetsidesoftware.code-spell-checker",
    "syler.sass-indented",
    "mikestead.dotenv"
  ]
}
```

> WARNING
>
> - 开发 Vue3 项目请开启 Volar 插件、禁用 Vetur 插件。
> - 请配置项目默认格式化程序为 Prettier。

### git地址

```bash
http://192.168.0.6:3000/r-platform/r-platform-web
```

### 代码拉取

```bash
git clone http://192.168.0.6:3000/r-platform/r-platform-web.git
```

### 安装步骤

1. 安装依赖
   ```bash
   # 使用 pnpm
   pnpm install
   ```
2. 运行项目
   ```bash
   # 以下两个命令都可以
   pnpm dev
   pnpm serve
   ```
3. 打包项目

   ```bash
   # 开发环境
   pnpm build:dev

   # 测试环境
   pnpm build:test

   # 生产环境
   pnpm build:pro
   ```

4. 校验、格式化代码

   ```bash
   # eslint 检测代码
   pnpm lint:eslint

   # prettier 格式化代码
   pnpm lint:prettier

   # stylelint 格式化样式
   pnpm lint:stylelint
   ```

### npm script 详解

```json
{
  "scripts": {
    // 本地运行(dev环境)
    "dev": "vite",
    // 本地运行(dev环境)
    "serve": "vite",
    // 构建打包(dev环境)
    "build:dev": "vue-tsc && vite build --mode development",
    // 构建打包(test环境)
    "build:test": "vue-tsc && vite build --mode test",
    // 构建打包(pro环境)
    "build:pro": "vue-tsc && vite build --mode production",
    // 检查项目 ts 类型
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    // 本地环境预览构建后的 dist
    "preview": "npm run build:dev && vite preview",
    // 执行 eslint 校验
    "lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
    // 执行 prettier 格式化
    "lint:prettier": "prettier --write \"src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}\"",
    // 执行 stylelint 格式化
    "lint:stylelint": "stylelint --cache --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
    // 执行 lint-staged.config.js 文件下的命令
    "lint:lint-staged": "lint-staged",
    // 初始化 husky 配置
    "prepare": "husky install",
    // 自动更新版本
    "release": "standard-version",
    // 提交代码(可自定义配置执行命令)
    "commit": "git add -A && czg && git push"
  }
}
```

## 目录结构

```
├─ .vscode                # VSCode 推荐配置
├─ build                  # Vite 配置项
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ enums               # 项目常用枚举
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ layouts             # 框架布局模块
│  ├─ router              # 路由管理
│  ├─ stores              # pinia store
│  ├─ styles              # 全局样式文件
│  ├─ types               # 全局 ts 声明
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ windows             # 项目弹窗集中入口
│  ├─ App.vue             # 项目主组件
│  ├─ main.ts             # 项目入口文件
│  └─ vite-env.d.ts       # 指定 ts 识别 vue
├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.cjs          # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.cjs        # Prettier 格式化配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.cjs       # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.cjs  # git 提交规范配置
├─ index.html             # 入口 html
├─ lint-staged.config.cjs # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.cjs     # postcss 配置
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件
```

## 代码及目录命名规范

    项目采用 Vue 官方推荐的风格指南，请务必查看

### A 优先级规则： 基本

#### 组件引入

> 用户组件名称应始终为多字，根组件除外。这样可以防止与现有和将来的 HTML 元素发生冲突，因为所有 HTML 元素都是一个单词。

```html
<!-- in pre-compiled templates -->
<TodoItem />

<!-- in in-DOM templates -->
<todo-item></todo-item>
```

#### prop

> 在提交的代码中，prop 定义应始终尽可能详细，至少指定类型。

```js
// Even better!

const props = defineProps({
  status: {
    type: String,
    required: true,

    validator: value => {
      return ["syncing", "synced", "version-conflict", "error"].includes(value);
    }
  }
});
```

#### v-for

> 在组件中始终需要使用 key with，以便在子树中保持组件的内部状态。即使对于元素，保持可预测的行为也是一种很好的做法，例如动画中的对象恒定性。

**避免** v-if v-for同时使用

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

#### 组件样式要使用 scoped

```html
<template>
  <button class="button button-close">×</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
  .button {
    border: none;
    border-radius: 2px;
  }

  .button-close {
    background-color: red;
  }
</style>
```

### 优先级 B 规则：强烈推荐

#### 组件文件

**每当构建系统可用于连接文件时，每个组件都应位于其自己的文件中。**

```html
components/ |- TodoList.js |- TodoItem.js
```

#### 单文件组件文件名大小写

**单文件组件的文件名应始终为 PascalCase 或始终为 kebab-case。**

> PascalCase 最适合在代码编辑器中使用自动补全功能，因为它与我们在 JS（X） 和模板中引用组件的方式一致。但是，混合大小写文件名有时会在不区分大小写的文件系统上产生问题，这就是为什么 kebab-case 也是完全可以接受的。

```
components/
|- MyComponent.vue
```

#### 基本组件名称

**应用特定于应用的样式和约定的基本组件（也称为表示型、哑型或纯组件）都应以特定前缀开头，例如 `Base`、`App` 或 `V`。**

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

#### 紧密耦合的组件名称

**与其父组件紧密耦合的子组件应包含父组件名称作为前缀。**

> 如果组件仅在单个父组件的上下文中才有意义，则该关系应在其名称中很明显。由于编辑器通常按字母顺序组织文件，因此这也使这些相关文件彼此相邻。

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

#### 组件名称中的单词顺序

**组件名称应以最高级别（通常是最通用）的单词开头，并以描述性修饰词结尾。**

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

#### 全字组件名称

**组件名称应优先使用完整单词而不是缩写。**

> 编辑器中的自动完成功能使得编写较长名称的成本非常低，而它们提供的清晰度是无价的。尤其应避免使用不常见的缩写。

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

#### 多属性元素

**具有多个属性的元素应跨越多行，每行一个属性。**

> 在 JavaScript 中，将具有多个属性的对象拆分到多行上被广泛认为是一种很好的约定，因为它更容易阅读。我们的模板和 JSX 值得同样考虑。

```
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

#### 计算属性

复杂的计算属性应拆分为尽可能多的简单属性。

```js
const basePrice = computed(
  () => manufactureCost.value / (1 - profitMargin.value)
);

const discount = computed(() => basePrice.value * (discountPercent.value || 0));

const finalPrice = computed(() => basePrice.value - discount.value);
```

## git提交规范

- feat：提交新功能
- fix：修复了bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复bug也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改

## 网络请求

- 项目封装了Axios来做网络请求，包括请求 Loading、错误处理、取消请求等功能

### 目录结构

```
├─ api                       # 网络请求文件夹
├ ├─config                   # 网络请求相关配置 e.p：公共URL前缀
├ ├─helper                   # 辅助函数：错误处理、取消请求
├ ├ ├─axiosCancel.ts         # 取消请求函数
├ ├ ├─checkStatus.ts         # 检查请求返回的状态
├ ├─interface                # api接口的请求参数和返回数据的类型定义文件夹
├ ├─modules                  # 请求函数模块，强烈建议根据不同的模块创建不同的请求文件
├ └─index.ts                 # 封装后的axios
└─
```

## pinia规范

### 目录结构

```
├─ stores                    # pinia文件夹
├ ├─helper                   # 辅助函数
├ ├ ├─persist.ts             # pinia持久化
├ ├─interface                # pinia各个模块state类型定义文件夹
├ ├─modules                  # pinia模块
├ └─index.ts                 # 封装后的pinia
└─
```

## 自定义指令

### 目录结构

```
├─ directives                # 自定义指令文件夹
├ ├─modules                  # 自定义指令模块
├ └─index.ts                 # 封装后的directives
└─
```

## Ribbon菜单

### 目录结构

```
├─ layouts                   # 框架布局文件夹
├ ├─components               # 框架公共模块
├ ├ ├─Container              # 页面内容区域
├ ├ ├─Footer                 # 底部状态栏
├ ├ ├─Sider                  # 左侧区域
├ ├ ├─Tabs                   # 页面tabs
├ ├─RibbonMenu               # Ribbon菜单
├ ├ ├─RibbonHeader           # Ribbon菜单模块化
├ ├ ├ ├─modules              # Ribbon菜单模块
├ ├ ├ ├ ├─HeaderLeft         # Ribbon菜单顶部左侧区域
├ ├ ├ ├ ├─HeaderRight        # Ribbon菜单顶部右侧工具栏区域
├ ├ ├ ├ ├─RibbonTabs         # Ribbon菜单
├ ├ ├ ├ ├ ├─components       # Ribbon菜单公共按钮封装
├ ├ ├ ├ ├ ├─dataTab.vue      # Ribbon菜单文件模块
├ ├ ├ ├ ├ ├─fileTab.vue      # Ribbon菜单数据模块
├ ├ ├ ├ ├ ├─***.vue          # Ribbon菜单***模块
├ ├ ├ ├─index                # Ribbon菜单整体布局
├ ├ ├─hooks                  # 常用hooks函数
├ ├ └─index.vue              # Ribbon菜单风格页面整体布局
├ └─index.ts                 # 页面主文件
└─
```

### 新增Ribbon顶部菜单的方法

1. 在store的menu.ts中新增菜单

```ts
import { defineStore } from "pinia";
import { menuState, menuKeyType } from "../interface";
export const useMenuStore = defineStore({
  id: "menu",
  state: (): menuState => ({
    menuTabs: [
      {
        key: "fileTab",
        value: "文件"
      },
      {
        key: "dataTab",
        value: "数据"
      }
    ],
    checkedMenu: "fileTab"
  }),
  getters: {},
  actions: {
    updateMenuTabs(checked: menuKeyType) {
      this.checkedMenu = checked;
    }
  }
});
```

1. 在interface中添加属性

```ts
export type menuValueType = "文件" | "数据";
export type menuKeyType = "fileTab" | "dataTab";
```

1. 在RibbonTabs文件夹下新增菜单  
   src\layouts\RibbonMenu\RibbonHeader\modules\RibbonTabs\*\*\*.vue
1. 将新增的菜单引入到 RibbonHeader 下，并添加对应组件

```ts
const MenuComponents: Record<menuKeyType, Component> = {
  fileTab: FileTab,
  dataTab: DataTab,
  ***: ***
}
```

### 弹窗组件控制步骤

1. 在sotres下interface中添加属性

```ts
/*WindowState*/
export interface WindowState {
  // 控制导入数据弹窗
  menuImportFlag: boolean;
}
```

2. 在stores的windows.ts中新增控制属性

```ts
import { defineStore } from "pinia";
import { WindowState } from "../interface";
export const useWindowStore = defineStore({
  id: "window",
  state: (): WindowState => ({
    menuImportFlag: false
  }),
  getters: {},
  actions: {
    updateImport(flag: boolean) {
      this.menuImportFlag = flag;
    }
  }
});
```

3. 在windows文件夹中新建弹窗文件夹并引入弹窗本体组件以及弹窗内容文件夹

```ts
windows/
|- MenuImportData
    |-index.vue
    |-components->弹窗内容文件夹
```

4. 在需要引入弹窗的页面下引入windows文件夹下的组件

```ts
  <MenuImportData :importDataType="importDataType" />

```

5. 弹窗命名规则

```ts
菜单中弹窗一律以menu开头
左侧树弹窗一律以tree开头
···
以此类推有标准化的命名开头
```
