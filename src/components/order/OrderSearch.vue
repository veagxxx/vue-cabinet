<template>
  <div class="order-search">
    <div class="order-search-btn">
      <el-button size="mini" type="primary" 
      icon="el-icon-search"
      @click="searchBySearchForm(searchForm)">{{$t('main.search')}}</el-button>
      <el-button size="mini" type="info" 
      icon="el-icon-refresh"
      @click.stop="resetSearchForm()">{{$t('main.reset')}}</el-button>
    </div>
    </el-row>
    <el-row :gutter="20" class="order-search">
      <el-form label-width="80px" :model="searchForm" ref="searchFormRef">
        <el-col :span="8">
          <el-form-item label="订单号:" prop="orderNo">
          <el-input size="small" clearable placeholder="输入订单号" 
          v-model="searchForm.orderNo" 
          @clear="clearSelect"
          @change="searchByChange">
          </el-input>
        </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="dataPicker" label="下单时间:" prop="orderTime">
            <el-date-picker 
              v-model="searchForm.orderTime"
              type="date"
              placeholder="选择日期"
              size="small"
              format="yyyy-MM-dd"
              style="width:100%" 
              value-format="yyyy-MM-dd HH:mm">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号:" prop="user.phone">
            <el-input size="small" clearable v-model="searchForm.user.phone"
            @clear="clearSelect" placeholder="手机号搜索" 
            @change="searchByChange">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单状态:" prop="orderStatus">
            <el-select 
            v-model="searchForm.orderStatus"
            placeholder="选择订单状态"
            size="small"
            @clear="clearSelect"
            style="width:100%" 
            :clearable="true">   
              <el-option 
              v-for="item in statusOptions" :key="item.id"
              :label="item.status"
              :value="item.id">   <!-- value 绑定选中的值 -->
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="取餐码:" prop="orderCode">
            <el-input size="small" clearable v-model="searchForm.orderCode"
            @clear="clearSelect" placeholder="取餐码搜索" 
            @change="searchByChange">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="支付方式:" prop="orderPayMode">
            <el-select 
            v-model="searchForm.orderPayMode"
            placeholder="选择支付方式"
            @clear="clearSelect"
            size="small"
            style="width:100%" 
            :clearable="true">
              <el-option v-for="item in payways" :key="item.payId"
              :label="item.payway"
              :value="item.payId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> 
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        orderNo: '',
        user: {
          phone: ''
        },
        orderTime: null,
        orderStatus: null,
        orderCode: '',
        orderPayMode: null
      },
      statusOptions: [
        {id: 1, status: '待取餐'},
        {id: 2, status: '已取餐'},
        {id: 3, status: '已完成'},
      ],
      cateOptions: [
        {cateId: 1, cateName: '正餐'},
        {cateId: 2, cateName: '水果'},
        {cateId: 3, cateName: '饮品'}
      ],
      payways: [
        {payId: 1, payway: '微信'},
        {payId: 2, payway: '支付宝'},
        {payId: 3, payway: '一卡通'},
      ]
    }
  },
  methods: {
    // 根据搜索表单查询订单
    searchBySearchForm(formData) {
      // console.log(formData);
      // 向父组件传递表单数据
      this.$emit('searchOrderByForm', formData);
    },
    resetSearchForm() {
      this.$refs.searchFormRef.resetFields();
      this.$emit('resetSearchForm');
    },
    clearSelect() {
      this.$emit('clearSelect');
    },
    searchByChange() {
      this.$emit('searchByChange', this.searchForm)
    }
  }
}
</script>

<style scoped>
  .order-search-btn {
    text-align: right;
  }
  .el-time-panel {
    left: -20px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: unset;
  }
</style>