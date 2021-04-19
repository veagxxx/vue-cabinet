<template>
  <div class="add-user">
    <el-card>
      <div class="page-head">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加用户</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider></el-divider>
      <el-tabs>
        <el-tab-pane :label="$t('main.add')">
          <el-form :model="addUserForm"
          v-loading="loading"
          element-loading-text="执行中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :rules="addUserFormRules"
          :status-icon="true" ref="addUserFormRef" label-width="100px">
            <el-form-item label="默认头像：" prop="avatar">
              <el-avatar :src="addUserForm.avatar"></el-avatar>
            </el-form-item>
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="addUserForm.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="addUserForm.password" clearable></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="phone">
              <el-input v-model="addUserForm.phone" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="addUserForm.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="年龄：" prop="age">
              <el-input v-model="addUserForm.age" clearable></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="gender">
              <el-radio-group v-model="addUserForm.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="权限：" prop="isAdmin">
              <el-radio-group v-model="addUserForm.isAdmin">
                <el-radio :label="1">管理员</el-radio>
                <el-radio :label="0">普通用户</el-radio>
              </el-radio-group>
            </el-form-item>
             <el-form-item>
              <el-button type="primary" @click="insertUser('addUserFormRef')">
                {{$t('main.add')}}
              </el-button>
              <el-button type="primary" @click="resetForm('addUserFormRef')">
                {{$t('main.reset')}}
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('main.batch')" class="batch">
          <el-upload
            class="upload-user"
            action=""
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :limit="3"
            accept=".xlsx, .xls"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="success" icon="el-icon-upload">
              {{$t('main.select')}}
            </el-button>
            <ExportTemplate></ExportTemplate>
            <div slot="tip" class="el-upload__tip">
              只能上传.xls/.xlsx文件，您可以先下载模板，确定后点击'一键导入'即可导入数据
            </div>
          </el-upload>
          <el-button class="import" size="small" type="success" @click="importAll">
            {{$t('main.import')}}
          </el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ExportTemplate from '@/components/user/ExportTemplate.vue'; 
export default {
  props: ['addUserDialog'],
  components: {ExportTemplate},
  data() {
    // 自定义手机号校验规则
    const phoneCheck = (rule, value, callback) => {
      // 正则表达式校验手机号(以1开头(34578任意紧跟)加上9位任意数字结尾)
      const RegExp = /^[1](3|4|5|7|8|)\d{9}$/;
      if (value === '') {
        callback(new Error("请输入手机号"));
      }
      if (RegExp.test(value)) {
        return callback();
      }
      callback(new Error("手机号格式错误"));
    };
    const emailCheck = (rule, value, callback) => {
      const RegEmail  = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
      if (value === '') {
        callback(new Error("邮箱不能为空"));
      }
      if (RegEmail.test(value)) {
        return callback();
      }
      callback(new Error("邮箱格式错误"));
    }
    return {
      addUserForm: {
        avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3916562861,2585271504&fm=26&gp=0.jpg',
        username: '',
        password: '123456',
        email: '',
        gender: 1,
        phone: '',
        age: '',
        registerTime: new Date(),
        isAdmin: 0,
        blacklist: 0,
        userOrderTotal: 0
      },
      loading: false,
      // 表单验证规则
      addUserFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 12, message: '用户名长度范围3~12', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 12, message: '密码为6~12位数字或英文', trigger: 'blur'}
        ],
        phone: [
          {required: true, validator: phoneCheck, trigger: 'blur'},
        ],
        email: [
          {required: true, validator: emailCheck, trigger: 'blur'},
        ]
      },
      fileTemp: null, // 指向最新上传的附件
      fileList: [],
      fileListLength: 0,
    }
  },
  methods: {
    handleAddCancel() {
      this.$emit('handleAddCancel');
    },
    // 插入用户
    insertUser(addUserFormRef) {
      this.$refs.addUserFormRef.validate(validate => {
        if (validate) {
          this.$http.post('/user/insert', this.addUserForm).then((result) => {
            if (result.code === 200) {
              this.loading = true;
              setTimeout(() => {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
                this.$refs[addUserFormRef].resetFields();
                this.loading = false;
              }, 500);
            } else {
              this.$message({
                type: 'error',
                message: result.msg
              });
            }
          }).catch((err) => {
            return err;
          });
        }
      });
    },
    resetForm(addUserFormRef) {
      this.$refs[addUserFormRef].resetFields();
    },
    //上传文件时处理方法  
    handleChange(file, fileList){
      this.fileListLength = fileList.length;
      this.fileTemp = file.raw;
      // 文件截取后缀
      let extention = file.name.substring(file.name.lastIndexOf('.') + 1);
      if(this.fileTemp){
        if((extention === 'xlsx') 
          || (extention === 'xls')){
          this.importfxx(this.fileTemp);
        } else {
          this.$message({
            type:'warning',
            message:'附件格式错误，请删除后重新上传！'
          })
        }
      } else {
        this.$message({
          type:'warning',
          message:'请上传附件！'
        })
      }
    },
    //超出最大上传文件数量时的处理方法
    handleExceed(){
      this.$message({
        type:'warning',
        message:'超出最大上传文件数量的限制！'
      })
      return;
    },
    //移除文件的操作方法
    handleRemove(file,fileList){
      this.fileTemp = null
    },
    // 读取 Excel 文件并解析
    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      let rABS = false; //是否将文件读取为二进制字符串
      let f = this.file;
      let reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function(f) {
        let binary = "";
        let rABS = false; //是否将文件读取为二进制字符串
        let wb; //读取完成的数据
        let outdata;
        let reader = new FileReader();
        reader.onload = function(e) {
          let bytes = new Uint8Array(reader.result);
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          //此处引入，用于解析excel
          let XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
              wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); 
          //outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
          //此处可对数据进行处理
          // console.log(outdata);
          let arr = [];
          outdata.map(v => {
            let obj = {};
            obj.id = v['id'];
            obj.username = v['username'];
            obj.password = v['password'];
            obj.phone = v['phone'],
            obj.email = v['email'],
            obj.gender = v['gender'];
            obj.age = v['age'],
            obj.avatar = v['avatar'];
            obj.registerTime = _this.formatExcelDate(v['registerTime']);
            obj.isAdmin = v['isAdmin'];
            obj.blacklist = v['blacklist'];
            arr.push(obj);
          });
          _this.da=arr;
          _this.dalen=arr;
          // _this.$emit('confirmImport', arr);
          // 获取导入数据
          _this.fileList = arr;
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    // 格式化 excel 解析的时间
    formatExcelDate (numb, format = "-") {
      // 如果numb为空则返回空字符串
      if (!numb) {
          return "";
      }
      let time = new Date(new Date("1900-1-1").getTime() + (numb - 1) * 3600 * 24 * 1000);
      const year = time.getFullYear() + '';
      const month = time.getMonth() + 1 + '';
      const date = time.getDate();
      if (format && format.length === 1) {
          return year + format + 
          (month < 10 ? '0' + month : month) + 
          format + (date < 10 ? '0' + date : date)
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },
    // 导入excel的全部数据到后端
    importAll() {
      // console.log(this.fileList);
      for (let index = 0; index < this.fileList.length; index++) {
        this.$http.post('/user/insert', this.fileList[index]).then((result) => {
          // console.log(result);
          if (index === this.fileList.length - 1 && result.code === 200) {
            this.$message({
              type: 'success',
              message: '批量导入成功',
            });
          } 
          if (result.code === 500) {
            this.$message({
              type: 'error',
              message: result.message,
            });
          }
        }).catch((err) => {
          return err;
        });
      }
    }
  }
}
</script>

<style scoped>
  .el-form {
    width: 50%;
  }
  .el-radio-group {
    text-align: left;
    display: block;
    line-height: unset;
    font-size: unset;
  }
  .el-button:not(:first-child, .import) {
    margin-left: 10px;
  }
  .import {
    margin-top: 10px;
  }
  .batch {
    height: 420px;
  }
</style>