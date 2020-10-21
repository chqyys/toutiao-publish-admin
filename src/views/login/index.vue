<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="form" :model="user">
        <h3>MyAdmin</h3>
        <el-form-item>
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onSubmit"
          >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit')
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  position: fixed;
  display: flex;
  left:0;
  top:0;
  bottom: 0;
  right: 0;
  /*flex-direction属性决定主轴的方向（即项目的排列方向）*/
  flex-direction: column;
  /*justify-content属性定义了项目在主轴上的对齐方式*/
  justify-content: center;
  /*align-items属性定义项目在交叉轴上如何对齐*/
  align-items: center;
  /*背景图像将仅显示一次*/
  background: url('./background.jpg') no-repeat;
  background-size: cover;
  text-align: center;
  .login-form{
    background-color: #fff;
    padding: 50px;
    /*min-width 属性设置元素的最小宽度*/
    min-width: 300px;
    .login-btn{
      /*让按钮的宽度100%*/
      width: 100%;
    }
  }
}
</style>
