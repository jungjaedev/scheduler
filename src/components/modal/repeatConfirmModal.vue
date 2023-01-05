<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content w-80 flex flex-col">
          <ButtonTemplate
            @click="removeRepeatMemo"
            class="bg-orange-500 my-2 hover:bg-orange-700 rounded-full"
          >
            이후 모든 메모 {{ editOrDelete }}
          </ButtonTemplate>
          <ButtonTemplate
            @click="oneMemoControl()"
            class="text-blue-500 bg-gray-200 my-2 hover:bg-gray-300 rounded-full"
          >
            이 메모만 {{ editOrDelete }}
          </ButtonTemplate>
          <ButtonTemplate
            @click="this.$store.state.isRepeatConfirmModalOpen = false"
            class="text-blue-500 bg-gray-200 my-2 mt-4 hover:bg-gray-300 rounded-full"
          >
            닫기
          </ButtonTemplate>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from "vuex";
import ButtonTemplate from "@/components/templates/ButtonTemplate.vue";

export default {
  components: {
    ButtonTemplate,
  },
  data() {
    return {
      editOrDelete:
        this.$store.state.confirmModalType === "edit" ? "수정" : "삭제",
    };
  },
  methods: {
    ...mapActions(["removeMemo", "removeRepeatMemo", "addMemo"]),
    oneMemoControl() {
      if (this.$store.state.confirmModalType === "edit") {
        this.addMemo();
      } else if (this.$store.state.confirmModalType === "delete") {
        this.removeMemo();
      }
      this.$store.state.isRepeatConfirmModalOpen = false;
    },
    // repeatMemoControl() {

    // }
  },
};
</script>

<style></style>
