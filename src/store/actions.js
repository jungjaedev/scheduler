const removeMemo = (context) => {
  context.commit("removeOneMemo");
  // context.commit("fetchData");
  context.commit("fetchRepeatCount");
  context.commit("fetchData");
  context.commit("closeMemoModal");
};

const removeRepeatMemo = (context) => {
  context.commit("removeRepeatMemo");
  context.commit("fetchData");
  context.state.isRepeatConfirmModalOpen = false;
};

const editRepeatMemo = (context) => {
  context.commit("editRepeatMemo");
  context.commit("fetchData");
  context.state.isRepeatConfirmModalOpen = false;
};

const addMemo = (context) => {
  if (context.state.currentData.customData.memo === "") {
    context.state.isEmpty = true;
    return;
  }

  if (context.state.isNew) {
    context.commit("addOneMemo");
  } else {
    context.commit("editOneMemo");
  }
  context.commit("closeMemoModal");
  context.commit("fetchData");
};

export { addMemo, removeMemo, removeRepeatMemo, editRepeatMemo };
