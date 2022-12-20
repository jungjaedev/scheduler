<template>
  <div>
    <CalendarHeader />
    <CalendarBody />
  </div>
</template>

<script>
import CalendarHeader from "@/components/calendar/CalendarHeader.vue";
import CalendarBody from "@/components/calendar/CalendarBody.vue";

export default {
  components: {
    CalendarHeader,
    CalendarBody,
  },
};
</script>

<style></style>
