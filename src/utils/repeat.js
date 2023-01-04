export const addDays = (myDate, days) => {
  return new Date(myDate.getTime() + days * 24 * 60 * 60 * 1000);
};
