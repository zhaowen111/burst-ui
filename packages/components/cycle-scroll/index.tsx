import { Children, ReactNode, useEffect, useRef, WheelEvent } from "react";
import { useImmer } from "use-immer";
import CycleScrollItem from "./CircleScrollChild";
const SCROLL_SPEED = 0.5;

export default function CircleScroll({ children = [] }: { children: Iterable<ReactNode> }) {
  function handleWheel(e: WheelEvent<HTMLDivElement>) {
    setContainerInfo(v => {
      v.scrollTop = v.scrollTop + SCROLL_SPEED * e.deltaY;
      v.deltaY = SCROLL_SPEED * e.deltaY;
    });
  }

  const container = useRef<HTMLDivElement>(null);
  type ContainerInfoType = {
    scrollTop: number; //滚动距离
    clientHeight: number;
    scrollHeight: number;
    deltaY: number;
  };
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
  return (
    <div ref={container} className="overflow-hidden absolute h-screen" onWheel={handleWheel}>
      {Children.map(children, (child, index) => (
        <CycleScrollItem
          key={index}
          contentHeight={containerInfo.scrollHeight}
          scrollTop={containerInfo.scrollTop}
          deltaY={containerInfo.deltaY}>
          {child}
        </CycleScrollItem>
      ))}
    </div>
  );
}
