import { gsap } from "gsap";
import { useRef, useState, useCallback, useEffect } from "react";

export default function CycleScrollItem({
  children,
  scrollTop,
  deltaY,
  contentHeight,
  params,
}: CircleScroll.ChildProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [, setScrollAll] = useState(0);

  const quickTo = useCallback(
    ref.current
      ? gsap.quickTo(ref.current, "y", { duration: params.TWEEN_DURATION, ease: "power3.out" }) //比gsap.to()性能更好
      : () => {},
    [ref.current, params.TWEEN_DURATION]
  );
  const tween = useCallback(
    (distance: number, hasJump: boolean) => {
      //如果这次tween跨越整个页面，为了避免被用户感知到，直接跳转到动画完成状态
      hasJump ? quickTo(distance)?.seek(params.TWEEN_DURATION) : quickTo(distance);
    },
    [params.TWEEN_DURATION, quickTo]
  );
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
    return () => {
      console.log(112233);
    };
  }, [scrollTop, contentHeight]);

  return <div ref={ref}>{children}</div>;
}
