import Vue from 'vue'
import Router from 'vue-router'
import WorkContent from '@/components/WorkContent'
import TestOrder from '@/components/order/TestOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: WorkContent
    },
    {
      path: '/order',
      name: 'WorkContent',
      component: WorkContent
    },
    {
      path: '/testOrder',
      name: 'TestOrder',
      component: TestOrder
    }
  ]
})
