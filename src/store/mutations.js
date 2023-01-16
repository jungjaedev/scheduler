import _ from "lodash";
import { getRepeatDates, getRepeatNum } from "@/utils/repeat";
import {
  storage,
  createNewKey,
  createNewGroupId,
  removeRepeatList,
} from "@/utils/storage";

const showMemoModal = (state, payload) => {
  state.isDateChanged = false;
  if (payload.type !== "new") {
    state.isNew = false;
    const data = state.memoList.find((memo) => memo.key === payload.type);
    state.currentData = _.cloneDeep(data);
    state.savedRepeatData = _.cloneDeep(data);
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

const checkDateChanged = (state) => {
  state.isDateChanged = _.isEqual(
    state.savedRepeatData.customData.repeat,
    state.currentData.customData.repeat
  );
};

const addOneMemo = (state) => {
  const createdAt = new Date().toLocaleString();

  let key = createNewKey(state);
  let repeatGroupId = createNewGroupId(state);

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

  // 반복 메모일 경우
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
  const { repeat } = _.cloneDeep(state.currentData.customData);

  let key = createNewKey(state);
  let repeatGroupId = createNewGroupId(state);

  // 해당 날짜 이후의 메모 삭제
  removeRepeatList(state);

  // 새 반복 메모 생성
  const obj = _.cloneDeep(state.currentData);
  obj.customData.repeat.groupId = repeatGroupId;
  obj.key = key;
  localStorage.setItem(key++, JSON.stringify(obj));

  const repeatNum = getRepeatNum(repeat, obj);
  for (let i = repeatNum; i >= 1; i--) {
    if (repeat.type === "number") {
      obj.customData.repeat.repeatCount = i;
    }

    obj.key = key++;
    obj.customData.repeat.groupId = repeatGroupId;
    obj.dates = getRepeatDates(new Date(obj.dates), repeat.term);
    localStorage.setItem(obj.key, JSON.stringify(obj));
    state.memoList.push(obj);
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
  removeRepeatList(state);
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
  checkDateChanged,
};
