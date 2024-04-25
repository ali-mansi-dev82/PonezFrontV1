export const tomanCurrencyFormat = (number) => {
  const currency = Number(number).toLocaleString("fa-IR", {
    style: "currency",
    currency: "IRR",
  });
  return currency.replace("ریال ", "") + " تومان";
};
