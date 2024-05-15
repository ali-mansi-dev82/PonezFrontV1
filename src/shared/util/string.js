export const truncateString = (str, limit = 10) => {
  return str?.length < limit ? str : str.substring(0, limit) + " ...";
};
