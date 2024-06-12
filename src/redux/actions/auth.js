export const fetch_data = () => {
  return {
    type: "FETCH_DATA",
  };
};
export const log_in = (data) => {
  return {
    type: "LOG_IN",
    payload: data,
  };
};
export const log_out = () => {
  return {
    type: "LOG_OUT",
  };
};
