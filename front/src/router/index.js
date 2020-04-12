import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Board from '@/components/Board'
import BoardList from '@/components/BoardList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/board-list',
      name: 'BoardList',
      component: BoardList
    },
    {
      path: '/board/:id',
      name: 'Board',
      component: Board
    }
  ]
})
