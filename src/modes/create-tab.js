function createTab({payOrigin, transaction}) {
  return  window.open(
    `${payOrigin}/${transaction}`,
    '_blank'
  );
}

export default createTab