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
        // 원래 메모 클릭
        state.isNew = false;
        let data = state.memoList.find((memo) => memo.key === payload.type);
        /**
         * - state.currentData = data;
         * * v-model때문에 수정 중 캘린더에 보여지는 데이터까지 같이 수정됨..
         * -> 깊은 복사를 통해 해결..
         */
        state.currentData = JSON.parse(JSON.stringify(data));
      } else {
        // 새 메모 작성
        // currentData reset
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
      // key 생성
      const keyArray = state.memoList.map((memo) => memo.key);
      let key = keyArray.length === 0 ? 1 : Math.max(...keyArray) + 1;
      const { memo, title, time } = state.currentData.customData;
      const obj = {
        key,
        dates: state.currentDate.id,
        customData: {
          createdAt,
          memo,
          title,
          time,
        },
      };
      if (!obj.customData.title) {
        obj.customData.title = "새로운 이벤트";
      }
      localStorage.setItem(key, JSON.stringify(obj));
      state.memoList.push(obj);
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
