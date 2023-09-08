declare namespace Button {
  type ButtonProps = {
    variant?: import("../constant").BUTTON_VARIANTS;
    text?: string | number;
  } & React.DOMAttributes<HTMLButtonElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

  type HoverButtonProps = {
    duration?: number;
  } & ButtonProps;
}
