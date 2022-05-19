import {getPopupSizes} from '../utils/index.js'

function createPopup({payOrigin, transaction}) {
  const popupSize = getPopupSizes({
    height: 400,
    width: 400,
  });
  return  window.open(
    `${payOrigin}/${transaction}`,
    '',
    `width=${popupSize.width},height=${popupSize.height},left=${popupSize.left},top=${popupSize.top}`
  );
}

export default createPopup