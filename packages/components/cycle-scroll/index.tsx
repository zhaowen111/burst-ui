import { Children, ReactNode, useEffect, useRef, WheelEvent } from "react";
import { useImmer } from "use-immer";
import GUI from "lil-gui";
import CycleScrollItem from "./CircleScrollChild";
import "hammerjs"; //hammerjs不支持esm导入，直接导入会挂载到window对象上
const gui = new GUI();
!window.location.hash.includes("debug") && gui.hide();
const initParams = {
  TWEEN_DURATION: 0.6,
  SCROLL_SPEED: 0.5,
  OFFSET_TO_TOP: 100, //向上偏移200px,避免元素还没从屏幕上消失时就移动到下方
};
type ContainerInfoType = {
  scrollTop: number; //滚动距离
  clientHeight: number;
  scrollHeight: number;
  deltaY: number;
};
export type ParamsType = {
  TWEEN_DURATION: number;
  SCROLL_SPEED: number;
  OFFSET_TO_TOP: number;
};
export default function CircleScroll({ children = [] }: { children: Iterable<ReactNode> }) {
  const container = useRef<HTMLDivElement>(null);
  const [containerInfo, setContainerInfo] = useImmer<ContainerInfoType>({
    scrollTop: 0,
    clientHeight: 0,
    scrollHeight: 0,
    deltaY: 0,
  });

  //更新内容高度、视口高度
  useEffect(() => {
    setContainerInfo(v => {
      const el = container.current as HTMLDivElement;
      v.clientHeight = el.clientHeight;
      v.scrollHeight = el.scrollHeight;
    });
  }, [children]);

  /**
   * 处理用户滚动
   */

  //触屏
  useEffect(() => {
    if (container.current) {
      const hammerContainer = new Hammer(container.current, {});
      hammerContainer.get("pan").set({ direction: Hammer.DIRECTION_VERTICAL });

      let lastY = 0;
      hammerContainer.on("panmove", e => {
        const change = e.deltaY - lastY;
        setContainerInfo(v => {
          v.deltaY = -params.SCROLL_SPEED * change * 2;
          v.scrollTop = v.scrollTop + v.deltaY;
        });
        lastY = e.deltaY;
      });
      hammerContainer.on("panend", () => {
        lastY = 0;
      });
    }
  }, [container.current]);

  //鼠标
  function handleWheel(e: WheelEvent<HTMLDivElement>) {
    setContainerInfo(v => {
      v.scrollTop = v.scrollTop + params.SCROLL_SPEED * e.deltaY;
      v.deltaY = params.SCROLL_SPEED * e.deltaY;
    });
  }

  /**
   * Debug
   */
  const [params, setParams] = useImmer<ParamsType>(initParams);
  useEffect(() => {
    const controller = gui
      .add({ ...initParams }, "OFFSET_TO_TOP", -1000, 1000, 50)
      .onChange((v: any) => {
        setParams(param => {
          param.OFFSET_TO_TOP = v;
        });
      });
    return () => {
      controller.destroy();
    };
  }, []);
  return (
    <div ref={container} className="overflow-hidden h-screen" onWheel={handleWheel}>
      {Children.map(children, (child, index) => (
        <CycleScrollItem
          key={index}
          params={params}
          contentHeight={containerInfo.scrollHeight}
          scrollTop={containerInfo.scrollTop}
          deltaY={containerInfo.deltaY}>
          {child}
        </CycleScrollItem>
      ))}
    </div>
  );
}
