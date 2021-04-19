<template>
  <div class="login-container" 
   v-loading="loading"
  element-loading-text="正在登录..."
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)"
  :style="{backgroundImage: `url(${loginPageInfo.loginBgImage})`}">
    <transition :name="loginPageInfo.loginAnimation === 1 ? 'slide-fade' : ''" mode="out-in">
      <div class="login" v-if="animation">
        <el-card>
          <div class="login-title">
            <h3>{{$t('login.title')}}</h3>
          </div>
          <el-form class="loginForm" 
          ref="loginFormRef" 
          :model="loginForm" 
          :rules="loginFormRules">
            <el-form-item prop="username">
              <el-input 
              v-model="loginForm.username" 
              clearable :placeholder="$t('login.username')" 
              prefix-icon="el-icon-user">
              </el-input>
            </el-form-item>
              <el-form-item prop="password" style="text-align: justify">
              <el-input 
              type="password" 
              v-model="loginForm.password" 
              clearable :placeholder="$t('login.password')"  
              prefix-icon="el-icon-lock">
              </el-input>
            </el-form-item>
            <el-form-item prop="captcha">
              <div  class="captcha">
                <el-input 
                v-model="loginForm.captcha" 
                clearable :placeholder="$t('login.captcha')" 
                prefix-icon="el-icon-picture-outline"
                @keydown.enter="login">
                </el-input>
                <el-tooltip effect="dark" :content="$t('login.captchaChange')" placement="top">
                  <img :src="captchaUrl" alt="验证码" @click="changeCaptcha"/>
                </el-tooltip>
              </div>
            </el-form-item>
            <el-form-item class="btn-group">
              <div class="language">
                <el-radio v-model="$i18n.locale" label="zh" @change="changeLanguage">中文</el-radio>
                <el-radio v-model="$i18n.locale" label="en" @change="changeLanguage">English</el-radio>
              </div>
              <el-button class="login-btn" type="success" @click="login">
                {{$t('login.login')}}
              </el-button>
              <div class="register-forget">
                <el-button type="text">{{$t('login.register')}}</el-button>
                <el-button type="text">{{$t('login.forget')}}</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </transition>
  </div>
</template>

<script>
import qs from 'qs';
export default {
  data() {
    return {
      radio: 'zh',
      loading: false,
      loginForm: {
        username: 'admin',
        password: '123456',
        captcha: '',
      },
      captchaUrl: '/captcha?timestamp=' + new Date(),
      // 登录页信息
      loginPageInfo: {
        loginAnimation: 0,
        loginBgImage: ''
      },
      animation: false,
      loginFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 12, message: '用户名长度范围3~12', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        captcha: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
        ]
      }
    }
  },
  mounted() {
    this.queryLoginInfo();
  },
  methods: {
    // 修改验证码
    changeCaptcha() {
      this.captchaUrl = '/captcha?timestamp=' + new Date();
    },
    // 查询登录页的设置信息
    queryLoginInfo() {
      this.$http.get('/setting/one')
      .then((result) => {
        // console.log(result);  
        this.loginPageInfo = result.data;
        // if (this.loginPageInfo.loginAnimation === 1) {
        //   this.loginPageInfo.animation = true;
        // } else {
        //   this.loginPageInfo.animation = false;
        // }
        this.animation = true;
      }).catch((err) => {
        return err;
      });
    },
    // 登录
    login() {
      this.$refs.loginFormRef.validate(validate => {
        if(validate) {
          this.loading = true;
          this.$http.post('/login', qs.stringify(this.loginForm))
          .then(result => {
            // console.log(result);
            if (result.code === 200) {
              this.$store.commit('SET_TOKEN', result.token);
              this.$store.commit('SET_USER', result.data);
              this.$store.commit('SET_LOGIN_TIME', new Date());
              setTimeout(() => {
                this.loading = false;
                this.$router.push('/index');
              }, 500);
            } else {
              this.$message({
                type: 'error',
                message: result.message
              })
            }
          }).catch(error => {
            return error
          });
        } else {
          this.captchaUrl = '/captcha?timestamp=' + new Date();
        }
      });
      // this.$router.push('/home');
    },
    // 
    changeLanguage(value) {
      // console.log(value);
      sessionStorage.setItem('language', value);
      this.$i18n.locale = sessionStorage.getItem('language');
    }
  }
}
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .login-title {
    text-align: center;
    color: brown;
  }
  /* .login .el-divider__text {
    font-size: 20px;
    color: brown;
  } */
  .login .el-card {
    width: 100%;
    height: auto;
    display: flex;
    background-color: unset;
  }
  .loginForm {
    width: 500px;
    height: auto;
    text-align: center;
  }
  .captcha {
    display: flex;
  }
  .captcha img {
    cursor: pointer;
    margin-left: 5px;
    float: right;
    border: 1px solid gray;
    box-shadow: 0 0 3px inset;
    border-radius: 3px;
  }
  .btn-group .login-btn {
    width: 100%;
  }
  /** 去除按钮组的 label-width */
 .btn-group>>>.el-form-item__content {
    margin-left: 0px!important;
  }
  /* 过度动画 */
  .slide-fade-enter-active {
    transition: all 1.5s;
  }
  .slide-fade-enter
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translate(-50%, -150%);
  }
  .register-forget {
    display: flex;
    justify-content: space-around;
  }
  .register-forget .el-button--text {
    color: #ff0000;
  }
</style>