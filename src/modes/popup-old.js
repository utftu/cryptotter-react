import {useMemo, useState} from 'react';
import Button from '../components/button.js';
import {getPopupSizes} from '../utils/index.js';
import {jsx} from 'react/jsx-runtime'

function Popup({payment, transaction, onClick, onSuccess, ...componentProps}) {
  const [state] = useState({
    messageListener: null
  })
  
  const buttonTypeProps = useMemo(() => {
    return transaction ? {
      elementType: 'a',
      href: `${payment}/${transaction}`,
      target: '__blank'
    }: {
      elementType: 'div',
    }
  }, [payment, transaction])
  
  return (
    jsx(Button, {
      ...buttonTypeProps,
      ...componentProps,
      onClick: async (event) => {
        const onClickResult =  await onClick?.(event);
        if (onClickResult === false) {
          return
        }
  
        if (state.messageListener) {
          window.removeEventListener('message', state.messageListener)
          state.messageListener = null
        }
        
        const popupSize = getPopupSizes({
          height: 400,
          width: 400,
        });
        const tabWindow = window.open(
          `${payment}/${onClickResult?.transaction || transaction}`,
          '',
          `width=${popupSize.width},height=${popupSize.height},left=${popupSize.left},top=${popupSize.top}`
        );
        
        state.messageListener = function (event) {
          if (event.origin !== new URL(payment).origin) {
            return;
          }
          
          onSuccess?.(event.data.transaction);
        }
        
        window.removeEventListener('message', state.messageListener)
        
        tabWindow.focus();
      }
    })
  );
}

export default Popup;