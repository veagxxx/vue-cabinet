<template>
  <div class="charts">
    <el-row :gutter="0">
      <el-col :span="8" class="user">
        <el-card>
          <UserTotalChart :userCount="userCount"></UserTotalChart>        
        </el-card>
      </el-col>
      <el-col :span="8" class="order">
        <el-card>
          <UserChart :users="users"></UserChart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="product">
          <OrderChart></OrderChart>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="0" class="statistics">
      <el-col :span="12" class="user-growth">
        <el-card>
          <UserGrowth></UserGrowth>
        </el-card>
      </el-col>
      <el-col :span="12" class="order-change">
        <el-card>
          <OrderChange></OrderChange>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserChart from '@/components/chart/chart_components/UserChart';
import OrderChart from '@/components/chart/chart_components/OrderChart';
import UserTotalChart from '@/components/chart/chart_components/UserTotalChart';
import UserGrowth from '@/components/chart/chart_components/UserGrowth';
import OrderChange from '@/components/chart/chart_components/OrderChange';
export default {
  components: {UserChart, OrderChart, UserTotalChart, UserGrowth, OrderChange},
  data() {
    return {
      userCount: 0,
      users: [],
    }
  },
  mounted() {
    this.queryUserCount();
  },
  methods: {
    queryUserCount() {
      this.$http.get('/user/total').then((res) => {
        if (res.code === 200) {
          // console.log(res.data.total);
          this.userCount = res.data.total;
          this.users = res.data.list;
        } else {
          return;
        }
      }).catch((err) => {
        return err;
      });
    }
  }
}
</script>

<style scoped>
  #user-chart, #order-chart, #product-chart {
    background-color: #141527;
    width: 100%;
    height: 220px;
    padding: 0px;
  }
  .user>>>.el-card__body, .order>>>.el-card__body, .product>>>.el-card__body, 
  .user-growth>>>.el-card__body, .order-change>>>.el-card__body{
    padding: 0px;
  }
  .product {
    margin-right: 0px;
  }
  .statistics {
    margin-top: 10px;
  }
</style>