<template>
  <div class="product-page">
    <el-card>
      <div class="page-head">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>产品模块</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider>已启用的取餐柜</el-divider>
      <el-row :gutter="20">
        <el-col :span="5" v-for="item in usingCabinets">
          <el-card>
            <div>
              <span class="position">地点：{{item.cabinetPosition}}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="toDetail(item.cabinetId)">查看详情
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-divider>已禁用的取餐柜</el-divider>
        <div class="not-ban" v-if="banCabinets.length === 0">
          <span>暂无禁用的取餐柜</span>
        </div>
        <el-row v-else :gutter="20">
          <el-col :span="5" v-for="item in banCabinets">
            <el-card>
              <div>
                <span class="position">地点：{{item.cabinetPosition}}</span>
                <div class="bottom clearfix">
                  <el-switch
                    v-model="switchValue"
                    active-text="启用"
                    inactive-text="禁用"
                    :disabled="true"
                    @click.native="switchChange(item.cabinetId)">
                  </el-switch>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-divider>取餐柜模式</el-divider>
        <el-table 
        :data="modes" 
        highlight-current-row
        border>
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column label="模式名称" prop="modeName">
            <template slot-scope="scope">
              <el-tag :type="calcType(scope.row.modeName)">{{scope.row.modeName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="模式状态" prop="modeStatus">
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.modeStatus === 1 ? '正常使用' : '状态异常'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="模式描述" prop="modeDescription"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" plain>{{$t('main.edit')}}</el-button>
              <el-button type="danger" size="small" plain>{{$t('main.delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cabinetInfo: {},
      usingCabinets: [],  // 启用中的取餐柜
      banCabinets: [],  // 禁用中的取餐柜
      switchValue: false,
      modes: []
    }
  },
  mounted() {
    this.getAllCabinet();
  },
  methods: {
    // 获取所有取餐柜信息
    getAllCabinet() {
      this.$http.get('/cabinet/list').then((result) => {
        // console.log(result);
        this.cabinetInfo = result;
        this.modes = result.modes;
        // 获取使用中的取餐柜
        this.usingCabinets = result.cabinets.filter(item => {
          return item.cabinetStatus === 1;
        });
        // 获取禁用的取餐柜
        this.banCabinets = result.cabinets.filter(item => {
          return item.cabinetStatus === 0;
        });
      }).catch((err) => {
        return err;
      });
    },
    calcType(name) {
      if (name === '正常模式') {
        return 'info';
      }
      if (name === '制热') {
        return 'danger';
      }
      if (name === '制冷') {
        return 'primary';
      }
    },
    handleStatusChange(status) {
      // console.log(status);
      status === 1 || 0;
    },
    toDetail(id) {
      this.$store.commit('SET_CABINET_INFO', this.cabinetInfo);
      this.$router.push({path: '/product/detail/' + id});
    },
    // 修改取餐柜状态（启用）
    switchChange(cabinetId) {
      // console.log(cabinetId);
      // 启用操作
      this.$messageBox({
        title: '提示',
        message: '你确定要启用该取餐柜吗？',
        showCancelButton: true,
        confirmButtonText: '启用',
        cancelButtonText: '取消',
        // 弹框关闭之前的操作
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {  // 点击确定按钮
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '启用中...';
            setTimeout(() => {
              done(); // 关闭弹框
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 1000);
          } else {
            done(); // 关闭弹框
          }
        }
      }).then(() => {   // 点击确定按钮
        let changeData = {
          cabinetId: cabinetId,
          cabinetStatus: 1,
        };
        this.$http.put('/cabinet/update', changeData).then((result) => {
          // console.log(result);
          this.switchValue = !this.switchValue;
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '启用成功'
            });
            // 刷新
            this.getAllCabinet();
            // this.$router.push("/pro-management");
          }
        }).catch((err) => {
          return err;
        });
      }).catch((err) => {
        return err;
      });
    },
  }
}
</script>

<style scoped>
  .el-row {
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-flow: row wrap;
  }
  .el-col {
    flex: 0 0 25%;
    margin-bottom: 20px;
  }
  .position {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
  }
  .button {
    float: right;
  }
  .not-ban {
    text-align: center;
    font-size: 16px;
    color: slategrey;
  }
  .clearfix {
    margin-top: 10px;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  /* 改变switch disabled 样式 */
  .el-switch.is-disabled {
      opacity: 1;
  }
  .clearfix>>>.el-switch.is-disabled .el-switch__core, .el-switch.is-disabled .el-switch__label {
      cursor: pointer!important;
  }
</style>