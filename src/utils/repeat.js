import moment, { months } from "moment";

export const getRangeOfDays = (currentDate, endDate) => {
  const firstDate = moment(currentDate);
  const secondDate = moment(endDate);
  return secondDate.diff(firstDate, "days");
};

export const getRepeatNum = (repeat, newObj) => {
  if (repeat.type === "number") {
    return Number(repeat.repeatCount) - 1;
  } else if (repeat.type === "date") {
    if (moment(newObj.dates) < moment(repeat.endDate)) {
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
  return 365;
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
