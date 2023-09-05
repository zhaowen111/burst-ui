import { gsap } from "gsap";
import { ReactNode, useRef, useState, useCallback, useEffect } from "react";
const TWEEN_DURATION = 0.6;
type CycleScrollItemProps = {
  children: ReactNode;
  scrollTop: number;
  deltaY: number;
  contentHeight: number;
};
export default function CycleScrollItem({
  children,
  scrollTop,
  deltaY,
  contentHeight,
}: CycleScrollItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollAll, setScrollAll] = useState(0);

  /**
   * 比gsap.to()性能更好
   */
  const quickTo = useCallback(
    ref.current
      ? gsap.quickTo(ref.current, "y", { duration: TWEEN_DURATION, ease: "power3.out" })
      : () => {},
    [ref.current]
  );

  const tween = (distance: number, hasJump: boolean) => {
    if (hasJump) {
      quickTo(distance)?.seek(TWEEN_DURATION); //如果这次tween跨越整个页面，为了避免被用户感知到，直接跳转到动画完成状态
    } else {
      quickTo(distance);
    }
  };
  useEffect(() => {
    setScrollAll(scrolledDistance => {
      let newValue = scrolledDistance - deltaY;
      const el = ref.current as HTMLDivElement;
      const OFFSET_TO_TOP = 200; //向上偏移200px,避免元素还没从屏幕上消失时就移动到下方
      const offset = el.offsetHeight + el.offsetTop + OFFSET_TO_TOP;
      const y = newValue && gsap.utils.wrap(-offset, contentHeight - offset, newValue);
      const hasJump = y != newValue;
      tween(y, hasJump);
      return y;
    });
  }, [scrollTop, contentHeight]);
  return <div ref={ref}>{children}</div>;
}
