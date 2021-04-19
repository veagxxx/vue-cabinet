<template>
  <div class="home">
    <el-container>
      <el-header :style="{backgroundColor: isUsingSetting.headerBgc, 
      color: isUsingSetting.headerFontColor}">
        <Header :isCollapse="isCollapse" @collapse="collapse"></Header>
      </el-header>
      <el-container>
        <!-- 侧边导航 -->
        <el-aside 
        :width="isCollapse === false ? '200px' : '64px'" 
        :style="{backgroundColor: isUsingSetting.sideBgc}">
          <el-scrollbar style="height:100%">
            <Aside :sideMenu="isUsingSetting" :isCollapse="isCollapse"></Aside>
          </el-scrollbar>
        </el-aside>
        <!-- 主体内容 -->
        <el-main>
          <el-scrollbar style="height:100%">
             <!-- <router-view v-if="isRouterAlive"></router-view> -->
              <transition name="el-zoom-in-top">
                <router-view></router-view>
              </transition>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/Aside.vue';
import Header from '@/components/Header.vue'
// import Dropdown from '@/components/index/Dropdown.vue' 
export default {
  components: { Aside, Header },
  name: 'Home',
  data() {
    return {
      isCollapse: false,
      loginData: {},
      // 刷新页面属性
      isRouterAlive: true,
      isUsingSetting: {},
    }
  },
  created() {
    this.loginData = this.$store.state.user;
  },
  mounted() {
    this.queryIsUsingSetting();
  },
  methods: {
    queryIsUsingSetting() {
      this.$http.get("/setting/one").then((result) => {
        // console.log(result);
        this.isUsingSetting = result.data;
      }).catch((err) => {
        return err;
      });
    },
    // 展开或折叠
    collapse() {
      this.isCollapse = !this.isCollapse;
    },
  }
}
</script>

<style scoped>
  #home {
    height: 100%;
  }
  .el-header {
    /* background-color: #ffffff; */
    /* color: #333333; */
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-aside {
    /* background-color:#24252e; */
    color: #fff;
    line-height: 200px;
    overflow-x: hidden;
  }
  .el-aside .el-menu {
    border-right: none;   /* 解决子菜单突出1px问题 */
  }
  .el-main {
    background-color: #eaedf1;
    color: #333;
    /* height: 100%; */
    padding: 5px;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-scrollbar__bar.is-horizontal {
    width: 0;
  }
</style>
