<template>
  <div class="user-management">
    <el-card>
      <div class="page-head" fixed="top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户模块</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <el-row :gutter="20" class="table-top">
        <el-col :span="12">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
            :current-page="queryInfo.pageNum"
            :page-sizes="[1, 5, 10, 12]"
            :page-size="queryInfo.pageSize"
            :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalFlag===false?total:userList.length">
          </el-pagination>
        </el-col>
        <el-col :span="8" class="search">
          <el-input size="small" v-model="queryInfo.keywords" placeholder="请输入内容" class="input-with-select" clearable @clear="handleClear()">
            <el-button @click="searchBykeywords(queryInfo.keywords)" slot="append" icon="el-icon-search"></el-button>
          </el-input>   
        </el-col>
        <el-col :span="4" class="export">
          <Export2Excel :selectedUsers="selectedUsers" :userList="userList"></Export2Excel>
        </el-col>
      </el-row>
      <el-table border :data="userList" 
      v-loading="loading" 
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column align="center" label="头像" prop="avatar">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名" prop="username"></el-table-column>
        <el-table-column align="center" label="手机号" prop="phone"></el-table-column>
        <el-table-column align="center" label="邮箱" prop="email"></el-table-column>
        <el-table-column align="center" label="性别" prop="gender">
          <template slot-scope="scope">
            <el-tag :type="scope.row.gender === 1 ? 'primary' : 'danger'">
              {{scope.row.gender === 1?'男':'女'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册时间" prop="registerTime">
          <template slot-scope="scope">
            {{scope.row.registerTime | DateFormat}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="权限" prop="isAdmin">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isAdmin === 1 ? 'success' : 'plain'">
              {{scope.row.isAdmin === 1?'管理员':'普通用户'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" prop="blacklist">
          <template slot-scope="scope">
            <el-tag :type="scope.row.blacklist === 1?'danger':'success'">
              {{scope.row.blacklist === 1 ? '禁用' : '启用'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单总数" prop="totalCount"></el-table-column>
        <el-table-column align="center" label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" 
            icon="el-icon-edit"
            @click="openEditDialog(scope.row)">{{$t('main.edit')}}</el-button>
            <el-button size="mini" type="danger" 
            icon="el-icon-delete"
            @click="deleteUserById(scope.row.id)">{{$t('main.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 引入编辑对话框子组件 :editMsg 向子组件传入数据 @cancelAndClose 接收子组件发送的事件并绑定到方法中 -->
    <EditUserDialog :editMsg="{editDialogVisible, editUser}" 
    @cancelAndClose="cancelAndClose"
    @submitEditAndClose="submitEditAndClose">
    </EditUserDialog>
  </div>
</template>

<script>
import EditUserDialog from '@/components/user/EditUserDialog.vue';
import Export2Excel from '@/components/user/Export2Excel.vue';
export default {
  components: {EditUserDialog, Export2Excel},
  data() {
    return {
      userList: [],
      total: 0,
      totalFlag: false,
      // 查询信息
      queryInfo: {
        keywords: '',
        pageNum: 1,
        pageSize: 5,
      },
      loading: false,
      // 编辑用户弹框
      editDialogVisible: false,
      // 编辑的用户
      editUser: {},
      // 选中用户数组
      selectedUsers: [],
    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    // 获取所有用户
    getAllUsers() {
      this.loading = true;
      this.$http.get('/user/list', {params: this.queryInfo}).then((result) => {
        // console.log(result);
        this.userList = result.list;
        this.total = result.total;
        this.loading = false;
      }).catch((err) => {
        return err;
      });
    },
    // 每页条数
    handleSizeChange(value) {
      this.queryInfo.pageSize = value;
      this.getAllUsers();
    },
    // 修改当前页数
    handlePageChange(value) {
      this.queryInfo.pageNum = value;
      this.getAllUsers();
    },
    // 搜索输入框清除事件
    handleClear() {
      this.getAllUsers();
      this.totalFlag = !this.totalFlag;
    },
    // 根据 keywords 搜索
    searchBykeywords(keywords) {
      this.keywords = keywords;
      this.getAllUsers();
      if (this.queryInfo.keywords !== '') {
        this.totalFlag = !this.totalFlag;
      }
    },
    // 打开编辑用户对话框
    openEditDialog(currentUser) {
      // console.log(currentUser);
      this.editUser = currentUser;
      this.editDialogVisible = true;
    },
    // 关闭编辑弹框
    cancelAndClose() {
      this.editDialogVisible = false;
    },
    // 关闭编辑弹框
    submitEditAndClose() {
      this.editDialogVisible = false;
    },
    // 根据 id 删除用户
    deleteUserById(id) {
      // console.log(id);
      this.$messageBox({
        type: 'warning',
        title: '删除提示',
        message: '此操作的同时会删除与用户关联的所有数据，你确定删除该用户吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonText = '删除中...';
            instance.confirmButtonLoading = true;
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 800);
          } else {
            done();
          }
        }
      }).then(() => {
        this.$http.del('/user/delete/' + id).then((result) => {
        // console.log(result);
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: result.message,
          });
          this.getAllUsers();
        } else {
          this.$message({
            type: 'error',
            message: result.message,
          });
        }
      }).catch((err) => {
        return err;
      });
      }).catch(() => {
        return;
      });
    },
    // 拉黑或者撤回
    blackOrCancel(user) {
      if (user.isAdmin === 1) {
        return this.$message({
          type: 'warning',
          message: '该用户为管理员，不可操作'
        });
      }
      if (user.blacklist === 0) {
        this.submitBlacklistOrCancel('拉黑', {id: user.id, blacklist: 1});
      } else {
        this.submitBlacklistOrCancel('撤回', {id: user.id, blacklist: 0});
      }
    },
    // 提交拉黑或撤回请求
    submitBlacklistOrCancel(text, user) {
      this.$messageBox({
        type: 'warning',
        message: `你确定要${text}该用户吗?`,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonText = `${text}中...`;
            instance.confirmButtonLoading = true;
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 800)
          } else {
            done();
          }
        }
      }).then(() => {
        this.$http.put('/user/update', user).then((result) => {
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: result.message,
            });
            this.getAllUsers();
          } else {
            this.$message({
              type: 'error',
              message: result.message,
            });
          }
        }).catch((err) => {
          return err;
        });
      }).catch((err) => {
        return err;
      });
    },
    // 获取表格选中的数据
    handleSelectionChange(value) {
      // console.log(value);
      this.selectedUsers = value;
    }
  },
  computed: {
    
  }
}
</script>

<style scoped>
  .el-breadcrumb {
    line-height: unset;
  }
  .page-head {
    display: flex;
    justify-content: space-between;
  }
  .el-table {
    margin-top: 10px;
  }
  .el-pagination {
    display: flex;
    justify-content: flex-start;
  }
  .export {
    width: unset;
    float: right;
  }
  .addbtn {
    display: flex;
    justify-content: flex-end;
  }
  .el-collapse {
    border-bottom: none;
    border-top: none;
  }
  .el-radio:last-child {
    margin-right: 30px;
  }
  .el-radio-group{
    display: block;
  }
</style>