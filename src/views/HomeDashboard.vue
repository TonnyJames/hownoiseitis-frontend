<template>
  <div style="justify-content: flex-start">
  <div id="chartLine" ></div>
  <div id="chartGauge"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import {CanvasRenderer} from "echarts/renderers";
import {LineChart, GaugeChart, BarChart} from "echarts/charts";
import {UniversalTransition} from 'echarts/features';
import api from "@/config/AxiosConfig";
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from "echarts/components";

echarts.use([
  CanvasRenderer,
  LineChart,
  GaugeChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
  UniversalTransition
]);
export default {
  created() {
    setTimeout(() => this.createChartLine(), 1000)
    setTimeout(() => this.createChartGauge(), 1000)
  },
  methods: {
    async createChartLine() {
      let chartDom = document.getElementById('chartLine');
      let myChart = echarts.init(chartDom, null, {
        renderer: 'canvas',
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

      let optionLine = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          },
        },
        title: {
          text: 'Histórico Decibéis'
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          },
          dataZoom: {
            show: false,
            start: 0,
            end: 100
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          name: "dBs",

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
            type: 'bar',
            data: data
          },
          {
            name: "Dynamic Line",
            type: "line",
            data: data
          }
        ],
      };
      setInterval(async function () {
        const res = await api.get("/consultar-medicoes/ultima/");
        data.shift();
        data.push([+new Date(res.data.data), res.data.valor])
        myChart.setOption({
          series: [{
            data: data
          },
            {
              data: data
            }
          ]
        });
      }, 5000);

      if (optionLine && typeof optionLine === 'object') {
        myChart.setOption(optionLine)
      }
      window.addEventListener('resize', myChart.resize);
    },

    async createChartGauge() {

      let chartDom = document.getElementById('chartGauge');
      let myChart = echarts.init(chartDom, null, {
        height: 400,
        width: 700
      })

      let oldValue = 0
      let newValue = 0

      let optionGauge = {
        title: {
          text: 'Último valor medido',
          left: 'center',
        },
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 90,
            splitNumber: 12,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 60,
              fontWeight: 'bolder',
              formatter: '{value} dB',
              color: 'inherit'
            },
            data: [
              {
                value: oldValue
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 90,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: oldValue
              }
            ]
          }
        ]
      };
      setInterval(async function () {
        const res = await api.get("/consultar-medicoes/ultima/");

        oldValue = newValue
        newValue = res.data.valor;
        myChart.setOption({
          series: [{
            data: [{
              value: newValue
            }]
          },
            {
              data: [{
                value: oldValue
              }]
            }
          ]
        });
      }, 2000);

      if (optionGauge && typeof optionGauge === 'object') {
        myChart.setOption(optionGauge)
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
