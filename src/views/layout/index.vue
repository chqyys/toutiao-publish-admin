<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <layout-aside class="aside-menu"></layout-aside>
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">
        <!--子路由出口-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from './components/aside'
export default {
  name: 'LayoutIndex',
  components: { LayoutAside },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
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
    background-color: #B3C0D1;
    color: #333;
  }
  .main{
    background-color: #E9EEF3;
    color: #333;
  }
</style>
