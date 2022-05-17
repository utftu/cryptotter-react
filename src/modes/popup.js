import {useMemo, useState} from 'react';
import Button from '../components/button.js';
import {getPopupSizes} from '../utils/index.js';
import {jsx} from 'react/jsx-runtime'

function Popup(props) {
  const [state] = useState({
    messageListener: null
  })
  
  const buttonTypeProps = useMemo(() => {
    return props.transaction ? {
      elementType: 'a',
      href: `${props.payment}/${props.transaction}`,
      target: '__blank'
    }: {
      elementType: 'div',
    }
  }, [props.payment, props.transaction])
  
  return (
    jsx(Button, {
      ...buttonTypeProps,
      children: props.children,
      onClick: async (event) => {
        const onClickResult =  await props.onClick?.(event);
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
          `${props.payment}/${onClickResult?.transaction || props.transaction}`,
          '',
          `width=${popupSize.width},height=${popupSize.height},left=${popupSize.left},top=${popupSize.top}`
        );
        
        state.messageListener = function (event) {
          if (event.origin !== new URL(props.payment).origin) {
            return;
          }
          
          props.onSuccess?.(event.data.transaction);
        }
        
        window.removeEventListener('message', state.messageListener)
        
        tabWindow.focus();
      }
    })
  );
}

export default Popup;