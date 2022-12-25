import { createStore } from "vuex";

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  },
};

export default createStore({
  state() {
    return {
      isOpen: false,
      memoList: storage.fetch(),
      currentDate: "",
      isNew: true,
      currentData: {
        customData: {
          createdAt: "",
          completed: false,
          memo: "",
          title: "",
          time: {
            hours: "01",
            minutes: "00",
            ampm: "am",
            alert: "none",
          },
        },
      },
      originalData: {
        customData: {
          createdAt: "",
          completed: false,
          memo: "",
          title: "",
          time: {
            hours: "01",
            minutes: "00",
            ampm: "am",
            alert: "none",
          },
        },
      },
      time: {
        hours: "01",
        minutes: "00",
        ampm: "am",
        alert: "none",
      },
      input: {
        title: "",
        memo: "",
      },
    };
  },
  getters: {
    storedMemoList(state) {
      return state.memoList;
    },
    storedTime(state) {
      return state.time;
    },
    storedCurrentData(state) {
      return state.currentData;
    },
    storedOriginalData(state) {
      return state.originalData;
    },
    storedInput(state) {
      return state.input;
    },
  },
  mutations: {
    showModal(state, payload) {
      console.log(payload.day);
      if (payload.type !== "new") {
        // 원래 메모 클릭
        state.isNew = false;
        let data = state.memoList.find((memo) => memo.key === payload.type);
        state.originalData = data;
        state.currentData = data;
        state.time = data.customData.time;
        // console.log(data);
        // state.originalData.customData.title = state.currentData.customData.title;
        // state.input.memo = state.currentData.customData.memo;
      } else {
        // 새 메모 작성
        state.currentData.customData.title = "";
        state.currentData.customData.memo = "";
        state.isNew = true;
        state.time = {
          hours: "01",
          minutes: "00",
          ampm: "am",
          alert: "none",
        };
      }
      state.isOpen = true;
      const { day } = payload;
      state.currentDate = day;
      console.log(state.currentDate);
    },
    closeModal(state) {
      state.isOpen = false;
      // state.currentData.customData.title = "";
      // state.currentData.customData.memo = "";
      state.memoList = storage.fetch();
    },
    addOneMemo(state, payload) {
      const clickedDate = new Date().toLocaleString();
      const keyArray = state.memoList.map((memo) => memo.key);
      let key = keyArray.length === 0 ? 1 : Math.max(...keyArray) + 1;
      const obj = {
        key,
        dates: state.currentDate.date,
        customData: {
          createdAt: clickedDate,
          completed: false,
          memo: payload.newMemo,
          title: payload.newTitle,
          time: state.time,
        },
      };
      if (!obj.customData.title) {
        obj.customData.title = "새로운 이벤트";
      }
      localStorage.setItem(key, JSON.stringify(obj));
      state.memoList.push(obj);
    },
    editOneMemo(state, payload) {
      const indexOfData = state.memoList.findIndex(
        (memo) => memo.key === state.currentData.key
      );
      state.currentData.customData.memo = payload.newMemo;
      state.currentData.customData.title = payload.newTitle;
      state.currentData.customData.time = state.time;
      localStorage.setItem(
        state.currentData.key,
        JSON.stringify(state.currentData)
      );
      state.memoList[indexOfData].customData.memo = payload.newMemo;
      state.memoList[indexOfData].customData.title = payload.newTitle;
    },
    removeOneMemo(state) {
      const indexOfData = state.memoList.findIndex(
        (memo) => memo.key === state.currentData.key
      );
      localStorage.removeItem(state.currentData.key);
      state.memoList.splice(indexOfData, 1);
      state.currentData = {};
    },
    updateTime(state, time) {
      state.time = time;
    },
    updateInput(state, input) {
      state.input = input;
    },
    fetchData(state) {
      state.memoList = storage.fetch();
    },
    updateCurrentData(state, payload) {
      const { type, value } = payload;
      state.currentData.customData[type] = value;
    },
  },
  actions: {
    removeMemo(context) {
      context.commit("removeOneMemo");
      context.commit("closeModal");
    },
    addMemo(context) {
      // const obj = {
      //   newMemo: context.state.input.memo,
      //   newTitle: context.state.input.title,
      // };
      const obj = {
        newMemo: context.state.currentData.customData.memo,
        newTitle: context.state.currentData.customData.title,
      };
      // if (context.state.input.memo !== "") {
      //   if (context.state.isNew) {
      //     context.commit("addOneMemo", obj);
      //   } else {
      //     context.commit("editOneMemo", obj);
      //   }
      //   context.commit("closeModal");
      // } else {
      //   context.state.isEmpty = true;
      // }
      if (context.state.currentData.customData.memo !== "") {
        if (context.state.isNew) {
          context.commit("addOneMemo", obj);
        } else {
          context.commit("editOneMemo", obj);
        }
        context.commit("closeModal");
        context.commit("fetchData");
      } else {
        context.state.isEmpty = true;
      }
    },
  },
  modules: {},
});
