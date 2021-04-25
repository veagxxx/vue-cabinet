<template>
  <div class="add-dialog">
    <el-dialog title="添加订单"
    @close="handleClose"
    width="60%"
    :visible="addDialogShow">
      <el-steps :active="step" align-center>
        <el-step 
        v-for="(item, index) in stepDescriptions" 
        :title="item.description" :key="item.id">
        </el-step>
      </el-steps>
      <div class="step-content">
        <OrderAssociatedCabinet 
        ref="cabinetChildRules" 
        v-show="step === 0" :order="order">
        </OrderAssociatedCabinet>
        <OrderMessage ref="orderChildRules" v-show="step === 1" :order="order"></OrderMessage>
        <OrderAssociatedUser 
        ref="singleTable"
        @setCurrent="setCurrent"
        v-show="step === 2" :order="order">
        </OrderAssociatedUser>
      </div>
      <div class="operate-step">
        <el-button size="small" v-if="step > 0" @click="lastStep">
          上一步，{{stepDescriptions[step - 1].description}}
        </el-button>
        <el-button size="small" type="primary" 
        @click="nextStep"
        v-if="step < stepDescriptions.length - 1">
          下一步，{{stepDescriptions[step + 1].description}}
        </el-button>
      </div>
      <div slot="footer">
        <el-button size="small" @click="handleClose">{{$t('main.close')}}</el-button>
        <el-button size="small" @click="handleReset">{{$t('main.reset')}}</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">{{$t('main.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import OrderMessage from './OrderMessage.vue';
import OrderAssociatedUser from './OrderAssociatedUser.vue';
import OrderAssociatedCabinet from './OrderAssociatedCabinet.vue';
export default {
  components: {OrderMessage, OrderAssociatedUser, OrderAssociatedCabinet},
  props: {
    addDialogShow: {
      type: Boolean
    }
  },
  inject: ['reload'],
  data() {
    return {
      step: 0,
      stepDescriptions: [
        {id: 1, description: '选择关联取餐柜'},
        {id: 2, description: '填写订单信息'},
        {id: 3, description: '选择关联用户'}
      ],
      order: {
        orderNo: '',
        orderTime: null,
        orderPickTime: null,
        actualPickTime: null,
        orderFinishTime: null,
        orderCurrentTemperature: 0,
        orderCabinetNumber: null,
        orderCode: '',
        orderStatus: 1,
        orderPayMode: 1,
        autoConfirmDay: 3,
        user: {
          id: null
        },
        cabinet: {
          cabinetId: null
        },
        cabinetMode: {
          modeId: null
        }
      },
      // 关联用户子组件选中的行
      selectedRow: {}
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose');
    },
    lastStep() {
      if (this.step === 0) {
        return this.$message({
          type: 'warning',
          message: '已经是第一步了'
        });
      }
      this.step--;
    },
    nextStep() {
      // console.log(this.order);
      this.step++;
    },
    // 点击确定
    handleConfirm() {
      let flag = this.$refs['orderChildRules'].validateForm(); 
      let valid = this.$refs['cabinetChildRules'].validateForm();
      if ( flag && valid ) {
        if (this.order.user.id === null) {
          return this.$message({
            type: 'info',
            message: '请选择关联的用户',
          });
        }
        this.$http.post('/order/insert', this.order)
        .then((result) => {
          console.log(result);
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.$emit('handleSuccess');
          } else {
            this.$message({
              type: 'errory',
              message: '添加失败'
            });
          }
        }).catch((err) => {
          return err;
        });
      } else {
        this.$message.error('保全信息不完整，请继续填写完整');
      } 
    },
    setCurrent(row) {
      // console.log(row);
      this.selectedRow = row;
    },
    // 重置
    handleReset() {
      this.$refs['orderChildRules'].resetForm(); 
      this.$refs['cabinetChildRules'].resetForm();
      this.$refs['singleTable'].setCurrent(this.selectedRow);
    }
  }
}
</script>

<style scoped>
  .step-content {
    margin-top: 20px;
  }
  .operate-step {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>