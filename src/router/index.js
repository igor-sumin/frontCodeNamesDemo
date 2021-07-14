import {
  createRouter,
  createWebHistory
} from "vue-router";

import Room from "../components/Room.vue";
import Login from "../components/entry/LoginPage.vue";
import Register from "../components/entry/RegisterPage.vue"

const routes = [{
    path: "/",
    name: "room",
    component: Room,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/registration",
    name: "registration",
    component: Register,
  },
];

const router = createRouter({
  mode: "history",
  base: process.env.BASE_URL,
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  console.log("token = " + token);
  console.log("toname = " + to.name);

  if ((token) && (to.name === "login" || to.name === "registration")) {
    next({
      path: "/",
      params: {
        nextUrl: to.fullPath
      }
    });
  }

  if (!token) {
    next({
      path: "/login",
      params: {
        nextUrl: to.fullPath
      }
    });
  }

  next();
});

export default router;