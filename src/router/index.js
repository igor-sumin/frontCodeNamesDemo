import Vue from "vue"
import Router from "vue-router"

import Dashboard from "../components/Dashboard.vue"
import Login from "../components/entry/LoginPage.vue"
import Register from "../components/entry/RegisterPage.vue"
import Forgot from "../components/entry/Forgot.vue"
import Room from "../components/params/RoomPage.vue"
import Role from "../components/params/RolePage.vue"

Vue.use(Router)

const routes = [{
    path: "/",
    name: "dashboard",
    component: Dashboard,
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
  {
    path: "/forgot",
    name: "forgot",
    component: Forgot,
  },
  {
    path: "/room",
    name: "room",
    component: Room,
  },
  {
    path: "/role",
    name: "role",
    component: Role,
  },
];

const router = new Router({
  routes: routes,
  mode: "history",
  base: process.env.BASE_URL,
});

export default router;