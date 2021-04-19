<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
export default {
  // 父组件中返回要传给下级的数据(方法)
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新页面
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,body,#app,.home,.el-container{
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
  overflow: hidden;
}
/* 隐藏底部横向滚动条 */
.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
 /* 上面隐藏横向滚动条会导致下拉框底部遮盖问题 */
.el-select-dropdown .el-scrollbar {
  padding-bottom: 17px;
}
</style>
