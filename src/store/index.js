import { createStore } from "vuex";
import { storage } from "@/utils/storage";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

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
  getters,
  mutations,
  actions,
  modules: {},
});
