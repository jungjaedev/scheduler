import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VCalendar from "v-calendar";
import "v-calendar/dist/style.css";

createApp(App).use(store).use(router).use(VCalendar).mount("#app");
