<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content">
          <div class="flex">
            <label for="title" class="w-1/5 my-1 py-3">이벤트</label>
            <input
              id="title"
              class="my-1 appearance-none block w-4/5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              v-model="storedCurrentData.customData.title"
              placeholder="새로운 이벤트"
            />
          </div>
          <div class="flex">
            <label class="w-1/5 my-1 py-3" for="memo">메모 </label>
            <input
              id="memo"
              class="my-1 appearance-none block w-4/5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              v-model="storedCurrentData.customData.memo"
              @focus="this.$store.state.isEmpty = false"
              placeholder="메모"
            />
          </div>
          <TimePicker></TimePicker>
        </div>
        <p v-if="this.$store.state.isEmpty">메모를 입력해주세요</p>
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

<style scoped>
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-window {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.modal-content {
  padding: 10px 20px;
}

.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
}
</style>
