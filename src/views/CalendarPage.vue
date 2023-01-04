<template>
  <div>
    <MemoModal
      @click.self="this.$store.commit('closeModal')"
      v-if="this.$store.state.isOpen"
    >
    </MemoModal>
    <ScheduleList
      @click.self="this.$store.state.isListModalOpen = false"
      v-if="this.$store.state.isListModalOpen"
    >
    </ScheduleList>
    <ModalTemplate
      @click.self="this.$store.state.isRepeatModalOpen = false"
      v-if="this.$store.state.isRepeatModalOpen"
    ></ModalTemplate>
    <CalendarBody />
  </div>
</template>

<script>
import CalendarBody from "@/components/calendar/CalendarBody.vue";
import MemoModal from "@/components/common/MemoModal.vue";
import ModalTemplate from "@/components/modal/repeatDeleteModal.vue";
import ScheduleList from "@/components/modal/ScheduleList.vue";

export default {
  components: {
    CalendarBody,
    MemoModal,
    ScheduleList,
    ModalTemplate,
  },
};
</script>

<style></style>
