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
                    <td><button class="btn btn-success"> Descargar </button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { usePlanesStore } from '@/stores/planesStore';

export default {
    name:'mostrarPlan',
    setup(){
        const planesStore = usePlanesStore();
        return {planesStore};
    }
}
</script>