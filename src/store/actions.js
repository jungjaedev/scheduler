const removeMemo = ({ commit }) => {
  commit("removeOneMemo");
  commit("fetchRepeatCount");
  commit("fetchData");
  commit("closeMemoModal");
};

const removeRepeatMemo = ({ commit, state }) => {
  commit("removeRepeatMemo");
  commit("fetchRepeatCount");
  commit("fetchData");
  state.isRepeatConfirmModalOpen = false;
};

const editRepeatMemo = ({ commit, state }) => {
  commit("editRepeatMemo");
  commit("fetchRepeatCount");
  commit("fetchData");
  state.isRepeatConfirmModalOpen = false;
};

const addMemo = ({ commit, state }) => {
  if (state.currentData.customData.memo === "") {
    state.isEmpty = true;
    return;
  }

  if (state.isNew) {
    commit("addOneMemo");
  } else {
    commit("editOneMemo");
    commit("fetchRepeatCount");
  }
  commit("closeMemoModal");
  commit("fetchData");
};

export { addMemo, removeMemo, removeRepeatMemo, editRepeatMemo };
