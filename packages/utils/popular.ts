//防抖
export function debounce(fn: Function, wait: number = 300) {
  // 通过闭包缓存一个定时器 id
  let timer: number | null = null;
  // 将 debounce 处理结果当作函数返回
  // 触发事件回调时执行这个返回函数
  return function (this: any, ...args: any) {
    // 如果已经设定过定时器就清空上一次的定时器
    if (timer) clearTimeout(timer);

    // 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

//节流
export function throttle(fn: Function, wait = 300) {
  let previous = 0;
  return function (this: any, ...args: any) {
    let now = Date.now();
    if (now - previous > wait) {
      previous = now;
      fn.apply(this, args);
    }
  };
}
