// import { twMerge } from "tailwind-merge";
import Button from "../button";
const HoverMaskButton = ({ duration = 0.6, ...attrs }: Button.HoverButtonProps) => {
  // const mergedAttrs = {
  //   ...attrs,
  //   className: twMerge(
  //     "text-opacity-50 hover:text-opacity-100 duration-300", //设置按钮中文字的透明度为0.5，鼠标悬浮时渐变为1
  //     attrs.className || ""
  //   ),
  // };

  return (
    <Button {...attrs}>
      <span
        className={`w-full h-full absolute left-0 top-0 bg-white opacity-10 scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-[transform] ease-out rounded-md`}
        style={{ transitionDuration: `${duration}s` }}></span>
    </Button>
  );
};

export default HoverMaskButton;
