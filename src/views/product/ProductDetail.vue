<template>
  <div class="pro-detail">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <el-divider></el-divider>
    <div class="cabinet-status">
      <span>取餐柜状态：</span>
      <el-switch
        v-model="switchValue"
        active-text="启用"
        inactive-text="禁用"
        :disabled="true"
        @click.native="switchChange">
      </el-switch>
    </div>
    <el-divider>取餐柜使用情况</el-divider>
    <el-row :gutter="20">
      <el-col v-for="(item, i) in cabinetWithOrder.cabinetSize" :key="i">
        <el-card>
          <span>{{item+"号箱"}}</span>
          <div class="usage">
            <el-tag :type="isEmpty(item) === '使用中' ? 'success' : 'info'">
              {{isEmpty(item) === "使用中" ? isEmpty(item) : "空的"}}
            </el-tag>
            <el-tag v-show="isEmpty(item) === '使用中'"
            :type="getMode(item) === '正常模式' ? 'info' : 
            (getMode(item) === '制热' ? 'danger' : 'primary')">
              {{getMode(item)}}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cabinetId: '',
      cabinetWithOrder: {},
      modeName: '',
      switchValue: true,
    }
  },
  created() {
    this.cabinetId = this.$route.params.id;
  },
  mounted() {
    this.getCabinetInfoById();
  },
  methods: {
    goBack() {
      this.$router.push("/pro-management");
    },
    // 根据cabinetId查询取餐柜信息
    getCabinetInfoById() {
      this.$http.get('/cabinet/one/' + this.cabinetId).then((result) => {
        // console.log(result);
        this.cabinetWithOrder = result;
      }).catch((err) => {
        return err;
      });
    },
    // 取餐柜的禁用/启用操作
    switchChange() {
        // 禁用操作
      this.$messageBox({
        title: '提示',
        message: '你确定要禁用该取餐柜吗？',
        showCancelButton: true,
        confirmButtonText: '禁用',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '禁用中...';
            setTimeout(() => {
              done(); // 关闭弹框
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 1000);
          } else {
            done();
          }
        }
      }).then(() => {   // 点击确定按钮
        let changeData = {
          cabinetId: this.cabinetId,
          cabinetStatus: 0,
        };
        this.$http.put('/cabinet/update', changeData).then((result) => {
          console.log(result);
          this.switchValue = !this.switchValue;
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '禁用成功'
            });
            this.$router.push("/pro-management");
          }
        }).catch((err) => {
          return err;
        });
      }).catch((err) => {
        return err;
      });
    },
    // 判断取餐柜的各个箱是否为空
    isEmpty(item) {
      for (let index = 0; index < this.cabinetWithOrder.orders.length; index++) {
        if (item === this.cabinetWithOrder.orders[index].orderCabinetNumber) {
          return "使用中";
        }
      }
    },
    // 获取使用中箱子的模式
    getMode(item) {
      for (let index = 0; index < this.cabinetWithOrder.orders.length; index++) {
        if (item === this.cabinetWithOrder.orders[index].orderCabinetNumber) {
          return this.cabinetWithOrder.orders[index].cabinetMode.modeName;
        }
      }
    }
  }
}
</script>

<style scoped>
  .pro-detail {
    padding: 20px;
  }
  .el-row {
    margin-top: 30px;
    width: 100%;
    display: flex;
    align-content: flex-start;
    flex-flow: row wrap;
  }
  .el-col {
    flex: 0 0 25%;
    margin-bottom: 20px;
  }
  .usage {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  /* 改变switch disabled 样式 */
  .el-switch.is-disabled {
      opacity: 1;
  }
  .cabinet-status>>>.el-switch.is-disabled .el-switch__core, .el-switch.is-disabled .el-switch__label {
      cursor: pointer!important;
  }
</style>