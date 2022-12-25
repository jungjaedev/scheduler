<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content">
          <!-- <slot /> -->
          <label>이벤트</label>
          <input
            class="my-1 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            v-model="storedCurrentData.customData.title"
            placeholder="새로운 이벤트"
          />
          <label for="">메모 </label>
          <input
            class="my-1 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            v-model="storedCurrentData.customData.memo"
            @focus="isEmpty = false"
            placeholder="메모"
          />
          <TimePicker></TimePicker>
        </div>
        <p v-if="isEmpty">메모를 입력해주세요</p>
        <p v-else>&nbsp;</p>
        <footer class="modal-footer">
          <!-- <slot name="footer"> </slot> -->
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import TimePicker from "@/components/common/TimePicker.vue";
import ButtonTemplate from "@/components/templates/ButtonTemplate.vue";

export default {
  components: {
    TimePicker,
    ButtonTemplate,
  },
  data() {
    return {
      newTitle: "",
      newMemo: "",
      isEmpty: false,
    };
  },
  computed: {
    ...mapGetters(["storedInput", "storedCurrentData", "storedOriginalData"]),
    inputs: {
      get() {
        return this.storedInput;
      },
      set(value) {
        this.updateInput(value);
      },
    },
  },
  methods: {
    ...mapMutations(["updateInput"]),
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
