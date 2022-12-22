import { createStore } from "vuex";

const stroage = {
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
      memoList: stroage.fetch(),
      currentDate: "",
      isNew: true,
      currentData: {},
    };
  },
  getters: {
    storedMemoList(state) {
      return state.memoList;
    },
  },
  mutations: {
    showModal(state, payload) {
      state.isOpen = true;
      const { day } = payload;
      state.currentDate = day;
    },
    closeModal(state) {
      state.isOpen = false;
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
        },
        // time:
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
  },
  actions: {},
  modules: {},
});
