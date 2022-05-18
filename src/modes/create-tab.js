function createTab({payment, transaction}) {
  return  window.open(
    `${payment}/${transaction}`,
    '_blank'
  );
}

export default createTab