import type { RouterConfig } from "@nuxt/schema"

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions#routes
  routes: (_routes) => [
    {
      name: "home",
      path: "/",
      component: () => import("../app/pages/index.vue"),
    },
    {
      name: "user",
      path: "/user/:id",
      component: () => import("../app/pages/User.vue"),
    },
  ],
} satisfies RouterConfig
