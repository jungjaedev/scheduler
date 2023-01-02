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
            v-model="storedCurrentData.customData.time.allDay"
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
            :disabled="storedCurrentData.customData.time.allDay"
            name="hours"
            v-model="storedCurrentData.customData.time.hours"
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
            :disabled="storedCurrentData.customData.time.allDay"
            name="minutes"
            v-model="storedCurrentData.customData.time.minutes"
            class="w-full p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="00">00</option>
            <option value="30">30</option>
          </select>
        </div>
        <div class="w-1/4 mx-1">
          <select
            :disabled="storedCurrentData.customData.time.allDay"
            name="ampm"
            v-model="storedCurrentData.customData.time.ampm"
            class="w-full p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="am">오전</option>
            <option value="pm">오후</option>
          </select>
        </div>
      </div>
      <div class="w-full pl-1 text-sm text-left">
        <label class="block mb-2 text-sm font-medium text-gray-900"
          >알림 설정</label
        >
      </div>
      <div class="flex w-full">
        <div class="w-2/7">
          <select
            name="alert"
            :disabled="storedCurrentData.customData.time.allDay"
            v-model="storedCurrentData.customData.time.alert"
            class="w-full p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="none">없음</option>
            <option value="5">5분전</option>
            <option value="10">30분전</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatDate } from "@/utils/filters";
export default {
  computed: {
    ...mapGetters(["storedCurrentData"]),
  },
  methods: {
    formatDate,
  },
};
</script>

<style></style>
