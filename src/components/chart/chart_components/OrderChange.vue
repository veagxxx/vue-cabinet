<template>
  <div id="orderSituationChart"></div>
</template>

<script>
import bus from '@/router/bus.js'
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    this.drawOrderChange();
  },
  methods: {
    // 时间字符串转为时间
    str2data(str) {
      if (str) { 
        let date  = new Date(str.replace(/-/,"/")) 
        return date;
      }
    },
    drawOrderChange() {
      let that = this;
      const myChart = this.$echart.init(document.querySelector("#orderSituationChart")); //, 'dark'
      myChart.showLoading();
      this.$http.get('/order/orders').then((result) => {
        let orders = result.data;
        // 兄弟组件传值
        // 方式一
        bus.$emit('ordersCount', orders.length);
        // 方式二
        that.$store.commit('setOrderCount', orders.length);
        myChart.setOption({
          title : {
            show:true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
            text: '年度订单存放情况',
            x:'center',
            y: 'top', 
            textStyle: {   // 标题颜色
              color: "#fff", 
            },
          },
          toolbox: {
            feature: {
              magicType: {
                type: ['line', 'bar']
              }
            }
          },
          color: ["#00ff00", "#c23531", "#ca8622", "#4850b2"],
          legend: {
            orient: 'horizontal', // echart 信息项方向
            x: 'center', // 往中间放
            y: 'top',
            top: '7%',
            textStyle: {   // 标题颜色
              color: "#fff", 
            },
          },
          // 提示
          tooltip: {
            trigger: 'axis',
          },
          xAxis: [    // x 轴
            {
              type: 'category',
              axisTick: {show: false},
              data: ['第一季度', '第二季度', '第三季度', '第四季度'],
              axisLabel: {
                color: "orange" //刻度线标签颜色
              },
              name: '时间段',
              nameTextStyle: {
                color: 'hotpink'
              }
            }
          ],
          // y 轴
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                color: "pink" //刻度线标签颜色
              },
              name: '次数',
              nameTextStyle: {
                color: 'hotpink'
              }
            }, 
          ],
          series: [   // 数据
            {
              name: '早上',
              type: 'bar',
              barGap: 0,
              barWidth: 20,
              // label: labelOption,
              data: [
                {
                  value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 3 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 1 && 
                      that.str2data(item.orderTime).getHours() >= 1 && 
                      that.str2data(item.orderTime).getHours() <= 10) {
                    return item;
                  }
                }).length, name: '第一季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 6 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 4 && 
                      that.str2data(item.orderTime).getHours() >= 1 && 
                      that.str2data(item.orderTime).getHours() <= 10) {
                    return item;
                  }
                }).length, name: '第二季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 9 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 7 && 
                      that.str2data(item.orderTime).getHours() >= 1 && 
                      that.str2data(item.orderTime).getHours() <= 10) {
                    return item;
                  }
                }).length, name: '第三季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 12 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 10 && 
                      that.str2data(item.orderTime).getHours() >= 1 && 
                      that.str2data(item.orderTime).getHours() <= 10) {
                    return item;
                  }
                }).length, name: '第四季度'}, 
              ]
            },
            {
              name: '中午',
              type: 'bar',
              barGap: 0,
              barWidth: 20,
              // label: labelOption,
              data: [
                {
                  value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 3 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 1 && 
                      that.str2data(item.orderTime).getHours() >= 11 && 
                      that.str2data(item.orderTime).getHours() <= 13) {
                    return item;
                  }
                }).length, name: '第一季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 6 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 4 && 
                      that.str2data(item.orderTime).getHours() >= 11 && 
                      that.str2data(item.orderTime).getHours() <= 13) {
                    return item;
                  }
                }).length, name: '第二季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 9 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 7 && 
                      that.str2data(item.orderTime).getHours() >= 11 && 
                      that.str2data(item.orderTime).getHours() <= 13) {
                    return item;
                  }
                }).length, name: '第三季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 12 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 10 && 
                      that.str2data(item.orderTime).getHours() >= 11 && 
                      that.str2data(item.orderTime).getHours() <= 13) {
                    return item;
                  }
                }).length, name: '第四季度'}, 
              ]
            },
            {
              name: '下午',
              type: 'bar',
              barGap: 0,
              barWidth: 20,
              // label: labelOption,
              data: [
                {
                  value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 3 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 1 && 
                      that.str2data(item.orderTime).getHours() >= 14 && 
                      that.str2data(item.orderTime).getHours() <= 17) {
                    return item;
                  }
                }).length, name: '第一季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 6 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 4 && 
                      that.str2data(item.orderTime).getHours() >= 14 && 
                      that.str2data(item.orderTime).getHours() <= 17) {
                    return item;
                  }
                }).length, name: '第二季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 9 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 7 && 
                      that.str2data(item.orderTime).getHours() >= 14 && 
                      that.str2data(item.orderTime).getHours() <= 17) {
                    return item;
                  }
                }).length, name: '第三季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 12 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 10 && 
                      that.str2data(item.orderTime).getHours() >= 14 && 
                      that.str2data(item.orderTime).getHours() <= 17) {
                    return item;
                  }
                }).length, name: '第四季度'}, 
              ]
            },
            {
              name: '晚上',
              type: 'bar',
              barGap: 0,
              barWidth: 20,
              // label: labelOption,
              data: [
                {
                  value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 3 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 1 && 
                      that.str2data(item.orderTime).getHours() >= 18 && 
                      that.str2data(item.orderTime).getHours() <= 24) {
                    return item;
                  }
                }).length, name: '第一季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 6 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 4 && 
                      that.str2data(item.orderTime).getHours() >= 18 && 
                      that.str2data(item.orderTime).getHours() <= 24) {
                    return item;
                  }
                }).length, name: '第二季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 9 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 7 && 
                      that.str2data(item.orderTime).getHours() >= 18 && 
                      that.str2data(item.orderTime).getHours() <= 24) {
                    return item;
                  }
                }).length, name: '第三季度'}, 
                {value: orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getMonth() + 1 <= 12 && 
                      that.str2data(item.orderTime).getMonth() + 1 >= 10 && 
                      that.str2data(item.orderTime).getHours() >= 18 && 
                      that.str2data(item.orderTime).getHours() <= 24) {
                    return item;
                  }
                }).length, name: '第四季度'}, 
              ]
            }
          ]
        });
        myChart.hideLoading();
      }).catch((err) => {
        return err;
      });
    }
  }
}
</script>

<style scoped>
  #orderSituationChart {
    background-color: #141527;
    height: 350px;
  }
</style>