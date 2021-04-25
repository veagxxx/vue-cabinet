<template>
  <el-dropdown>
    <el-button type="success" size="small">
      {{$t('main.export')}}Excel<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="exportSelected2Excel">
        {{$t('main.exportSelected')}}
      </el-dropdown-item>
      <el-dropdown-item @click.native="exportCurrentPage2Excel">
        {{$t('main.exportCurrentPage')}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// 导入 excel 的方法模块
import {export_json_to_excel} from "@/excel/Export2Excel.js"
export default {
  props: ['selectedUsers', 'userList'],
  data() {
    return {
      
    }
  },
  methods: {
    // 导出选中
    exportSelected2Excel() {
      // console.log(this.selectedUsers);
      if (this.selectedUsers.length === 0) {
        return this.$message({
          type: 'info',
          message: '未选择导出项'
        });
      }
      let tHeader = [
        '用户ID', '用户名', '密码', '手机号', '头像', '性别', '邮箱', '年龄', '注册时间', '权限', '状态', '订单总数'
      ];
      // 
      let filterVal = [
        'id', 'username', 'password', 'phone', 'avatar', 'gender', 'email', 'age', 'registerTime', 'isAdmin', 'blacklist', 'totalCount'
      ];
      // 导出的数据
      let data = this.selectedUsers;
      // 将导出的数据格式化为json
      let users = this.formatJson(filterVal, data);
      const sheetName = '选中的用户';
      // 导出用户
      export_json_to_excel(tHeader, users, sheetName);
    },
    // 导出全部
    exportCurrentPage2Excel() {
      let tHeader = [
        '用户ID', '用户名', '密码', '手机号', '头像', '性别', '邮箱', '年龄', '注册时间', '权限', '状态', '订单总数'
      ];
      // 
      let filterVal = [
        'id', 'username', 'password', 'phone', 'avatar', 'gender', 'email', 'age', 'registerTime', 'isAdmin', 'blacklist', 'totalCount'
      ];
      let data = this.userList;
      let currentPageUsers = this.formatJson(filterVal, data);
      let sheetName = '当前页的用户';
      export_json_to_excel(tHeader, currentPageUsers, sheetName);
    },
    // 格式化 json 数据
    formatJson(filterVal, jsonData) {
      // console.log(jsonData);
      // v[j] 获取 jsonData 每个属性(键)对应的值，返回每个 v 为一个对象, 包含每个键值对
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
  }
}
</script>

<style scoped>

</style>