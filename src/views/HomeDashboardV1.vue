<template>
  <v-chart class="chart" :option="option"/>
</template>

<script setup>
import API from "@/API";
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
import {onBeforeMount, onMounted, ref} from "vue";
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

// created(async () => {
//   await fetchValores();
// })

let valores = [];

const resposta =  api.get("/consultar-medicoes/inicial/")
      valores = resposta;

      let data = [[+new Date(), 0]]
      for (let i = 1; i < valores.data.length; i++) {                               //numero i representa o tamanhno da amostragem
        data.push([+new Date(valores.data[i].data), valores.data[i].valor]);
      }

      console.log(valores)


// console.log(data);


// let dateBase = +new Date("2023-10-17T03:04:00.894-03:00"); // data que receberá inicio da medida
// let segundos = 5000;                                            //passo de integração para mostradores de valor
// let data = [[dateBase, Math.random() * 300]];
// for (let i = 1; i < 20000; i++) {                               //numero i representa o tamanhno da amostragem
//   let now = new Date((dateBase += segundos));
//   data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
// }

// console.log(data);

const option = {

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

</script>

<style scoped>
.chart {
  height: 30vh;
  width: 100vh;
}
</style>
