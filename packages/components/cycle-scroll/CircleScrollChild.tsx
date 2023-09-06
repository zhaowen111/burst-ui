import { gsap } from "gsap";
import { ReactNode, useRef, useState, useCallback, useEffect } from "react";
import { ParamsType } from ".";
type CycleScrollItemProps = {
  children: ReactNode;
  scrollTop: number;
  deltaY: number;
  contentHeight: number;
  params: ParamsType;
};
export default function CycleScrollItem({
  children,
  scrollTop,
  deltaY,
  contentHeight,
  params,
}: CycleScrollItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollAll, setScrollAll] = useState(0);
  console.log(scrollAll);

  /**
   * 比gsap.to()性能更好
   */
  const quickTo = useCallback(
    ref.current
      ? gsap.quickTo(ref.current, "y", { duration: params.TWEEN_DURATION, ease: "power3.out" })
      : () => {},
    [ref.current, params.TWEEN_DURATION]
  );

  const tween = (distance: number, hasJump: boolean) => {
    if (hasJump) {
      quickTo(distance)?.seek(params.TWEEN_DURATION); //如果这次tween跨越整个页面，为了避免被用户感知到，直接跳转到动画完成状态
    } else {
      quickTo(distance);
    }
  };
  useEffect(() => {
    setScrollAll(scrolledDistance => {
      let newValue = scrolledDistance - deltaY;
      const el = ref.current as HTMLDivElement;
      const offset = el.offsetHeight + el.offsetTop + params.OFFSET_TO_TOP;
      const y = newValue && gsap.utils.wrap(-offset, contentHeight - offset, newValue); //newValue为有效值时才进行wrap
      const hasJump = y != newValue;
      tween(y, hasJump);
      return y;
    });
  }, [scrollTop, contentHeight]);
  return <div ref={ref}>{children}</div>;
}
