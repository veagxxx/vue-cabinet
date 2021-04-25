<template>
  <el-dialog class="dialog" title="个人资料" width="60%"
  @close="handleCloseDialog"
  :visible.sync="personalDialog.personalDialog">
    <div class="content">
      <el-form :model="user" :disabled="disabled">
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码：" :label-width="formLabelWidth">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱：" :label-width="formLabelWidth">
          <el-input v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性 别：" :label-width="formLabelWidth">
          <el-radio-group v-model="user.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年 龄：" :label-width="formLabelWidth">
          <el-input v-model="user.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权 限：" :label-width="formLabelWidth">
          <el-radio-group v-model="user.isAdmin">
            <el-radio :label="1">管理员</el-radio>
            <el-radio :label="0">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状 态：" :label-width="formLabelWidth">
          <el-radio-group v-model="user.blacklist">
            <el-radio :label="1">禁用</el-radio>
            <el-radio :label="0">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="footer">
      <el-button size="small" @click="handleCloseDialog">关闭</el-button>
      <el-button type="primary" size="small" @click="disabled = !disabled">
        {{disabled === false ? '取消' : '编辑'}}
      </el-button>
      <el-button type="success" size="small">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['personalDialog'],
  data() {
    return {
      user: {},
      formLabelWidth: '120px',
      disabled: true,
    }
  },
  mounted() {
    this.user = this.$store.state.user;
  },
  methods: {
    handleCloseDialog() {
      // console.log(this.isVisible);
      this.$emit('handleCloseDialog');
    }
  },
  watch: {
    isVisible(val) {
      this.isVisible = val;
      // console.log(this.isVisible);
    }
  }
}
</script>

<style scoped>
  .content {
    text-align: left;
  }
  .dialog>>>.el-dialog__footer {
    text-align: center;
  }
  .dialog>>>.el-input.is-disabled .el-input__inner {
    color: #566655;
  }
  .dialog>>>.el-radio__input.is-disabled+span.el-radio__label {
    color: #566655;
  }
</style>