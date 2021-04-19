<template>
  <div class="add-tab">
    <el-dialog title="添加新方案" width="60%"
    @close="handleCancelAdd"
    :visible.sync="addDialog">
      <el-form 
      :data="newTab" 
      :rules="addSettingRules"
      ref="addSettingRef"
      label-width="120px">
        <el-form-item label="侧边导航主题：" prop="sideBgc">
          <div class="block">
            <span class="demonstration">{{newTab.sideBgc === '' ? '未选择': newTab.sideBgc}}</span>
            <el-color-picker v-model="newTab.sideBgc"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="侧边导航字体：" prop="sideFontColor">
          <div class="block">
            <span class="demonstration">{{newTab.sideFontColor === '' ? '未选择' : newTab.sideFontColor}}
            </span>
            <el-color-picker v-model="newTab.sideFontColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="头部导航主题：" prop="headerBgc">
          <div class="block">
            <span class="demonstration">{{newTab.headerBgc === '' ? '未选择' : newTab.headerBgc}}</span>
            <el-color-picker v-model="newTab.headerBgc"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="头部导航字体：" prop="headerFontColor">
          <div class="block">
            <span class="demonstration">
              {{newTab.headerFontColor === '' ? '未选择' : newTab.headerFontColor}}
            </span>
            <el-color-picker v-model="newTab.headerFontColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="登录页动画：" prop="loginAnimation">
          <el-radio v-model="newTab.loginAnimation" :label="0" border size="mini">关闭</el-radio>
          <el-radio v-model="newTab.loginAnimation" :label="1" border size="mini">开启</el-radio>
        </el-form-item>
        <el-form-item label="登录页背景：" prop="loginBgImage">
          <el-upload
            action="#"
            :http-request="uploadImg"
            :on-preview="handlePictureCardPreview"
            ref="upload"
            :limit="1"
            name="image"
            list-type="picture-card"
            :multiple="false"
            :auto-upload="false"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="handleCancelAdd">取消</el-button>
        <el-button type="primary" size="small" @click="submitAdd">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['addDialog'],
  data() {
    const checkImg = (rule, value, callback) => {
      if (this.file === '') {
        return callback(new Error('请选择一张图片!'));
      }
      return callback();
    }
    const checkColor = (color, rule, value, callback) => {
      if (color === '') {
        return callback(new Error('颜色不能为空!'));
      }
      return callback();
    }
    return {
      newTab: {
        headerBgc: '',
        headerFontColor: '',
        sideBgc: '',
        sideFontColor: '',
        loginAnimation: 1,
        loginBgImage: '',
        isUse: 0,
      },
      dialogImageUrl: '',
      dialogVisible: false,
      file: '',
      addSettingRules: {
        sideBgc: [
          {required: true, message: '颜色不能为空', trigger: 'blur'}
        ],
        sideFontColor: [
          {required: true, message: '颜色不能为空', trigger: 'blur'}
        ],
        headerBgc: [
          {required: true, message: '颜色不能为空', trigger: 'blur'}
        ],
        headerFontColor: [
          {required: true, message: '颜色不能为空', trigger: 'blur'}
        ],
        loginBgImage: [
          {required: true, validator: checkImg, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 改变、上传
    handleChange(file, fileList) {
      this.file = file.raw;
    },
    // 移除的回调
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 图片预览对话框
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 成功的回调
    handleSuccess(res) {
      console.log(res);
    },
    // 取消添加
    handleCancelAdd() {
      this.$emit('handleCancelAdd');
    },
    // 2. http-request 获取文件
    uploadImg(param) {
      this.file = param.file;
      // console.log(this.file);
    },
    // 添加提交
    submitAdd() {
      if (this.newTab.headerBgc === '' || this.newTab.headerFontColor === '' 
      || this.newTab.sideBgc === '' || this.newTab.sideFontColor === '' || this.file === '') {
        return this.$message({
          type: 'error',
          message: '必填字段不能为空'
        });
      }
      // 上传图片并携带对象参数
      // 1. 将 el-upload action属性设置为#，使用 http-request 代替
      // 2. 上面 uploadImg 方法
      // 3. 下面提交 this.$refs.upload.submit(); 上传触发 uploadImg() 方法
      // 4. 使用 new FormData 获取提交图片文件和对象参数（需转为 json 字符串）
      // 5. 后台使用 @RequestParam 分别获取对应参数
      this.$refs.upload.submit();
      let formData = new FormData();
      formData.append('image', this.file);
      formData.append('settingInfo', JSON.stringify(this.newTab));
      this.$http.post('/setting/insert', formData).then((result) => {
        // console.log(result);
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '新增完成'
          });
          this.$emit('submitSuccess');
        } else {
          this.$message({
            type: 'error',
            message: result.message
          });
        }
      }).catch((err) => {
        return err;
      });
    }
  }
}
</script>

<style scoped>
  .block {
    display: flex;
    align-items: center;
  }
  .demonstration {
    margin-right: 10px;
  }
</style>