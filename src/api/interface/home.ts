export interface Res {
  token: string;
}

export interface ReqForm {
  token: string;
}
export interface NewProject {
  name: string;
  type: number | null;
}
export interface NewData {
  nodeId: string;
  projectName: string;
  settingsInfo: string;
}

/**
 * 获取当前项目所有井
 */
export interface WellListReq {
  pid: string;
}

/**
 * 井基本信息
 */
export interface WellInfo {
  id: string;
  pid: string;
  wellName: string;
  xcoord: string | number | null;
  ycoord: string | number | null;
}
