import { getRepeatDates, getRepeatNum } from "@/utils/repeat";
import { storage } from "@/utils/storage";

const showMemoModal = (state, payload) => {
  if (payload.type !== "new") {
    state.isNew = false;
    const data = state.memoList.find((memo) => memo.key === payload.type);
    state.currentData = JSON.parse(JSON.stringify(data));
  } else {
    state.currentData = {
      customData: {
        createdAt: "",
        memo: "",
        title: "",
        time: {
          hours: "01",
          minutes: "00",
          ampm: "am",
          alert: "none",
          allDay: true,
        },
        repeat: {
          term: "none",
          type: "none",
          endDate: "",
          repeatCount: 1,
        },
      },
    };
    state.isNew = true;
  }
  const { day } = payload;
  state.currentDate = day;
  state.isMemoModalOpen = true;
};

const closeMemoModal = (state) => {
  state.isMemoModalOpen = false;
  state.isEmpty = false;
};

const addOneMemo = (state) => {
  const createdAt = new Date().toLocaleString();

  const keyArray = state.memoList.map((memo) => memo.key);
  let key = keyArray.length === 0 ? 1 : Math.max(...keyArray) + 1;

  const repeatGroupIdArray = state.memoList.map(
    (memo) => memo.customData.repeat.groupId
  );
  let repeatGroupId =
    repeatGroupIdArray.length === 0 ? 1 : Math.max(...repeatGroupIdArray) + 1;

  const { memo, title, time, repeat } = JSON.parse(
    JSON.stringify(state.currentData.customData)
  );

  repeat.isRepeat = repeat.term === "none" ? false : true;
  repeat.groupId = repeatGroupId;
  const obj = {
    key,
    dates: state.currentDate.id,
    customData: {
      createdAt,
      memo,
      title,
      time,
      repeat,
    },
  };
  if (!obj.customData.title) {
    obj.customData.title = "새로운 이벤트";
  }

  localStorage.setItem(key, JSON.stringify(obj));
  state.memoList.push(obj);
  if (repeat.isRepeat) {
    const newObj = { ...obj };
    const repeatNum = getRepeatNum(repeat, newObj);

    for (let i = 0; i < repeatNum; i++) {
      if (repeat.type === "number") {
        repeat.repeatCount = repeatNum - i;
      }

      newObj.key++;
      newObj.dates = getRepeatDates(new Date(newObj.dates), repeat.term);
      localStorage.setItem(newObj.key, JSON.stringify(newObj));
      state.memoList.push(newObj);
    }
  }
};

const editOneMemo = (state) => {
  localStorage.setItem(
    state.currentData.key,
    JSON.stringify(state.currentData)
  );
  let indexOfData = state.memoList.findIndex(
    (item) => item.key === state.currentData.key
  );
  state.memoList.splice(indexOfData, 1, state.currentData);
};

const editRepeatMemo = (state) => {
  const { memo, title, time } = JSON.parse(
    JSON.stringify(state.currentData.customData)
  );

  const repeatGroupIdArray = state.memoList.map(
    (memo) => memo.customData.repeat.groupId
  );
  let repeatGroupId =
    repeatGroupIdArray.length === 0 ? 1 : Math.max(...repeatGroupIdArray) + 1;

  for (let i = 0; i < state.memoList.length; i++) {
    if (
      state.currentData.dates <= state.memoList[i].dates &&
      state.currentData.customData.repeat.groupId ===
        state.memoList[i].customData.repeat.groupId
    ) {
      const newObj = { ...state.memoList[i] };
      newObj.customData.memo = memo;
      newObj.customData.title = title;
      newObj.customData.time = time;
      newObj.customData.repeat.groupId = repeatGroupId;
      localStorage.setItem(state.memoList[i].key, JSON.stringify(newObj));
    }
  }
};

const removeOneMemo = (state) => {
  const indexOfData = state.memoList.findIndex(
    (memo) => memo.key === state.currentData.key
  );
  localStorage.removeItem(state.currentData.key);
  state.memoList.splice(indexOfData, 1);
};

const removeRepeatMemo = (state) => {
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
  for (let i = removedIndex.length - 1; i >= 0; i--) {
    state.memoList.splice(removedIndex[i], 1);
  }
};

const showScheduleList = (state) => {
  state.isListModalOpen = true;
};

const fetchRepeatCount = (state) => {
  let groupId = state.savedGroupId;
  let repeatNum = 0;
  for (let i = 0; i < state.memoList.length; i++) {
    if (
      state.memoList[i].customData.repeat.type === "number" &&
      groupId === state.memoList[i].customData.repeat.groupId
    ) {
      repeatNum++;
    }
  }
  for (let i = 0; i < state.memoList.length; i++) {
    if (
      state.memoList[i].customData.repeat.type === "number" &&
      groupId === state.memoList[i].customData.repeat.groupId
    ) {
      const newObj = JSON.parse(localStorage.getItem(state.memoList[i].key));
      newObj.customData.repeat.repeatCount = repeatNum--;
      localStorage.setItem(state.memoList[i].key, JSON.stringify(newObj));
    }
  }
  state.currentData = {};
};

const fetchData = (state) => {
  state.memoList = storage.fetch();
};

export {
  fetchData,
  removeOneMemo,
  editOneMemo,
  addOneMemo,
  showMemoModal,
  closeMemoModal,
  showScheduleList,
  removeRepeatMemo,
  editRepeatMemo,
  fetchRepeatCount,
};
