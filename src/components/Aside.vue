<template>
  <el-menu 
  :default-active="$route.path"
  :background-color="sideMenu.sideBgc"
  :text-color="sideMenu.sideFontColor" 
  active-text-color="#ffd04b"
  class="el-menu-vertical-demo"
  :collapse="isCollapse"
  :collapse-transition="false"
  :router="true"
  :unique-opened="false">
    <!-- 用户反馈 -->
    <el-menu-item index="/index">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">               
        <i class="el-icon-s-data"></i>
        <span slot="title">业务统计</span>
      </template>           
      <el-menu-item index="/charts">
        <template>
          <i class="el-icon-pie-chart"></i>
          <span>数据图表</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- 用户模块 -->
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户模块</span>
      </template>
      <el-menu-item index="/user-management">
        <template>
          <i class="el-icon-s-custom"></i>
          <span>用户管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/user-add">
        <template>
          <i class="el-icon-circle-plus"></i>
          <span>添加用户</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- 订单模块 -->
    <el-submenu index="4">
      <template slot="title">               
        <i class="el-icon-notebook-2"></i>
        <span slot="title">订单模块</span>
      </template>           
      <el-menu-item index="/order-management">
        <template>
          <i class="el-icon-notebook-1"></i>
          <span>订单管理</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/order-setting">
        <template>
          <i class="el-icon-s-promotion"></i>
          <span>订单设置</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- 产品模块 -->
    <el-submenu index="5">
      <template slot="title">               
        <i class="el-icon-coin"></i>
        <span slot="title">产品模块</span>
      </template>           
      <el-menu-item index="/pro-management">
        <template>
          <i class="el-icon-s-home"></i>
          <span>产品管理</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- 基础设置 -->
    <el-submenu index="6">
      <template slot="title">               
        <i class="el-icon-s-tools"></i>
        <span slot="title">系统设置</span>
      </template>           
      <el-menu-item index="/setting">
        <template>
          <i class="el-icon-setting"></i>
          <span>基础设置</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: ['sideMenu', 'isCollapse'],
  data() {
    return {
      
    }
  },
}
</script>

<style>
</style>