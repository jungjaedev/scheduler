const sortByDate = (memoList) => {
  return memoList.sort((a, b) => {
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

export const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return sortByDate(arr);
  },
};

export const removeRepeatList = (state) => {
  const removedIndex = [];
  for (let i = 0; i < state.memoList.length; i++) {
    if (
      state.currentData.dates <= state.memoList[i].dates &&
      state.currentData.customData.repeat.groupId ===
        state.memoList[i].customData.repeat.groupId
    ) {
      const indexOfData = state.memoList.findIndex(
        (item) => item.key === state.memoList[i].key
      );
      localStorage.removeItem(state.memoList[i].key);
      removedIndex.push(indexOfData);
    }
  }
  removedIndex
    .reverse()
    .forEach((indexNum) => state.memoList.splice(indexNum, 1));
};

export const createNewGroupId = (state) => {
  const repeatGroupIdArray = state.memoList.map(
    (memo) => memo.customData.repeat.groupId
  );
  let repeatGroupId =
    repeatGroupIdArray.length === 0 ? 1 : Math.max(...repeatGroupIdArray) + 1;
  return repeatGroupId;
};

export const createNewKey = (state) => {
  const keyArray = state.memoList.map((memo) => memo.key);
  let key = keyArray.length === 0 ? 1 : Math.max(...keyArray) + 1;
  return key;
};
