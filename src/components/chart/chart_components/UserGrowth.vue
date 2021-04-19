<template>
  <div id="userGrowthChart"></div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    this.drawUserGrowth();
  },
  methods: {
    drawUserGrowth() {
      let labelOption = {
        show: true,
        position: 'top',
        distance: '15',
        verticalAlign: 'middle',
        formatter: '{c}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff'
          }
        }
      };
      const myChart = this.$echart.init(document.querySelector("#userGrowthChart"));
      myChart.setOption({
        title : {
          show:true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: '2020-2021年用户增长情况',
          x:'center',
          y: 'top', 
          textStyle: {   // 标题颜色
            color: "#fff", 
          },
        },
        // 提示
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [    // x 轴
          {
            type: 'category',
            axisTick: {show: false},
            data: ['2020上半年', '2020下半年', '2021上半年'],
            axisLabel: {
              color: "orange" //刻度线标签颜色
            }
          }
        ],
        // y 轴
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: "pink" //刻度线标签颜色
            }
          }, 
        ],
        series: [   // 数据
          {
            name: '用户数量',
            type: 'line',
            barGap: 0,
            barWidth: 30,
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = ["#c23531", "#4850b2", "#61a0a8", "#ca8622"];
                  return colorList[params.dataIndex];
                }
              }
            },
            label: labelOption,
            data: [
              {value: 100, name: '2020上半年'}, 
              {value: 134, name: '2020下半年'}, 
              {value: 201, name: '2021上半年'}
            ]
          },
        ]
      });
    }
  }
}
</script>

<style scoped>
  #userGrowthChart {
    background-color: #141527;
    height: 350px;
  }
</style>