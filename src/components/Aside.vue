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
      <span>{{$t('aside.index')}}</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">               
        <i class="el-icon-s-data"></i>
        <span slot="title">{{$t('aside.statistics.title')}}</span>
      </template>           
      <el-menu-item index="/charts">
        <template>
          <i class="el-icon-pie-chart"></i>
          <span>{{$t('aside.statistics.chart')}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- 用户模块 -->
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span slot="title">{{$t('aside.userModular.title')}}</span>
      </template>
      <el-menu-item index="/user-management">
        <template>
          <i class="el-icon-s-custom"></i>
          <span>{{$t('aside.userModular.management')}}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/user-add">
        <template>
          <i class="el-icon-circle-plus"></i>
          <span>{{$t('aside.userModular.add')}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- 订单模块 -->
    <el-submenu index="4">
      <template slot="title">               
        <i class="el-icon-notebook-2"></i>
        <span slot="title">{{$t('aside.orderModular.title')}}</span>
      </template>           
      <el-menu-item index="/order-management">
        <template>
          <i class="el-icon-notebook-1"></i>
          <span>{{$t('aside.orderModular.management')}}</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/order-setting">
        <template>
          <i class="el-icon-s-promotion"></i>
          <span>{{$t('aside.orderModular.setting')}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- 产品模块 -->
    <el-submenu index="5">
      <template slot="title">               
        <i class="el-icon-coin"></i>
        <span slot="title">{{$t('aside.productModular.title')}}</span>
      </template>           
      <el-menu-item index="/pro-management">
        <template>
          <i class="el-icon-s-platform"></i>
          <span>{{$t('aside.productModular.management')}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <!-- 基础设置 -->
    <el-submenu index="6">
      <template slot="title">               
        <i class="el-icon-s-tools"></i>
        <span slot="title">{{$t('aside.settingModular.title')}}</span>
      </template>           
      <el-menu-item index="/setting">
        <template>
          <i class="el-icon-setting"></i>
          <span>{{$t('aside.settingModular.base')}}</span>
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