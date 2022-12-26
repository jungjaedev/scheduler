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
                {{ memo.dates }} {{ this.day[new Date(memo.dates).getDay()] }}
              </div>
              <div class="pl-2 text-sm">
                <span
                  class="text-blue-500 text-xxs mr-1"
                  :class="[
                    { alert: memo.customData.time.alert !== 'none' },
                    {
                      timeset:
                        (memo.customData.time.hours !== '01' ||
                          memo.customData.time.minutes !== '00' ||
                          memo.customData.time.ampm !== 'am') &&
                        memo.customData.time.alert === 'none',
                    },
                  ]"
                  ><i class="fa-solid fa-circle"></i
                ></span>
                <span>
                  {{ memo.customData.title }} &nbsp;
                  <span class="text-xs">
                    {{
                      memo.customData.time.hours !== "01" ||
                      memo.customData.time.minutes !== "00" ||
                      memo.customData.time.ampm !== "am"
                        ? memo.customData.time.hours +
                          ":" +
                          memo.customData.time.minutes
                        : null
                    }}
                  </span>
                </span>
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
  computed: {
    ...mapGetters(["storedMemoList"]),
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgb(88, 33, 33, 0.7);
}
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
  padding: 15px 20px 10px;
}

.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
}

.alert {
  color: rgb(21, 166, 125);
}
.timeset {
  color: rgb(230, 173, 0);
}
</style>
