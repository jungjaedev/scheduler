<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content w-80 flex flex-col">
          <BaseButton
            @click="allRepeatMemoControl()"
            class="bg-orange-500 my-2 hover:bg-orange-700 rounded-full"
          >
            이후 모든 메모 {{ editOrDelete }}
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
            이 메모만 {{ editOrDelete }}
          </BaseButton>
          <BaseButton
            @click="this.$store.state.isRepeatConfirmModalOpen = false"
            class="text-blue-500 bg-gray-200 my-2 mt-4 hover:bg-gray-300 rounded-full"
          >
            닫기
          </BaseButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
import BaseButton from "@/components/templates/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      editOrDelete:
        this.$store.state.confirmModalType === "edit" ? "수정" : "삭제",
    };
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
