<template>
  <div id="product-chart"
  v-loading="loading"
  element-loading-text="拼命加载中"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)">
  </div>
</template>

<script>
export default {
  props: ['userCount'],
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.drawProductChart();
    }, 300);
  },
  methods: {
    drawProductChart() {
      const myChart = this.$echart.init(document.querySelector('#product-chart'));
      let that = this;
      myChart.setOption({
        color:["#27D9C8","#D8D8D8"],
        title:{
          text: that.userCount,
          left:"center",
          top:"50%",
          textStyle:{
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
            text:"总人数",
            textAlign:"center",
            fill:"#fff",
            fontSize:20,
            fontWeight:700
          }
        },
        series: [
          {
            name: '系统总人数',
            type: 'pie',
            radius: ['60%', '70%'],
            label: {
              normal: {
                show: false, // 不显示标签
                position: 'center'
              },
            },
            data: [
              {value: 0, name: "系统总人数"},
            ]
          }
        ]
      });
    }
  }
}
</script>

<style>

</style>