<template>
  <div class="edit-dialog"> 
    <el-dialog :title="$t('main.edit')"
    width="60%"
    :visible.sync="editMsg.editDialogVisible"
    @close="cancelAndClose">
      <el-form :model="currentUser">
         <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="currentUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码：" :label-width="formLabelWidth">
          <el-input v-model="currentUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model="currentUser.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱：" :label-width="formLabelWidth">
          <el-input v-model="currentUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性 别：" :label-width="formLabelWidth">
          <el-radio-group v-model="currentUser.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年 龄：" :label-width="formLabelWidth">
          <el-input v-model="currentUser.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权 限：" :label-width="formLabelWidth">
          <el-radio-group v-model="currentUser.isAdmin">
            <el-radio :label="1">管理员</el-radio>
            <el-radio :label="0">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状 态：" :label-width="formLabelWidth">
          <el-radio-group v-model="currentUser.blacklist">
            <el-radio :label="1">禁用</el-radio>
            <el-radio :label="0">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAndClose" size="small">{{$t('main.cancel')}}</el-button>
        <el-button 
        v-loading="loading"
        element-loading-text="提交中.."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        type="primary" @click="submitEditAndClose" size="small">{{$t('main.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['editMsg'],
  data() {
    return {
      currentUser: {},
      formLabelWidth: '120px',
      loading: false,
    }
  },
  beforeUpdate() {
    this.currentUser = this.editMsg.editUser;
    // console.log(this.currentUser);
  },
  created() {
    
  },
  methods: {
    cancelAndClose() {
      // 向父组件发送事件取消和关闭编辑弹框
      this.$emit('cancelAndClose')
    },
    // 提交修改
    submitEditAndClose() {
      console.log(this.currentUser);
      this.loading = true;
      this.$http.put('/user/update', this.currentUser).then((result) => {
        console.log(result);
        if (result.code === 200) {
          setTimeout(() => {
            this.loading = false;
            this.$emit('submitEditAndClose');
          }, 500);
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        } else {
          this.$message({
            type: 'error',
            message: '修改失败',
          });
        }
      }).catch((err) => {
        return err;
      });
    },
  }
}
</script>

<style scoped>
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  .touxiang>>>.el-form-item__content {
    line-height: 0px;
  }
</style>