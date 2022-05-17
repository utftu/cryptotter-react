export function getPopupSizes({width, height}) {
  const left = window.screen.width / 2 - width / 2;
  const right = left + width;
  const top = window.screen.height / 2 - height / 2;
  const bottom = top + height;
  
  return {left, right, top, bottom, width, height};
}