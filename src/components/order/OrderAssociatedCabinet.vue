<template>
  <div class="associated-cabinet">
    <el-form :model="order" 
    ref="addCabinetFormRef" 
    :rules="cabinetFormRules"
    label-width="150px">
      <el-form-item label="选择取餐柜地点：" prop="cabinet.cabinetId">
        <el-select 
        v-model="order.cabinet.cabinetId" 
        clearable
        @clear="handleClear"
        @change="handleSelectChange"
        placeholder="选择取餐柜">
          <el-option 
          v-for="(item, index) in cabinets" 
          :key="item.cabinetId"
          :label="item.cabinetPosition + item.cabinetNo + '号'"
          :value="item.cabinetId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item 
      label="选择取餐柜柜号：" prop="orderCabinetNumber" 
      v-show="order.cabinet.cabinetId != null">
        <el-select 
        v-model="order.orderCabinetNumber" 
        clearable
        @clear="handleClearCabinetNum"
        @change="handleCabinetNumChange"
        placeholder="请选择可用取餐柜柜号">
          <el-option 
          v-for="(item, index) in inSizeOrders.cabinetSize" 
          :key="item"
          :label="item + '号'"
          :value="item"
          :disabled="isNotEmpty(item)">
            <span style="float: left">{{ item + '号' }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">
              {{ isNotEmpty(item) === true ? '不可用' : '可使用' }}
            </span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模式：" prop="cabinetMode.modeId">
        <el-select
        v-model="order.cabinetMode.modeId" 
        clearable
        @change="handleModeChange"
        @clear="handleClearMode"
        placeholder="请选择存储模式">
          <el-option
          v-for="(item, index) in modes" :key="index"
          :value="item.modeId"
          :label="item.modeName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单温度：" 
      prop="orderCurrentTemperature" 
      v-show="order.cabinetMode.modeId != null">
          <el-input v-model="order.orderCurrentTemperature">
            <template slot="append">℃</template>
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
      cabinets: [],
      modes: [],
      cabinetId: 1,
      inSizeOrders: {},
      cabinetFormRules: {
        'cabinet.cabinetId': [
          { required: true, message: '请选择取餐柜', trigger: ['blur', 'change'] }
        ],
        orderCabinetNumber: [
          { required: true, message: '请选择取餐柜柜号', trigger: ['blur', 'change'] }
        ],
        'cabinetMode.modeId': [
          { required: true, message: '请选择存储模式', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  mounted() {
    this.queryCabinets();
  },
  methods: {
    queryCabinets() {
      this.$http.get('/cabinet/cabinets')
      .then((res) => {
        // console.log(res);
        this.cabinets = res.cabinets;
        this.modes = res.modes;
      }).catch((err) => {
        return err;
      });
    },
    // 取餐柜地点变化
    handleSelectChange(value) {
      this.inSizeOrders = {};
      this.cabinetId = value | 1;
      this.$http.get('/cabinet/one/' + this.cabinetId)
      .then((result) => {
        // console.log(result);
        this.inSizeOrders = result;
      }).catch((err) => {
        return err;
      });
    },
    // 清空
    handleClear() {
      this.order.cabinet.cabinetId = null;
    },
    // 清空
    handleClearCabinetNum() {
      this.order.orderCabinetNumber = null;
    },
    handleCabinetNumChange(value) {
      console.log(value);
    },
    // 判断取餐柜是否为空
    isNotEmpty(item) {
      for (let index = 0; index < this.inSizeOrders.orders.length; index++) {
        if (item === this.inSizeOrders.orders[index].orderCabinetNumber) {
          return true;
        }
      }
    },
    // 模式改变
    handleModeChange(value) {
      // console.log(value);
      if (value === 1) {
        this.order.orderCurrentTemperature = 30;
      }
      if (value === 2) {
        this.order.orderCurrentTemperature = 45;
      }
      if (value === 3) {
        this.order.orderCurrentTemperature = 5;
      }
    },
    // 清空
    handleClearMode() {
      this.order.cabinetMode.modeId = null;
    },
    // 表单验证，传递给父组件
    validateForm() {
      let flag = null;
      this.$refs['addCabinetFormRef'].validate(valid => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
    // 重置表单，传递到父组件
    resetForm() {
      this.$refs['addCabinetFormRef'].resetFields();
    }
  },
  computed: {
    
  }
}
</script>

<style scoped>
  .el-card {
    cursor: pointer;
    padding: 5px;
  }
  .el-select,.el-input {
    width: 90%;
  }
</style>