import http from "@/api";
import { useProjectStore } from "@/stores/modules/project.ts";
import { ImportConfigDTO } from "@/api/interface/load.ts";

/**
 * 通用api
 */
export const commonApi = {
  loadTree: (projectId: string | null) => {
    return http.get(`/v1/browser/tree`, {
      projectId
    });
  },
  loadTreeTmp: (projectId: string | null) => {
    return http.get(`/v1/browser/loadTree`, {
      projectId
    });
  },
  getDataTree: (pid: string) => {
    return http.get<any>("/v1/file/getFileTree", {
      pid
    });
  },
  /**
   *
   * @param fileId 文件id
   * @param projectId 项目id
   * @description 获取图表数据
   */
  getSampledData: (fileId: string | number, projectId: string) => {
    return http.get<any>("/v1/file/get-sampled-data", {
      fileId,
      projectId
    });
  },
  /**
   *
   * @param fileId 文件id
   * @param projectId 项目id
   * @description 获取表格数据
   */
  getFileData: (fileId: string | number, projectId: string) => {
    return http.get<any>("/v1/file/get-file-data", {
      fileId,
      projectId,
      page: 1,
      size: 999999999
    });
  },
  /**
   *
   * @param fileId 文件id
   * @param projectId 项目id
   * @description 获取流动段
   */
  getByFileId: (fileId: string | number, projectId: string) => {
    return http.get<Recordable>("/v1/productionEvent/getByFileId", {
      fileId,
      projectId
    });
  },
  /**
   * 获取导入配置
   */
  getImportConfig: (importType: string) => {
    const projectStore = useProjectStore();
    return http.get<ImportConfigDTO>(`/v1/import/get-import-config`, {
      projectId: projectStore.projectId,
      importType
    });
  },
  /**
   * 导入接口
   */
  importData: (importInfo: any) => {
    return http.post(`/v1/import/upload`, importInfo, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  fileDelete: (id: any) => {
    const projectStore = useProjectStore();
    return http.get(`/v1/browser/deleteById`, {
      projectId: projectStore.projectId,
      id: id
    });
  },
  reName: (id: string, name: string) => {
    const projectStore = useProjectStore();
    return http.get(`/v1/browser/rename`, {
      projectId: projectStore.projectId,
      id: id,
      name: name
    });
  },
  copyFile: (id: string) => {
    const projectStore = useProjectStore();
    return http.get(`/v1/browser/copyFile`, {
      projectId: projectStore.projectId,
      id: id
    });
  },
  open: (file: any) => {
    return http.post<any>("/v1/project/open", file);
  },
  saveas: (fileName: any) => {
    const projectStore = useProjectStore();
    return http.get<any>(
      `/v1/project/copyProject`,
      {
        projectId: projectStore.projectId,
        fileName: fileName
      },
      { responseType: "blob" }
    );
  }
};
