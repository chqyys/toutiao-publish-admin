import Vue from 'vue'
import VueRouter from 'vue-router'

// 在vue cli创建的项目中 @表示src
// 它是src目录的路径别名 ，好处是不收当前文件所在目录的影响
import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
