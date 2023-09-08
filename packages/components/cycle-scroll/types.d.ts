declare namespace CircleScroll {
  type ScrollInformation = {
    scrollTop: number; //滚动距离
    clientHeight: number;
    scrollHeight: number;
    deltaY: number;
  };
  type Params = {
    TWEEN_DURATION: number;
    SCROLL_SPEED: number;
    OFFSET_TO_TOP: number;
  };
  type ChildProps = {
    children: import("react").ReactNode;
    scrollTop: number;
    deltaY: number;
    contentHeight: number;
    params: Params;
  };
}
