import Vue from 'vue'
import VueRouter from 'vue-router'

// 在vue cli创建的项目中 @表示src
// 它是src目录的路径别名 ，好处是不收当前文件所在目录的影响
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'
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
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 路由导航守卫 所有页面的导航都会经过这里
// 守卫页面的导航的
// to 要去的路由页面信息
// from来自哪里的路由信息
// next 放行方法

router.beforeEach((to, from, next) => {
  // 如果访问的页面不是login页面 校验登录状态
  // 如果 没有登录 则跳转到登录页面
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (to.path !== '/login') {
    if (user) {
      // 已登录 允许通过
      next()
    } else {
      // 没有登录 跳转到登录页面
      next('/login')
    }
  } else {
    // 允许通过
    next()
  }
})
export default router
