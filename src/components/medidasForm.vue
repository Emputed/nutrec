<template>
    <div>
        <h2>MEDIDAS</h2>
    </div>
    <form @submit.prevent="saveMedidas">
        <div class="container">
            <div class="row g-3">
                <div class="col-sm">
                    <input type="text" class="form-control" v-model="medida.estatura" placeholder="Estatura (m)"
                        aria-label="Estatura">
                </div>
                <div class="col-sm">
                    <input type="text" class="form-control" v-model="medida.m_peso" placeholder="Peso (kg)"
                        aria-label="Peso">
                </div>
                <div class="col-sm">
                    <input type="text" class="form-control" v-model="medida.m_pierna" placeholder="Pierna (cm)"
                        aria-label="Pierna">
                </div>
            </div>
            <div class="row g-3">
                <div class="col-sm">
                    <input type="text" class="form-control" v-model="medida.m_cintura" placeholder="Cintura (cm)"
                        aria-label="Cintura">
                </div>
                <div class="col-sm">
                    <input type="text" class="form-control" v-model="medida.m_brazo" placeholder="Brazo (cm)"
                        aria-label="Brazo">
                </div>
            </div>
        </div>
        <div>
            <button class="btn btn-success">REGISTRAR</button>
        </div>
    </form>
</template>
<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useIdStore } from '@/stores/idStore';
import { reactive } from 'vue';

export default {
    name: 'medidasForm',
    components: {
    },
    setup() {
        const router = useRouter();
        const idPaciente = useIdStore();

        const medida = reactive({
            estatura: '',
            m_cintura: '',
            m_pierna: '',
            m_peso: '',
            m_brazo: '',
            fecha: '',
            id_paciente: idPaciente.idPaciente
        });

        const saveMedidas = async () => {
            try {
                // Asignar la fecha actual automáticamente
                medida.fecha = new Date().toISOString();  // Convertir a formato ISO

                console.log(medida)
                const data = await axios.post(`http://localhost:4000/api/v1/medida/register/${idPaciente.idPaciente}`, medida);
                alert("Registro de medida exitoso ");
                router.push({name:'crud'});
            } catch (error) {
                alert("Error con la medida");
                console.log(error);
            }

        }
        return {medida, saveMedidas}
    }
}
</script>