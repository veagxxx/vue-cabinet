<template>
  <div class="Not-Found">
    <div class="container">
      <div class="note">
        <div class="error-code"><h1>404</h1></div>
        <div class="error-msg">
          <div class="text"><span>Not Found！</span></div>
          <div class="text"><span>你的页面喝多了，走错地方了！</span></div>
        </div>
      </div>
      <div class="router-btn">
        <el-button size="small" type="default" plain @click="returnLastPage">返回上一页</el-button>
        <el-button size="small" type="primary" plain @click="returnIndexPage">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    returnLastPage() {
      this.$router.go(-1);//返回上一层
    },
    returnIndexPage() {
      this.$router.push('/index');
    }
  }
}
</script>

<style scoped>
  .Not-Found {
    height: 100%;
    display: flex;
  }
  .container {
    margin: auto;
    width: 50%;
  }
  .note {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .error-code {
    width: 40%;
    text-align: right;
    padding-right: 20px;
    font-size: 36px;
    color: limegreen;
  }
  .error-msg {
    width: 60%;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: transparent;
    -webkit-text-stroke:1px #ff9c00;
  }
  .error-msg .text {
    margin: 15px 0;
  }
  .error-msg .text:first-child {
    font-size: 24px;
  }
  .router-btn {
    text-align: center;
  }
</style>