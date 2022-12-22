<template>
  <div class="mt-2 p-3 w-full bg-white rounded-lg shadow-sm">
    <div class="flex">
      {{ this.$store.state.currentDate.id.replaceAll("-", ". ") + "." }}
      <select
        v-model="hours"
        name="hours"
        class="bg-transparent text-base outline-none ml-1"
      >
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">10</option>
        <option value="12">12</option>
      </select>
      <span class="text-base mx-1">:</span>
      <select
        v-model="minutes"
        name="minutes"
        class="bg-transparent text-base outline-none"
      >
        <option value="0">00</option>
        <option value="30">30</option>
      </select>
      <select
        v-model="ampm"
        name="ampm"
        class="bg-transparent text-base outline-none"
      >
        <option value="am">오전</option>
        <option value="pm">오후</option>
      </select>
      <select
        v-model="alert"
        name="alert"
        class="bg-transparent text-base outline-none"
      >
        <option value="none">없음</option>
        <option value="5">5분전</option>
        <option value="10">30분전</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hours: "1",
      minutes: "0",
      ampm: "am",
      alert: "none",
    };
  },
};
</script>

<style></style>
