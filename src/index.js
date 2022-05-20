import createTab from './modes/create-tab.js';
import createPopup from './modes/create-popup.js';
import Template from './components/template.js'
import {jsx} from 'react/jsx-runtime'

CryptotterButton.defaultProps = {
  payOrigin: 'https://pay.cryptotter.tech',
  type: 'tab'
};

function CryptotterButton(props) {
  let createWindow = null
  if (props.type === 'tab') {
    createWindow = createTab
  } else if (props.type === 'popup') {
    createWindow = createPopup
  }
  
  return jsx(Template, {
    ...props,
    createWindow
  })
}

export {CryptotterButton};
export default CryptotterButton;