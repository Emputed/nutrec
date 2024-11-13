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
export default {
    name:'mostrarPlan',
    setup(){
        const planesStore = usePlanesStore();

        const eliminarPlan = async (id_plan) => {
            try{
                const response = await api.delete(`plan/delete/${id_plan}`);
                console.log(response.data);
            }catch(error){
                console.log(error);
            }
        }
        return {planesStore, eliminarPlan};
    }
}
</script>