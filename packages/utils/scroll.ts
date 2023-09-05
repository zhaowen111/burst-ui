export function smoothToView(element: HTMLElement) {
  element.scrollIntoView({ behavior: "smooth" });
}

export function scrollToTop(element: HTMLElement) {
  if (element.scrollTop != 0) {
    element.scrollTop = 0;
  }
}
