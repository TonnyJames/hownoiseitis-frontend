<template>
  <v-chart class="chart" :option="option"/>
</template>

<script>
import API from "@/API";
import * as echarts from 'echarts'
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {LineChart} from "echarts/charts";
import VChart, {THEME_KEY} from "vue-echarts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  GridComponent
} from "echarts/components";
import api from "@/config/AxiosConfig";

use([
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
  components: {
    VChart
  },
  data: () => ({
    data: [],
    option: {}
  }),

  created() {
    // setTimeout(() => this.createChart(), 1000)
    this.createChart()
  },

  methods: {

    async createChart() {

      let valores = [];
      const resultado = await api.get("/consultar-medicoes/inicial/");
      valores = resultado.data;

      // let data = [];
      valores.forEach(item => {
        this.data.push([+new Date(item.data), item.valor]);
      })

      this.option = {
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
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: 'rgba(15,255,2,1)'

                },
                {
                  color: 'rgba(242,1,1,1)',
                  offset: 0,
                }
              ])
            },
            data: this.data
          }
        ],
      }
    },

  }

}


</script>

<style scoped>
.chart {
  height: 50vh;
  width: 130vh;
}
</style>
