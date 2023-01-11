<template>
  <div>
    <MemoModal
      @click.self="this.$store.commit('closeMemoModal')"
      v-if="this.$store.state.isMemoModalOpen"
    >
    </MemoModal>
    <ScheduleList
      @click.self="this.$store.state.isListModalOpen = false"
      v-if="this.$store.state.isListModalOpen"
    >
    </ScheduleList>
    <RepeatConfirmModal
      @click.self="this.$store.state.isRepeatConfirmModalOpen = false"
      v-if="this.$store.state.isRepeatConfirmModalOpen"
    ></RepeatConfirmModal>
    <CalendarMain></CalendarMain>
  </div>
</template>

<script>
import CalendarMain from "@/components/calendar/CalendarMain.vue";
import MemoModal from "@/components/modals/MemoModal.vue";
import ScheduleList from "@/components/modals/ScheduleList.vue";
import RepeatConfirmModal from "@/components/modals/RepeatConfirmModal.vue";

export default {
  components: {
    CalendarMain,
    MemoModal,
    RepeatConfirmModal,
    ScheduleList,
  },
};
</script>

<style></style>
