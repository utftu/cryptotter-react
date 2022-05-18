import {useEffect, useMemo, useState} from 'react'
import Button from '../components/button.js';
import {jsx} from 'react/jsx-runtime'

function Tab(props) {
  const [state] = useState({
    messageListener: null
  })
  
  useEffect(() => {
    return () => {
      if (state.messageListener) {
        window.removeEventListener('message', state.messageListener)
      }
    }
  }, [])
  
  const buttonTypeProps = useMemo(() => {
    return props.transaction ? {
      elementType: 'a',
      href: `${props.payment}/${props.transaction}`,
      target: '__blank'
    }: {
      elementType: 'div',
    }
  }, [props.payment, props.transaction])
  
  return jsx(Button, {
    ...buttonTypeProps,
    className: props.className,
    style: props.style,
    children: props.children,
    onClick: async (event) => {
      const onClickResult = await props.onClick?.(event);
      if (onClickResult === false) {
        return
      }
      
      if (state.messageListener) {
        window.removeEventListener('message', state.messageListener)
        state.messageListener = null
      }
      
      const tabWindow = window.open(
        `${props.payment}/${onClickResult?.transaction ?? props.transaction}`,
        '_blank'
      );
      
      state.messageListener = function (event) {
        if (event.origin !== new URL(props.payment).origin) {
          return;
        }
  
        props.onSuccess?.(event.data.transaction);
      }
      window.addEventListener('message', state.messageListener)
      tabWindow.focus()
    }
  })
}

export default Tab;