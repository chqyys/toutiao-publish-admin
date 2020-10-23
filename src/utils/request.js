/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

// axios.create 复制了一个axios，不同的axios实例可以有不同的配置 不会相互冲突
// const request1 = axios.create()
// request1.defaults.baseURL = 'http://127.0.0.1:8080'
// const request2 = axios.create()
// request2.defaults.baseURL = 'www.baidu.com'

// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
