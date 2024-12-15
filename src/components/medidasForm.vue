<template>
    <div class="vh-100">
        <div>
            <h2>MEDIDAS</h2>
        </div>
        <form @submit.prevent="saveMedidas" class="m-5">
            <div class="container">
                <div class="row g-3">
                    <div class="col-sm m-2">
                        <input type="text" class="form-control" v-model="medida.estatura" placeholder="Estatura (m)"
                            aria-label="Estatura" required>
                    </div>
                    <div class="col-sm m-2">
                        <input type="text" class="form-control" v-model="medida.m_peso" placeholder="Peso (kg)"
                            aria-label="Peso" required>
                    </div>
                    <div class="col-sm m-2">
                        <input type="text" class="form-control" v-model="medida.m_pierna" placeholder="Pierna (cm)"
                            aria-label="Pierna" required>
                    </div>
                </div>
                <div class="row g-3 m-2">
                    <div class="col-sm">
                        <input type="text" class="form-control" v-model="medida.m_cintura" placeholder="Cintura (cm)"
                            aria-label="Cintura" required>
                    </div>
                    <div class="col-sm ">
                        <input type="text" class="form-control" v-model="medida.m_brazo" placeholder="Brazo (cm)"
                            aria-label="Brazo" required>
                    </div>
                </div>
            </div>
            <div>
                <button class="btn btn-success">REGISTRAR</button>
            </div>
        </form>
    </div>

</template>
<script>
import api from '../axios.js';
import { useRouter } from 'vue-router';
import { useMedidasStore } from '@/stores/medidasStore.js';
import { usePacienteStore } from '@/stores/pacienteStore.js';
import { reactive } from 'vue';
import Swal from 'sweetalert2';

export default {
    name: 'medidasForm',
    components: {
    },
    setup() {
        const router = useRouter();
        const medidas = useMedidasStore();
        const paciente = usePacienteStore();

        const medida = reactive({
            estatura: '',
            m_cintura: '',
            m_pierna: '',
            m_peso: '',
            m_brazo: '',
            fecha: '',
            id_paciente: paciente.id_paciente,
        });

        const saveMedidas = async () => {
            try {
                // Asignar la fecha actual automáticamente
                medida.fecha = new Date().toISOString();  // Convertir a formato ISO
                const data = await api.post(`/medida/register/${medida.id_paciente}`, medida);
                Swal.fire('¡Registrado!', 'La medida se ha sido registrado con éxito.', 'success');
                router.push({ name: 'crud' });
            } catch (error) {
                Swal.fire('Error', 'Hubo un problema al intentar registrar la medida.', 'error');
                console.log(error);
            }

        }
        return { medida, saveMedidas }
    }
}
</script>