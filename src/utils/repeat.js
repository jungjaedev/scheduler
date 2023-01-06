export const addDays = (myDate, days) => {
  return new Date(myDate.getTime() + days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
};

export const getRangeOfDays = (currentDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const firstDate = new Date(currentDate);
  const secondDate = new Date(endDate);
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
};

export const compareDates = (currentDate, endDate) => {
  const firstDate = new Date(currentDate);
  const secondDate = new Date(endDate);
  return firstDate < secondDate;
};
