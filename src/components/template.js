import {useMemo, useState} from 'react';
import Button from './button.js';
import {jsx} from 'react/jsx-runtime'

function Template({payOrigin, transaction, onClick, onSuccess, createWindow, ...componentProps}) {
  const [state] = useState({
    messageListener: null
  })
  
  const buttonTypeProps = useMemo(() => {
    return transaction ? {
      elementType: 'a',
      href: `${payOrigin}/${transaction}`,
      target: '__blank'
    }: {
      elementType: 'div',
    }
  }, [payOrigin, transaction])
  
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
          payOrigin,
          transaction: onClickResult?.transaction ?? transaction
        })
        
        state.messageListener = function (event) {
          if (event.origin !== new URL(payOrigin).origin) {
            return;
          }
          
          if (event.data.type === 'success') {
            onSuccess?.(event.data.data.transaction);
          }
        }
        
        window.removeEventListener('message', state.messageListener)
  
        newWindow.focus();
      }
    })
  );
}

export default Template;