import { createStore } from "vuex";
import { storage } from "@/utils/storage";
import { addDays, getRangeOfDays } from "@/utils/repeat";

export default createStore({
  state() {
    return {
      memoList: storage.fetch(),
      currentDate: "",
      isOpen: false,
      isNew: true,
      isEmpty: false,
      isListModalOpen: false,
      currentData: {
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
            repeatCount: "1",
          },
        },
      },
    };
  },
  getters: {
    storedMemoList(state) {
      return state.memoList;
    },
    storedCurrentData(state) {
      return state.currentData;
    },
  },
  mutations: {
    showModal(state, payload) {
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
              repeatCount: "1",
            },
          },
        };
        state.isNew = true;
      }
      const { day } = payload;
      state.currentDate = day;
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
      state.isEmpty = false;
    },
    addOneMemo(state) {
      const createdAt = new Date().toLocaleString();
      const keyArray = state.memoList.map((memo) => memo.key);
      let key = keyArray.length === 0 ? 1 : Math.max(...keyArray) + 1;
      const repeatGroupIdArray = state.memoList.map(
        (memo) => memo.customData.repeat.groupId
      );
      let repeatGroupId =
        repeatGroupIdArray.length === 0
          ? 1
          : Math.max(...repeatGroupIdArray) + 1;

      const { memo, title, time, repeat } = state.currentData.customData;

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
        if (repeat.term === "daily") {
          const newObj = { ...obj };
          const repeatNum =
            repeat.type === "number"
              ? Number(repeat.repeatCount) - 1
              : repeat.type === "date"
              ? getRangeOfDays(newObj.dates, repeat.endDate)
              : 365;
          for (let i = 0; i < repeatNum; i++) {
            newObj.key++;
            let myDate = new Date(newObj.dates);
            newObj.dates = addDays(myDate, 1).toISOString().split("T")[0];
            localStorage.setItem(newObj.key, JSON.stringify(newObj));
            state.memoList.push(newObj);
          }
        }
      }
    },
    editOneMemo(state) {
      localStorage.setItem(
        state.currentData.key,
        JSON.stringify(state.currentData)
      );
    },
    removeOneMemo(state) {
      const indexOfData = state.memoList.findIndex(
        (memo) => memo.key === state.currentData.key
      );
      localStorage.removeItem(state.currentData.key);
      state.memoList.splice(indexOfData, 1);
      state.currentData = {};
    },
    showScheduleList(state) {
      state.isListModalOpen = true;
    },
    fetchData(state) {
      state.memoList = storage.fetch();
    },
  },
  actions: {
    removeMemo(context) {
      context.commit("removeOneMemo");
      context.commit("closeModal");
      context.commit("fetchData");
    },
    addMemo(context) {
      if (context.state.currentData.customData.memo === "") {
        context.state.isEmpty = true;
        return;
      }

      if (context.state.isNew) {
        context.commit("addOneMemo");
      } else {
        context.commit("editOneMemo");
      }
      context.commit("closeModal");
      context.commit("fetchData");
    },
  },
  modules: {},
});
