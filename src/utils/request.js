/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'

// axios.create 复制了一个axios，不同的axios实例可以有不同的配置 不会相互冲突
// const request1 = axios.create()
// request1.defaults.baseURL = 'http://127.0.0.1:8080'
// const request2 = axios.create()
// request2.defaults.baseURL = 'www.baidu.com'

// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基础路径

  // 定义后端返回的原始数据的处理 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [function (data) {
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }
  }]
})

// 请求拦截器 因为我们创建了一个axios实例 request 如果直接用axios的话，就用axios.intercepter
request.interceptors.request.use(
  // config是当前请求相关的配置信息对象 并且可以修改
  function (config) {
  // 所有请求会经过这里
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  }, function (error) {
  // 请求失败 会经过这里
    return Promise.reject(error)
  })

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

/*
1.JSON.parse(“要转换的数组”) 。

2.JSON.stringify(“要转化的数组”)。

3.首先，两个方法的用法是有差别的。

①.JSON.stringify是从一个对象中解析出字符串。

②.JSON.parse是从一个字符串中解析出json(键值对)
*/
