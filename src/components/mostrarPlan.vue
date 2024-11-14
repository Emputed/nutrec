<template>
    <div>
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
                <tr scope="row" v-for="plan in planesStore.planes" :key="plan.id_plan">
                    <td>{{ plan.id_plan }}</td>
                    <td>{{ plan.nombre_plan }}</td>
                    <td>{{ plan.fecha_plan }}</td>
                    <td><button class="btn btn-success" @click="eliminarPlan(plan.id_plan)"> Eliminar </button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { usePlanesStore } from '@/stores/planesStore';
import api from '../axios.js'
import Swal from 'sweetalert2';
export default {
    name: 'mostrarPlan',
    setup() {
        const planesStore = usePlanesStore();

        const eliminarPlan = async (id_plan) => {
            try {
                const result = await Swal.fire({
                    title: 'Eliminar paciente',
                    text: '¿Esta seguro de eliminar este paciente?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn btn-danger',
                        cancelButton: 'btn btn-secondary'
                    }
                });
                if (result.isConfirmed) {
                    const response = await api.delete(`plan/delete/${id_plan}`);
                    console.log(response.data);
                    Swal.fire('¡Eliminado!', 'El archivo ha sido eliminado con éxito.', 'success');
                }
            } catch (error) {
                console.log(error);
                Swal.fire('Error', 'Hubo un problema al intentar eliminar el archivo.', 'error');
            }
        }
        return { planesStore, eliminarPlan };
    }
}
</script>