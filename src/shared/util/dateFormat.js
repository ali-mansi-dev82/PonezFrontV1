import moment from "jalali-moment";

export const dateFormate = (date) => {
  moment.locale("fa");
  const result = moment.from(date, "en").locale("fa").fromNow();
  return result;
};
