<template>
  <el-dialog title="添加"
  @close="handleClose"
  width="60%"
  :visible="addDialogShow">
    <el-form 
    :model="productForm" 
    label-width="120px" 
    :rules="productFormRules"
    ref="productFormRef">
      <el-form-item label="地点选择：">
        <el-radio-group v-model="select" size="small" @change="handleRadioChange">
          <el-radio border :label="0">已有地点</el-radio>
          <el-radio border :label="1">新建地点</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="取餐柜地点：" prop="cabinetPosition" v-if="select === 0">
        <el-select v-model="productForm.cabinetPosition" clearable>
          <el-option
            v-for="(item, key) in positions"
            :key="key"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="取餐柜地点：" prop="cabinetPosition" v-else>
        <el-input v-model="productForm.cabinetPosition" placeholder="输入地点"></el-input>
      </el-form-item>
      <el-form-item label="取餐柜编号：" prop="cabinetNo">
        <el-radio-group v-model="productForm.cabinetNo" size="small">
          <el-radio 
          border 
          v-for="item in cabinetNos" 
          :label="item.value" 
          :disabled="cabinetNoDisabled(item.value)">
            {{item.value + '号'}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="取餐柜规格：" prop="cabinetSize">
        <el-input v-model="productForm.cabinetSize">
          <template slot="append">格</template>
        </el-input>
      </el-form-item>
      <el-form-item label="取餐柜状态：" prop="cabinetStatus">
        <el-radio-group v-model="productForm.cabinetStatus" size="small">
          <el-radio border :label="1">启用</el-radio>
          <el-radio border :label="0" class="status-ban">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="default" size="small" @click="handleClose">取消</el-button>
      <el-button type="default" size="small" @click="handleReset">重置</el-button>
      <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['addDialogShow', 'positions', 'allCabinets'],
  data() {
    return {
      productForm: {
        cabinetPosition: '',
        cabinetNo: 'A',
        cabinetSize: 20,
        useDate: new Date(),
        cabinetStatus: 1
      },
      cabinetNos: [
        {id: 1, value: 'A'},
        {id: 2, value: 'B'},
        {id: 3, value: 'C'},
        {id: 4, value: 'D'},
        {id: 5, value: 'E'},
        {id: 6, value: 'F'},
      ],
      select: 0,
      productFormRules: {
        cabinetPosition: [
          {required: true, message: '请输入取餐柜地点', trigger: ['change', 'blur']}
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose');
    },
    handleConfirm() {
      this.$refs.productFormRef.validate(validate => {
        if (validate) {
          this.$http.post('/cabinet/insert', this.productForm)
          .then((result) => {
            // console.log(result);
            if (result.code === 200) {
              this.$message({
                type: 'success',
                message: `${result.message}`
              });
              this.$emit('handleSuccess');
            } else {
              this.$message({
                type: 'error',
                message: `${result.message}`
              });
            }
          }).catch((err) => {
            return err;
          });
        } else {
          this.$message.error('信息不完整，请继续填写完整');
        } 
      });
    },
    // 单选框改变
    handleRadioChange() {
      this.productForm.cabinetPosition = '';
    },
    // 取餐柜编号是否可用
    cabinetNoDisabled(cabinetNo) {
      for (let index = 0; index < this.allCabinets.length; index++) {
        if (this.productForm.cabinetPosition === this.allCabinets[index].cabinetPosition) {
          if (cabinetNo === this.allCabinets[index].cabinetNo) {
            return true;
          }
        }
      }
    },
    handleReset() {
      this.$refs.productFormRef.resetFields();
    }
  }
}
</script>

<style scoped>
  .status-ban.is-checked {
    border-color: #FF0000
  }
  .status-ban>>>.el-radio__input.is-checked .el-radio__inner {
    border-color: #f56c6c;
    background:#f56c6c;
  }
  .status-ban>>>.el-radio__input.is-checked+.el-radio__label {
    color: #f56c6c;
  }
  .el-select {
    width: 100%;
  }
</style>