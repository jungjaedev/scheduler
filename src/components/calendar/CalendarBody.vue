<template>
  <div class="text-center section">
    <!-- <h2 class="h2">Custom Calendars</h2>
    <p class="text-lg font-medium text-gray-600 mb-6">
      Roll your own calendars using scoped slots
    </p> -->
    <MemoModal
      @click.self="this.$store.commit('closeModal')"
      v-if="this.$store.state.isOpen"
    >
      <!-- default 슬롯 콘텐츠 -->
      <p>{{ this.$store.state.currentDate.ariaLabel }}</p>
      <div>
        <input
          class="my-1 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          v-model="newTitle"
          placeholder="새로운 이벤트"
        />
        <input
          class="my-1 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name"
          type="text"
          v-model="newMemo"
          placeholder="메모"
        />
      </div>
      <!-- /default -->
      <!-- footer 슬롯 콘텐츠 -->
      <template v-slot:footer>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="addMemo"
        >
          저장
        </button>
        <button
          class="ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="cancelModal"
        >
          닫기
        </button>
      </template>
      <!-- /footer -->
    </MemoModal>

    <v-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span
            @click.prevent="openModal(day)"
            class="day-label text-sm text-gray-900"
            >{{ day.day }}</span
          >
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="attr in attributes"
              :key="attr.customData.createAt"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1 bg-blue-500 text-white"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
import MemoModal from "@/components/common/MemoModal.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    MemoModal,
  },
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      newMemo: "",
      newTitle: "",
      masks: {
        title: "YYYY년 MMMM",
        weekdays: "WWW",
      },
      attributes: [
        {
          dates: new Date(year, month, 2),
          customData: {
            memo: "aaa",
            title: "abc",
            createdAt: "2022. 12. 21. 오후 4:25:47",
            completed: false,
          },
        },
        // {
        //   key: 2,
        //   customData: {
        //     title: "Take Noah to basketball practice",
        //     class: "bg-blue-500 text-white",
        //   },
        //   dates: new Date(year, month, 2),
        // },
      ],
    };
  },
  methods: {
    openModal(day) {
      this.$store.commit("showModal", day);
    },
    addMemo() {
      const obj = { newMemo: this.newMemo, newTitle: this.newTitle };
      if (this.newMemo !== "") {
        this.$store.commit("addOneMemo", obj);
        this.$store.commit("closeModal");
        this.clearInput();
      } else {
        // 메모가 비어있고 저장 시 경고
      }
    },
    cancelModal() {
      this.$store.commit("closeModal");
      this.clearInput();
    },
    clearInput() {
      this.newMemo = "";
      this.newTitle = "";
    },
  },
  computed: {
    ...mapGetters(["storedMemoList"]),
  },
};
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;

  & .day-label:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
