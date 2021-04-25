<template>
  <div class="header">
    <div class="sys-title">
      <i class="el-icon-platform-eleme"></i>
      <!-- elementUI 国际化使用语法 $t('语言包对象属性') -->
      <span>{{$t('header.systemName')}}</span>
      <i id="collapse" 
      @click="collapse"
      :class="isCollapse === false ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>
    <div class="header-right">
      <div class="language">
        <el-dropdown @command="handleLanguage" trigger="click">
          <span class="el-dropdown-link">
            {{$t('header.language')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="msg-bell">
        <el-badge is-dot class="item">
          <i class="el-icon-bell head-news-icon" 
          @mouseover.self="dropShowBtn" @mouseout="dropShow = false"></i>
        </el-badge>
      </div>
      <div class="header-right-dropdown" @mouseover="dropdownBtn" @mouseout="dropShow = false">
        <el-collapse-transition>
          <Dropdown v-show="dropShow"></Dropdown>
        </el-collapse-transition>
      </div>
      <div class="sys-admin-msg">
        <el-dropdown @command="handleCommand">
          <div class="avatar-name">
            <el-avatar :src="$store.state.user.avatar"></el-avatar>
            <span class="el-dropdown-link">
              {{$t('header.loginName')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="person">
              <i class="el-icon-s-promotion"></i>{{$t('header.person')}}
            </el-dropdown-item>
            <el-dropdown-item command="logout">
              <i class="el-icon-switch-button"></i>{{$t('header.logout')}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <PersonalDialog 
    :personalDialog="{personalDialog}" 
    @handleCloseDialog="handleCloseDialog">
    </PersonalDialog>
  </div>
</template>

<script>
import Dropdown from '@/components/index/Dropdown.vue';
import PersonalDialog from './PersonalDialog.vue';
export default {
  components: {Dropdown, PersonalDialog},
  props: ['isCollapse'],
  data() {
    return {
      message: 2,
      dropShow: false,
      personalDialog: false,
    }
  },
  mounted() {

  },
  methods: {
    // 登出
    logout() {
      this.$store.state.token = '';
      this.$store.state.user = {};
      this.$store.state.order = {};
      this.$store.state.cabinetInfo = {};
      this.$store.state.loginTime = '';
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('order');
      sessionStorage.removeItem('cabinetInfo');
      sessionStorage.removeItem('loginTime');
      this.$router.push("/login");
    },
    // 个人资料
    displayPersonalMsg() {
      this.personalDialog = true;
    },
    // 处理下拉菜单
    handleCommand(value) {
      // console.log(typeof value);
      if (value === 'logout') {
        this.logout();
      }
      if (value === 'person') {
        // console.log(value);
        this.displayPersonalMsg();
      }
    },
    handleCloseDialog() {
      this.personalDialog = false;
    },
    // 处理语言选择
    handleLanguage(value) {
      // console.log(value);
      sessionStorage.setItem('language', value);
      this.$i18n.locale = sessionStorage.getItem('language');
    },
    // 折叠侧边导航
    collapse() {
      this.$emit('collapse');
    },
    // 打开下拉菜单
    dropShowBtn() {
      this.dropShow = true;
    },
    // 关闭下拉
    dropHideBtn() {
      this.dropShow = false;
    },
    dropdownBtn() {
      this.dropShow = true;
    }
  }
}
</script>

<style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .sys-title {
    display: flex;
  }
  .sys-title span{
    /* vertical-align: middle; */
    line-height: 30px;
    font-size: 20px;
  }
  .el-icon-platform-eleme {
    font-size: 30px;
    vertical-align: middle;
  }
  #collapse {
    font-size: 30px;
    vertical-align: middle;
    margin-left: 20px;
    cursor: pointer;
  }
  .header-right {
    height: 100%;
    /* background: orchid; */
    display: flex;
    justify-content: space-around;
  }
  .language {
    display: flex;
    align-items: center;
     margin-right: 30px;
     cursor: pointer;
    position: relative;
  }
  .language span {
    font-size: 16px;
    color: #999;
  }
  .msg-bell {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 30px;
    font-size: 22px;
    cursor: pointer;
    position: relative;
  }
  .header-right-dropdown{
    width: 300px;
    height: auto;
    position: absolute;
    right: 100px;
    top: 60px;
    z-index: 2;
    background: #ffffff;
    /* padding: 5px 0; */
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    overflow: hidden;
  }
  .el-header .el-dropdown {
    color: inherit;
  }
  .sys-admin-msg {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .el-avatar {
    vertical-align: middle;
  }
  .avatar-name span {
    font-size: 16px;
  }
</style>