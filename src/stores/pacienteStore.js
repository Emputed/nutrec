import { defineStore } from "pinia";

export const usePacienteStore = defineStore('pacienteStore', {
    state: () => ({
        paciente : null
    }),
    actions:{
        setPaciente(paciente){
            this.paciente = paciente;
        }
    }
})