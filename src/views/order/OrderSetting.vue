<template>
  <div class="order-classify">
    <el-card>
      <div class="page-head" fixed="top">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单模块</el-breadcrumb-item>
          <el-breadcrumb-item>订单设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <span><i class="el-icon-setting"></i>设置参数</span>
      <div class="setting">
        <el-form :model="orderSettingForm" 
                ref="settingFormRef" 
                label-width="150px" 
                style="width: 60%"
                :rules="settingFormRules">
          <el-form-item label="订单超过" prop="codeDestroyHour">
            <el-input v-model="orderSettingForm.codeDestroyHour" :min="3" class="input-width">
              <template slot="append">小时</template>
            </el-input>
            <span class="note-margin">未取餐，销毁取餐码</span>
          </el-form-item>
          <el-form-item label="距离取餐" prop="distancePickMin">
            <el-input v-model="orderSettingForm.distancePickMin" :min="5" :max="30" class="input-width">
              <template slot="append">分钟</template>
            </el-input>
            <span class="note-margin">发送邮箱提醒取餐</span>
          </el-form-item>
          <!-- <el-form-item label="提醒时间间隔" prop="emailRemindInterval">
            <el-input v-model="orderSettingForm.emailRemindInterval" :min="10" class="input-width">
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item> -->
          <el-form-item label="订单完成超过" prop="autoFivStarsDay">
            <el-input v-model="orderSettingForm.autoFivStarsDay" :min="1" class="input-width">
              <template slot="append">天</template>
            </el-input>
            <span class="note-margin">未评价，自动五星好评</span>
          </el-form-item>
          <el-form-item label="开启取餐提醒">
            <el-radio-group v-model="orderSettingForm.remindPick">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="订单完成提醒">
            <el-radio-group v-model="orderSettingForm.finishRemind">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="handleSubmit('settingFormRef')">
              {{$t('main.confirm')}}
            </el-button>
            <el-button type="default" size="small" @click="handleReturn('settingFormRef')">
              {{$t('main.reset')}}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const checkTime = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('时间不能为空'));
      }
      let numberRegExp = /^\d+$/;
      if (!numberRegExp.test(value)) {
        return callback(new Error('请输入数字值'));
      }
      callback();
    }
    return {
      orderSettingForm: {
          settingId: null,
          codeDestroyHour: 12,
          distancePickMin: 15,
          emailRemindInterval: 15,
          autoFivStarsDay: 3,
          remindPick: 1,
          finishRemind: 1,
      },
      settingFormRules: {
        codeDestroyHour: {required: true, validator: checkTime, trigger: 'blur'},
        distancePickMin: {required: true, validator: checkTime, trigger: 'blur'},
        emailRemindInterval: {required: true, validator: checkTime, trigger: 'blur'},
        autoFivStarsDay: {required: true, validator: checkTime, trigger: 'blur'}
      }
    }
  },
  mounted() {

  },
  methods: {
    // 修改设置
    handleSubmit(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.$messageBox({
            title: '提示',
            message: '是否要提交修改',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '提交中...';
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  setTimeout(() => {
                    done();
                  }, 300);
                }, 800)
              } else {
                done();
              }
            }
          }).then(() => {
            this.$http.put("/order/setting", this.orderSettingForm).then((result) => {
              if (result.code === 200) {
                this.$message({
                  type: 'success',
                  message: '提交成功',
                  duration: 1000
                });
              }
            }).catch((err) => {
              return err;
            });
          }).catch((err) => {
            return err;
          });
        } else {
          this.$message({
            type: 'error',
            message: '参数不合法',
            duration: 1000
          });
        }
      });
    },
    // 还原默认设置
    handleReturn(refName) {
      // 默认设置
      let defaultOrderSetting = {
          settingId: null,
          codeDestroyHour: 12,
          distancePickMin: 15,
          emailRemindInterval: 15,
          autoFivStarsDay: 3,
          remindPick: 1,
          finishRemind: 1,
      }
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.$messageBox({
            title: '提示',
            message: '是否要还原为默认值',
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '提交中...';
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  setTimeout(() => {
                    done();
                  }, 300);
                }, 800)
              } else {
                done();
              }
            }
          }).then(() => {
            this.$http.put("/order/setting", defaultOrderSetting).then((result) => {
              if (result.code === 200) {
                this.$message({
                  type: 'success',
                  message: '提交成功',
                  duration: 1000
                });
              }
            }).catch((err) => {
              return err;
            });
          }).catch((err) => {
            return err;
          });
        } else {
          this.$message({
            type: 'error',
            message: '参数不合法',
            duration: 1000
          });
        }
      });
    }
  }
}
</script>

<style scoped>
  .input-width {
    width: 50%;
  }
  .el-card {
    height: 590px;
  } 
  .note-margin {
    margin-left: 15px;
  }
  .setting {
    margin-top: 20px;
  }
</style>