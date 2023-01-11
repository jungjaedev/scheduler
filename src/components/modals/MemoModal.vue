<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content w-80">
          <div class="mb-2">
            <label
              for="title"
              class="text-left block left-0 mb-1 pl-1 text-sm font-medium text-gray-900"
              >{{ eventTitle }}</label
            >
            <input
              id="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              v-model="currentData.customData.title"
              :placeholder="newEvent"
            />
          </div>
          <div class="mb-2">
            <label
              for="memo"
              class="text-left block left-0 mb-1 pl-1 text-sm font-medium text-gray-900"
              >{{ memoTitle }}</label
            >
            <input
              id="memo"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              v-model="currentData.customData.memo"
              @focus="this.$store.state.isEmpty = false"
              :placeholder="memoTitle"
            />
          </div>
          <MemoModalRepeatPicker></MemoModalRepeatPicker>
        </div>
        <div
          v-if="this.$store.state.isEmpty"
          class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-1"
        >
          <p>{{ writeMemo }}</p>
        </div>
        <p v-else>&nbsp;</p>
        <footer class="modal-footer flex justify-between">
          <BaseButton
            class="bg-red-500 hover:bg-red-700"
            v-if="!this.$store.state.isNew"
            @click="checkRepeat('delete')"
            >{{ deleteText }}</BaseButton
          >
          <div v-else></div>
          <div>
            <BaseButton class="hover:bg-blue-700" @click="checkRepeat('edit')">
              {{ saveText }}
            </BaseButton>
            <BaseButton
              class="text-blue-500 bg-white hover:bg-gray-200"
              @click="this.$store.commit('closeMemoModal')"
            >
              {{ closeText }}
            </BaseButton>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MemoModalRepeatPicker from "@/components/modals/MemoModalRepeatPicker.vue";
import BaseButton from "@/components/templates/BaseButton.vue";
import { text } from "@/constants/index";

export default {
  components: {
    MemoModalRepeatPicker,
    BaseButton,
  },
  data() {
    const { EVENT, NEW_EVENT, MEMO_TITLE, WRITE_MEMO, DELETE, SAVE, CLOSE } =
      text;
    return {
      eventTitle: EVENT,
      newEvent: NEW_EVENT,
      memoTitle: MEMO_TITLE,
      writeMemo: WRITE_MEMO,
      deleteText: DELETE,
      saveText: SAVE,
      closeText: CLOSE,
    };
  },
  computed: {
    ...mapGetters(["currentData"]),
  },
  methods: {
    ...mapActions(["removeMemo", "addMemo"]),
    checkRepeat(type) {
      if (type === "delete" && !this.currentData.customData.repeat.isRepeat) {
        this.removeMemo();
        return;
      } else if (
        type === "edit" &&
        !this.currentData.customData.repeat.isRepeat
      ) {
        this.addMemo();
        return;
      }

      if (type === "delete" && this.currentData.customData.repeat.isRepeat) {
        this.$store.state.confirmModalType = "delete";
      } else if (
        type === "edit" &&
        this.currentData.customData.repeat.isRepeat
      ) {
        this.$store.state.confirmModalType = "edit";
      }
      this.$store.commit("closeMemoModal");
      this.$store.state.isRepeatConfirmModalOpen = true;
    },
  },
};
</script>

<style scoped></style>
