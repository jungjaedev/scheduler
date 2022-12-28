export const sortByDate = (arr) => {
  return arr.sort((a, b) => {
    if (Date.parse(a.dates) > Date.parse(b.dates)) {
      return 1;
    }
    if (Date.parse(a.dates) < Date.parse(b.dates)) {
      return -1;
    }
    if (a.customData.time.ampm === "am" && b.customData.time.ampm === "pm") {
      return -1;
    }
    if (a.customData.time.ampm === "pm" && b.customData.time.ampm === "am") {
      return 1;
    }
    if (
      Number(a.customData.time.hours + a.customData.time.minutes) >
      b.customData.time.hours + b.customData.time.minutes
    ) {
      return 1;
    }
    if (
      Number(a.customData.time.hours + a.customData.time.minutes) <
      b.customData.time.hours + b.customData.time.minutes
    ) {
      return -1;
    }
  });
};
