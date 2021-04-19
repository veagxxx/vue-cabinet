<template>
  <div class="modular">
    <div class="grid-content statistics">
      <div class="detail">
        <i class="el-icon-s-data"></i>
        <div>业务统计</div>
      </div>
    </div>
    <div class="grid-content user">
      <div class="detail">
        <i class="el-icon-s-custom"></i>
        <div>用户模块</div>
      </div>
    </div>
    <div class="grid-content order">
      <div class="detail">
        <i class="el-icon-notebook-2"></i>
        <div>订单模块</div>
      </div>
    </div>
    <div class="grid-content product">
      <div class="detail">
        <i class="el-icon-coin"></i>
        <div>产品模块</div>
      </div>
    </div>
    <div class="grid-content setting">
      <div class="detail">
        <i class="el-icon-s-tools"></i>
        <div>系统设置</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .modular {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .modular:after {
    content: '';
    width: 120px;
  }
  .statistics {
    background-color: chocolate;
  }
  .user {
    background-color: cornflowerblue;
  }
  .order {
    background-color:forestgreen;
  }
  .product {
    background-color: gold;
  }
  .setting {
    background-color: hotpink;
  }
  .plus {
    background-color: #797a7aa1;
  }
  .grid-content {
    height: 120px;
    width: 120px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    cursor: pointer;
    margin-bottom: 10px;
    flex: 0 0 12.5%;
  }
  .grid-content:hover {
      box-shadow: 0 0 5px 1px gray;
  }
  .grid-content i {
    font-size: 40px;
  }
  .detail {
    text-align: center;
  }
</style>