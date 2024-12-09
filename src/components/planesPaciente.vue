<template>
    <div class="vh-100">
        <h3>Estos son tus planes, <strong>{{ username }}</strong></h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID Plan</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">PDF</th>
                </tr>
            </thead>
            <tbody>
                <tr scope="row" v-for="plan in planes" :key="plan.id_plan">
                    <td>{{ plan.id_plan }}</td>
                    <td>{{ plan.nombre_plan }}</td>
                    <td>{{ plan.fecha_plan }}</td>
                    <td><button class="btn btn-success" @click="downloadPlan(plan.id_plan)"> Descargar </button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import api from '../axios.js';
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted, computed } from 'vue';

export default {
    name: 'planesPaciente',
    setup() {
        const planes = ref([]);
        const authStore = useAuthStore();

        const username = computed(() => authStore.username);
        const id_paciente = computed(() => authStore.id);
        
        const getPlanes = async () => {
            try {
                const response = await api.get(`/crud/planes/${id_paciente.value}`);
                planes.value = response.data;
                console.log("ID Paciente:", id_paciente.value);
                console.log("Planes:", planes.value);
            } catch (error) {
                console.error('Error en getPlanes paciente:', error);
            }
        }

        const downloadPlan = async (id_plan) => {
            try {
                const response = await api.get(`/crud/download/${id_plan}`, {
                    responseType: 'blob', // Indicamos que esperamos recibir datos binarios
                });

                // Crear URL del archivo PDF
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `plan-${id_plan}.pdf`); // Nombre del archivo para la descarga
                document.body.appendChild(link);
                link.click();
                
                // Limpieza: eliminar el enlace temporal
                link.remove();
                window.URL.revokeObjectURL(url);

            } catch (error) {
                alert("Error en la descarga");
                console.error(error);
            }
        };

        onMounted(() => {
            getPlanes();
        });

        return { planes, username, downloadPlan };
    }
}
</script>
