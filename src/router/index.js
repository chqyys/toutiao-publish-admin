import Vue from 'vue'
import VueRouter from 'vue-router'

// 在vue cli创建的项目中 @表示src
// 它是src目录的路径别名 ，好处是不收当前文件所在目录的影响
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    // Named Route 'layout' has a default child route
    // 如果有默认子路由，就不要给父路由起名字了
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        // path为空 会作为默认子路由渲染
        path: '',
        name: 'home',
        component: Home
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
