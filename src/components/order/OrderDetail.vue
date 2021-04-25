<template>
  <el-scrollbar style="height:100%">
    <el-card>
      <div class="order-detail">
         <div class="page-head" fixed="top">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单模块</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/order-management' }">订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-divider>订单完成情况</el-divider>
        <el-steps 
        :active="calcStepActive()" 
        finish-status="success" 
        process-status="finish" 
        align-center
        style="margin-top: 20px;">
          <el-step title="存入" :description="orderDetailData[0].orderTime"></el-step>
          <el-step title="取餐" :description="orderDetailData[0].actualPickTime || ''"></el-step>
          <el-step title="完成" :description="orderDetailData[0].orderFinishTime || ''"></el-step>
        </el-steps>
        <el-alert
          :title="getAlertTitle()"
          type="info"
          show-icon
          :closable="false">
          <div class="operate-btn">
            <span v-show="orderDetailData[0].orderStatus === 1">
              取餐倒计时: {{countDownMin + '分钟'}}
            </span>
            <el-button 
            v-if="orderDetailData[0].orderStatus === 1" 
            size="mini" type="primary"
            @click="remindToPickUp" 
            icon="el-icon-message-solid">
              提醒取餐
            </el-button>
            <el-button 
            v-else-if="orderDetailData[0].orderStatus === 2" 
            size="mini" type="primary"
             @click="finishOrder">
              完成订单
            </el-button>
          </div>
        </el-alert>
        <span><i class="el-icon-notebook-2"></i>订单信息</span>
        <el-table class="order-first-tb" 
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        size="medium"
        border :data="orderDetailData">
          <el-table-column align="center" label="订单号" prop="orderNo"></el-table-column>
          <el-table-column align="center" label="用户名" prop="user.username"></el-table-column>
          <el-table-column align="center" label="联系方式" prop="user.phone">
            <template slot-scope="scope">
              <i class="el-icon-mobile-phone"></i>
              {{scope.row.user.phone}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="存入时间" prop="orderTime">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              {{scope.row.orderTime | TimeFormat}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="预计取餐时间" prop="orderPickTime">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              {{scope.row.orderPickTime | TimeFormat}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="取餐码" prop="orderCode"></el-table-column>
          <el-table-column align="center" label="邮箱" prop="user.email"></el-table-column>
        </el-table>
        <el-table size="medium" 
        class="order-second-tb"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        border :data="orderDetailData">
          <el-table-column align="center" label="订单状态" prop="orderStatus">
            <template slot-scope="scope">
              <el-tag :type="scope.row.orderStatus === 1 ? 'primary' : (scope.row.orderStatus === 2 ? 'success' : 'info')">
                {{calcOrderStatus(scope.row.orderStatus)}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="取餐柜地点" prop="cabinet.cabinetPosition"></el-table-column>
          <el-table-column align="center" label="取餐柜格号" prop="orderCabinetNumber">
            <template slot-scope="scope">
              <el-tag type="primary">
                {{
                  scope.row.cabinet.cabinetNo + "-" + 
                  (scope.row.orderCabinetNumber < 10 ? '0' + 
                  scope.row.orderCabinetNumber : 
                  scope.row.orderCabinetNumber)
                }}
              </el-tag>
            </template>
          </el-table-column>
            <el-table-column align="center" label="模式" prop="cabinetMode.modeName">
              <template slot-scope="scope">
                <el-tag :type="scope.row.cabinetMode.modeName === '正常模式' ? 'info' : (scope.row.cabinetMode.modeName === '制热' ? 'danger' : 'primary')">
                  {{scope.row.cabinetMode.modeName}}
                </el-tag>
              </template>
            </el-table-column>
          <el-table-column align="center" label="当前温度" prop="orderCurrentTemperature">
            <template slot-scope="scope">
              {{scope.row.orderCurrentTemperature | TemperatureFormat}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="支付方式" prop="orderPayMode">
            <template slot-scope="scope">
              {{scope.row.orderPayMode === 1 ? '微信' : '支付宝'}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="自动完成时间" prop="autoConfirmDay">
            <template slot-scope="scope">
              {{scope.row.autoConfirmDay + '天'}}
            </template>
          </el-table-column>
        </el-table>
        <span><i class="el-icon-price-tag"></i>费用信息</span>
        <el-table :data="[]"
        class="price-table"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        size="medium" border>
          <el-table-column align="center" label="订单总价"></el-table-column>
          <el-table-column align="center" label="活动优惠"></el-table-column>
          <el-table-column align="center" label="积分抵扣"></el-table-column>
          <el-table-column align="center" label="实际应付"></el-table-column>
        </el-table>
        <span><i class="el-icon-collection-tag"></i>操作信息</span>
        <el-table :data="operationData"
        class="operate-table"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        size="medium" border>
          <el-table-column align="center" label="操作者" prop="operateMan"></el-table-column>
          <el-table-column align="center" label="操作时间" prop="operateTime"></el-table-column>
          <el-table-column align="center" label="操作前状态" prop="beforeStatus">
            <template slot-scope="scope">
              <el-tag :type="scope.row.beforeStatus === 1 ? 'primary' : (scope.row.beforeStatus === 2 ? 'success' : 'info')">
                {{calcOrderStatus(scope.row.beforeStatus)}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作后状态" prop="afterStatus">
            <template slot-scope="scope">
              <el-tag :type="scope.row.afterStatus === 1 ? 'primary' : (scope.row.afterStatus === 2 ? 'success' : 'info')">
                {{calcOrderStatus(scope.row.afterStatus)}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="备注" prop="note"></el-table-column>
        </el-table>
      </div>
    </el-card>
  </el-scrollbar>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      orderDetailData: [],
      operationData: [],
      active: 1,
      countDownMin: 0
    }
  },
  created() {
    // console.log(this.$store.state.order);
    this.orderDetailData.push(this.$store.state.order);
  },
  mounted() {
    this.getOperation();
    this.countDown();
  },
  methods: {
    // 获取订单的操作信息
    getOperation() {
      this.$http.get("/operate/operation/" + this.orderDetailData[0].orderId)
      .then((result) => {
        // console.log(result);
        this.operationData = result;
      }).catch((err) => {
        return err;
      });
    },
    // 返回
    goBack() {
      this.$router.push("/order-management");
    },
    // 步骤条计算
    calcStepActive() {
      if (this.orderDetailData[0].orderStatus >= 0 && this.orderDetailData[0].orderStatus <= 3) {
        return this.active = this.orderDetailData[0].orderStatus;
      }
    },
    // 倒计时计算
    countDown() {
      let orderId = this.orderDetailData[0].orderId;
      let startTime = Date.now();
      let pickTime = this.orderDetailData[0].orderPickTime;
      // startTime = new Date(startTime.replace(/-/g,"/"));
      pickTime = new Date(pickTime.replace(/-/g,"/"));
       // 获取分钟
      this.countDownMin = parseInt((pickTime - startTime) / (1000 * 60) <= 0 ? 0 : (pickTime - startTime) / (1000 * 60));
      console.log(this.countDownMin);
      // if (this.countDownMin === 15) {
      //   this.$http.get('/order/remind/' + orderId).then((result) => {
          
      //   }).catch((err) => {
          
      //   });
      // }
    },
    // 订单状态
    calcOrderStatus: function(value) {
      if (value === 1) {
        return '待取餐';
      }
      if (value === 2) {
        return '已取餐';
      }
      if (value === 3) {
        return '已完成';
      }
    },
    // 获取提示信息
    getAlertTitle() {
      if (this.orderDetailData[0].orderStatus === 1) {
        return "订单状态为'待取餐'，点击提醒取餐按钮将发送信息提醒用户取餐";
      }
      if (this.orderDetailData[0].orderStatus === 2) {
        return "订单已经完成取餐，点击完成订单按钮将订单回收";
      }
      if (this.orderDetailData[0].orderStatus === 3) {
        return "订单已经完成回收";
      }
    },
    // 提醒取餐
    remindToPickUp() {
      let orderId = this.orderDetailData[0].orderId;
      let email = this.orderDetailData[0].user.email;
      this.$messageBox({
        type: 'warning',
        title: '发送提醒',
        message: '点击确定将发送信息到' + email + '邮箱中',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '发送中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 800);
          } else {
            done();
          }
        }
      }).then(() => {
        this.$http.get('/order/remind/' + orderId).then((result) => {
        // console.log(result);
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '提醒成功',
          });
        } else {
          this.$message({
            type: 'error',
            message: result.message,
          });
        }
      }).catch((err) => {
        return err;
      });
      }).catch((err) => {
        return err;
      });
    },
    // 完成订单
    finishOrder() {
      let orderData = {
        orderId: this.orderDetailData[0].orderId,
        orderStatus: 3
      };
      let operateData = {
        operateMan: '管理员',
        operateTime: Date.now(),
        beforeStatus: 2,
        afterStatus: 3,
        note: '自动完成',
        order: {
          orderId: this.orderDetailData[0].orderId,
          orderStatus: 3
        }
      }
      this.$messageBox({
        title: '提示',
        message: '确定要完成订单吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '发送中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 800);
          } else {
            done();
          }
        }
      }).then(() => {
        this.$http.put('/order/finish', orderData).then((result) => {
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功',
          });
          this.$http.post('/operate/insert', operateData).then((result) => {
            console.log(result);
          }).catch((err) => {
            return err;
          });
        } else {
          return;
        }
      }).catch((err) => {
        return err;
      });
      }).catch((err) => {
        return err;
      });;
    }
  },
  computed: {
    
  }
}
</script>

<style scoped>
  .operate-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  }
  .operate-btn span {
    margin-right: 20px;
    font-size: 16px;
    color: tomato;
  }
  .el-alert,.order-second-tb,.price-table {
    margin-bottom: 20px;
  }
  .order-first-tb,.operate-table {
    margin-top: 20px;
  }
  .operate-btn {
    text-align: center;
  }
</style>