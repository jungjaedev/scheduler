<template>
  <div class="mt-2 w-full bg-white rounded-lg shadow-sm">
    <div class="flex flex-col">
      <div class="flex">
        <div class="w-full text-sm text-left">
          <label class="block pl-1 mb-2 text-sm font-medium text-gray-900"
            >알림 설정</label
          >
        </div>
        <div class="w-full text-sm text-right">
          {{ $store.state.currentDate.id.replaceAll("-", ". ") + "." }}
        </div>
      </div>
      <div class="flex w-full">
        <div class="w-1/5 mr-1">
          <select
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
            name="ampm"
            v-model="storedCurrentData.customData.time.ampm"
            class="w-full p-1.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="am">오전</option>
            <option value="pm">오후</option>
          </select>
        </div>
        <div class="w-2/7 mx-1">
          <select
            name="alert"
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

export default {
  computed: {
    ...mapGetters(["storedCurrentData"]),
  },
};
</script>

<style></style>
