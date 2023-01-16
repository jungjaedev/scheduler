import moment from "moment";

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

export const getRepeatNum = (repeat, newObj) => {
  let repeatNum = 365;

  if (repeat.type === "number") {
    return Number(repeat.repeatCount) - 1;
  } else if (repeat.type === "date") {
    if (compareDates(newObj.dates, repeat.endDate) === true) {
      if (repeat.term === "daily") {
        return getRangeOfDays(newObj.dates, repeat.endDate);
      } else if (repeat.term === "weekly") {
        return Math.floor(getRangeOfDays(newObj.dates, repeat.endDate) / 7);
      } else if (repeat.term === "monthly") {
        return Math.floor(getRangeOfDays(newObj.dates, repeat.endDate) / 30);
      } else if (repeat.term === "annually") {
        return Math.floor(getRangeOfDays(newObj.dates, repeat.endDate) / 365);
      }
    } else {
      return 0;
    }
  }

  return repeatNum;
};

export const getRepeatDates = (myDate, term) => {
  let date;
  if (term === "daily") {
    date = moment(myDate).add(1, "days").format("YYYY-MM-DD");
  } else if (term === "weekly") {
    date = moment(myDate).add(1, "weeks").format("YYYY-MM-DD");
  } else if (term === "monthly") {
    date = moment(myDate).add(1, "months").format("YYYY-MM-DD");
  } else {
    date = moment(myDate).add(1, "years").format("YYYY-MM-DD");
  }
  console.log(date);
  return date;
};
