<template>
  <div class="mt-2 w-full bg-white rounded-lg shadow-sm">
    <div class="flex flex-col">
      <div class="flex">
        <div class="w-full text-sm text-left">
          <label class="block pl-1 mb-2 text-sm font-medium text-gray-900"
            >시간 설정</label
          >
        </div>
        <div class="w-full text-sm text-right">
          {{ formatDate(this.$store.state.currentDate.id) }}
        </div>
      </div>
      <div class="flex w-full">
        <div class="w-1/4 flex items-center mx-1">
          <input
            id="default-checkbox"
            type="checkbox"
            v-model="currentData.customData.time.allDay"
            class="w-4 mr-1 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            class="text-xs text-gray-900 dark:text-gray-300"
            >하루종일
          </label>
        </div>
        <div class="w-1/5 mr-1">
          <select
            :disabled="currentData.customData.time.allDay"
            name="hours"
            v-model="currentData.customData.time.hours"
            class="w-full p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">10</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="w-1/5 mx-1">
          <select
            :disabled="currentData.customData.time.allDay"
            name="minutes"
            v-model="currentData.customData.time.minutes"
            class="w-full p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="00">00</option>
            <option value="30">30</option>
          </select>
        </div>
        <div class="w-1/4 mx-1">
          <select
            :disabled="currentData.customData.time.allDay"
            name="ampm"
            v-model="currentData.customData.time.ampm"
            class="w-full p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="am">오전</option>
            <option value="pm">오후</option>
          </select>
        </div>
      </div>

      <div class="w-full flex pl-1 text-sm text-left mt-2">
        <div class="w-3/12 mr-2">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >반복 설정</label
          >
          <select
            name="alert"
            :disabled="currentData.customData.time.allDay"
            v-model="currentData.customData.repeat.term"
            class="w-full p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="none">없음</option>
            <option value="daily">매일</option>
            <option value="weekly">매주</option>
            <option value="monthly">매월</option>
            <option value="annually">매년</option>
          </select>
        </div>
        <div class="w-3/12 mr-2">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >종료 설정</label
          >
          <select
            name="alert"
            :disabled="
              currentData.customData.time.allDay ||
              currentData.customData.repeat.term === 'none'
            "
            v-model="currentData.customData.repeat.type"
            class="w-full p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="none">안함</option>
            <option value="number">횟수</option>
            <option value="date">날짜</option>
          </select>
        </div>
        <div
          v-if="currentData.customData.repeat.type === 'date'"
          class="w-5/12"
        >
          <label class="block mb-2.5 text-sm font-medium text-gray-900"
            >종료 날짜</label
          >
          <v-date-picker v-model="currentData.customData.repeat.endDate">
            <template v-slot="{ inputValue, inputEvents }">
              <input
                :disabled="
                  currentData.customData.time.allDay ||
                  currentData.customData.repeat.term === 'none'
                "
                class="placeholder:text-xs px-2 py-1 w-4/5 border rounded focus:outline-none focus:border-blue-300"
                :value="inputValue"
                v-on="inputEvents"
                placeholder="Select a date"
              />
            </template>
          </v-date-picker>
        </div>
        <div
          v-else-if="currentData.customData.repeat.type === 'number'"
          class="w-5/12"
        >
          <label class="block mb-2.5 text-sm font-medium text-gray-900"
            >반복 횟수</label
          >
          <input
            :disabled="
              currentData.customData.time.allDay ||
              currentData.customData.repeat.term === 'none'
            "
            type="number"
            class="px-2 py-1 w-3/5 border rounded focus:outline-none focus:border-blue-300"
            v-model="currentData.customData.repeat.repeatCount"
          />
        </div>
        <div
          v-else-if="
            currentData.customData.repeat.type === 'none' &&
            currentData.customData.repeat.term !== 'none'
          "
          class="w-5/12 flex items-end"
        >
          <div class="text-xxs">{{ warnNoRepeatCheck }}</div>
        </div>
      </div>
      <div class="flex-col w-2/7 pl-1 text-sm text-left mt-2">
        <label class="block mb-2 text-sm font-medium text-gray-900"
          >알림 설정</label
        >
        <select
          name="alert"
          :disabled="currentData.customData.time.allDay"
          v-model="currentData.customData.time.alert"
          class="p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
        >
          <option value="none">없음</option>
          <option value="5">5분전</option>
          <option value="10">30분전</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/filters";
import { text } from "@/constants/index";

export default {
  computed: {
    ...mapGetters(["currentData"]),
    endRepeatNumber() {
      return this.currentData.customData.repeat.repeatCount;
    },
  },
  data() {
    const { WARN_NO_REPEAT_CHECK } = text;
    return {
      warnNoRepeatCheck: WARN_NO_REPEAT_CHECK,
    };
  },
  methods: {
    formatDate,
  },
  watch: {
    endRepeatNumber(value) {
      if (value > 999) {
        this.currentData.customData.repeat.repeatCount = 999;
      }
      if (value < 1) {
        this.currentData.customData.repeat.repeatCount = 1;
      }
    },
  },
};
</script>

<style></style>
