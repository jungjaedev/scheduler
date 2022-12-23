<template>
  <div class="mt-2 p-3 w-full bg-white rounded-lg shadow-sm">
    <div class="flex">
      {{ this.$store.state.currentDate.id.replaceAll("-", ". ") + "." }}
      <select
        v-model="this.storedTime.hours"
        name="hours"
        class="bg-transparent text-base outline-none ml-1"
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
      <span class="text-base mx-1">:</span>
      <select
        v-model="this.storedTime.minutes"
        name="minutes"
        class="bg-transparent text-base outline-none"
      >
        <option value="00">00</option>
        <option value="30">30</option>
      </select>
      <select
        v-model="this.storedTime.ampm"
        name="ampm"
        class="bg-transparent text-base outline-none"
      >
        <option value="am">오전</option>
        <option value="pm">오후</option>
      </select>
      <select
        v-model="this.storedTime.alert"
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
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["storedTime"]),
    timeData: {
      get() {
        return this.storedTime;
      },
      set(value) {
        this.updateTime(value);
      },
    },
  },
  methods: {
    ...mapMutations(["updateTime"]),
  },
};
</script>

<style></style>
