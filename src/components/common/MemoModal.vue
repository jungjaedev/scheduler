<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content w-80">
          <div class="mb-2">
            <label
              for="title"
              class="text-left block left-0 mb-1 pl-1 text-sm font-medium text-gray-900"
              >이벤트</label
            >
            <input
              id="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              v-model="storedCurrentData.customData.title"
              placeholder="새로운 이벤트"
            />
          </div>
          <div class="mb-2">
            <label
              for="memo"
              class="text-left block left-0 mb-1 pl-1 text-sm font-medium text-gray-900"
              >메모</label
            >
            <input
              id="memo"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="text"
              v-model="storedCurrentData.customData.memo"
              @focus="this.$store.state.isEmpty = false"
              placeholder="메모"
            />
          </div>
          <TimePicker></TimePicker>
        </div>
        <div
          v-if="this.$store.state.isEmpty"
          class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-1"
        >
          <p>메모를 입력해주세요</p>
        </div>
        <p v-else>&nbsp;</p>
        <footer class="modal-footer flex justify-between">
          <BaseButton
            class="bg-red-500 hover:bg-red-700"
            v-if="!this.$store.state.isNew"
            @click="checkRepeat('delete')"
            >삭제</BaseButton
          >
          <div v-else></div>
          <div>
            <BaseButton class="hover:bg-blue-700" @click="checkRepeat('edit')">
              저장
            </BaseButton>
            <BaseButton
              class="text-blue-500 bg-white hover:bg-gray-200"
              @click="this.$store.commit('closeModal')"
            >
              닫기
            </BaseButton>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TimePicker from "@/components/common/TimePicker.vue";
import BaseButton from "@/components/templates/BaseButton.vue";

export default {
  components: {
    TimePicker,
    BaseButton,
  },
  computed: {
    ...mapGetters(["storedCurrentData"]),
  },
  methods: {
    ...mapActions(["removeMemo", "addMemo"]),
    checkRepeat(type) {
      if (
        type === "delete" &&
        !this.storedCurrentData.customData.repeat.isRepeat
      ) {
        this.removeMemo();
        return;
      } else if (
        type === "edit" &&
        !this.storedCurrentData.customData.repeat.isRepeat
      ) {
        this.addMemo();
        return;
      }

      if (
        type === "delete" &&
        this.storedCurrentData.customData.repeat.isRepeat
      ) {
        this.$store.state.confirmModalType = "delete";
      } else if (
        type === "edit" &&
        this.storedCurrentData.customData.repeat.isRepeat
      ) {
        this.$store.state.confirmModalType = "edit";
      }
      this.$store.commit("closeModal");
      this.$store.state.isRepeatConfirmModalOpen = true;
    },
  },
};
</script>

<style scoped></style>
