import { useRef } from "react";
//用于执行一次性代码
export default function useSingleton(callback: Function) {
  //用一个called ref标记callback是否已经执行过
  const called = useRef(false);
  //如果已经执行过，直接返回
  if (called.current) return;
  //执行一次性代码
  callback();
  //设置标记为已执行过
  called.current = true;
}
