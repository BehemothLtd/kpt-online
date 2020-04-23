import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";

import BoardList from "../components/Boards/List";
import BoardDetail from "../components/Boards/Detail";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
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
