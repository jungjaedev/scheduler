<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window cursor-default">
        <div
          :key="componentKey"
          v-if="storedMemoList.length !== 0"
          class="modal-content overflow-y-scroll max-h-96 w-72"
        >
          <ul class="space-y-1 max-w-md list-inside">
            <li
              v-for="(memo, index) in filteredMemoList"
              :key="memo.key"
              class="flex flex-col items-start"
            >
              <div clss="flex flex-row w-full">
                <span
                  v-if="
                    index === 0 ||
                    filteredMemoList[index].dates !==
                      filteredMemoList[index - 1].dates
                  "
                  class="pl-2 text-sm text-gray-700"
                >
                  {{ formatDate(memo.dates) }}
                  {{ this.day[new Date(memo.dates).getDay()] }}
                </span>
                <span
                  v-if="
                    Date.parse(formatDate(memo.dates)) ===
                    Date.parse(new Date().toLocaleDateString())
                  "
                  class="ml-1 text-right today text-xxs"
                  ><i class="fa-solid fa-circle"></i
                ></span>
              </div>
              <div class="pl-2 text-sm flex">
                <div class="flex items-center content-center">
                  <span
                    class="text-blue-500 text-xxs mr-1"
                    :class="[
                      {
                        alert:
                          memo.customData.time.alert !== 'none' &&
                          !memo.customData.time.allDay,
                      },
                      {
                        timeset:
                          !memo.customData.time.allDay &&
                          memo.customData.time.alert === 'none',
                      },
                    ]"
                    ><i class="fa-solid fa-circle"></i
                  ></span>
                  <span class="text-base">
                    {{ memo.customData.title }} &nbsp;
                  </span>
                </div>
                <div class="flex items-center content-center">
                  <span class="text-xs text-right text-gray-500">
                    {{
                      !memo.customData.time.allDay
                        ? memo.customData.time.hours +
                          ":" +
                          memo.customData.time.minutes
                        : null
                    }}
                  </span>
                </div>
              </div>
              <hr
                v-if="
                  index !== filteredMemoList.length - 1 &&
                  filteredMemoList[index].dates !==
                    filteredMemoList[index + 1].dates
                "
                ref="filteredMemoList"
                class="mt-1 mx-auto w-48 h-0.5 bg-gray-100 rounded border-0"
              />
            </li>
          </ul>
        </div>
        <div
          class="modal-content overflow-y-scroll text-sm max-h-96 w-full h-40 flex justify-center items-center"
          v-if="
            (filteredMemoList.length === 0 && !isShowAllMemo) ||
            storedMemoList.length === 0
          "
        >
          <div class="pl-2">저장된 메모가 없습니다.</div>
        </div>
        <div
          class="flex justify-center items-center text-sm underline text-blue-700"
        >
          <span
            v-if="!isShowAllMemo"
            @click="showAllLists"
            class="cursor-pointer"
            >이전 메모 불러오기</span
          >
        </div>
        <footer class="modal-footer">
          <BaseButton @click="this.$store.state.isListModalOpen = false"
            >닫기</BaseButton
          >
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import BaseButton from "@/components/templates/BaseButton";
import { formatDate } from "@/utils/filters";

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      day: [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
      ],
      isShowAllMemo: false,
      componentKey: 0,
    };
  },
  methods: {
    formatDate,
    showAllLists() {
      this.isShowAllMemo = true;
      this.componentKey++;
      this.$nextTick(() => this.scrollToToday());
    },
    scrollToToday() {
      const todayIndex = this.filteredMemoList.findIndex((memo) => {
        return (
          Date.parse(formatDate(memo.dates)) >=
          Date.parse(new Date().toLocaleDateString())
        );
      });
      if (todayIndex > 0) {
        this.$refs.filteredMemoList[todayIndex - 1].scrollIntoView();
      }
    },
  },
  computed: {
    ...mapGetters(["storedMemoList"]),
    filteredMemoList() {
      if (this.isShowAllMemo) {
        return this.storedMemoList;
      } else {
        return this.storedMemoList.filter((memo) => {
          return (
            Date.parse(formatDate(memo.dates)) >=
            Date.parse(new Date().toLocaleDateString())
          );
        });
      }
    },
  },
};
</script>

<style scoped>
.alert {
  color: rgb(21, 166, 125);
}
.timeset {
  color: rgb(230, 173, 0);
}
</style>
