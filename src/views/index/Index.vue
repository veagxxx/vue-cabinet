<template>
  <div class="index">
    <el-row :gutter="10">
      <el-col :span="8" >
        <el-card class="user">
          <div class="user-msg">
            <el-avatar :size="100" :src="avatar"></el-avatar>
            <div class="identity">
              <span class="username">{{username}}</span>
              <p>{{isAdmin === 1 ? '超级管理员' : '普通用户'}}</p>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="login-last-time">
            <div class="user-info-list">
              登录时间：
              <span>{{loginTime | TimeFormat}}</span>
            </div>
            <div class="user-info-list">
              登录地点：
              <span>{{loginCity}}</span>
            </div>
            <div class="user-info-list">
              登录时长：
              <span>{{`
                ${loginDuration.hour < 10 ? '0' + loginDuration.hour : loginDuration.hour}小时
                ${loginDuration.minute < 10 ? '0' + loginDuration.minute : loginDuration.minute}分钟
                ${loginDuration.second < 10 ? '0' + loginDuration.second : loginDuration.second}秒
                `}}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" class="agent">
        <el-scrollbar style="height:100%">
          <el-card>
            <span>{{$t('main.agent')}}</span>
            <el-divider></el-divider>
            <ul class="agent-content">
              <li v-for="(item, index) in data">{{item}}</li>
            </ul>
          </el-card>
        </el-scrollbar>
      </el-col>
    </el-row>
    <el-card class="module">
      <span><i class="el-icon-guide"></i>{{$t('main.modular')}}</span>
      <el-divider></el-divider>
      <Modular></Modular>
    </el-card>
  </div>
</template>

<script>
import Modular from '@/components/index/Modular.vue';
import getCurrentCityName from '@/utils/map.js';
export default {
  components: {Modular},
  data() {
    return {
      isShow: false,
      avatar: '',
      username: '',
      isAdmin: '',
      data: [
        '超市大减价，一箱旺仔牛奶只需10块钱',
        '超市大减价，一箱旺仔牛奶只需10块钱',
        '超市大减价，一箱旺仔牛奶只需10块钱',
        '超市大减价，一箱旺仔牛奶只需10块钱',
        '超市大减价，一箱旺仔牛奶只需10块钱',
        '超市大减价，一箱旺仔牛奶只需10块钱',
        '超市大减价，一箱旺仔牛奶只需10块钱',
        '超市大减价，一箱旺仔牛奶只需10块钱',
        '超市大减价，一箱旺仔牛奶只需10块钱',
      ],
      loginTime: '',
      loginCity: '正在定位...',
      loginDuration: {
        hour: 0,
        minute: 0,
        second: 0
      },
      timer: null
    }
  },
  mounted() {
    this.avatar = this.$store.state.user.avatar;
    this.username = this.$store.state.user.username;
    this.isAdmin = this.$store.state.user.isAdmin;
    this.loginTime = this.$store.state.loginTime;
    this.getCurrentCity();
    this.getloginDuration();
  },
  // 页面销毁时执行
  destroyed() {
    // console.log(123);
    // 清除定时器
    clearInterval(this.timer);
  },
  methods: {
    // 获取当前城市
    getCurrentCity(){
      getCurrentCityName().then((city) => {
        // console.log(city);  //顺利的话能在控制台打印出当前城市
        this.loginCity = city;
      });
    },
    // 获取登录时长
    getloginDuration() {
      let startTime = this.$store.state.loginTime;
      let currentTime = new Date();
      if (typeof startTime === 'string') {
        startTime = new Date(Date.parse(startTime.replace(/-g/, "/")));
      }
      // console.log(typeof startTime);
      let total = (currentTime.getTime() - startTime.getTime()) / 1000;
      // 获取小时
      this.loginDuration.hour = parseInt(total / 3600);
      // 获取分钟
      this.loginDuration.minute = parseInt(total % 3600 / 60);
      // 获取秒数
      this.loginDuration.second = parseInt(total % 60);
      // console.log(this.loginDuration);
      this.timer = setInterval(() => {
        if (this.loginDuration.second < 59) {
          this.loginDuration.second += 1;
        } else if (this.loginDuration.minute < 59 ) {
          this.loginDuration.second = 0;
          this.loginDuration.minute += 1;
        } else {
          this.loginDuration.second = 0;
          this.loginDuration.minute = 0;
          this.loginDuration.hour += 1;
        }
      }, 1000);
    }
  }
}
</script>

<style scoped>
  .user-msg {
    display: flex;
    align-items: center;
  }
  .identity {
    margin-left: 40px;
  }
  .identity .username {
    font-size: 28px;
  }
  .identity p {
    margin: 5px 0;
    font-size: 14px;
    font-family: Arial;
    color: #999;
  }
  .login-last-time {
    margin-top: 10px;
  }
  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }
  .user-info-list span {
      margin-left: 70px;
  }
  .module {
    margin-top: 10px;
  }
  .agent,.user {
    height: 320px;
    overflow-x: hidden;
  }
  .agent-content {
    padding: 0px;
  }
  .agent-content li{
    list-style: none;
    margin: 10px 0;
    cursor: pointer;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .agent-content > li:first-child, li:last-child {
    margin: 0;
  }
  .agent-content li:hover {
    background-color:floralwhite;
  }
</style>