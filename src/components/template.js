import {useMemo, useState} from 'react';
import Button from './button.js';
import {getPopupSizes} from '../utils/index.js';
import {jsx} from 'react/jsx-runtime'

function Template({payment, transaction, onClick, onSuccess, createWindow, ...componentProps}) {
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
        const onClickResult = await onClick?.(event);
        if (onClickResult && !onClickResult.transaction) {
          return
        }
        
        if (state.messageListener) {
          window.removeEventListener('message', state.messageListener)
          state.messageListener = null
        }
        
        const newWindow = await createWindow({
          payment,
          transaction: onClickResult?.transaction ?? transaction
        })
        
        state.messageListener = function (event) {
          if (event.origin !== new URL(payment).origin) {
            return;
          }
          
          onSuccess?.(event.data.transaction);
        }
        
        window.removeEventListener('message', state.messageListener)
  
        newWindow.focus();
      }
    })
  );
}

function popup({payment, transaction}) {
  const popupSize = getPopupSizes({
    height: 400,
    width: 400,
  });
  return  window.open(
    `${payment}/${transaction}`,
    '',
    `width=${popupSize.width},height=${popupSize.height},left=${popupSize.left},top=${popupSize.top}`
  );
}

function tab({payment, transaction}) {
  return  window.open(
    `${payment}/${transaction}`,
    '_blank'
  );
}

export default Template;