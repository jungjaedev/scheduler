const removeMemo = (context) => {
  context.commit("removeOneMemo");
  context.commit("closeModal");
  context.commit("fetchData");
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
  context.commit("closeModal");
  context.commit("fetchData");
};

export { addMemo, removeMemo };