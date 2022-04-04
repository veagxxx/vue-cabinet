<template>
  <div class="order-management">
    <el-card>
      <div class="page-head">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单模块</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <el-collapse class="search-collapse">
        <el-collapse-item :title="$t('main.expand')" name="1">
          <!-- 接收子组件传递的方法获取搜索表单数据 -->
          <OrderSearch 
          @searchOrderByForm="searchOrderByForm" 
          @resetSearchForm="resetSearchForm"
          @clearSelect="clearSelect"
          @searchByChange="searchByChange">
          </OrderSearch>
        </el-collapse-item>
      </el-collapse>
      <div class="table-top">
        <div class="page-btn">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
            :current-page="pageNum"
            :page-sizes="[1, 5, 10, 12]"
            :page-size="pageSize"
            :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="orderTotal">
          </el-pagination>
          <el-button icon="el-icon-refresh" size="small" @click="refresh"></el-button>
         </div>
        <el-button type="success" size="small" @click="handleAdd">
          {{$t('main.order.manualAdd')}}
        </el-button>
      </div>
      <OrderAdd 
      :addDialogShow="addDialogShow" 
      @handleClose="handleCloseAddDialog"
      @handleSuccess="handleSuccess">
      </OrderAdd>
      <el-table border :data="orderList"
      :default-sort = "{prop: 'orderTime', order: 'descending'}"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column align="center" label="订单号" prop="orderNo"></el-table-column>
        <el-table-column align="center" label="手机号" prop="user.phone" width="130">
          <template slot-scope="scope">
            <i class="el-icon-mobile-phone"></i>
            {{scope.row.user.phone}}
          </template>
        </el-table-column>
        <el-table-column align="center" sortable label="存放时间" prop="orderTime" width="120">
          <template slot-scope="scope">
             <i class="el-icon-time"></i>
            {{scope.row.orderTime | TimeFormat}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="预计取餐时间" prop="orderPickTime" width="120">
          <template slot-scope="scope">
             <i class="el-icon-time"></i>
            {{scope.row.orderPickTime | TimeFormat}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="模式" prop="mode.modeName">
          <template slot-scope="scope">
            <el-tag :type="scope.row.mode.modeName === '正常模式' ? 'info' : (scope.row.mode.modeName === '制热' ? 'danger' : 'primary')">
              {{scope.row.mode.modeName}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单状态" prop="orderStatus">
          <template slot-scope="scope">
            <el-tag :type="scope.row.orderStatus === 1 ? 'primary' : (scope.row.orderStatus === 2 ? 'success' : 'info')">
              {{calcOrderStatus(scope.row.orderStatus)}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="取餐码" prop="orderCode"></el-table-column>
        <el-table-column align="center" label="支付方式" prop="orderPayMode">
          <template slot-scope="scope">
            {{scope.row.orderPayMode === 1 ? '微信' : '支付宝'}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <!-- <router-link :to="{path: '/order/detail', query:{order: scope.row}}">
              <el-button size="mini" type="primary">查看</el-button>
            </router-link> -->
            <el-button size="mini" type="primary" 
            icon="el-icon-view"
            @click="toDetail(scope.row)">{{$t('main.detail')}}</el-button>
            <!-- <el-button size="mini" type="primary">查看</el-button> -->
            <el-button style="margin-left: 5px" size="mini" type="danger"
            icon="el-icon-delete" 
            @click="deleteOrder(scope.row.orderId)">{{$t('main.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import OrderSearch from '@/components/order/OrderSearch.vue';
import OrderAdd from '@/components/order/OrderAdd.vue';
export default {
  inject: ['reload'],
  components: {OrderSearch, OrderAdd},
  data() {
    return {
      orderList: [],
      loading: false,
      pageNum: 1, // 当前页
      pageSize: 5, // 每页条数
      orderTotal: 0,
      // 搜索表单
      searchFormData: {
        orderNo: '',
        user: {phone: ''},
        orderTime: '',
        orderStatus: '',
        orderCode: '',
        orderPayMode: ''
      },
      addDialogShow: false,
    }
  },
  mounted() {
    this.getAllOrders();
  },
  methods: {
    // 获取所有订单
    getAllOrders() {
      this.loading = true;
      this.$http.post('/order/orders/' + this.pageNum + '/' + this.pageSize, this.searchFormData)
      .then((result) => {
        // console.log(result);
        this.orderList = result.list;
        this.orderTotal = result.total;
        this.loading = false;
      }).catch((err) => {
        return err;
      });
    },
    // 根据搜索表单获取订单
    searchOrderByForm(data) {
      this.searchFormData = data;
      this.getAllOrders();
      
    },
    // 重置搜索表单
    resetSearchForm() {
      this.getAllOrders();
    },
    // 可清空按钮触发
    clearSelect() {
      this.getAllOrders();
    },
    searchByChange(data) {
      this.searchFormData = data;
      this.getAllOrders();
    },
    // 分页每页条数改变
    handleSizeChange(value) {
      // console.log(value);
      this.pageSize = value;
      this.getAllOrders();
    },
    // 当前页改变
    handlePageChange(value) {
      // console.log(value);
      this.pageNum = value;
      this.getAllOrders();
    },
    // 获取订单状态
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
    // 查看详情
    toDetail(data) {
      // 直接把对象或者使用路由传参方式传递时，当页面刷新时数据会丢失，
      // 传递前转成字符串，字符串传递页面刷新时数据不会丢失，页面获取时再转成对象
      // this.$router.push({path: '/order/detail', query: {order: JSON.stringify(data)}});
      this.$store.commit('SET_ORDER', data);
      this.$router.push({path: '/order/detail/' + data.orderId})
    },
    // 删除订单
    deleteOrder(orderId) {
      // console.log(orderId);
      this.$messageBox({
        type: 'warning',
        title: '删除提示',
        message: '你确定要删除该订单吗?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonText = '删除中...';
            instance.confirmButtonLoading = true;
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
        this.$http.del('/order/delete/' + orderId).then((result) => {
          // console.log(result);
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: result.message
            });
            this.getAllOrders();
          } else {
            this.$message({
              type: 'error',
              message: result.message
            });
          }
        }).catch((err) => {
          return err;
        });
      }).catch((err) => {
        return err;
      });
    },
    refresh() {
      this.reload();
    },
    // 手动添加订单
    handleAdd() {
      this.addDialogShow = true;
    },
    // 关闭对话框
    handleCloseAddDialog() {
      this.addDialogShow = false;
    },
    // 添加成功关闭对话框
    handleSuccess() {
      this.reload();
      this.addDialogShow = false;
    }
  },
  computed: {
    handleTotal() {
      
    }
  }
}
</script>

<style scoped>
  /* 折叠面板头部修改 */
  .search-collapse>>>.el-collapse-item__header {
    display: block;
    color: darkred;
    width: 120px;
  }
  /* 折叠面板内容修改 */
  .search-collapse>>>.el-collapse-item__content {
    padding-bottom: 0px;
  }
  .table-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .page-btn {
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-btn .el-button {
    font-size: 14px;
    margin-left: 15px;
  }
</style>