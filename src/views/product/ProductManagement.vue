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
      <el-divider></el-divider>
      <div class="table-top">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[1, 5, 10, 15]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <el-button type="success" size="small" @click="handleAdd">{{$t('main.add')}}</el-button>
      </div>
      <!-- 添加取餐柜子组件 -->
      <AddProduct 
      :addDialogShow="addDialogShow" 
      :positions="positions"
      :allCabinets="allCabinets"
      @handleClose="handleClose" 
      @handleSuccess="handleSuccess">
      </AddProduct>
      <el-table :data="cabinets" border
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column label="地点" prop="cabinetPosition"></el-table-column>
        <el-table-column label="编号" prop="cabinetNo">
          <template slot-scope="scope">
            {{scope.row.cabinetNo + '号'}}
          </template>
        </el-table-column>
        <el-table-column label="规格/格" prop="cabinetSize"></el-table-column>
        <el-table-column label="使用日期" prop="useDate">
          <template slot-scope="scope">
            {{scope.row.useDate | DateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="cabinetStatus">
          <template slot-scope="scope">
            <el-tag :type="scope.row.cabinetStatus === 1 ? 'success' : 'danger'">
              {{scope.row.cabinetStatus === 1 ? '启用' : '禁用'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="statusChange(scope.row.cabinetStatus, scope.row.cabinetId)">
              {{scope.row.cabinetStatus === 1 ? '禁用' : '启用'}}
            </el-button>
            <el-button type="text danger" @click="toDetail(scope.row.cabinetId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <span><i class="el-icon-thumb"></i>模式管理</span>
      <el-table 
      class="mode"
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
import AddProduct from '@/components/product/AddProduct.vue';
export default {
  components: {AddProduct},
  inject: ['reload'],
  data() {
    return {
      cabinetInfo: {},
      cabinets: [], // 分页获取的取餐柜
      switchValue: false, 
      modes: [],
      loading: false,
      pageNum: 1,
      pageSize: 5,
      total: 0,
      addDialogShow: false,
      positions: [],  // 存储地址
      allCabinets: [], // 所有取餐柜

    }
  },
  mounted() {
    this.getAllCabinetByPage();
    this.getAllCabinet();
  },
  methods: {
    // 分页获取所有取餐柜信息
    async getAllCabinetByPage() {
      await this.$http.get('/cabinet/list/' + this.pageNum + '/' + this.pageSize)
      .then((result) => {
        this.cabinetInfo = result;
        this.cabinets = result.cabinets;
        this.modes = result.modes;
        this.total = result.cabinetTotal;
      }).catch((err) => {
        return err;
      });
    },
    // 无条件获取所有取餐柜
    getAllCabinet() {
      this.$http.get('/cabinet/cabinets')
      .then((result) => {
        // console.log(result);
        this.allCabinets = result.cabinets;
        // 获取所有不重复的取餐柜地点
        for (let index = 0; index < result.cabinets.length; index++) {
          if (this.positions.indexOf(result.cabinets[index].cabinetPosition) === -1) {
            this.positions.push(result.cabinets[index].cabinetPosition);
          }
        }
      }).catch((err) => {
        return err;
      });
    },
    // 计算模式
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
    // 每页数量修改
    handleSizeChange(value) {
      this.pageSize = value;
      this.getAllCabinetByPage();
    },
    // 当前页修改
    handleCurrentChange(value) {
      this.pageNum = value;
      this.getAllCabinetByPage();
    },
    // 查看详情
    toDetail(id) {
      this.$store.commit('SET_CABINET_INFO', this.cabinetInfo);
      this.$router.push({path: '/product/detail/' + id});
    },
    // 取餐柜状态改变
    statusChange(status, cabinetId) {
      if (status === 1) {
        this.cabinetBan(cabinetId);
      } else {
        this.cabinetUse(cabinetId)
      }
    },
    // 取餐柜的禁用
    cabinetBan(cabinetId) {
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
          cabinetId: cabinetId,
          cabinetStatus: 0,
        };
        this.$http.put('/cabinet/update', changeData).then((result) => {
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '禁用成功'
            });
             // 刷新
            this.getAllCabinet();
          }
        }).catch((err) => {
          return err;
        });
      }).catch((err) => {
        return err;
      });
    },
    // 修改取餐柜状态（启用）
    cabinetUse(cabinetId) {
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
    // 添加
    handleAdd() {
      this.addDialogShow = true;
    },
    // 关闭
    handleClose() {
      this.addDialogShow = false;
    },
    // 添加成功
    handleSuccess() {
      this.addDialogShow = false;
      this.reload();
    }
  }
}
</script>

<style scoped>
  .table-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .mode {
    margin-top: 15px;
  }
  /* 改变switch disabled 样式 */
  .el-switch.is-disabled {
      opacity: 1;
  }
</style>