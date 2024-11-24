<template>
    <div class="vh-100">
        <h2>MEDIDAS</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID Medida</th>
                    <th scope="col">Estatura</th>
                    <th scope="col">Cintura</th>
                    <th scope="col">Pierna</th>
                    <th scope="col">Peso</th>
                    <th scope="col">Brazo</th>
                    <th scope="col">Fecha</th>
                </tr>
            </thead>
            <tbody>
                <tr scope="row" v-for="medida in medidasStore.medidas" :key="medida.id_medida">
                    <td>{{ medida.id_medida }}</td>
                    <td>{{ medida.estatura }}</td>
                    <td>{{ medida.m_cintura }}</td>
                    <td>{{ medida.m_pierna }}</td>
                    <td>{{ medida.m_peso }}</td>
                    <td>{{ medida.m_brazo }}</td>
                    <td>{{ medida.fecha }}</td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-success" @click="nuevaMedida()">Nueva medida</button>
    </div>
</template>
<script>
import { useMedidasStore } from '@/stores/medidasStore';
import { useRouter } from 'vue-router';
export default {
    name: 'medidasCard',
    components: {
    },
    setup() {
        const router = useRouter();
        const medidasStore = useMedidasStore();

        const nuevaMedida = () =>{
            router.push({name:'MedidasRegisterView'});
        }

        return { medidasStore, nuevaMedida };
    }
}
</script>