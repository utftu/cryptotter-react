import { jsx } from 'react/jsx-runtime';

Button.defaultProps = {
  elementType: 'div',
}

function Button(props) {
  const {elementType, ...elemProps} = props
  return jsx(elementType, {
    ...elemProps,
    style: {
      padding: '14px 16px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      color: 'white',
      outline: 'none',
      border: 'none',
      textDecoration: 'none',
      ...elemProps.style
    },
    children: elemProps.children
  });
}

export default Button;