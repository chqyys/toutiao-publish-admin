<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ?'修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form :rules="formRules" ref="publish_form" :model="article" label-width="60px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
<!--          <el-input type="textarea" v-model=" article.content"></el-input>-->
            <el-tiptap
              height="350"
              :charCounterCount="true"
              :tooltip="true"
              placeholder="请输入内容"
              v-model="article.content"
              :extensions="extensions"
            />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
                v-for="( channel, index ) in channels"
                :label="channel.name"
                :value="channel.id"
                :key="index"
              >
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticles, getArticle, updateArticle } from '../../api/article'
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Image,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Preview,
  CodeBlock,
  Blockquote,
  TextColor,
  Link
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'
import { uploadImage } from '../../api/image'

export default {
  name: 'PublishIndex',
  components: {
  },
  props: {},
  data () {
    return {
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 封面图片的地址
        },
        channel_id: null
      },
      channels: [], // 文章频道列表
      extensions: [
        new Doc(),
        new Text(),
        new TextColor(),
        new Link(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image(
          {
            uploadRequest (file) {
              const fd = new FormData()
              fd.append('image', file)
              return uploadImage(fd).then(res => {
                return res.data.data.url
              })
            }
          }
        ),
        new CodeBlock(),
        new Blockquote(),
        new Preview()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator (rule, value, callback) {
              console.log('content validator')
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      this.$refs.publish_form.validate((valid) => {
        if (!valid) {
          return
        }
        // addArticles(this.article, draft).then(res => {
        //   console.log(res)
        //   this.$message({
        //     message: '发布成功',
        //     type: 'success'
        //   })
        // })
        const articleId = this.$route.query.id
        if (articleId) {
        // 执行修改操作
          updateArticle(articleId, this.article, draft).then(res => {
            console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            // 跳转到内容管理页面
            this.$router.push('/article')
          })
        } else {
          addArticles(this.article, draft).then(res => {
          // 处理响应结果
          // console.log(res)
            this.$message({
              message: `${draft ? '存入草稿' : '发布'}成功`,
              type: 'success'
            })
            // 跳转到内容管理页面
            this.$router.push('/article')
          })
        }
      })
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        console.log(res)
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
