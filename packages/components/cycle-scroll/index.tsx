import { Children, ReactNode, useEffect, useRef, WheelEvent } from "react";
import { useImmer } from "use-immer";
import GUI from "lil-gui";
import CycleScrollItem from "./CircleScrollChild";

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
