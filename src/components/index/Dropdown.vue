<template>
  <div class="dropdown">
    <el-tabs v-model="activeName">
      <el-tab-pane label="通知" name="first" class="dropdown-box">
        <div class="dropdowns-list-box" v-if="notifications > 0">
          <el-scrollbar style="height: 100%">
            <el-row
             class="dropdown-content" 
             v-infinite-scroll="load"
             infinite-scroll-disabled="disabled"
             v-for="item in notifications">
              <el-col :span="3">
                <div class="content-icon"><i class="icon el-icon-message"></i></div>
              </el-col>
              <el-col :span="21">
                <div class="content-text">
                  <p class="content-message">收到一条新的通知</p>
                  <span class="content-time">2021-04-01 12:12</span>
                </div>
              </el-col>
            </el-row>
            <p v-if="loading">加载中...</p>
            <p v-if="noMore">没有更多了</p>
          </el-scrollbar>
        </div>
        <div class="dropdown-no-list" v-else>
          <span>暂无通知</span>
        </div>
        <div class="dropdown-footer">
          清空通知
        </div>
      </el-tab-pane>
      <el-tab-pane label="消息" name="second" class="dropdown-box">
        <div class="dropdowns-list-box" v-if="messages.length > 0">
          
        </div>
        <div class="dropdown-no-list" v-else>
          <span>暂无消息</span>
        </div>
        <div class="dropdown-footer">
          清空通知
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      notifications: 7,
      messages: [],
      loading: false,
    }
  },
  methods: {
    load () {
      // console.log(123);
      this.loading = true
      setTimeout(() => {
        this.notifications += 2
        this.loading = false
      }, 2000)
    }
  },
  computed: {
    noMore () {
      return this.notifications >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  }
}
</script>

<style scoped>
  .dropdown>>>.el-tabs__nav {
    float: inherit!important;
  }
  .dropdown>>>.el-tabs__active-bar {
    left: 103px;
  }
  .dropdown>>>.el-tabs__header {
    margin: 0;
  }
  .dropdowns-list-box {
    height: 350px;
  }
  .dropdown-no-list {
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
  }
  .dropdown-box {
    width: 100%;
  }
  .dropdown-content {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #999;
    padding: 10px;
    cursor: pointer;
  }
  .dropdown-content:hover {
    background-color:#f0f9eb;
  }
  .dropdown-content:first-child {
    border-top: 1px solid #999;
  }
  .dropdown-content:hover .icon {
    transform: rotate(360deg);
    opacity: 1;
  }
  .icon {
    /* 设置过渡时长 */
    transition: all 0.5s;
  }
  .dropdown-content .content-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #67c23a;
    font-size: 20px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  .content-text {
    margin-left: 10px;
    text-align: left;
  }
  .content-message {
    height: auto;
    margin: 0;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .content-time {
    font-size: 12px;
    color: #515A6E;
  }
  .dropdown-footer {
    width: 100%;
    height: 38px;
    background: #f7f7f7;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #515A6E;
    border-top: 1px solid #dcdfe6;
    position: relative;
    left: 0;
    cursor: pointer;
  }
</style>