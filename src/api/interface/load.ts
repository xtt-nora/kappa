/**
 * ImportConfigDTO
 */
export interface ImportConfigDTO {
  additionalParams?: ImportAdditionalParamDTO;
  beanName?: string;
  columnFields?: ImportColumnFieldDTO[];
  fileExtension?: string[];
  importTypeName?: string;
  requiredFields?: string[];
  standardName?: string;
  [property: string]: any;
}

/**
 * ImportAdditionalParamDTO，附加参数
 */
export interface ImportAdditionalParamDTO {
  /**
   * 自定义符号
   */
  customSymbol?: string;
  /**
   * 是否指定数据范围
   */
  dataRangeFlag?: boolean;
  /**
   * 十进制分隔符，0:小数点,1:逗号
   */
  decimalSymbol: number;
  /**
   * 数字分组，0:逗号,1:小数点,2:空格,3:不分组
   */
  digitGroup: number;
  /**
   * 是否指定结束行
   */
  endDataFlag?: boolean;
  /**
   * 结束行
   */
  endRow?: number;
  /**
   * 是否进行缺省填充
   */
  fillFlag?: boolean;
  /**
   * 缺省值数值
   */
  fillValue?: number;
  /**
   * excel中所选中的sheet页数
   */
  sheetNum?: number;
  /**
   * 分隔符,0:空格,1:制表符,2:自定义符号
   */
  splitMark?: number[];
  /**
   * 起始行
   */
  startRow?: number;
  /**
   * 初始数据时间
   */
  startTime: string;
  /**
   * 夏季时间
   */
  summerTimeFlag?: boolean;
  /**
   * 时间类型,0:时间点,1:持续时间,2:起始时间,3:结束时间
   */
  timeType: number;
  /**
   * 时区
   */
  timeZone: string;
  [property: string]: any;
}

/**
 * ImportColumnFieldDTO，列配置参数
 */
export interface ImportColumnFieldDTO {
  /**
   * 轴系列
   */
  axis: string;
  /**
   * 用户选择的字段（英文）
   */
  fieldName: string;
  /**
   * 单位对应的key，measure字段
   */
  measure: string;
  /**
   * 平台的标准单位
   */
  standardUnit?: string;
  /**
   * 单位列表
   */
  units?: UnitConfigDto[];
  /**
   * 用户选择的单位
   */
  uploadUnit: string;
  [property: string]: any;
}

/**
 * UnitConfigDto，单位列表
 */
export interface UnitConfigDto {
  dataType?: string;
  label?: string;
  name?: string;
  value?: number;
  [property: string]: any;
}
