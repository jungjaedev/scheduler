import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/calendar",
    },
    {
      path: "/calendar",
      component: () => import("@/views/CalendarPage.vue"),
    },
  ],
});

export default router;
