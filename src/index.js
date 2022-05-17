import Tab from './modes/tab';
import Popup from './modes/popup';
import {jsx} from 'react/jsx-runtime'

CryptotterButton.defaultProps = {
  payment: 'https://pay.cryptotter.tech',
};

function CryptotterButton(props) {
  if (props.type === 'tab') {
    return jsx(Tab, props)
  } else if (props.type === 'popup') {
    return jsx(Popup, props)
  }
  
  return jsx(Popup, props)
}

export {CryptotterButton};
export default CryptotterButton;