import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { BUTTON_VARIANTS } from "../constant";
const Button = function ({
  variant = BUTTON_VARIANTS.default,
  children,
  text = "Button",
  className = "",
  ...attrs
}: Button.ButtonProps) {
  const BUTTON_VARIANT = {
    [BUTTON_VARIANTS.default]: "bg-violet-600 text-white rounded-lg",
  };

  const mergedClassName = useMemo(() => {
    const basicClassName = "group relative overflow-hidden px-4 py-2 border-none cursor-pointer";
    return twMerge(basicClassName, BUTTON_VARIANT[variant], className);
  }, [className]);

  return (
    <button className={mergedClassName + ""} {...attrs}>
      {children}
      {text}
    </button>
  );
};
export default Button;
