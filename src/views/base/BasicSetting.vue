<template>
  <div class="basic-setting">
    <el-card class="style-setting">
      <div class="page-head" fixed="top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>基础设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <el-tabs v-model="currentTab" type="card" addable @tab-add="handleAddTab">
        <el-tab-pane 
        v-for="(item, index) in settings" 
        :key="item.id" 
        :label="$t('main.setting.plan') + ' ' + parseInt(index + 1)" 
        :name="item.id + ''">
          <el-form :data="item">
            <el-form-item label="侧边导航主题：">
              <div class="block">
                <span class="demonstration">{{item.sideBgc}}</span>
                <el-color-picker v-model="item.sideBgc"></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="侧边导航字体：">
              <div class="block">
                <span class="demonstration">{{item.sideFontColor}}</span>
                <el-color-picker v-model="item.sideFontColor"></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="头部导航主题：">
              <div class="block">
                <span class="demonstration">{{item.headerBgc}}</span>
                <el-color-picker v-model="item.headerBgc"></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="头部导航字体：">
              <div class="block">
                <span class="demonstration">{{item.headerFontColor}}</span>
                <el-color-picker v-model="item.headerFontColor"></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="登录页动画：">
              <el-radio v-model="item.loginAnimation" :label="0">关闭</el-radio>
              <el-radio v-model="item.loginAnimation" :label="1">开启</el-radio>
            </el-form-item>
            <el-form-item label="登录页背景：">
              <div class="login-bg">
                <el-tooltip content="点击放大预览" placement="top-start">
                  <el-image 
                  style="width: 100px; height: 50px" 
                  :src="item.loginBgImage"
                  :preview-src-list="[item.loginBgImage]">
                  </el-image> 
                </el-tooltip>
                <el-button type="text" @click="handleUpdate(item)">修改背景</el-button>
              </div>
            </el-form-item>
            <el-button size="small" type="primary" @click="submitSetting(item)">
              {{$t('main.save')}}
            </el-button>
            <el-button size="small" 
            :disabled="item.isUse === 1 ? true : false"
            :type="item.isUse === 1 ? 'info' : 'success'" 
            plain @click="useItem">
              {{item.isUse === 1 ? $t('main.using') : $t('main.use')}}</el-button>
            <el-button size="small" type="danger">{{$t('main.delete')}}</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 修改背景图对话框 -->
      <UpdateLoginImage 
      :updateInfo="{updateDialog, updateMsg}"
      @cancelUpdate="cancelUpdate"
      @handleSuccess="handleUpdateSuccess">
      </UpdateLoginImage>
      <!-- 添加 -->
      <AddTabDialog 
      :addDialog="addDialog"
      @handleCancelAdd="handleCancelAdd"
      @submitSuccess="submitSuccess">
      </AddTabDialog>
    </el-card>
  </div>
</template>

<script>
import UpdateLoginImage from '@/components/basic/UpdateLoginImage.vue';
import AddTabDialog from '@/components/basic/AddTabDialog.vue';
export default {
  // 注入(获取) App.vue 传递的方法
  inject: ['reload'],
  components: {UpdateLoginImage, AddTabDialog},
  data() {
    return {
      currentTab: '1',
      settings: [],
      updateDialog: false,
      updateMsg: {},
      addDialog: false,
    }
  },
  mounted() {
    this.querySettingInfo();
  },
  methods: {
    querySettingInfo() {
      this.$http.get('/setting/query')
      .then((result) => {
        // console.log(result);  
        this.settings = result.data;
      }).catch((err) => {
        return err;
      });
    },
    // 提交修改
    submitSetting(item) {
      // console.log(item);
      this.$http.put('setting/update', item).then((result) => {
        // console.log(result);
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: result.message
          });
          // 根据获取到的reload方法刷新页面
          this.reload();
        }
      }).catch((err) => {
        return err;
      });
    },
    // 新增方案
    handleAddTab() {
      this.addDialog = true;
    },
    // 修改背景图
    handleUpdate(item) {
      // console.log(item);
      this.updateDialog = true;
      this.updateMsg = item;
    },
    // 取消修改
    cancelUpdate() {
      this.updateDialog = false;
    },  
    // 修改成功
    handleUpdateSuccess() {
      this.updateDialog = false;
      this.reload();
    },
    // 取消添加
    handleCancelAdd() {
      this.addDialog = false;
    },
    // 添加成功
    submitSuccess() {
      this.addDialog = false;
      this.reload();
    },
    // 使用方案
    useItem() {

    }
  },
}
</script>

<style scoped>
  .el-card {
    margin-bottom: 10px;
  }
  .block {
    display: flex;
    align-items: center;
  }
  .demonstration {
    margin-right: 5px;
  }
  .login-bg {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .login-bg .el-image {
    margin-right: 15px;
  }
  .el-tabs>>>.el-tabs__new-tab {
    color: black;
    background-color: chartreuse;
  }
</style>