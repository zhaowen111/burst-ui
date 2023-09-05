/**
//浏览器窗口尺寸
outerWidth 和 outerHeight 返回浏览器窗口自身的大小（不管是在最外层 window 上使用，还是在窗格<frame>中使用）。
//浏览器视口尺寸
innerWidth和 innerHeight 返回浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）。



//视口滚动距离
window.pageXoffset/window.scrollX 和 window.pageYoffset/window.scrollY

//偏移尺寸
offsetHeight，元素在垂直方向上占用的像素尺寸，包括它的高度、水平滚动条高度（如果可
见）和上、下边框的高度。
offsetLeft，元素左边框外侧距离包含元素左边框内侧的像素数。
offsetTop，元素上边框外侧距离包含元素上边框内侧的像素数。
offsetWidth，元素在水平方向上占用的像素尺寸，包括它的宽度、垂直滚动条宽度（如果可
见）和左、右边框的宽度。

//客户端尺寸
clientWidth 是内容区宽度加左、右内边距宽度，clientHeight 是内容区高度加上、下内边距高度

//滚动尺寸
scrollHeight，没有滚动条出现时，元素内容的总高度。
scrollLeft，内容区左侧隐藏的像素数，设置这个属性可以改变元素的滚动位置。
scrollTop，内容区顶部隐藏的像素数，设置这个属性可以改变元素的滚动位置。
scrollWidth，没有滚动条出现时，元素内容的总宽度。


浏览器在每个元素上都暴露了 getBoundingClientRect()方法，返回一个 DOMRect 对象，包含
6 个属性：left、top、right、bottom、height 和 width。这些属性给出了元素在页面中相对于视
口的位置
 */
//返回浏览器视口尺寸
export function getSizes() {
  let pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
  if (typeof pageWidth != "number") {
    if (document.compatMode == "CSS1Compat") {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      pageWidth = document.body.clientWidth;
      pageHeight = document.body.clientHeight;
    }
  }
  return [pageWidth, pageHeight];
}

let sizes = getSizes();
const ratio = window.devicePixelRatio;
window.addEventListener("resize", () => {
  sizes = getSizes();
});
export function supportFullscreen(element: HTMLElement | null) {
  if (!element) return;
  window.addEventListener("dblclick", () => {
    //@ts-ignore
    const isFullScreen = document.fullscreenElement || document.webkitFullscreenElement;
    //@ts-ignore
    const fullscreen: any = element.requestFullscreen || element.webkitRequestFullscreen;
    //@ts-ignore
    const exitfullScreen = document.exitFullscreen || document.webkitExitFullscreen || (() => {});
    isFullScreen ? exitfullScreen.apply(document) : fullscreen.apply(element);
  });
}
/**
 *
 */
export function getElementLeft(element: HTMLElement) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent as HTMLElement | null;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent as HTMLElement | null;
  }
  return actualLeft;
}
