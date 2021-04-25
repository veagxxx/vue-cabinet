<template>
  <div class="edit-dialog"> 
    <el-dialog :title="$t('main.edit')"
    width="60%"
    :visible.sync="editMsg.editDialogVisible"
    @close="cancelAndClose">
      <el-form :model="currentUser" :label-width="formLabelWidth">
        <el-form-item label="头像：" class="user-avatar">
          <el-upload
            name="avatarFile"
            class="avatar-uploader"
            action="http://localhost:8090/user/avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <!-- <el-avatar :src="this.editMsg.editUser.avatar">点击更换</el-avatar> -->
            <!-- <img :src="this.editMsg.editUser.avatar" class="avatar-img" alt="头像"> -->
            <el-image :src="this.editMsg.editUser.avatar" class="avatar-img" fit="cover"></el-image>
          </el-upload>
        </el-form-item>
         <el-form-item label="用户名：">
          <el-input v-model="currentUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码：">
          <el-input v-model="currentUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="currentUser.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱：">
          <el-input v-model="currentUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性 别：">
          <el-radio-group v-model="currentUser.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年 龄：">
          <el-input v-model="currentUser.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权 限：">
          <el-radio-group v-model="currentUser.isAdmin">
            <el-radio :label="1">管理员</el-radio>
            <el-radio :label="0">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状 态：">
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
      avatar: ''
    }
  },
  beforeUpdate() {
    this.currentUser = this.editMsg.editUser;
    this.avatar = this.editMsg.editUser.avatar;
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
    // 选择头像成功
    handleAvatarSuccess(res, file) {
      this.editMsg.editUser.avatar = res.data;
      // console.log(file);
    },
    // 头像上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
  .user-avatar>>>.el-form-item__content {
    line-height: 0px;
  }
  .avatar-img {
    display: block;
    height: 50px;
    width: 50px;
    border-radius: 25px;
  }
  .edit-dialog .el-avatar {
    font-size: 12px;
  }
  .touxiang>>>.el-form-item__content {
    line-height: 0px;
  }
</style>