<template>
  <div id="order-chart"></div>
</template>

<script>
import bus from '@/router/bus.js';
export default {
  data() {
    return {
      loading: true,
      orders: 0,
    }
  },
  mounted() {
    // 方式二
    // this.ordersCount = this.$store.state.ordersCount
    // 方式一
    // 获取兄弟组件的传值
    // bus.$on('ordersCount', (data) => {
    //   this.ordersCount = data;
    //   // console.log(this.ordersCount);
    // });
    this.drawOrderChart();
    // setTimeout(() => {
    //   this.loading = false;
    //   this.drawOrderChart();
    // }, 300);
  },
  methods: {
    // 时间字符串转为时间
    str2data(str) {
      if (str) { 
        let date  = new Date(str.replace(/-/,"/")) 
        return date;
      }
    },
    drawOrderChart() {
      let that = this;
      const myChart = this.$echart.init(document.querySelector("#order-chart"));
      myChart.showLoading();
      this.$http.get('/order/orders').then((result) => {
        myChart.hideLoading();
        that.orders = result.data
        myChart.setOption({
          tooltip: {
            trigger: 'item', // 提示
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical', // echart 信息项方向(垂直)
            x: 'left', 
            y: 'bottom',
            textStyle:{
              color:'#ccc',
            }
          },
          // 标题
          title:{
            text: that.orders.length,   // 显示文字
            left:"center", // 居中
            top:"50%", // 距离top
            textStyle:{  // 文字样式
              color:"orange",
              fontSize:36,
              align:"center"
            }
          },
          graphic:{
            type:"text",
            left:"center",
            top:"40%",
            style:{
              text:"总订单数",
              textAlign:"center",
              fill:"#fff",
              fontSize:20,
              fontWeight:700
            }
          },
          series: [  // 内容
            // 外层
            {
              name:'时间段人数',
              type:'pie',
              radius: ['70%', '90%'],
              itemStyle: {   // 修改饼图颜色
                normal: {
                  color:function(params){
                    let colorList=[
                      '#00ff00', '#FF0000', '#FF8C00', '#9921EA',
                    ];
                    return colorList[params.dataIndex]
                  }
                },
              },
              data:[
                {value: that.orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getHours() >= 1 && 
                      that.str2data(item.orderTime).getHours() <= 10) {
                    return item;
                  }
                }).length, name: '早上'},
                {value: that.orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getHours() >= 11 && 
                      that.str2data(item.orderTime).getHours() <= 13) {
                    return item;
                  }
                }).length, name: '中午'},
                {value: that.orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getHours() >= 14 && 
                      that.str2data(item.orderTime).getHours() <= 17) {
                    return item;
                  }
                }).length, name: '下午'},
                {value: that.orders.filter(item => {
                  if (that.str2data(item.orderTime).getFullYear() === new Date().getFullYear() &&
                      that.str2data(item.orderTime).getHours() >= 18 && 
                      that.str2data(item.orderTime).getHours() <= 24) {
                    return item;
                  }
                }).length, name: '晚上'},
              ],
              animationDuration: 1500,
            }
          ]
        });
        // echart 响应式
        window.addEventListener("resize", () => { myChart.resize();});
      }).catch((err) => {
        
      });
    }
  }
}
</script>

<style>

</style>