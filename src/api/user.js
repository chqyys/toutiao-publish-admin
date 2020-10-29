/*
* 封装用户相关请求模块
* */
import axios from 'axios'
import request from '@/utils/request'
// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data: data
  })
}

export const getUserProfile = () => {
  // 将json字符串还原回对象
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端要求吧需要的用户身份放到请求头中
    // 属性名 Authorization
    // axios通过headers 选项设置而请求头
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}

export const aaa = () => {
  return axios.create({
    method: 'POST',
    url: '139.196.213.133:9090/image/oper/anime'
  })
}
