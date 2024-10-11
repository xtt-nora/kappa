//节流
export function rafThrottle(fn: Function) {
  let lock = false;
  return function (this: any, ...args: any[]) {
    if (lock) return;
    lock = true;
    window.requestAnimationFrame(() => {
      fn.apply(this, args);
      lock = false;
    });
  };
}
//防抖
export function debounce(fn: Function, delay = 200) {
  let timer: any = null;
  return function (this: any, ...args: any[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 时间戳：1637244864707
/* 时间戳转换为时间 */
export const timestampToTime = (timestamp: any) => {
  timestamp = timestamp ? timestamp : null;
  let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  let h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  let m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
};

/**
 * 计算Excel的列头名称
 */
export const numberToExcelColumn = (num: number) => {
  num += 1;
  let result = "";
  while (num > 0) {
    num--;
    result = String.fromCharCode((num % 26) + 65) + result;
    num = Math.floor(num / 26);
  }
  return result;
};
