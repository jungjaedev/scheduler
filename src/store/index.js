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
      isMemoModalOpen: false,
      isNew: true,
      isEmpty: false,
      isListModalOpen: false,
      isRepeatConfirmModalOpen: false,
      isDateChanged: false,
      confirmModalType: "",
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
            repeatCount: 1,
          },
        },
      },
      savedGroupId: 0,
    };
  },
  getters,
  mutations,
  actions,
  modules: {},
});
