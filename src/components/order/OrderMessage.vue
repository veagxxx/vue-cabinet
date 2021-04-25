<template>
  <div class="order-message">
    <el-form :model="order" 
    ref="addOrderFormRef" 
    :rules="addOrderFormRules"
    label-width="150px">
      <el-form-item label="订单号：" prop="orderNo">
        <el-input v-model="order.orderNo" clearable placeholder="请输入订单号">
          <el-button slot="append" @click="autoCreateOrderNo">生成订单号</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="存入时间：" prop="orderTime">
        <el-date-picker
          v-model="order.orderTime"
          value-format="yyyy-MM-dd HH:mm"
          type="datetime"
          placeholder="选择存入时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预计取餐时间：" prop="orderPickTime">
        <el-date-picker
          v-model="order.orderPickTime"
          value-format="yyyy-MM-dd HH:mm"
          type="datetime"
          clearable
          placeholder="选择取餐时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态：" prop="orderStatus">
        <el-radio-group v-model="order.orderStatus">
          <el-radio :label="1">待取餐</el-radio>
          <el-radio :label="2">已取餐</el-radio>
          <el-radio :label="3">已完成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="实际取餐时间：" prop="orderPickTime" v-if="order.orderStatus >= 2">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm"
          v-model="order.orderPickTime"
          type="datetime"
          clearable
          placeholder="选择取餐时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单完成时间：" prop="orderPickTime" v-if="order.orderStatus === 3">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm"
          v-model="order.orderPickTime"
          type="datetime"
          clearable
          placeholder="选择完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="取餐码：" prop="orderCode">
        <el-input v-model="order.orderCode" clearable>
          <el-button slot="append" @click="autoCreateCode">自动生成</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="支付方式：">
        <el-radio-group v-model="order.orderPayMode">
          <el-radio :label="1">微信</el-radio>
          <el-radio :label="2">支付宝</el-radio>
          <el-radio :label="3">校园一卡通</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自动完成时间：" prop="autoComfirm">
        <el-input v-model="order.autoConfirmDay" clearable>
          <template slot="append">天</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['order'],
  data() {
    return {
      addOrderFormRules: {
        orderNo: [
          {required: true, message: '请填写订单号', trigger: 'change'}
        ],
        orderTime: [
          {required: true, message: '请填写存入时间', trigger: 'blur'}
        ],
        orderPickTime: [
          {required: true, message: '请填写预计取餐时间', trigger: 'blur'}
        ],
        orderPickTime: [
          {required: true, message: '请填写实际取餐时间', trigger: 'blur'}
        ],
        orderCode: [
           {required: true, message: '请填写取餐码', trigger: 'change'}
        ]
      },

    }
  },
  methods: {
    // 获取随机取餐码
    autoCreateCode() {
      let randomCode = '';
      const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789'
      for (let index = 0; index < 6; index++) {
        randomCode += chars.charAt(Math.floor(chars.length * Math.random()))
      }
      // console.log(randomCode);
      this.order.orderCode = randomCode;
    },
    // 生成订单号
    autoCreateOrderNo() {
      let randomNo = '';
      for (let index = 0; index < 3; index++) {
        randomNo += Math.floor(Math.random() * 10);
      }
      let timeString = this.getDateString();
      this.order.orderNo = timeString + randomNo;
    },
    // 获取时间字符串
    getDateString() {
      const nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      let day = nowDate.getDate();
      let hour = nowDate.getHours();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      hour = hour < 10 ? '0' + hour : hour;
      return year.toString() + month.toString() + day.toString() + hour.toString();
    },
    //子组件校验，传递到父组件
    validateForm () {
      let flag = null
      this.$refs['addOrderFormRef'].validate(valid => {
        if (valid) {
          flag = true
        } else {
          flag = false
        }
      })
      return flag
     },
     // 重置表单，传递到父组件
     resetForm() {
       this.$refs['addOrderFormRef'].resetFields();
     }
  }
}
</script>

<style scoped>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 90%;
  }
  .el-input {
    width: 90%;
  }
</style>