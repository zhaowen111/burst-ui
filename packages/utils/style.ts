export function loadStyles(url: string): void {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  // let head = document.getElementsByTagName("head")[0];
  document.head.appendChild(link);
}
export function loadStyleString(css: string) {
  let style = document.createElement("style");
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    //@ts-ignore
    style.styleSheet.cssText = css;
  }
  document.head.appendChild(style);
}

export function getComputedCSS(element: HTMLElement, propertyName: string) {
  let computedStyle = document.defaultView?.getComputedStyle(element, null);
  //@ts-ignore
  return computedStyle && computedStyle[propertyName];
}
