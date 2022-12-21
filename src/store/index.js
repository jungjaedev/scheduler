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
    };
  },
  getters: {
    storedMemoList(state) {
      return state.memoList;
    },
  },
  mutations: {
    showModal(state, day) {
      state.isOpen = true;
      // console.log(day);
      state.currentDate = day;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    addOneMemo(state, payload) {
      const clickedDate = new Date().toLocaleString();
      const obj = {
        customData: {
          createdAt: clickedDate,
          completed: false,
          memo: payload.newMemo,
          title: payload.newTitle,
        },
        dates: state.currentDate,
        // time:
      };
      if (!obj.customData.title) {
        obj.title = "새로운 이벤트";
      }
      // console.log(obj);
      localStorage.setItem(clickedDate, JSON.stringify(obj));
      state.memoList.push(obj);
    },
  },
  actions: {},
  modules: {},
});
