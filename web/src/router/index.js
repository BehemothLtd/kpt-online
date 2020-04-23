import Vue from "vue";
import Router from "vue-router";
import Dasboard from "@/components/Dasboard";
import Login from "@/components/Login";

import BoardList from "../components/Boards/List";
import BoardDetail from "../components/Boards/Detail";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Dasboard",
      component: Dasboard
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/board",
      name: "BoardList",
      component: BoardList,
    },
    {
      path: "/board/:id",
      name: "BoardDetail",
      component: BoardDetail,
    },
  ]
});
