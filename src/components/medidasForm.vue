<template>
    <div>
        <h2>MEDIDAS</h2>
    </div>
    <div class="container">
        <div class="row g-3">
            <div class="col-sm">
                <input type="text" class="form-control" placeholder="Estatura (m)" aria-label="Estatura">
            </div>
            <div class="col-sm">
                <input type="text" class="form-control" placeholder="Peso (kg)" aria-label="Peso">
            </div>
            <div class="col-sm">
                <input type="text" class="form-control" placeholder="Pierna (cm)" aria-label="Pierna">
            </div>
        </div>
        <div class="row g-3">
            <div class="col-sm">
                <input type="text" class="form-control" placeholder="Cintura (cm)" aria-label="Cintura">
            </div>
            <div class="col-sm">
                <input type="text" class="form-control" placeholder="Cadera (cm)" aria-label="Cadera">
            </div>
            <div class="col-sm">
                <input type="text" class="form-control" placeholder="Brazo (cm)" aria-label="Brazo">
            </div>
        </div>
    </div>
    <div>
        <button class="btn btn-success">REGISTRAR</button>
    </div>
</template>
<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: 'medidasForm',
    components: {
    },
    data() {
        return {
            medida: {
                id_medida: '',
                estatura: '',
                m_cintura: '',
                m_pierna: '',
                m_peso: '',
                m_brazo: '',
                fecha: '',
                id_paciente: ''
            }
        }
    },
    methods: {
        saveMedida() {
            
        }
    }
}
</script>