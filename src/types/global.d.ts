/* Vite */
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
  VITE_USER_NODE_ENV: "development" | "production" | "test";
  VITE_GLOB_APP_TITLE: string;
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_REPORT: boolean;
  VITE_ROUTER_MODE: "hash" | "history";
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "gzip,brotli" | "none";
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_API_URL: string;
  VITE_PROXY: [string, string][];
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

type ButtonType =
  | "largeButton"
  | "smallButtonGroup"
  | "largeDropdownButton"
  | "select"
  | "divider"
  | "group"
  | "smallButton"
  | "selectPane"
  | "iconButton";

declare interface MenuType {
  [key: string]: any;
  label?: string;
  id?: string;
  type?: ButtonType;
  disabled?: boolean;
  value?: any;
  show?: boolean;
  icon?: string;
  options?: {
    [key: string]: any;
    label?: string;
    value?: string | number;
  }[];
  handleUpdateValue?: any;
  children?: MenuType[];
}

declare type EditType = "QAQC" | "Production" | "Pressure";

declare module "qs";
