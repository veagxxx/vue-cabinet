<template>
  <div class="associated-user">
    <div class="content">
      <el-alert
      title="单击选择关联的用户"
      type="success"
      center
      :closable="false"
      show-icon>
    </el-alert>
    <el-table 
      :data="users" border 
      ref="singleTable"
      highlight-current-row 
      height="400"
      @current-change="handleCurrentChange">
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="gender" label="性别" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.gender === 1 ? 'primary' : 'danger'">
              {{scope.row.gender === 1?'男':'女'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isAdmin" label="权限" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isAdmin === 1 ? 'success' : 'plain'">
              {{scope.row.isAdmin === 1?'管理员':'普通用户'}}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="select-btn">
        <el-button @click="setCurrent" size="small">取消选择</el-button>
        <span>选择的用户: 
          <span v-if="user != null">{{user.phone}}</span>
          <span v-else>未选择</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order'],
  data() {
    return {
      users: [],
      user: null
    }
  },
  mounted() {
    this.queryAllUser();
  },
  methods: {
    async queryAllUser() {
      await this.$http.get('/user/users')
      .then((res) => {
        // console.log(res);
        this.users = res.data;
      }).catch((error) => {
        return error;
      });
    },
    // 取消选中
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
      this.order.user.id = null;
      this.user = null;
    },
    // 当前行选中
    handleCurrentChange(val) {
      this.user = val;
      this.order.user.id = val.id;
      this.$emit('setCurrent', val);
    },
  }
}
</script>

<style scoped>
  .associated-user {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .content {
    width: 100%;
  }
  .content .el-alert {
    margin-bottom: 20px;
  }
  .content>>>.el-table__body tr.current-row>td{
    background-color: #69A8EA !important;
    color: #fff;
  }
  .select-btn {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>