import {
  createRouter,
  createWebHistory
} from "vue-router";

import Room from "../components/Room.vue";
import Login from "../components/entry/LoginPage.vue";

const routes = [{
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

router.beforeEach((to, from, next) => {
  // // Cамоисполняемая функция, которая сама установит заголовок авторизации, когда существует токен.
  // // Прикрепляем токен к каждому запросу, 
  // // Отдали в файл, который гарантированно будет выполняться каждый раз (например, файл, содержащий маршруты).
  // (function () {
  //   const token = store.getState().session.token;
  //   axios.defaults.headers.common['token'] = token ? token : null;
  // })();

  if (to.matched.some(record => record.path !== "/login")) {
    if (sessionStorage.getItem("token") == null) {
      next({
        path: "/login",
        params: {
          nextUrl: to.fullPath
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;