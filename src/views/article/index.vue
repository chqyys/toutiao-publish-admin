<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :inline="true" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
              v-for="( channel, index ) in channels"
              :label="channel.name"
              :value="channel.id"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticle(1)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{totalCount}} 条结果：
      </div>
      <!-- 数据列表 -->
      <!--
  Table 表格组件
  1、把需要展示的数组列表数据绑定给 table 组件的 data 属性
    注意：你不用去 v-for 遍历，它自己会遍历
  2、设计表格列 el-table-column
    width 可以设定表格列的宽度
    label 可以设定列的标题
    prop  用来设定要渲染的列表项数据字段，只能展示文本

  3、表格列默认只能渲染普通文本，如果需要展示其它内容，例如放个按钮啊、放个图片啊，那就需要自定义表格列模板了
  ：https://element.eleme.cn/#/zh-CN/component/table#zi-ding-yi-lie-mo-ban
 -->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
<!--        <el-table-column type="selection" width="55" />-->
        <el-table-column
          prop="title"
          label="文章标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cover"
          label="文章封面">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover.images[0]"
              :preview-src-list="[scope.row.cover.images[0]]"
              fit="contain"
              lazy
              class="article-cover">
              <div slot="error">
                <i class="el-icon-document" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布日期">
        </el-table-column>
        <el-table-column
          label="发布状态">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据，那么就在 template 上声明 slot-scope="scope"
          scope.row当前遍历项对象-->
          <template slot-scope="scope">
            <el-tag  :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
            <el-button class="el-button el-button--primary"
              size="mini"
              >
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button class="el-button el-button--danger"
              size="mini"
              type="danger"
              >
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        @current-change="onCurrentChange"
        :total="totalCount"
        :page-size="pageSize"
      >
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticle, getArticleChannels } from '../../api/article'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      totalCount: 0, // 总数据条数
      pageSize: 10, // 每页数据大小
      status: null, // 查询文章的状态
      channels: [], // 文章频道列表
      channelId: null, // 查询文章的频道
      rangeDate: null // 筛选的范围时间
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
    this.loadChannels()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticle (page = 1) {
      getArticle({
        page: page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止时间
      }).then(res => {
        console.log(res)
        // this.articles = res.data.data.results,
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onCurrentChange (page) {
      this.loadArticle(page)
      console.log(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style scoped lang="less">
  .filter-card {
    margin-bottom: 30px;
  }

  .list-table {
    margin-bottom: 20px;
    text-align: center;
  }
  .article-cover{
    display: inline-block;
    text-align: center;
    background: #ccc;
    color: #fff;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 25px;
  }
</style>
