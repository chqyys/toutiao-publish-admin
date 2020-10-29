<template>
  <div class="home-container">
    <el-upload
      class="upload-demo"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-success="handleAvatarSuccess"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { aaa } from '@/api/user.js'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      action: 'http://139.196.213.133:9090/file/upload/img',
      fileList: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleRemove (file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview (file) {
      // console.log(file)
    },
    handleAvatarSuccess (response, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(this.imageUrl)
      console.log(response)
      aaa().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
