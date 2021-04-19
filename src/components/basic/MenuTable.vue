<template>
  <div class="menu-table">
    <span><i class="el-icon-setting"></i>菜单列表</span>
    <el-table :data="menuList"
              style="width: 100%;margin-top:15px"
              row-key="id"
              border
              lazy
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column align="center" prop="menuName" label="菜单名"></el-table-column>
      <el-table-column align="center" prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isShow" label="是否显示">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isShow"></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="移动">
        <template slot-scope="scope">
          <el-button type="default" size="mini" icon="el-icon-share" >转移目录</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="test">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {id: 1, menuName: '首页', icon: 'el-icon-s-home', isShow: true},
        {
          id: 2, menuName: '业务统计', icon: 'el-icon-s-data', isShow: true,
          children: [
            {id: 21, menuName: '数据图表', icon: 'el-icon-pie-chart', isShow: true}
          ]
        },
        {
          id: 3, menuName: '用户模块', icon: 'el-icon-s-custom', isShow: true,
          children: [
            {id: 31, menuName: '用户管理', icon: 'el-icon-s-custom', isShow: true},
            {id: 32, menuName: '用户添加', icon: 'el-icon-circle-plus', isShow: true},
          ]
        },
        {
          id: 4, menuName: '订单模块', icon: 'el-icon-notebook-2', isShow: true,
          children: [
            {id: 41, menuName: '订单管理', icon: 'el-icon-notebook-1', isShow: true},
            {id: 42, menuName: '订单设置', icon: 'el-icon-s-promotion', isShow: true},
          ]
        },
        {
          id: 5, menuName: '产品模块', icon: 'el-icon-coin', isShow: true,
          children: [
            {id: 51, menuName: '产品管理', icon: 'el-icon-s-home', isShow: true},
          ]
        },
        {
          id: 6, menuName: '系统设置', icon: 'el-icon-s-tools', isShow: true,
          children: [
            {id: 61, menuName: '基础设置', icon: 'el-icon-setting', isShow: true},
          ]
        },
      ],
    }
  },
  mounted() {

  },
  methods: {
    test() {
      
    }
  }
}
</script>

<style>

</style>