import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/how_to_play",
      name: "howToPlay",
      component: () => import("@/views/HowToPlayView.vue"),
    },
  ],
});

export default router;
