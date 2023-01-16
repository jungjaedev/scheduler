import moment from "moment";

export const getRangeOfDays = (currentDate, endDate, term) => {
  const firstDate = moment(currentDate);
  const secondDate = moment(endDate);
  let repeatTerm = "";
  if (term === "daily") {
    repeatTerm = "days";
  } else if (term === "weekly") {
    repeatTerm = "weeks";
  } else if (term === "monthly") {
    repeatTerm = "months";
  } else if (term === "annually") {
    repeatTerm = "years";
  }
  return secondDate.diff(firstDate, repeatTerm);
};

export const getRepeatNum = (repeat, newObj) => {
  if (repeat.type === "number") {
    return Number(repeat.repeatCount) - 1;
  } else if (repeat.type === "date") {
    if (moment(newObj.dates) < moment(repeat.endDate)) {
      return getRangeOfDays(newObj.dates, repeat.endDate, repeat.term);
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
  return date;
};
