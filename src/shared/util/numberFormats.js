export const tomanCurrencyFormat = (tomanAmount) => {
  const rialAmount = tomanAmount * 10;
  return rialAmount.toLocaleString('en-US');
};
