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
    arr.sort((a, b) => Date.parse(a.dates) - Date.parse(b.dates));
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
      isEmpty: false,
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
          },
        },
      },
      isListModalOpen: false,
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
        // 원래 메모 클릭
        state.isNew = false;
        let data = state.memoList.find((memo) => memo.key === payload.type);
        /**
         * - state.currentData = data;
         * * v-model을 통해 양방향 바인딩되어 view에 보여지는 데이터까지 같이 변경됨..
         * -> 깊은 복사를 통해 해결..
         */
        state.currentData = JSON.parse(JSON.stringify(data));
      } else {
        // 새 메모 작성
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
            },
          },
        };
        state.isNew = true;
      }
      state.isOpen = true;
      const { day } = payload;
      state.currentDate = day;
    },
    closeModal(state) {
      state.isOpen = false;
      state.isEmpty = false;
      state.memoList = storage.fetch();
    },
    addOneMemo(state, payload) {
      const clickedDate = new Date().toLocaleString();
      const keyArray = state.memoList.map((memo) => memo.key);
      let key = keyArray.length === 0 ? 1 : Math.max(...keyArray) + 1;

      const obj = {
        key,
        dates: state.currentDate.id,
        customData: {
          createdAt: clickedDate,
          memo: payload.newMemo,
          title: payload.newTitle,
          time: state.currentData.customData.time,
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
    fetchData(state) {
      state.memoList = storage.fetch();
    },
    updateCurrentData(state, payload) {
      const { type, value } = payload;
      state.currentData.customData[type] = value;
    },
    showScheduleList(state) {
      state.isListModalOpen = true;
    },
  },
  actions: {
    removeMemo(context) {
      context.commit("removeOneMemo");
      context.commit("closeModal");
    },
    addMemo(context) {
      const obj = {
        newMemo: context.state.currentData.customData.memo,
        newTitle: context.state.currentData.customData.title,
      };
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
