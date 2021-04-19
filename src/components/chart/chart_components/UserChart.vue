<template>
  <div id="user-chart"
  v-loading="loading"
  element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)">
  </div>
</template>

<script>
export default {
  props: ['users'],
  data() {
    return {
      loading: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.drawUserChart();
    }, 300);
  },
  methods: {
    drawUserChart() {
      const myChart = this.$echart.init(document.querySelector('#user-chart'));
      let that = this;
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
        series: [                       //内容
          {
            name:'人数占比',      //内容标题
            type:'pie',             //图标样式    
            selectedMode: 'single',     //选中模式：单选
            radius: [0, '55%'],         //饼图大小，[x,y]:x表示内半径，y表示外半径  
            label: {                    //标签
              normal: {
                position: 'inner'       //标签位置：内部
              }
            },
            name: ['拉黑', '正常'] ,  //内容名称
            itemStyle: {  // 修改饼图颜色
              normal: {
                color:function(params){
                  let colorList=[
                    '#FF0000', '#00FF00'
                  ];
                  return colorList[params.dataIndex]
                }
              },
            },                    
            data:[                                              //数据
              {value: that.users.filter(item => {
                return item.blacklist === 1;
              }).length, name: '拉黑'},     
              {value: that.users.filter(item => {
                return item.blacklist === 0;
              }).length, name: '正常'},
            ],               
          },
          {
            name:'男女占比',
            type:'pie',
            radius: ['70%', '90%'],
            label: {
              normal: {
                position: 'inner'   
              }
            },
            itemStyle: {  // 修改饼图颜色
              normal: {
                color:function(params){
                  let colorList=[
                    '#0000FF', 'hotpink'
                  ];
                  return colorList[params.dataIndex]
                }
              },
            },      
            name: ['男生', '女生'] ,  //内容名称     
            data:[
              {value: that.users.filter(item => {
                return item.gender === 1;
              }).length, name:'男生'},
              {value: that.users.filter(item => {
                return item.gender === 0;
              }).length, name:'女生'},
            ],
            animationDuration: 1500,
          }
        ],
      });
      // echart 响应式
      window.addEventListener("resize", () => { myChart.resize();});
    }
  }
}
</script>

<style>

</style>