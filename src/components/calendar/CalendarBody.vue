<template>
  <div class="text-center section">
    <v-calendar
      ref="calendar"
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="storedMemoList"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span
            @click.prevent="
              this.$store.commit('showModal', { day, type: 'new' })
            "
            class="day-label text-sm text-gray-900"
            >{{ day.day }}
            <span
              v-if="
                day.date.toLocaleString().slice(0, 13) ===
                new Date().toLocaleString().slice(0, 13)
              "
              class="text-xxs today"
              ><i class="fa-solid fa-circle"></i
            ></span>
          </span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="attr in attributes"
              @click.prevent="
                this.$store.commit('showModal', { day, type: attr.key })
              "
              :key="attr.key"
              :class="[
                { alert: attr.customData.time.alert !== 'none' },
                {
                  timeset:
                    !attr.customData.time.allDay &&
                    attr.customData.time.alert === 'none',
                },
              ]"
              class="relative cursor-pointer text-xs leading-tight rounded-sm p-1 mt-0 mb-1 bg-blue-500 text-white"
            >
              <span>
                {{ attr.customData.title }}
              </span>
              <span
                v-if="!attr.customData.time.allDay"
                class="text-xxs text-right inline-block w-10"
              >
                {{
                  attr.customData.time.hours +
                  ":" +
                  attr.customData.time.minutes
                }}
              </span>
              <span
                v-if="attr.customData.time.alert !== 'none'"
                class="text-xxs inline-block absolute right-2"
              >
                <i class="fa-regular fa-bell"></i>
              </span>
            </p>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="bg-gray-100 text-center p-2 border-t rounded-b-lg">
          <ButtonTemplate @click="moveToToday">Today</ButtonTemplate>
          <ButtonTemplate @click="this.$store.commit('showScheduleList')"
            >일정확인</ButtonTemplate
          >
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ButtonTemplate from "@/components/templates/ButtonTemplate.vue";

export default {
  components: {
    ButtonTemplate,
  },
  data() {
    return {
      masks: {
        title: "YYYY년 MMMM",
        weekdays: "WWW",
      },
    };
  },
  methods: {
    moveToToday() {
      this.$refs.calendar.move(new Date());
    },
  },
  computed: {
    ...mapGetters(["storedMemoList"]),
  },
};
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 97px;
  --day-height: 105px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;

  & .day-label:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    overflow: hidden;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
.alert {
  background-color: rgb(21, 166, 125);
}
.timeset {
  background-color: rgb(230, 173, 0);
}

.today {
  color: rgb(128, 255, 0);
}
</style>
