<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <layout-aside class="aside-menu"></layout-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="header-style">
        <i class="el-icon-s-fold fold-icon"></i>
        <span>首页</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img :src="user.photo" class="avatar-img">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!--子路由出口-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from './components/aside'
import { getUserProfile } from '../../api/user'

export default {
  name: 'LayoutIndex',
  components: { LayoutAside },
  props: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getInfo()
  },
  mounted () {},
  methods: {
    getInfo () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      }).catch(err => {
        console.log('登录失败', err)
      })
    }
  }
}
</script>

<style scoped lang="less">
  .layout-container{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .aside{
    background-color: #D3DCE6;
    color: #333;
    .aside-menu{
      height: 100%;
    }
  }
  .header{
    /*background-color: #B3C0D1;*/
    border-bottom: 1px solid #ccc;
    color: #333;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .fold-icon{
      width: 20px;
      height: 20px;
    }
  }
  .main{
    background-color: #E9EEF3;
    color: #333;
  }
  .avatar-wrap{
    display: flex;
    align-items: center;
    .avatar-img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
</style>
