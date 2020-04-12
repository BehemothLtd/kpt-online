import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Board from '@/components/Board'
import BoardList from '@/components/BoardList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
