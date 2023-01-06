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

export const addMonths = (date, numOfMonths) => {
  date = new Date(date);
  date.setMonth(date.getMonth() + numOfMonths);
  return date.toISOString().split("T")[0];
};

export const getRepeatNum = (repeat, newObj) => {
  let repeatNum = 365;
  if (repeat.term === "weekly") {
    repeatNum = Math.floor(repeatNum / 7);
  } else if (repeat.term === "monthly") {
    repeatNum = Math.floor(repeatNum / 30);
  } else if (repeat.term === "annually") {
    repeatNum = Math.floor(repeatNum / 365);
  }
  if (repeat.type === "number") {
    repeatNum = Number(repeat.repeatCount) - 1;
  } else if (repeat.type === "date") {
    if (compareDates(newObj.dates, repeat.endDate) === true) {
      if (repeat.term === "daily") {
        repeatNum = getRangeOfDays(newObj.dates, repeat.endDate);
      } else if (repeat.term === "weekly") {
        repeatNum = Math.floor(
          getRangeOfDays(newObj.dates, repeat.endDate) / 7
        );
      } else if (repeat.term === "monthly") {
        repeatNum = Math.floor(
          getRangeOfDays(newObj.dates, repeat.endDate) / 30
        );
      } else if (repeat.term === "annually") {
        repeatNum = Math.floor(
          getRangeOfDays(newObj.dates, repeat.endDate) / 365
        );
      }
    } else {
      repeatNum = 0;
    }
  }

  return repeatNum;
};

export const getRepeatDates = (myDate, term) => {
  let date;
  if (term === "daily") {
    date = addDays(myDate, 1);
  } else if (term === "weekly") {
    date = addDays(myDate, 7);
  } else if (term === "monthly") {
    date = addMonths(myDate, 1);
  } else {
    date = addMonths(myDate, 12);
  }
  return date;
};
