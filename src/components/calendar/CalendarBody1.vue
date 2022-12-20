<template>
  <div>
    <div>{{ year }}</div>
    <div>{{ month }}</div>
    <button @click="monthArrowHandler(-1)">&lt;</button>
    <button @click="monthArrowHandler(1)">&gt;</button>
    <table>
      <thead>
        <tr>
          <th v-for="day in days" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(date, idx) in dates" :key="idx">
          <td
            v-for="(day, secondIdx) in date"
            :key="secondIdx"
            @click="dayHandler(day, idx)"
            :class="{
              'light-grey-text': idx === 0 && day >= lastMonthStart,
              'grey-text': dates.length - 1 === idx && nextMonthStart > day,
              'primary-color':
                day === today && month === currentMonth && year === currentYear,
            }"
          >
            {{ day }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: ["일", "월", "화", "수", "목", "금", "토"],
      dates: [],
      currentYear: 0,
      currentMonth: 0,
      lastMonthStart: 0,
      nextMonthStart: 0,
      year: 0,
      month: 0,
      today: 0,
    };
  },
  created() {
    const date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.today = date.getDate();
    this.calendarData();
  },
  methods: {
    calendarData() {
      const [monthFirstDay, monthLastDate, lastMonthLastDate] =
        this.getFirstDayLastDate(this.year, this.month);
      this.dates = this.getDaysOfMonth(
        monthFirstDay,
        monthLastDate,
        lastMonthLastDate
      );
    },
    monthArrowHandler(arg) {
      if (arg === -1) {
        // 지난 달 달력으로
        this.month -= 1;
      } else if (arg === 1) {
        // 다음 달 달력으로
        this.month += 1;
      }

      if (this.month === 0) {
        // 작년 12월
        this.year -= 1;
        this.month = 12;
      } else if (this.month > 12) {
        // 내년 1월
        this.year += 1;
        this.month = 1;
      }
      this.calendarData();
    },
    getFirstDayLastDate(year, month) {
      const firstDay = new Date(year, month - 1, 1).getDay(); // 이번달 시작 요일 or 위치
      const lastDate = new Date(year, month, 0).getDate(); // 이번달 마지막일
      let lastYear = year;
      let lastMonth = month - 1;
      if (month === 1) {
        lastMonth = 12;
        lastYear -= 1;
      }
      const prevLastDate = new Date(lastYear, lastMonth, 0).getDate(); // 지난달 마지막 날
      return [firstDay, lastDate, prevLastDate];
    },
    getDaysOfMonth(monthFirstDay, monthLastDate, prevMonthLastDate) {
      let day = 1;
      let prevDay = prevMonthLastDate - monthFirstDay + 1;
      let weekOfDays = [];
      const dateArray = [];
      while (day <= monthLastDate) {
        // 이번달 첫주에 포함되는 이전달의 남은 days
        if (day === 1) {
          for (let i = 0; i < monthFirstDay; i++) {
            if (i === 0) {
              this.lastMonthStart = prevDay;
            }
            weekOfDays.push(prevDay);
            prevDay++;
          }
        }
        weekOfDays.push(day);
        // 일주일 채우면 dates배열에 넣고 초기화
        if (weekOfDays.length === 7) {
          dateArray.push(weekOfDays);
          weekOfDays = [];
        }
        day++;
      }
      // console.log(dateArray)
      // 이번 달 monthLastDated 이후에 남은 날짜처리
      const len = weekOfDays.length;
      if (len > 0 && len < 7) {
        // 남은 날짜가 있으면
        for (let j = 1; j <= 7 - len; j++) {
          weekOfDays.push(j);
        }
      }
      if (weekOfDays.length > 0) {
        dateArray.push(weekOfDays);
      }
      this.nextMonthStart = weekOfDays[0];
      return dateArray;
    },
    dayHandler(day, idx) {
      let clickedMonth = this.currentMonth;
      let clickedYear = this.currentYear;
      if (idx === 0 && day > 20) {
        clickedMonth -= 1;
      }
      if (clickedMonth === 0) {
        clickedMonth = 12;
        clickedYear -= 1;
      }
      console.log(clickedYear, clickedMonth, day);
    },
  },
};
</script>

<style scoped>
.light-grey-text {
  color: red;
}
.grey-text {
  color: blue;
}

.primary-color {
  color: yellow;
}
</style>
