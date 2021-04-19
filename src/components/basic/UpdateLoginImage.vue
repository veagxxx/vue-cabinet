<template>
  <div class="update-img-dialog">
    <el-dialog title="修改登录背景图" width="60%" 
    @close="cancelAndClose"
    :visible.sync="updateInfo.updateDialog">
      <span class="note">注：背景图为单独修改</span>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:8090/setting/updateBgImage"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :limit="1"
        list-type="picture-card"
        :multiple="false"
        :auto-upload="false"
        :data="{id: updateInfo.updateMsg.id}"
        accept=".jpg,.png,.jpeg">
        <el-button slot="trigger" type="text">选择一张图片</el-button>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAndClose" size="small">取 消</el-button>
        <el-button type="success" @click="submitUpload" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['updateInfo'],
  data() {
    return {
      
    }
  },
  mounted() {
    // console.log(this.updateInfo);
  },
  methods: {
    // 保存
    submitUpload() {
      this.$refs.upload.submit();
    },
    cancelAndClose() {
      this.$emit('cancelUpdate');
    },
    // 移除的回调
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 成功的回调
    handleSuccess(res) {
      console.log(res);
      if (res.code === 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        this.$emit('handleSuccess');
      } else {
        this.$message({
          type: 'error',
          message: res.message
        });
      }
      this.$refs.upload.clearFiles();
    },
  }
}
</script>

<style scoped>
  .upload-demo {
    margin-top: 10px;
  }
</style>