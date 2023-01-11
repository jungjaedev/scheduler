<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content w-80 flex flex-col">
          <BaseButton
            @click="allRepeatMemoControl()"
            class="bg-orange-500 my-2 hover:bg-orange-700 rounded-full"
          >
            {{ afterThisMemo }} {{ editOrDelete }}
          </BaseButton>
          <BaseButton
            v-if="
              this.$store.state.confirmModalType === 'delete' ||
              (this.$store.state.confirmModalType === 'edit' &&
                (!this.$store.state.isDateChanged ||
                  this.$store.state.currentData.customData.repeat.term ===
                    'none'))
            "
            @click="oneMemoControl()"
            class="text-blue-500 bg-gray-200 my-2 hover:bg-gray-300 rounded-full"
          >
            {{ onlyThisMemo }} {{ editOrDelete }}
          </BaseButton>
          <BaseButton
            @click="this.$store.state.isRepeatConfirmModalOpen = false"
            class="text-blue-500 bg-gray-200 my-2 mt-4 hover:bg-gray-300 rounded-full"
          >
            {{ closeText }}
          </BaseButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
import BaseButton from "@/components/templates/BaseButton.vue";
import { text } from "@/constants/index";

export default {
  components: {
    BaseButton,
  },
  data() {
    const { AFTER_THIS_MEMO, ONLY_THIS_MEMO, EDIT, CLOSE, DELETE } = text;
    return {
      afterThisMemo: AFTER_THIS_MEMO,
      onlyThisMemo: ONLY_THIS_MEMO,
      editText: EDIT,
      closeText: CLOSE,
      deleteText: DELETE,
    };
  },
  computed: {
    editOrDelete() {
      return this.$store.state.confirmModalType === "edit"
        ? this.editText
        : this.deleteText;
    },
  },
  methods: {
    ...mapActions([
      "removeMemo",
      "removeRepeatMemo",
      "addMemo",
      "editRepeatMemo",
    ]),
    oneMemoControl() {
      this.$store.state.savedGroupId =
        this.$store.state.currentData.customData.repeat.groupId;
      if (this.$store.state.confirmModalType === "edit") {
        this.$store.state.currentData.customData.repeat = {
          term: "none",
          type: "none",
          endDate: "",
          repeatCount: 1,
        };
        this.addMemo();
      } else if (this.$store.state.confirmModalType === "delete") {
        this.removeMemo();
      }
      this.$store.state.isRepeatConfirmModalOpen = false;
    },
    allRepeatMemoControl() {
      this.$store.state.savedGroupId =
        this.$store.state.currentData.customData.repeat.groupId;
      if (this.$store.state.confirmModalType === "delete") {
        this.removeRepeatMemo();
      } else if (this.$store.state.confirmModalType === "edit") {
        this.editRepeatMemo();
      }
    },
  },
};
</script>

<style></style>
