<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window cursor-default">
        <div class="modal-content overflow-y-scroll max-h-96 w-60">
          <ul
            class="space-y-1 max-w-md list-inside"
            v-for="(memo, index) in storedMemoList"
            :key="memo.key"
          >
            <li class="flex flex-col items-start">
              <div
                v-if="
                  index === 0 ||
                  storedMemoList[index].dates !==
                    storedMemoList[index - 1].dates
                "
                class="pl-2 text-sm font-semibold text-gray-900"
              >
                {{ formatDate(memo.dates) }}
                {{ this.day[new Date(memo.dates).getDay()] }}
              </div>
              <div class="pl-2 text-sm flex">
                <div>
                  <span
                    class="text-blue-500 text-xxs mr-1"
                    :class="[
                      { alert: memo.customData.time.alert !== 'none' },
                      {
                        timeset:
                          !memo.customData.time.allDay &&
                          memo.customData.time.alert === 'none',
                      },
                    ]"
                    ><i class="fa-solid fa-circle"></i
                  ></span>
                  <span> {{ memo.customData.title }} &nbsp; </span>
                </div>
                <div>
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
                  index !== storedMemoList.length - 1 &&
                  storedMemoList[index].dates !==
                    storedMemoList[index + 1].dates
                "
                class="my-2 mx-auto w-48 h-0.5 bg-gray-100 rounded border-0 dark:bg-gray-700"
              />
            </li>
          </ul>
        </div>
        <footer class="modal-footer">
          <ButtonTemplate @click="this.$store.state.isListModalOpen = false"
            >닫기</ButtonTemplate
          >
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import ButtonTemplate from "@/components/templates/ButtonTemplate";
import { formatDate } from "@/utils/formatDate";
export default {
  components: {
    ButtonTemplate,
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
    };
  },
  methods: {
    formatDate,
  },
  computed: {
    ...mapGetters(["storedMemoList"]),
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
