<template>
  <div class="home-container">
    <el-upload
      action="http://139.196.213.133:9090/file/upload/img"
      :on-preview="handlePreview"
      :on-success="uploadSuccess"
      :file-list="fileList"
      list-type="picture"
      :on-change="changeImg"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      fileList: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handlePreview (file) {
      console.log(file)
    },
    changeImg (file, fileList) {
      console.log(file)
      axios.create({
        url: 'http://139.196.213.133:9090/image/oper/anime',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        data: file.response
      })
    },
    uploadSuccess (response, file, fileList) {
      console.log(response)
    }
  }
}
</script>

<style scoped lang="less"></style>
