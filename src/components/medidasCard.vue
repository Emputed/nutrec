<template>
    <div class="d-flex flex-column vh-100">
      <header>
        <h2>MEDIDAS</h2>
      </header>
  
      <main class="flex-grow-1 overflow-auto">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID Medida</th>
              <th scope="col">Estatura</th>
              <th scope="col">Cintura</th>
              <th scope="col">Pierna</th>
              <th scope="col">Peso</th>
              <th scope="col">Brazo</th>
              <th scope="col">IMC</th>
              <th scope="col">MB</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="medida in medidasStore.medidas" :key="medida.id_medida">
              <td>{{ medida.id_medida }}</td>
              <td>{{ medida.estatura }}</td>
              <td>{{ medida.m_cintura }}</td>
              <td>{{ medida.m_pierna }}</td>
              <td>{{ medida.m_peso }}</td>
              <td>{{ medida.m_brazo }}</td>
              <td>{{ medida.imc }}</td>
              <td>{{ medida.gastoCalorico }}</td>
              <td>{{ medida.fecha }}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-success" @click="nuevaMedida()">Nueva medida</button>
  
        <div id="graficas" class="mt-5 container">
          <div class="row">
            <!-- Gráfica del IMC -->
            <div class="col-md-6">
              <h3>IMC a lo largo del tiempo</h3>
              <ChartComponent :chartData="imcChartData" />
            </div>
  
            <!-- Gráfica del Gasto Calórico -->
            <div class="col-md-6">
              <h3>Gasto Calórico a lo largo del tiempo</h3>
              <ChartComponent :chartData="caloriesChartData" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { useMedidasStore } from "@/stores/medidasStore";
  import { useRouter } from "vue-router";
  import ChartComponent from "@/components/ChartComponent.vue";
  import { computed } from "vue";
  
  export default {
    name: "medidasCard",
    components: {
      ChartComponent,
    },
    setup() {
      const router = useRouter();
      const medidasStore = useMedidasStore();
  
      const nuevaMedida = () => {
        router.push({ name: "MedidasRegisterView" });
      };
  
      const imcChartData = computed(() => ({
        labels: medidasStore.medidas.map((m) => m.fecha),
        datasets: [
          {
            label: "IMC",
            data: medidasStore.medidas.map((m) => m.imc),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      }));
  
      const caloriesChartData = computed(() => ({
        labels: medidasStore.medidas.map((m) => m.fecha),
        datasets: [
          {
            label: "Gasto Calórico",
            data: medidasStore.medidas.map((m) => m.gastoCalorico),
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
          },
        ],
      }));
  
      return { medidasStore, nuevaMedida, imcChartData, caloriesChartData };
    },
  };
  </script>
  