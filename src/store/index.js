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
      /**
       * Todo:
       * type ===  'new' | key
       * key면 기존 등록된 메모 clicked
       * 'new'면 새 메모 등록
       */

      const { day, type } = payload;
      if (type !== "new") {
        state.isNew = false;
        console.log(type);
        // let data = state.memoList.find((memo) => memo.key === type);
        // state.currentData = data;
      } else {
        state.isNew = true;
      }
      state.currentDate = day;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    addOneMemo(state, payload) {
      console.log(state.currentDate);
      const clickedDate = new Date().toLocaleString();
      const keyArray = state.memoList.map((memo) => memo.key);
      console.log(keyArray);
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
      // console.log(obj);
      localStorage.setItem(clickedDate, JSON.stringify(obj));
      state.memoList.push(obj);
    },
  },
  actions: {},
  modules: {},
});
