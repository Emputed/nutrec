<template>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  Chart.register(...registerables);
  
  export default {
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        required: false,
        default: () => ({}),
      },
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        this.chart = new Chart(this.$refs.canvas, {
          type: "line",
          data: this.chartData,
          options: this.chartOptions,
        });
      },
    },
    beforeUnmount() {
      if (this.chart) {
        this.chart.destroy();
      }
    },
  };
  </script>
  
  <style scoped>
  canvas {
    max-width: 100%;
    height: auto;
  }
  </style>
  