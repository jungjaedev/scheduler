<template>
  <div class="text-center section">
    <!-- <h2 class="h2">Custom Calendars</h2>
    <p class="text-lg font-medium text-gray-600 mb-6">
      Roll your own calendars using scoped slots
    </p> -->
    <MemoModal @click.self="cancelModal" v-if="this.$store.state.isOpen">
      <div>
        <input
          class="my-1 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          v-model="newTitle"
          placeholder="새로운 이벤트"
        />

        <input
          class="my-1 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          v-model="newMemo"
          @focus="isEmpty = false"
          placeholder="메모"
        />
        <TimePicker></TimePicker>
      </div>
      <p v-if="isEmpty">메모를 입력해주세요</p>
      <p v-else>&nbsp;</p>

      <template v-slot:footer>
        <ButtonTemplate v-if="!this.$store.state.isNew" @click="removeMemo"
          >삭제</ButtonTemplate
        >
        <ButtonTemplate @click="addMemo"> 저장 </ButtonTemplate>
        <ButtonTemplate @click="cancelModal"> 닫기 </ButtonTemplate>
      </template>
    </MemoModal>
    <v-calendar
      ref="calendar"
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="this.storedMemoList"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span
            @click.prevent="openModal(day, 'new')"
            class="day-label text-sm text-gray-900"
            :class="{
              today:
                day.date.toLocaleString().slice(0, 13) ===
                new Date().toLocaleString().slice(0, 13),
            }"
            >{{ day.day }}
          </span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="attr in attributes"
              @click.prevent="openModal(day, attr.key)"
              :key="attr.key"
              :class="[
                { alert: attr.customData.time.alert !== 'none' },
                {
                  timeset:
                    (attr.customData.time.hours !== '01' ||
                      attr.customData.time.minutes !== '00' ||
                      attr.customData.time.ampm !== 'am') &&
                    attr.customData.time.alert === 'none',
                },
              ]"
              class="cursor-pointer text-xs leading-tight rounded-sm p-1 mt-0 mb-1 bg-blue-500 text-white"
            >
              <span
                v-if="attr.customData.time.alert !== 'none'"
                class="text-xxs"
              >
                <i class="fa-regular fa-bell"></i>
              </span>
              <span class="">
                {{ attr.customData.title }}
              </span>
              <!-- <span
                v-if="
                  attr.customData.time.hours !== '01' ||
                  attr.customData.time.minutes !== '00' ||
                  attr.customData.time.ampm !== 'am'
                "
                class="text-xxs text-right "
              > -->
              <span
                v-if="
                  attr.customData.time.hours !== '01' ||
                  attr.customData.time.minutes !== '00' ||
                  attr.customData.time.ampm !== 'am'
                "
                class="text-xxs text-right inline-block w-10"
              >
                {{
                  attr.customData.time.hours +
                  ":" +
                  attr.customData.time.minutes
                }}
              </span>
            </p>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="bg-gray-100 text-center p-2 border-t rounded-b-lg">
          <ButtonTemplate @click="moveToToday">Today</ButtonTemplate>
          <ButtonTemplate @click="showSchedulList">일정확인</ButtonTemplate>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MemoModal from "@/components/common/MemoModal.vue";
import ButtonTemplate from "@/components/templates/ButtonTemplate.vue";
import TimePicker from "@/components/common/TimePicker.vue";

export default {
  components: {
    MemoModal,
    ButtonTemplate,
    TimePicker,
  },
  data() {
    return {
      newMemo: "",
      newTitle: "",
      isEmpty: false,
      masks: {
        title: "YYYY년 MMMM",
        weekdays: "WWW",
      },
    };
  },
  methods: {
    openModal(day, type) {
      if (type !== "new") {
        this.$store.state.isNew = false;
        let data = this.$store.state.memoList.find((memo) => memo.key === type);
        this.$store.state.currentData = data;
        this.$store.state.time = data.customData.time;
        this.setInputValue();
      } else {
        this.$store.state.isNew = true;
        this.$store.state.time = {
          hours: "01",
          minutes: "00",
          ampm: "am",
          alert: "none",
        };
      }
      this.$store.commit("showModal", { day });
    },
    addMemo() {
      const obj = { newMemo: this.newMemo, newTitle: this.newTitle };
      if (this.newMemo !== "") {
        if (this.$store.state.isNew) {
          this.$store.commit("addOneMemo", obj);
        } else {
          this.$store.commit("editOneMemo", obj);
        }
        this.$store.commit("closeModal");
        this.clearInput();
      } else {
        this.isEmpty = true;
      }
    },
    removeMemo() {
      this.$store.commit("removeOneMemo");
      this.$store.commit("closeModal");
      this.clearInput();
    },
    cancelModal() {
      this.$store.commit("closeModal");
      this.clearInput();
    },
    clearInput() {
      this.newMemo = "";
      this.newTitle = "";
    },
    setInputValue() {
      this.newMemo = this.$store.state.currentData.customData.memo;
      this.newTitle = this.$store.state.currentData.customData.title;
    },
    moveToToday() {
      this.$refs.calendar.move(new Date());
    },
    showSchedulList() {
      console.log("showList");
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
  --day-width: 97px;
  --day-height: 105px;
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
    overflow: hidden;
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
.alert {
  background-color: rgb(21, 166, 125);
}
.timeset {
  background-color: rgb(230, 173, 0);
}

.today {
  color: blue;
}
</style>
