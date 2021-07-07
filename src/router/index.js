import { createRouter, createWebHistory } from "vue-router";

import Room from "../components/Room.vue";
import Login from "../components/entry/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "Room",
    component: Room,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  mode: "history",
  base: process.env.BASE_URL,
  history: createWebHistory(),
  routes: routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.path !== "/login")) {
//     if (sessionStorage.getItem("token") == null) {
//       next({
//         path: "/login",
//         params: { nextUrl: to.fullPath },
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
