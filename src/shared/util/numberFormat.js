export const tomanCurrencyFormat = (number) => {
  const currency = number.toLocaleString("fa-IR", {
    style: "currency",
    currency: "IRR",
  });
  return currency.replace("ریال ", "") +" تومان" ;
};
