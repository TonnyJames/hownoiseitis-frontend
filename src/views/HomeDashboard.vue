<template>
  <div id="chart"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {CanvasRenderer} from "echarts/renderers";
import {LineChart} from "echarts/charts";
import api from "@/config/AxiosConfig";
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent
} from "echarts/components";

echarts.use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
]);
export default {
  created() {
    setTimeout(() => this.createChart(), 1000)
  },
  methods: {
    async createChart() {
      let chartDom = document.getElementById('chart');
      let myChart = echarts.init(chartDom, null, {
        height: 400,
        width: 700
      })

      let valores = [];
      const resultado = await api.get("/consultar-medicoes/inicial/");
      valores = resultado.data;

      let data = [];
      valores.forEach(item => {
        data.push([+new Date(item.data), item.valor]);
      })

      let option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: 'Decibéis'
        },

        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',

        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        series: [
          {
            name: 'dados do mongoDb',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: data
          }
        ],

      };

      if (option && typeof option === 'object') {
        myChart.setOption(option)
      }
      window.addEventListener('resize', myChart.resize);
    }
  }
}

</script>

<style scoped>
.chart {
  height: 30vh;
  width: 100vh;
}
</style>
