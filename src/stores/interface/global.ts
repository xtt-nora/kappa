export type LanguageType = "zh" | "en" | null;

export interface GlobalState {
  /**
   * 多语言: zh | en
   */
  language: LanguageType;
  /**
   * 控制菜单是否折叠
   */
  isExpand: boolean;
}
