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
        <footer class="modal-footer">
          <ButtonTemplate v-if="!this.$store.state.isNew" @click="removeMemo"
            >삭제</ButtonTemplate
          >
          <ButtonTemplate @click="addMemo"> 저장 </ButtonTemplate>
          <ButtonTemplate @click="this.$store.commit('closeModal')">
            닫기
          </ButtonTemplate>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TimePicker from "@/components/common/TimePicker.vue";
import ButtonTemplate from "@/components/templates/ButtonTemplate.vue";

export default {
  components: {
    TimePicker,
    ButtonTemplate,
  },
  computed: {
    ...mapGetters(["storedCurrentData"]),
  },
  methods: {
    ...mapActions(["removeMemo", "addMemo"]),
  },
};
</script>

<style scoped></style>
