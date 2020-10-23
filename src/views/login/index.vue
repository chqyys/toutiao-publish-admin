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
      <el-form
        class="login-form"
        ref="form"
        :model="user"
        :rules="rules"
      >
        <h3>MyAdmin</h3>
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onLogin('user')" :loading="loginloading"
          >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginloading: false, // 登录的loading状态
      rules: { // 表单验证规则配置
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'change' }
        ],
        agree: [
          // 自定义校验规则
          // 校验成功 callback()
          // 校验失败 callback(new Error('错误信息'))
          {
            validator: (rule, value, callback) => {
              if (value === false) {
                callback(new Error('请勾选用户协议'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 表单验证
      /*
      * 1.必须给el-form组件绑定model为表单数据对象user
      * 2.给需要验证的表单项el-form-item 绑定prop属性
      * 注意:prop属性需要指定表单对象中的数据名称
      *
      * 点击登录按钮触发表单验证
      * 1.给el-form设置ref
      * 2.通过ref
      * 3.通过ref获取el-form组件，调用组件的validate进行验证
      *
      * 如何自定义校验
      * */
      console.log(this.$refs.form)
      this.$refs.form.validate((valid) => {
        // validate方法是异步的
        if (!valid) {
          return false
        }
        // 验证通过 请求登录
        this.login()
      })
    },
    login () {
      // 验证通过后，提交登录
      this.loginloading = true

      // 封装接口请求模块
      // 1.因为接口可以重用，并且容易变动
      // 2.建议是把所有的请求都封装成函数然后统一的组织到模块中进行管理
      // 3.这样的好处就是 管理维护更方便 也好重用
      login(this.user).then(res => {
        console.log(res)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭 loading
        this.loginloading = false

        // 跳转到首页,两种方式都可以
        this.$router.push('/')
        // this.$router.push({
        //   name: 'home'
        // })
      }).catch(err => {
        this.loginloading = false
        console.log('登录失败', err)
        this.$message.error('登录失败')
      })

      // 关闭 loading
      this.loginloading = false
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
