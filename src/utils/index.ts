// import { nanoid } from "nanoid";
import http from "@/api";

// 数组扁平化方法
export const platFn = (list: any) => {
  let res = [];
  res = list.concat(
    ...list
      .map((item: any) => {
        if (item.children instanceof Array && item.children.length > 0) {
          return platFn(item.children);
        }
        return null;
      })
      .filter((o: any) => o instanceof Array && o.length > 0)
  );
  return res;
};

// 判断两个对象是否相等
export const isEqual = (obj1: any, obj2: any) => {
  // 判断两个变量是否为对象类型
  let isObj =
    toString.call(obj1) === "[object Object]" &&
    toString.call(obj2) === "[object Object]";
  if (!isObj) {
    return false;
  }

  // 判断两个对象的长度是否相等，不相等则直接返回 fase
  let obj1Keys = Object.keys(obj1);
  let obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  // 判断两个对象的每个属性值是否相等
  for (const key in obj1) {
    // 判断两个对象的键是否相等
    if (obj2.hasOwnProperty.call(obj2, key)) {
      let obj1Type = toString.call(obj1[key]);
      let obj2Type = toString.call(obj2[key]);
      // 如果值是对象，则递归
      if (obj1Type === "[object Object]" || obj2Type === "[object Object]") {
        if (!isEqual(obj1[key], obj2[key])) {
          return false;
        }
      } else if (obj1[key] !== obj2[key]) {
        return false; // 如果不是对象，则判断值是否相等
      }
    } else {
      return false;
    }
  }
  return true; // 上面条件都通过，则返回 true
};

/**
 * @description 获取数组中与目标数值最接近的数值
 * @param {array} arr 需要查找的数组
 * @param {number} num 目标数值，查找的是与这个数值最接近的
 * @return {number} 返回查找到的最接近的数值
 */
export const findCloseNum = (arr: number[], num: number) => {
  let index = 0; // 保存最接近数值在数组中的索引
  let d_value = Number.MAX_VALUE; // 保存差值绝对值，默认为最大数值
  for (let i = 0; i < arr.length; i++) {
    let new_d_value = Math.abs(arr[i] - num); // 新差值
    if (new_d_value <= d_value) {
      // 如果新差值绝对值小于等于旧差值绝对值，保存新差值绝对值和索引
      if (new_d_value === d_value && arr[i] < arr[index]) {
        // 如果数组中两个数值跟目标数值差值一样，取大
        continue;
      }
      index = i;
      d_value = new_d_value;
    }
  }
  return index; // 返回最接近的数值
};

/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
  let browserLang = navigator.language
    ? navigator.language
    : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (["cn", "zh", "zh-cn"].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}

/**
 *
 * @description 公共下载文件方法
 * @param url 接口地址
 * @param data 请求头参数
 */
export async function downLoadBlobFile(url: string, data: any) {
  try {
    const res = (await http.download(url, data)) as any;
    const linkUrl = window.URL.createObjectURL(res.data as Blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = linkUrl;
    // 提取文件名
    const contentDispositionHeader = res.headers["content-disposition"];
    let fileName = "file";
    if (contentDispositionHeader) {
      fileName = decodeURIComponent(contentDispositionHeader);
    }
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description 使用递归扁平化文件列表
 * @param {Array} treeData 文件列表
 * @returns {Array}
 */
export function getFlatTreeData(treeData: any): any {
  let newTreeData = JSON.parse(JSON.stringify(treeData));
  let res = [];
  res = newTreeData.concat(
    ...newTreeData
      .map((item: any) => {
        if (item.children instanceof Array && item.children.length > 0) {
          return platFn(item.children);
        }
        return null;
      })
      .filter((o: any) => o instanceof Array && o.length > 0)
  );
  return res;
}
